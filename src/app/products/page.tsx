import type { Metadata } from 'next';
import { products, getProductsByCategory } from '@/data/products';
import type { Product } from '@/types/product';
import ProductCard from '@/components/ProductCard';
import ProductFilter from './ProductFilter';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Browse Botanical Aid\'s full range of natural wellness products including mental health balms and post-treatment skincare.',
};

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>;
}

const categoryLabels: Record<string, string> = {
  'mental-health': 'Mental Health Range',
  'post-treatment': 'Post Treatment Skincare',
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category } = await searchParams;

  let filteredProducts: Product[];
  let pageTitle: string;

  if (category === 'mental-health' || category === 'post-treatment') {
    filteredProducts = getProductsByCategory(category);
    pageTitle = categoryLabels[category];
  } else {
    filteredProducts = products;
    pageTitle = 'All Products';
  }

  return (
    <div>
      <PageHero
        title="Shop"
        imageUrl="https://botanicalaid.com.au/wp-content/uploads/2025/06/iStock-1284076556-Steven-Granville.png"
      />
    <div className="container mx-auto px-4 lg:px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-foreground">{pageTitle}</h1>
        <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
          {category
            ? `Explore our ${categoryLabels[category]?.toLowerCase() ?? 'products'}.`
            : 'Explore our full range of natural wellness products.'}
        </p>
      </div>

      <ProductFilter currentCategory={category} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No products found in this category.</p>
        </div>
      )}
    </div>
    </div>
  );
}
