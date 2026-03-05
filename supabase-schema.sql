-- Botanical Aid Database Schema
-- Run this in your Supabase SQL editor

-- Products table
create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text not null,
  long_description text not null default '',
  price numeric(10,2) not null,
  category text not null check (category in ('mental-health', 'post-treatment')),
  image_url text,
  ingredients jsonb not null default '[]',
  usage_instructions text not null default '',
  size text not null default '',
  stock integer not null default 0,
  is_active boolean not null default true,
  symptoms text[] not null default '{}',
  disclaimer text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Product variants (bulk packs, sizes)
create table public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  name text not null,
  price numeric(10,2) not null,
  compare_at_price numeric(10,2),
  discount_label text,
  stock integer not null default 0,
  sort_order integer not null default 0,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

-- Orders table
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  stripe_payment_intent_id text unique not null,
  customer_email text not null,
  customer_name text not null,
  customer_phone text,
  shipping_address text not null,
  shipping_city text not null,
  shipping_state text not null,
  shipping_postcode text not null,
  subtotal numeric(10,2) not null,
  shipping_cost numeric(10,2) not null default 0,
  total numeric(10,2) not null,
  status text not null default 'pending' check (status in ('pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Order items table
create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id),
  variant_id uuid references public.product_variants(id),
  product_name text not null,
  variant_name text,
  quantity integer not null,
  unit_price numeric(10,2) not null,
  created_at timestamptz not null default now()
);

-- Indexes
create index idx_products_category on public.products(category);
create index idx_products_slug on public.products(slug);
create index idx_products_active on public.products(is_active);
create index idx_product_variants_product on public.product_variants(product_id);
create index idx_orders_status on public.orders(status);
create index idx_orders_email on public.orders(customer_email);
create index idx_orders_number on public.orders(order_number);
create index idx_order_items_order on public.order_items(order_id);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger products_updated_at before update on public.products
  for each row execute function update_updated_at();

create trigger orders_updated_at before update on public.orders
  for each row execute function update_updated_at();

-- Generate order number
create or replace function generate_order_number()
returns trigger as $$
begin
  new.order_number = 'BA-' || to_char(now(), 'YYYYMMDD') || '-' || lpad(floor(random() * 10000)::text, 4, '0');
  return new;
end;
$$ language plpgsql;

create trigger orders_generate_number before insert on public.orders
  for each row execute function generate_order_number();

-- Decrement stock on order paid
create or replace function decrement_stock_on_order()
returns trigger as $$
begin
  if new.status = 'paid' and old.status = 'pending' then
    update public.product_variants pv
    set stock = pv.stock - oi.quantity
    from public.order_items oi
    where oi.order_id = new.id
      and oi.variant_id = pv.id
      and pv.stock >= oi.quantity;

    -- Also decrement product-level stock for items without variant
    update public.products p
    set stock = p.stock - oi.quantity
    from public.order_items oi
    where oi.order_id = new.id
      and oi.variant_id is null
      and oi.product_id = p.id
      and p.stock >= oi.quantity;
  end if;
  return new;
end;
$$ language plpgsql;

create trigger orders_decrement_stock after update on public.orders
  for each row execute function decrement_stock_on_order();

-- =============================================================================
-- SEED DATA - Exact products from botanicalaid.com.au
-- Mental Health Range
-- =============================================================================

