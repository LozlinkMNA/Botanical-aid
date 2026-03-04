import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: '#1a3a8f' }}>
      <div className="container mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo + description */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              {/* White version of logo — use a text+icon fallback styled to match */}
              <div className="flex flex-col items-start">
                <svg width="60" height="60" viewBox="0 0 100 100" className="mb-2" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path d="M50 10 C50 10 30 25 30 45 C30 58 38 68 50 72 C62 68 70 58 70 45 C70 25 50 10 50 10Z" opacity="0.9"/>
                    <path d="M50 30 L50 72" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                    <path d="M50 45 C50 45 36 38 28 28" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                    <path d="M50 50 C50 50 64 43 72 33" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                    <circle cx="50" cy="82" r="4" opacity="0.7"/>
                    <circle cx="44" cy="90" r="3" opacity="0.5"/>
                    <circle cx="56" cy="90" r="3" opacity="0.5"/>
                  </g>
                </svg>
                <span className="text-white font-bold text-xl tracking-wide" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
                  Botanical Aid
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm tracking-wide">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Home', href: '/' },
                { label: 'Products', href: '/products' },
                { label: 'FAQs', href: '/faq' },
                { label: 'Testimonials', href: '/testimonials' },
                { label: 'About Us', href: '/about' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-white/70 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm tracking-wide">Information</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Contact Us', href: '/contact' },
                { label: 'Terms Of Conditions', href: '/terms' },
                { label: 'Our Privacy Policy', href: '/privacy' },
                { label: 'Our Returns Policy', href: '/returns' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-white/70 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm tracking-wide">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 mt-0.5 text-white/60 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span className="text-white/70">Bella Vista, NSW 2153</span>
              </li>
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 mt-0.5 text-white/60 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <a href="mailto:info@botanicalaid.com.au" className="text-white/70 hover:text-white transition-colors text-xs">
                  info@botanicalaid.com.au
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 mt-0.5 text-white/60 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <a href="tel:1300895132" className="text-white/70 hover:text-white transition-colors">1300 895 132</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
        <div className="container mx-auto px-4 lg:px-6 py-4 flex flex-col md:flex-row items-center justify-between text-xs text-white/50 gap-1">
          <p>Copyright &copy; {year} <span className="font-semibold text-white/70">Victoria Rabbah</span> All Rights Reserved.</p>
          <p>Botanical Aid | Natural Wellness Products</p>
        </div>
      </div>
    </footer>
  );
}
