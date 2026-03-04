import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { sendOrderConfirmationEmail } from '@/lib/email';
import { createClient } from '@supabase/supabase-js';
import type Stripe from 'stripe';

export const runtime = 'nodejs';

interface LineItem {
  productId: string;
  variantId?: string;
  name: string;
  variantName?: string;
  quantity: number;
  price: number;
}

// Admin client without typed RLS restrictions
function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Webhook signature verification failed:', message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const { customerEmail, customerName, shippingAddress, shippingCity, shippingState, shippingPostcode } = paymentIntent.metadata;
    const itemsJson = paymentIntent.metadata.items;

    if (!customerEmail || !itemsJson) {
      console.error('Missing metadata on payment intent:', paymentIntent.id);
      return NextResponse.json({ received: true });
    }

    try {
      const items = JSON.parse(itemsJson) as LineItem[];
      const total = paymentIntent.amount / 100;
      const subtotal = total;

      const supabase = getAdminClient();

      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          stripe_payment_intent_id: paymentIntent.id,
          customer_email: customerEmail,
          customer_name: customerName || customerEmail.split('@')[0],
          shipping_address: shippingAddress || '',
          shipping_city: shippingCity || '',
          shipping_state: shippingState || '',
          shipping_postcode: shippingPostcode || '',
          subtotal,
          shipping_cost: 0,
          total,
          status: 'paid',
        })
        .select('id, order_number')
        .single();

      if (orderError) {
        console.error('Failed to create order:', orderError);
      }

      // Insert order items
      if (order) {
        const orderItems = items.map((item) => ({
          order_id: order.id as string,
          product_id: item.productId,
          variant_id: item.variantId ?? null,
          product_name: item.name,
          variant_name: item.variantName ?? null,
          quantity: item.quantity,
          unit_price: item.price,
        }));

        const { error: itemsError } = await supabase
          .from('order_items')
          .insert(orderItems);

        if (itemsError) {
          console.error('Failed to insert order items:', itemsError);
        }
      }

      const orderNumber = (order?.order_number as string) ?? paymentIntent.id.slice(-8).toUpperCase();

      // Send confirmation email
      await sendOrderConfirmationEmail(customerEmail, {
        orderId: orderNumber,
        items: items.map((item) => ({
          name: item.variantName ? `${item.name} (${item.variantName})` : item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        total,
        customerName: customerName || customerEmail.split('@')[0],
      });
    } catch (err) {
      console.error('Error processing payment_intent.succeeded:', err);
    }
  }

  return NextResponse.json({ received: true });
}
