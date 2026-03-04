export interface Ingredient {
  type: 'homeopathic' | 'oil' | 'botanical' | 'base';
  name: string;
  description: string;
}

type OrderStatus = 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';

export interface Database {
  public: {
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
    Tables: {
      products: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string;
          long_description: string;
          price: number;
          category: 'mental-health' | 'post-treatment';
          image_url: string | null;
          ingredients: Ingredient[];
          usage_instructions: string;
          size: string;
          stock: number;
          is_active: boolean;
          symptoms: string[];
          disclaimer: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          slug: string;
          name: string;
          description: string;
          long_description: string;
          price: number;
          category: 'mental-health' | 'post-treatment';
          image_url?: string | null;
          ingredients?: Ingredient[];
          usage_instructions?: string;
          size?: string;
          stock?: number;
          is_active?: boolean;
          symptoms?: string[];
          disclaimer?: string | null;
        };
        Update: Partial<Database['public']['Tables']['products']['Insert']>;
        Relationships: [];
      };
      product_variants: {
        Row: {
          id: string;
          product_id: string;
          name: string;
          price: number;
          compare_at_price: number | null;
          discount_label: string | null;
          stock: number;
          sort_order: number;
          is_default: boolean;
          created_at: string;
        };
        Insert: {
          product_id: string;
          name: string;
          price: number;
          compare_at_price?: number | null;
          discount_label?: string | null;
          stock?: number;
          sort_order?: number;
          is_default?: boolean;
        };
        Update: Partial<Database['public']['Tables']['product_variants']['Insert']>;
        Relationships: [];
      };
      orders: {
        Row: {
          id: string;
          order_number: string;
          stripe_payment_intent_id: string;
          customer_email: string;
          customer_name: string;
          customer_phone: string | null;
          shipping_address: string;
          shipping_city: string;
          shipping_state: string;
          shipping_postcode: string;
          subtotal: number;
          shipping_cost: number;
          total: number;
          status: OrderStatus;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          stripe_payment_intent_id: string;
          customer_email: string;
          customer_name: string;
          customer_phone?: string | null;
          shipping_address: string;
          shipping_city: string;
          shipping_state: string;
          shipping_postcode: string;
          subtotal: number;
          shipping_cost?: number;
          total: number;
          status?: OrderStatus;
          notes?: string | null;
        };
        Update: Partial<Database['public']['Tables']['orders']['Insert']>;
        Relationships: [];
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          variant_id: string | null;
          product_name: string;
          variant_name: string | null;
          quantity: number;
          unit_price: number;
          created_at: string;
        };
        Insert: {
          order_id: string;
          product_id: string;
          variant_id?: string | null;
          product_name: string;
          variant_name?: string | null;
          quantity: number;
          unit_price: number;
        };
        Update: Partial<Database['public']['Tables']['order_items']['Insert']>;
        Relationships: [];
      };
    };
  };
}

export type ProductRow = Database['public']['Tables']['products']['Row'];
export type ProductVariantRow = Database['public']['Tables']['product_variants']['Row'];
export type OrderRow = Database['public']['Tables']['orders']['Row'];
export type OrderItemRow = Database['public']['Tables']['order_items']['Row'];

export interface ProductWithVariants extends ProductRow {
  product_variants: ProductVariantRow[];
}
