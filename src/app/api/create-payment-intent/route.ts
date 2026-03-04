import { NextResponse } from 'next/server';
import { z } from 'zod';
import { stripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';
import { products as staticProducts } from '@/data/products';

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

const CreatePaymentIntentSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().int().positive(),
      variantId: z.string().optional(),
    })
  ).min(1),
  customerEmail: z.string().email(),
  shippingInfo: z.object({
    name: z.string().min(1),
    address: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    postcode: z.string().min(1),
  }),
});

interface LineItem {
  productId: string;
  variantId?: string;
  name: string;
  variantName?: string;
  quantity: number;
  price: number;
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const parsed = CreatePaymentIntentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { items, customerEmail, shippingInfo } = parsed.data;

    let totalCents = 0;
    const lineItems: LineItem[] = [];

    // Try Supabase first, fall back to static data
    const supabase = getAdminClient();
    const productIds = items.map((i) => i.productId);
    const { data: dbProducts } = await supabase
      .from('products')
      .select('*, product_variants(*)')
      .in('id', productIds)
      .eq('is_active', true);

    for (const item of items) {
      let price: number;
      let productName: string;
      let variantName: string | undefined;

      const dbProduct = dbProducts?.find((p) => p.id === item.productId);

      if (dbProduct) {
        if (item.variantId) {
          const variants = dbProduct.product_variants as Array<{ id: string; name: string; price: number; stock: number }>;
          const variant = variants.find((v) => v.id === item.variantId);
          if (!variant) {
            return NextResponse.json(
              { error: `Variant not found: ${item.variantId}` },
              { status: 400 }
            );
          }
          price = variant.price;
          productName = dbProduct.name;
          variantName = variant.name;
        } else {
          price = dbProduct.price;
          productName = dbProduct.name;
        }
      } else {
        // Fall back to static product data
        const staticProduct = staticProducts.find((p) => p.id === item.productId);
        if (!staticProduct) {
          return NextResponse.json(
            { error: `Product not found: ${item.productId}` },
            { status: 400 }
          );
        }
        price = staticProduct.price;
        productName = staticProduct.name;
      }

      totalCents += Math.round(price * 100) * item.quantity;
      lineItems.push({
        productId: item.productId,
        variantId: item.variantId,
        name: productName,
        variantName,
        quantity: item.quantity,
        price,
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCents,
      currency: 'aud',
      receipt_email: customerEmail,
      metadata: {
        customerEmail,
        customerName: shippingInfo.name,
        shippingAddress: shippingInfo.address,
        shippingCity: shippingInfo.city,
        shippingState: shippingInfo.state,
        shippingPostcode: shippingInfo.postcode,
        items: JSON.stringify(lineItems),
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (err) {
    console.error('Error creating payment intent:', err);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
