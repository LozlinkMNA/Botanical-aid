import type { Metadata } from 'next';
import FAQAccordion from '@/components/FAQAccordion';
import { faqSections } from '@/data/testimonials';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Find answers to common questions about Botanical Aid products, shipping, usage, and safety.',
};

export default function FAQPage() {
  return (
    <div>
      <PageHero
        title="FAQs"
        imageUrl="/assets/hero-shop.png"
      />
      <div className="container mx-auto px-4 lg:px-6 py-12">
        <div className="text-center mb-12">
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Everything you need to know about our products, ordering, and usage.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <FAQAccordion sections={faqSections} />
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Still have questions? We&apos;d love to help.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
