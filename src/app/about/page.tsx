import type { Metadata } from 'next';
import { Leaf, Heart, ShieldCheck, Recycle } from 'lucide-react';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Botanical Aid - our story, mission, and commitment to natural wellness through botanical formulations.',
};

const values = [
  {
    icon: Leaf,
    title: 'Natural Ingredients',
    description:
      'Every product is crafted from carefully sourced botanical ingredients, ensuring purity and potency in every application.',
  },
  {
    icon: Heart,
    title: 'Holistic Approach',
    description:
      'We address wellness from a whole-person perspective, supporting both mental health and physical recovery through nature.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Assurance',
    description:
      'Rigorous testing and quality control ensure every product meets our high standards for safety and effectiveness.',
  },
  {
    icon: Recycle,
    title: 'Sustainable Practices',
    description:
      'We are committed to eco-friendly packaging, ethical sourcing, and minimising our environmental footprint.',
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <PageHero
        title="About Us"
        imageUrl="https://botanicalaid.com.au/wp-content/uploads/2025/10/8441e90f182ccc825cebd6253b9dd5ff.jpg"
      />

      {/* Our Story */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-6 max-w-3xl">
          <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Botanical Aid was born from a deeply personal journey. After
              witnessing the transformative power of natural remedies firsthand,
              our founder set out to create a range of products that could bring
              the same benefits to others.
            </p>
            <p>
              Working with herbalists, aromatherapists, and skincare
              specialists, we developed formulations that combine centuries of
              botanical wisdom with modern science. The result is a range of
              products that are both effective and gentle.
            </p>
            <p>
              Today, Botanical Aid offers two carefully curated ranges: our
              Mental Health Range, featuring aromatherapeutic balms to support
              emotional wellbeing, and our Post Treatment Skincare Range,
              providing gentle recovery care for skin after cosmetic procedures.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-6 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            To empower people to take control of their wellness journey through
            pure, botanical products that harness the healing power of nature. We
            believe that everyone deserves access to natural, effective wellness
            solutions that support both mind and body.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="flex gap-4">
                  <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-accent flex items-center justify-center">
                    <Icon className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Ready to Start Your Wellness Journey?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Explore our range of natural wellness products and discover the
            healing power of botanical ingredients.
          </p>
          <a
            href="/products"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            Shop Now
          </a>
        </div>
      </section>
    </div>
  );
}
