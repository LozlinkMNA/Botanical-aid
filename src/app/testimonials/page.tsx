import type { Metadata } from 'next';
import TestimonialCard from '@/components/TestimonialCard';
import { testimonials } from '@/data/testimonials';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Testimonials',
  description:
    'Read real reviews from Botanical Aid customers about our natural wellness products.',
};

export default function TestimonialsPage() {
  return (
    <div>
      <PageHero
        title="Testimonials"
        imageUrl="/assets/hero-testimonials.jpg"
      />
      <div className="container mx-auto px-4 lg:px-6 py-12">
        <div className="text-center mb-12">
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Real experiences from real people who have discovered the benefits of
            Botanical Aid products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} />
          ))}
        </div>
      </div>
    </div>
  );
}
