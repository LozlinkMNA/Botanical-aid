'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { Suspense } from 'react';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const email = searchParams.get('email');

  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <CheckCircle className="h-20 w-20 text-success mx-auto mb-6" />

      <h1 className="text-3xl font-bold mb-3">Thank you for your order!</h1>

      {orderId && (
        <p className="text-lg text-muted-foreground mb-2">
          Order ID: <span className="font-mono font-semibold text-foreground">#{orderId}</span>
        </p>
      )}

      {email && (
        <p className="text-muted-foreground mb-8">
          A confirmation email will be sent to <span className="font-medium">{email}</span>.
        </p>
      )}

      {!email && (
        <p className="text-muted-foreground mb-8">
          A confirmation email will be sent to your email address shortly.
        </p>
      )}

      <div className="bg-muted/50 rounded-lg p-6 mb-8 text-left">
        <h2 className="font-semibold mb-2">What happens next?</h2>
        <ul className="text-sm text-muted-foreground space-y-2">
          <li>Your order is being prepared for shipping.</li>
          <li>You will receive a shipping confirmation email with tracking details.</li>
          <li>Most orders are dispatched within 1-2 business days.</li>
        </ul>
      </div>

      <Link
        href="/products"
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
      >
        <ArrowLeft className="h-4 w-4" />
        Continue Shopping
      </Link>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-2xl mx-auto px-4 py-24 text-center">
          <p className="text-muted-foreground">Loading order details...</p>
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}
