import type { Metadata } from 'next';
import CartContent from './CartContent';

export const metadata: Metadata = {
  title: 'Shopping Cart',
  description: 'Review your Botanical Aid shopping cart.',
};

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 lg:px-6 py-12">
      <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>
      <CartContent />
    </div>
  );
}