insert into public.products (slug, name, description, long_description, price, category, ingredients, usage_instructions, size, stock, symptoms, disclaimer) values
(
  'focus-and-clarity',
  'Focus & Clarity',
  'A unique blend of homeopathic remedies and natural oils, designed to enhance mental sharpness and concentration.',
  'Focus and Clarity Cream is a unique blend of homeopathic remedies and natural oils, designed to enhance mental sharpness and concentration. This product harnesses the power of nature to support cognitive function, helping you stay focused, productive, and mentally clear throughout the day.',
  24.95,
  'mental-health',
  '[{"type":"homeopathic","name":"Lycopodium","description":"Supports mental clarity, reduces cognitive fatigue, enhances confidence"},{"type":"homeopathic","name":"Baryta Carbonica","description":"Addresses mental fog and forgetfulness, promotes emotional balance"},{"type":"homeopathic","name":"Kali Phosphoricum","description":"Enhances memory and concentration, reduces nervous tension"},{"type":"oil","name":"Lavender Floral Water","description":"Calming, stress reduction"},{"type":"oil","name":"Sage Oil","description":"Stimulates focus, rich in antioxidants"},{"type":"oil","name":"Lemon Floral Water","description":"Uplifting citrus aroma, cognitive support"},{"type":"oil","name":"Orange Floral Water","description":"Reduces anxiety, boosts mood"}]',
  'Apply small amounts to temples, chest, and wrists. Allow 20 minutes for absorption. Can reapply up to four times daily. Consult healthcare providers if symptoms persist.',
  '30g bottle',
  200,
  '{"Mental: forgetfulness, inability to complete tasks, loss of concentration","Behavioral: procrastination, impulsiveness, task avoidance","Physical: fatigue, restlessness, inability to sit still","Emotional: frustration, irritability, feeling overwhelmed"}',
  'This product complements but does not replace prescribed medications or professional mental health treatment. External use only. Avoid eyes and open wounds.'
),
(
  'grief',
  'Grief',
  'A gentle, nurturing blend of natural oils and homeopathic remedies designed to provide comfort and emotional support during times of loss and sadness.',
  'Our Grief relief cream is a gentle, nurturing blend of natural oils and homeopathic remedies designed to provide comfort and emotional support during times of loss and sadness. This carefully formulated product combines traditional homeopathic principles with aromatherapy to create a soothing experience that supports emotional healing.',
  24.95,
  'mental-health',
  '[{"type":"homeopathic","name":"Ignatia Amara","description":"Supports emotional healing during grief and loss"},{"type":"homeopathic","name":"Natrum Muriaticum","description":"Eases heartbreak, suppressed emotions, fatigue, and headaches"},{"type":"oil","name":"Neroli Oil","description":"Reduces sadness and anxiety, lowers stress hormones"},{"type":"oil","name":"Ylang Ylang","description":"Balances emotions and promotes peace"},{"type":"oil","name":"Rose Oil","description":"Soothes the heart and encourages emotional resilience"}]',
  'Apply a small amount to temples, chest, and wrists. Wait 20 minutes before reapplying. Use up to 4 times daily.',
  '30g bottle',
  200,
  '{"Emotional: deep sadness, emptiness, anger, guilt","Physical: fatigue, sleep disturbances, appetite changes","Mental: difficulty concentrating, confusion, disbelief","Behavioral: social withdrawal, restlessness, crying"}',
  'This product complements but does not replace prescribed medications or professional mental health treatment. External use only.'
),
(
  'mild-anxiety',
  'Mild Anxiety',
  'A calming blend of homeopathic remedies and essential oils designed to help soothe everyday stress and mild anxiety naturally.',
  'Our Mild Anxiety relief cream harnesses the calming properties of nature to help manage everyday stress and mild anxiety. The combination of carefully selected homeopathic remedies and essential oils creates a deeply relaxing experience that promotes a sense of peace and tranquility.',
  24.95,
  'mental-health',
  '[{"type":"homeopathic","name":"Aconitum Napellus","description":"Addresses sudden anxiety, panic, and restlessness"},{"type":"homeopathic","name":"Argentum Nitricum","description":"Helps with anticipatory anxiety and nervous agitation"},{"type":"homeopathic","name":"Gelsemium","description":"Relieves anxiety-related weakness, trembling, and apprehension"},{"type":"oil","name":"Lavender Essential Oil","description":"Calming, reduces stress and anxiety"},{"type":"oil","name":"Bergamot Essential Oil","description":"Uplifting, reduces nervous tension"},{"type":"oil","name":"Frankincense Essential Oil","description":"Grounding, promotes deep relaxation"}]',
  'Apply to wrists, temples, or chest as needed. Take slow, deep breaths to enhance the calming effect. Allow 20 minutes before reapplying. Use up to 4 times daily.',
  '30g bottle',
  200,
  '{"Mental: racing thoughts, excessive worry, difficulty concentrating","Physical: muscle tension, rapid heartbeat, shallow breathing","Emotional: irritability, restlessness, sense of dread","Behavioral: avoidance, difficulty sleeping, nervous habits"}',
  'This product complements but does not replace prescribed medications or professional mental health treatment. External use only.'
),
(
  'mild-depression',
  'Mild Depression',
  'An uplifting blend of homeopathic remedies and essential oils formulated to help brighten mood and support emotional well-being naturally.',
  'Our Mild Depression relief cream is crafted with mood-lifting essential oils and homeopathic remedies to help brighten your day naturally. This carefully formulated blend promotes emotional well-being and a positive outlook, supporting you through low periods with the power of nature.',
  24.95,
  'mental-health',
  '[{"type":"homeopathic","name":"Aurum Metallicum","description":"Addresses feelings of hopelessness and emotional heaviness"},{"type":"homeopathic","name":"Sepia","description":"Helps with emotional flatness, fatigue, and withdrawal"},{"type":"homeopathic","name":"Pulsatilla","description":"Supports emotional sensitivity and mood fluctuations"},{"type":"oil","name":"Sweet Orange Essential Oil","description":"Uplifting, boosts mood and energy"},{"type":"oil","name":"Clary Sage Essential Oil","description":"Balances hormones, reduces tension"},{"type":"oil","name":"Geranium Essential Oil","description":"Stabilizes emotions, promotes positivity"}]',
  'Apply generously to pulse points. Use in the morning and throughout the day as desired. Allow 20 minutes before reapplying. Use up to 4 times daily.',
  '30g bottle',
  200,
  '{"Emotional: persistent sadness, loss of interest, hopelessness","Physical: fatigue, changes in appetite, sleep disturbances","Mental: difficulty concentrating, indecisiveness","Behavioral: social withdrawal, reduced activity, loss of motivation"}',
  'This product complements but does not replace prescribed medications or professional mental health treatment. External use only.'
);

