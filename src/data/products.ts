import type { Product, ProductVariant } from '@/types/product';

function floorCents(n: number) { return Math.floor(n * 100) / 100; }

function makeVariants(name: string, basePrice: number): ProductVariant[] {
  const unit5  = floorCents(basePrice * 0.95);
  const unit10 = floorCents(basePrice * 0.90);
  return [
    {
      id: 'single',
      label: 'One-time purchase',
      quantity: 1,
      discountPercent: 0,
      unitPrice: basePrice,
      totalPrice: basePrice,
    },
    {
      id: 'bulk-5',
      label: `5 × ${name} (5% off)`,
      quantity: 5,
      discountPercent: 5,
      unitPrice: unit5,
      totalPrice: parseFloat((unit5 * 5).toFixed(2)),
    },
    {
      id: 'bulk-10',
      label: `10 × ${name} (10% off)`,
      quantity: 10,
      discountPercent: 10,
      unitPrice: unit10,
      totalPrice: parseFloat((unit10 * 10).toFixed(2)),
    },
  ];
}

export const products: Product[] = [
  // Mental Health Range
  {
    id: 'focus-and-clarity',
    slug: 'focus-and-clarity',
    name: 'Focus & Clarity',
    description: 'A unique blend of homeopathic remedies and natural oils, designed to enhance mental sharpness and concentration.',
    longDescription: 'Focus and Clarity Cream is a unique blend of homeopathic remedies and natural oils, designed to enhance mental sharpness and concentration. This product harnesses the power of nature to support cognitive function, helping you stay focused, productive, and mentally clear throughout the day.',
    price: 24.95,
    category: 'mental-health',
    image: 'https://botanicalaid.com.au/wp-content/uploads/2025/07/afcc2.jpg',
    ingredients: ['Lycopodium', 'Baryta Carbonica', 'Kali Phosphoricum', 'Lavender Floral Water', 'Sage Oil', 'Lemon Floral Water', 'Orange Floral Water'],
    usage: 'Apply small amounts to temples, chest, and wrists. Allow 20 minutes for absorption. Can reapply up to four times daily.',
    size: '30g tube',
    variants: makeVariants('Focus & Clarity Cream', 24.95),
  },
  {
    id: 'grief',
    slug: 'grief',
    name: 'Grief',
    description: 'A gentle, nurturing blend of natural oils and homeopathic remedies designed to provide comfort and emotional support during times of loss and sadness.',
    longDescription: 'Our Grief relief cream is a gentle, nurturing blend of natural oils and homeopathic remedies designed to provide comfort and emotional support during times of loss and sadness. This carefully formulated product combines traditional homeopathic principles with aromatherapy to create a soothing experience that supports emotional healing.',
    price: 24.95,
    category: 'mental-health',
    image: 'https://botanicalaid.com.au/wp-content/uploads/2025/07/gac2.jpg',
    ingredients: ['Ignatia Amara', 'Natrum Muriaticum', 'Neroli Oil', 'Ylang Ylang', 'Rose Oil'],
    usage: 'Apply a small amount to temples, chest, and wrists. Wait 20 minutes before reapplying. Use up to 4 times daily.',
    size: '30g tube',
    variants: makeVariants('Grief Cream', 24.95),
  },
  {
    id: 'mild-anxiety',
    slug: 'mild-anxiety',
    name: 'Mild Anxiety',
    description: 'A calming blend of homeopathic remedies and essential oils designed to help soothe everyday stress and mild anxiety naturally.',
    longDescription: 'Our Mild Anxiety relief cream harnesses the calming properties of nature to help manage everyday stress and mild anxiety. The combination of carefully selected homeopathic remedies and essential oils creates a deeply relaxing experience that promotes a sense of peace and tranquility.',
    price: 24.95,
    category: 'mental-health',
    image: 'https://botanicalaid.com.au/wp-content/uploads/2025/07/mac2.jpg',
    ingredients: ['Aconitum Napellus', 'Argentum Nitricum', 'Gelsemium', 'Lavender Essential Oil', 'Bergamot Essential Oil', 'Frankincense Essential Oil'],
    usage: 'Apply to wrists, temples, or chest as needed. Take slow, deep breaths to enhance the calming effect. Allow 20 minutes before reapplying.',
    size: '30g tube',
    variants: makeVariants('Mild Anxiety Cream', 24.95),
  },
  {
    id: 'mild-depression',
    slug: 'mild-depression',
    name: 'Mild Depression',
    description: 'An uplifting blend of homeopathic remedies and essential oils formulated to help brighten mood and support emotional well-being naturally.',
    longDescription: 'Our Mild Depression relief cream is crafted with mood-lifting essential oils and homeopathic remedies to help brighten your day naturally. This carefully formulated blend promotes emotional well-being and a positive outlook, supporting you through low periods with the power of nature.',
    price: 24.95,
    category: 'mental-health',
    image: 'https://botanicalaid.com.au/wp-content/uploads/2025/07/mdac2.jpg',
    ingredients: ['Aurum Metallicum', 'Sepia', 'Pulsatilla', 'Sweet Orange Essential Oil', 'Clary Sage Essential Oil', 'Geranium Essential Oil'],
    usage: 'Apply generously to pulse points. Use in the morning and throughout the day as desired. Allow 20 minutes before reapplying.',
    size: '30g tube',
    variants: makeVariants('Mild Depression Cream', 24.95),
  },

  // Post Treatment Skincare Range
  {
    id: 'post-cosmetic-cream',
    slug: 'post-cosmetic-cream',
    name: 'Post Cosmetic Cream',
    description: 'Specially formulated to aid the skin\'s natural recovery process after cosmetic procedures such as Botox, fillers, and laser treatments.',
    longDescription: 'Our Post Cosmetic Cream is specially formulated to aid the skin\'s natural recovery process following cosmetic procedures. Enriched with homeopathic remedies and natural botanical ingredients, this gentle cream helps soothe irritation, reduce redness and swelling, and promote healthy skin recovery after treatments like Botox, dermal fillers, laser therapy, and chemical peels.',
    price: 24.95,
    category: 'post-treatment',
    image: 'https://botanicalaid.com.au/wp-content/uploads/2025/07/Post_Cosmetic_Cream_Mockup-300x300.jpg',
    ingredients: ['Arnica Montana', 'Calendula', 'Aloe Vera', 'Vitamin E', 'Chamomile Extract', 'Shea Butter'],
    usage: 'Apply gently to treated areas twice daily or as directed by your practitioner. Avoid direct sunlight on treated areas.',
    size: '30g tube',
    variants: makeVariants('Post Cosmetic Cream', 24.95),
  },
  {
    id: 'post-lip-filler-balm',
    slug: 'post-lip-filler-balm',
    name: 'Post Lip Filler Balm',
    description: 'A healing lip balm specifically designed for post lip filler care, providing nourishment and supporting the natural healing process.',
    longDescription: 'Our Post Lip Filler Balm is perfect for post-lip treatment recovery and daily nourishment. Specially formulated with healing natural ingredients, this balm provides intense hydration while supporting the natural healing process after lip filler procedures. Helps reduce swelling, stinging, and discomfort.',
    price: 6.95,
    category: 'post-treatment',
    image: 'https://botanicalaid.com.au/wp-content/uploads/2025/07/Post_Cosmetic_Lip_Balm_Mockup-300x300.jpg',
    ingredients: ['Arnica Montana', 'Manuka Honey', 'Beeswax', 'Vitamin E', 'Coconut Oil', 'Calendula Extract'],
    usage: 'Apply liberally to lips as needed. Especially recommended immediately after and in the days following lip filler procedures.',
    size: '10g',
    variants: makeVariants('Post Lip Filler Balm', 6.95),
  },
  {
    id: 'post-surgery-care-cream',
    slug: 'post-surgery-care-cream',
    name: 'Post Surgery Care Cream',
    description: 'An intensive recovery cream designed to support healing after surgical procedures, helping to reduce scarring, bruising, and inflammation.',
    longDescription: 'Our Post Surgery Care Cream is our most advanced post-treatment formulation, designed to support the body\'s natural healing process following surgical procedures. This intensive cream combines powerful homeopathic remedies with botanical extracts to help reduce scarring, bruising, swelling, and inflammation while promoting healthy tissue regeneration.',
    price: 49.95,
    category: 'post-treatment',
    image: 'https://botanicalaid.com.au/wp-content/uploads/2025/07/post_surgery_mockup_large_bottle_1.jpg',
    ingredients: ['Arnica Montana', 'Calendula', 'Hypericum', 'Centella Asiatica', 'Rosehip Oil', 'Vitamin E'],
    usage: 'Apply a thin layer to clean skin around the surgical area twice daily. Do not apply to open wounds or stitches. Wait until initial healing is complete.',
    size: '50ml tube',
    variants: makeVariants('Post Surgery Care Cream', 49.95),
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return products.filter((p) => p.category === category);
}
