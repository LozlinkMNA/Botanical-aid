import type { Metadata } from 'next';
import { Inter, DM_Sans } from 'next/font/google';
import { Toaster } from 'sonner';
import { CartProvider } from '@/contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Botanical Aid | Natural Wellness Products',
    template: '%s | Botanical Aid',
  },
  description:
    'Discover Botanical Aid\'s range of natural wellness products including mental health balms and post-treatment skincare. Pure, botanical formulations for holistic healing.',
  keywords: [
    'natural wellness',
    'botanical skincare',
    'mental health balm',
    'post-treatment skincare',
    'essential oils',
    'holistic healing',
  ],
  openGraph: {
    title: 'Botanical Aid | Natural Wellness Products',
    description:
      'Pure, botanical formulations for holistic healing. Mental health balms and post-treatment skincare.',
    siteName: 'Botanical Aid',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased">
        <CartProvider>
          <Header />
          {/* top-9 = topbar (36px), + nav (72px) = 108px total */}
          <main className="min-h-screen pt-[108px]">{children}</main>
          <Footer />
          <Toaster position="bottom-right" richColors />
        </CartProvider>
      </body>
    </html>
  );
}
