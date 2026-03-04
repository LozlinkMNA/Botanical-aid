export interface ProductVariant {
  id: string;
  label: string;
  quantity: number;
  discountPercent: number;
  unitPrice: number;   // price per unit after discount
  totalPrice: number;  // quantity × unitPrice
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  category: 'mental-health' | 'post-treatment';
  image: string;
  ingredients: string[];
  usage: string;
  size: string;
  variants: ProductVariant[];
}
