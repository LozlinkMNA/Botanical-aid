export interface Testimonial {
  name: string;
  rating: number;
  quote: string;
  product?: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Sarah M.',
    rating: 5,
    quote:
      'The Focus & Clarity Balm has been a game-changer for my work-from-home days. I feel so much more productive and centred.',
    product: 'Focus & Clarity Balm',
  },
  {
    name: 'James T.',
    rating: 5,
    quote:
      'After losing my father, the Grief Support Balm brought me genuine comfort during the hardest weeks. The lavender scent is beautiful.',
    product: 'Grief Support Balm',
  },
  {
    name: 'Dr. Emily Chen',
    rating: 5,
    quote:
      'I recommend Botanical Aid\'s Post Treatment Recovery Cream to all my patients after facial procedures. The results speak for themselves.',
    product: 'Post Treatment Recovery Cream',
  },
  {
    name: 'Rachel K.',
    rating: 4,
    quote:
      'The Mild Anxiety Balm is now part of my daily routine. I apply it before meditation and it really helps me settle into a calm state.',
    product: 'Mild Anxiety Balm',
  },
  {
    name: 'Tom B.',
    rating: 5,
    quote:
      'Bought the Recovery Lip Balm after getting lip fillers. It made such a difference to the healing process. Will absolutely repurchase.',
    product: 'Recovery Lip Balm',
  },
  {
    name: 'Linda W.',
    rating: 5,
    quote:
      'Beautiful products, beautiful packaging, and they actually work. The Premium Recovery Cream is worth every cent.',
    product: 'Premium Recovery Cream',
  },
  {
    name: 'Michael P.',
    rating: 4,
    quote:
      'I was skeptical about natural balms but the Mild Depression Balm genuinely lifts my mood. The sweet orange scent is lovely.',
    product: 'Mild Depression Balm',
  },
  {
    name: 'Nurse Amy S.',
    rating: 5,
    quote:
      'We stock Botanical Aid products in our cosmetic clinic. Patients love the Soothing Repair Cream for post-procedure care.',
    product: 'Soothing Repair Cream',
  },
  {
    name: 'Jessica L.',
    rating: 5,
    quote:
      'Finally, a wellness brand that uses real botanical ingredients. You can smell and feel the quality difference.',
  },
];

export const faqSections = [
  {
    category: 'Mental Health Balms',
    items: [
      {
        question: 'How do the mental health balms work?',
        answer:
          'Our mental health balms use aromatherapy principles combined with traditional herbal remedies. The essential oils are absorbed through the skin and inhaled, working together to support emotional wellbeing. Each balm is formulated with specific oils known for their therapeutic properties.',
      },
      {
        question: 'Are the balms a substitute for professional mental health treatment?',
        answer:
          'No, our balms are designed as complementary wellness products and are not intended to replace professional medical advice, diagnosis, or treatment. If you are experiencing mental health concerns, please consult a qualified healthcare professional.',
      },
      {
        question: 'How often should I use the balms?',
        answer:
          'You can use our balms as often as needed throughout the day. Most customers apply them 2-3 times daily to pulse points such as wrists, temples, and behind the ears for best results.',
      },
      {
        question: 'Are the balms safe for sensitive skin?',
        answer:
          'Our balms are made with natural ingredients and are generally suitable for most skin types. However, we recommend doing a small patch test before first use, especially if you have sensitive skin or known allergies to essential oils.',
      },
    ],
  },
  {
    category: 'Post Treatment Skincare',
    items: [
      {
        question: 'When can I start using the recovery creams after a procedure?',
        answer:
          'This depends on your specific procedure. Generally, our recovery creams can be used 24-48 hours post-procedure, but we always recommend following your practitioner\'s specific aftercare instructions.',
      },
      {
        question: 'Can I use the creams with other skincare products?',
        answer:
          'Yes, our recovery creams are designed to be gentle and compatible with most skincare routines. Apply the recovery cream first, then layer other products on top. Avoid using active ingredients like retinol or AHA/BHA on treated areas during the recovery period.',
      },
      {
        question: 'What makes the Premium Recovery Cream different?',
        answer:
          'Our Premium Recovery Cream features an advanced formulation with peptide complexes, botanical stem cells, and cutting-edge active ingredients like bakuchiol and squalane. It provides the most intensive recovery support in our range.',
      },
    ],
  },
  {
    category: 'Orders & Shipping',
    items: [
      {
        question: 'Do you offer free shipping?',
        answer:
          'Yes! We offer free standard shipping on all orders over $99 AUD within Australia. Orders under $99 have a flat rate shipping fee of $9.95.',
      },
      {
        question: 'How long does delivery take?',
        answer:
          'Standard delivery within Australia typically takes 3-7 business days. Express delivery options are available at checkout for 1-3 business day delivery.',
      },
      {
        question: 'Can I return a product?',
        answer:
          'Yes, we offer a 30-day return policy for unopened and unused products in their original packaging. For hygiene reasons, we cannot accept returns on opened products unless they are faulty.',
      },
    ],
  },
  {
    category: 'Safety & Usage',
    items: [
      {
        question: 'Are your products tested on animals?',
        answer:
          'Absolutely not. Botanical Aid is proudly cruelty-free. We never test our products on animals and we only use suppliers who share our commitment to ethical practices.',
      },
      {
        question: 'Are the products safe during pregnancy?',
        answer:
          'Some essential oils used in our products may not be suitable during pregnancy or breastfeeding. We recommend consulting your healthcare provider before using any new skincare or wellness products during this time.',
      },
      {
        question: 'What is the shelf life of your products?',
        answer:
          'Our products have a shelf life of 12 months from the date of manufacture when stored in a cool, dry place away from direct sunlight. Each product has a best-before date printed on the packaging.',
      },
    ],
  },
];
