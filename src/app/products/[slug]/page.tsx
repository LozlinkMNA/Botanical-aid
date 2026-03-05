import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { products, getProductBySlug, getProductsByCategory } from '@/data/products';
import ProductDetail from './ProductDetail';
import ProductCard from '@/components/ProductCard';
import PostTreatmentBundleBanner from '@/components/PostTreatmentBundleBanner';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Product Not Found' };

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const relatedProducts = getProductsByCategory(product.category).filter(
    (p) => p.id !== product.id,
  );

  return (
    <div className="container mx-auto px-4 lg:px-6 py-12">
      <ProductDetail product={product} />

      {product.category === 'post-treatment' && (
        <div className="mt-10">
          <PostTreatmentBundleBanner />
        </div>
      )}

      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
