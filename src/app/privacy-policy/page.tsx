
"use client";

import type React from 'react';
import { useState, useEffect } from 'react';
import { MountainIcon, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'Privacy Policy | QRCodeForge',
//   description: 'Learn about how QRCodeForge handles your data and privacy.',
// };

export default function PrivacyPolicyPage() {
  const [lastUpdatedDate, setLastUpdatedDate] = useState('');

  useEffect(() => {
    setLastUpdatedDate(new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  return (
    <div className="flex flex-col">
      <header className="py-6 px-4 md:px-6 border-b sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <MountainIcon className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold font-headline tracking-tight text-primary">
              QRCodeForge
            </h1>
          </Link>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="pb-4">
               <div className="flex items-center gap-3 mb-2">
                <ShieldCheck className="h-8 w-8 text-accent" />
                <CardTitle className="text-3xl font-bold text-foreground">Privacy Policy</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                Last updated: {lastUpdatedDate || new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Welcome to QRCodeForge! We are committed to protecting your privacy. This Privacy Policy explains how we handle
                your information when you use our website.
              </p>
              
              <section>
                <h3 className="text-xl font-semibold mt-2 mb-2 text-card-foreground">1. Information We Do Not Collect</h3>
                <p>
                  QRCodeForge is designed with your privacy as a priority. Our core functionality—generating QR codes—operates entirely
                  within your web browser on your local device.
                </p>
                <ul className="list-disc list-inside space-y-1 pl-5 mt-2">
                  <li>
                    <strong>No Data Storage of QR Content:</strong> We do not store, save, or transmit any data you enter into the QR code
                    generator. This includes text, URLs, or file content (for .txt files, we encode the content; for .pdf files, we encode the filename).
                    All QR code generation processing happens client-side, on your computer or device.
                  </li>
                  <li>
                    <strong>No Personal Information Tracking for Core Use:</strong> We do not require you to create an account or provide any
                    personally identifiable information to use the primary features of QRCodeForge.
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mt-2 mb-2 text-card-foreground">2. Information We May Collect (Through Cookies)</h3>
                <p>
                  To enhance your experience and improve our website, we may use cookies. Cookies are small text files stored on your device.
                </p>
                <ul className="list-disc list-inside space-y-1 pl-5 mt-2">
                  <li>
                    <strong>Essential Cookies:</strong> These are necessary for the website to function properly. For example, we use a cookie
                    to remember your cookie consent preferences. Without this, you might be asked for consent on every page.
                  </li>
                  <li>
                    <strong>Analytics Cookies (If Implemented and Consented):</strong> We might, in the future, use analytics tools (e.g., a privacy-friendly alternative to Google Analytics) to
                    collect anonymous, aggregated data about how visitors use our site. This would help us understand user behavior (e.g., popular features, areas for improvement)
                    and improve QRCodeForge. This data would not personally identify you, and its collection would depend on your explicit consent via our cookie banner.
                  </li>
                </ul>
                <p className="mt-2">
                  You can manage your cookie preferences through our cookie consent banner or your browser settings.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mt-2 mb-2 text-card-foreground">3. How We Use Information</h3>
                 <ul className="list-disc list-inside space-y-1 pl-5 mt-2">
                    <li><strong>Cookie Consent Data:</strong> To remember your choices regarding cookie usage.</li>
                    <li><strong>Aggregated Analytics Data (if applicable):</strong> To understand website traffic, user engagement, and to improve the functionality and user experience of QRCodeForge.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mt-2 mb-2 text-card-foreground">4. Third-Party Links</h3>
                <p>
                  Our website may contain links to other websites (e.g., in the contact section if we link to GitHub). We are not responsible for the privacy practices of these
                  third-party sites. We encourage you to read their privacy policies when you visit them.
                </p>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold mt-2 mb-2 text-card-foreground">5. Data Security</h3>
                <p>
                  Since we do not collect or store the data you input for QR code generation, the security of that data primarily relies on your own device and browser security.
                  For any data we might handle (like cookie preferences), we take reasonable steps to protect it, but no internet transmission is 100% secure.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mt-2 mb-2 text-card-foreground">6. Children&apos;s Privacy</h3>
                <p>
                  QRCodeForge is not intended for use by children under the age of 13 (or the relevant age in your jurisdiction). We do not knowingly collect
                  any personal information from children.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mt-2 mb-2 text-card-foreground">7. Changes to This Privacy Policy</h3>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new
                  Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mt-2 mb-2 text-card-foreground">8. Contact Us</h3>
                <p>
                  If you have any questions about this Privacy Policy, please{' '}
                  <Link href="/contact" className="underline hover:text-primary font-medium">contact us</Link>.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