-- Post Treatment Skincare Range
insert into public.products (slug, name, description, long_description, price, category, ingredients, usage_instructions, size, stock, disclaimer) values
(
  'post-cosmetic-cream',
  'Post Cosmetic Cream',
  'Specially formulated to aid the skin''s natural recovery process after cosmetic procedures such as Botox, fillers, and laser treatments.',
  'Our Post Cosmetic Cream is specially formulated to aid the skin''s natural recovery process following cosmetic procedures. Enriched with homeopathic remedies and natural botanical ingredients, this gentle cream helps soothe irritation, reduce redness and swelling, and promote healthy skin recovery after treatments like Botox, dermal fillers, laser therapy, and chemical peels.',
  24.95,
  'post-treatment',
  '[{"type":"homeopathic","name":"Arnica Montana","description":"Reduces bruising, swelling, and soreness"},{"type":"homeopathic","name":"Calendula","description":"Promotes wound healing and soothes inflammation"},{"type":"botanical","name":"Aloe Vera","description":"Hydrates and soothes irritated skin"},{"type":"botanical","name":"Vitamin E","description":"Antioxidant protection, supports skin repair"},{"type":"botanical","name":"Chamomile Extract","description":"Anti-inflammatory, calms redness"},{"type":"base","name":"Hydrating Body Custard","description":"Shea butter, almond oil, cocoa butter base"}]',
  'Apply gently to treated areas twice daily or as directed by your practitioner. Avoid direct sunlight on treated areas. Do not use on open wounds.',
  '30g bottle',
  150,
  'For external use only. Consult your practitioner before use. Perform a patch test before first use on sensitive skin.'
),
(
  'post-lip-filler-balm',
  'Post Lip Filler Balm',
  'A healing lip balm specifically designed for post lip filler care, providing nourishment and supporting the natural healing process.',
  'Our Post Lip Filler Balm is perfect for post-lip treatment recovery and daily nourishment. Specially formulated with healing natural ingredients, this balm provides intense hydration while supporting the natural healing process after lip filler procedures. Helps reduce swelling, stinging, and discomfort.',
  6.95,
  'post-treatment',
  '[{"type":"homeopathic","name":"Arnica Montana","description":"Reduces bruising and swelling"},{"type":"botanical","name":"Manuka Honey","description":"Natural antibacterial, promotes healing"},{"type":"botanical","name":"Beeswax","description":"Creates protective barrier, locks in moisture"},{"type":"botanical","name":"Vitamin E","description":"Antioxidant, supports skin repair"},{"type":"botanical","name":"Coconut Oil","description":"Deep hydration and nourishment"},{"type":"botanical","name":"Calendula Extract","description":"Soothes and calms inflammation"}]',
  'Apply liberally to lips as needed. Especially recommended immediately after and in the days following lip filler procedures. Reapply throughout the day.',
  '10g',
  300,
  'For external use only. If irritation occurs, discontinue use and consult your practitioner.'
),
(
  'post-surgery-care-cream',
  'Post Surgery Care Cream',
  'An intensive recovery cream designed to support healing after surgical procedures, helping to reduce scarring, bruising, and inflammation.',
  'Our Post Surgery Care Cream is our most advanced post-treatment formulation, designed to support the body''s natural healing process following surgical procedures. This intensive cream combines powerful homeopathic remedies with botanical extracts to help reduce scarring, bruising, swelling, and inflammation while promoting healthy tissue regeneration.',
  49.95,
  'post-treatment',
  '[{"type":"homeopathic","name":"Arnica Montana","description":"Powerful bruise and swelling reducer"},{"type":"homeopathic","name":"Calendula","description":"Promotes wound healing, prevents infection"},{"type":"homeopathic","name":"Hypericum","description":"Supports nerve repair and pain relief"},{"type":"botanical","name":"Centella Asiatica","description":"Stimulates collagen production, reduces scarring"},{"type":"botanical","name":"Rosehip Oil","description":"Rich in vitamins A and C, promotes skin regeneration"},{"type":"botanical","name":"Vitamin E","description":"Powerful antioxidant, supports tissue repair"},{"type":"base","name":"Intensive Healing Base","description":"Shea butter, cocoa butter, macadamia oil"}]',
  'Apply a thin layer to clean skin around the surgical area twice daily, or as directed by your surgeon. Do not apply to open wounds or stitches. Wait until initial healing is complete before use.',
  '50ml bottle',
  100,
  'For external use only. Always consult your surgeon before using any products on or near surgical sites. Do not use on open wounds.'
);

