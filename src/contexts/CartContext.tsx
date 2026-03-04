'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { type Product } from '@/types/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

// Volume discount tiers — applied organically based on qty per product
// Floor to 2dp so prices match the product page exactly (e.g. $22.455 → $22.45, not $22.46)
function floorCents(n: number) { return Math.floor(n * 100) / 100; }

export function getEffectiveUnitPrice(basePrice: number, quantity: number): number {
  if (quantity >= 10) return floorCents(basePrice * 0.90);
  if (quantity >= 5)  return floorCents(basePrice * 0.95);
  return basePrice;
}

export function getDiscountPercent(quantity: number): number {
  if (quantity >= 10) return 10;
  if (quantity >= 5)  return 5;
  return 0;
}

// How many more units until the next tier
export function unitsToNextTier(quantity: number): { units: number; nextDiscount: number } | null {
  if (quantity < 5)  return { units: 5 - quantity,  nextDiscount: 5  };
  if (quantity < 10) return { units: 10 - quantity, nextDiscount: 10 };
  return null; // already at best tier
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartCount: () => number;
  getCartTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('botanical-aid-cart');
    if (stored) {
      try { setItems(JSON.parse(stored)); } catch { /* ignore */ }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) localStorage.setItem('botanical-aid-cart', JSON.stringify(items));
  }, [items, isLoaded]);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.product.id !== productId));
      return;
    }
    setItems((prev) =>
      prev.map((i) => i.product.id === productId ? { ...i, quantity } : i)
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const getCartCount = useCallback(() =>
    items.reduce((sum, i) => sum + i.quantity, 0), [items]);

  const getCartTotal = useCallback(() =>
    items.reduce((sum, i) => {
      const unitPrice = getEffectiveUnitPrice(i.product.price, i.quantity);
      return sum + unitPrice * i.quantity;
    }, 0), [items]);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, getCartCount, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
