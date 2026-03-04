import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import ContactForm from './ContactForm';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    "Get in touch with Botanical Aid. We'd love to hear from you about our natural wellness products.",
};

export default function ContactPage() {
  return (
    <div>
      <PageHero
        title="Contact us"
        imageUrl="https://botanicalaid.com.au/wp-content/uploads/2025/06/iStock-1437842817-Wirestock-scaled.jpg"
      />
      <div className="container mx-auto px-4 lg:px-6 py-12">
        <div className="text-center mb-12">
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Have a question or need help? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">
                Get in Touch
              </h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Phone</p>
                    <a
                      href="tel:1300895132"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      1300 895 132
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <a
                      href="mailto:hello@botanicalaid.com.au"
                      className="text-muted-foreground hover:text-primary transition-colors break-all"
                    >
                      hello@botanicalaid.com.au
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Address</p>
                    <p className="text-muted-foreground">
                      Sydney, NSW
                      <br />
                      Australia
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Business Hours</p>
                    <p className="text-muted-foreground">
                      Mon - Fri: 9am - 5pm AEST
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