-- Product Variants - Bulk discount packs

-- Focus & Clarity variants
insert into public.product_variants (product_id, name, price, compare_at_price, discount_label, stock, sort_order, is_default)
select id, 'Single Bottle', 24.95, null::numeric, null::text, 200, 0, true from public.products where slug = 'focus-and-clarity'
union all
select id, '5 x Bottles', 118.51, 124.75, '5% off', 40, 1, false from public.products where slug = 'focus-and-clarity'
union all
select id, '10 x Bottles', 224.55, 249.50, '10% off', 20, 2, false from public.products where slug = 'focus-and-clarity';

-- Grief variants
insert into public.product_variants (product_id, name, price, compare_at_price, discount_label, stock, sort_order, is_default)
select id, 'Single Bottle', 24.95, null::numeric, null::text, 200, 0, true from public.products where slug = 'grief'
union all
select id, '5 x Bottles', 118.51, 124.75, '5% off', 40, 1, false from public.products where slug = 'grief'
union all
select id, '10 x Bottles', 224.55, 249.50, '10% off', 20, 2, false from public.products where slug = 'grief';

-- Mild Anxiety variants
insert into public.product_variants (product_id, name, price, compare_at_price, discount_label, stock, sort_order, is_default)
select id, 'Single Bottle', 24.95, null::numeric, null::text, 200, 0, true from public.products where slug = 'mild-anxiety'
union all
select id, '5 x Bottles', 118.51, 124.75, '5% off', 40, 1, false from public.products where slug = 'mild-anxiety'
union all
select id, '10 x Bottles', 224.55, 249.50, '10% off', 20, 2, false from public.products where slug = 'mild-anxiety';

-- Mild Depression variants
insert into public.product_variants (product_id, name, price, compare_at_price, discount_label, stock, sort_order, is_default)
select id, 'Single Bottle', 24.95, null::numeric, null::text, 200, 0, true from public.products where slug = 'mild-depression'
union all
select id, '5 x Bottles', 118.51, 124.75, '5% off', 40, 1, false from public.products where slug = 'mild-depression'
union all
select id, '10 x Bottles', 224.55, 249.50, '10% off', 20, 2, false from public.products where slug = 'mild-depression';

-- Post Cosmetic Cream variants (different sizes)
insert into public.product_variants (product_id, name, price, compare_at_price, discount_label, stock, sort_order, is_default)
select id, '30g Bottle', 24.95, null::numeric, null::text, 150, 0, true from public.products where slug = 'post-cosmetic-cream'
union all
select id, '50ml Tub', 49.95, null::numeric, null::text, 75, 1, false from public.products where slug = 'post-cosmetic-cream';

-- Post Lip Filler Balm variants
insert into public.product_variants (product_id, name, price, compare_at_price, discount_label, stock, sort_order, is_default)
select id, 'Single Balm', 6.95, null::numeric, null::text, 300, 0, true from public.products where slug = 'post-lip-filler-balm'
union all
select id, '3 x Balms', 18.77, 20.85, '10% off', 100, 1, false from public.products where slug = 'post-lip-filler-balm';

-- Post Surgery Care Cream variants
insert into public.product_variants (product_id, name, price, compare_at_price, discount_label, stock, sort_order, is_default)
select id, '50ml Bottle', 49.95, null::numeric, null::text, 100, 0, true from public.products where slug = 'post-surgery-care-cream'
union all
select id, '100ml Bottle', 69.95, null::numeric, null::text, 50, 1, false from public.products where slug = 'post-surgery-care-cream';

-- Enable RLS
alter table public.products enable row level security;
alter table public.product_variants enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Public read access for products and variants
create policy "Products are viewable by everyone" on public.products
  for select using (is_active = true);

create policy "Product variants are viewable by everyone" on public.product_variants
  for select using (true);

-- Orders managed via service role key only (no anon access)
create policy "Orders are not publicly accessible" on public.orders
  for select using (false);

create policy "Order items are not publicly accessible" on public.order_items
  for select using (false);
