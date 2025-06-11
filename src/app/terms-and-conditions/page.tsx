
"use client";

import type React from 'react';
import { useState, useEffect } from 'react';
import { MountainIcon, FileText } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import type { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'Terms and Conditions | QRCodeForge',
//   description: 'Read the Terms and Conditions for using QRCodeForge.',
// };

export default function TermsAndConditionsPage() {
  const [lastUpdatedDate, setLastUpdatedDate] = useState('');

  useEffect(() => {
    setLastUpdatedDate(new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
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
          <Card className="shadow-lg rounded-xl">
             <CardHeader className="pb-4">
               <div className="flex items-center gap-3 mb-1">
                <FileText className="h-7 w-7 text-accent" />
                <CardTitle className="text-2xl font-bold text-foreground">Terms and Conditions</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                Last updated: {lastUpdatedDate || new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground leading-relaxed text-base">
              <p>
                Please read these Terms and Conditions (&quot;Terms&quot;, &quot;Terms and Conditions&quot;) carefully before using the
                QRCodeForge website (the &quot;Service&quot;) operated by Jphabs Khalifa (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;).
              </p>
              <p>
                Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms.
                These Terms apply to all visitors, users, and others who access or use the Service.
              </p>
              <p>
                By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the
                terms then you may not access the Service.
              </p>
              
              <section>
                <h3 className="text-lg font-semibold mt-4 mb-2 text-card-foreground">1. Use of Service</h3>
                <p>
                  QRCodeForge provides a tool for generating QR codes. The Service is provided for your personal and
                  non-commercial use, or for internal business use, subject to these Terms.
                </p>
                <p>
                  You agree not to use the Service:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-5 mt-2">
                  <li>For any unlawful purpose or in violation of any applicable local, state, national, or international law.</li>
                  <li>To generate QR codes that link to or contain malicious software, phishing sites, hateful content, defamatory material, or illegal materials.</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others.</li>
                  <li>To attempt to gain unauthorized access to the Service, its servers, or its related systems or networks.</li>
                  <li>To disrupt or interfere with the security or performance of the Service.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold mt-4 mb-2 text-card-foreground">2. Intellectual Property</h3>
                <p>
                  The Service and its original content (excluding content encoded into QR codes by users), features, and functionality are and
                  will remain the exclusive property of Jphabs Khalifa and its licensors (if any). The Service is protected by copyright, trademark,
                  and other laws of both the [Your Country/Region, if applicable] and foreign countries. Our trademarks and trade dress may not be used in connection
                  with any product or service without the prior written consent of Jphabs Khalifa.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mt-4 mb-2 text-card-foreground">3. Disclaimer of Warranties</h3>
                <p>
                  The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. Your use of the Service is at your sole risk. The Service is provided without
                  warranties of any kind, whether express or implied, including, but not limited to, implied warranties of
                  merchantability, fitness for a particular purpose, non-infringement, or course of performance.
                </p>
                <p>
                  Jphabs Khalifa does not warrant that a) the Service will function uninterrupted, secure, or available at any particular time
                  or location; b) any errors or defects will be corrected; c) the Service is free of viruses or other harmful
                  components; or d) the results of using the Service will meet your requirements or expectations.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mt-4 mb-2 text-card-foreground">4. Limitation of Liability</h3>
                <p>
                  In no event shall Jphabs Khalifa, nor its directors, employees, partners, agents, suppliers, or affiliates (if any),
                  be liable for any indirect, incidental, special, consequential or punitive damages, including without
                  limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access
                  to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on
                  the Service; (iii) any content obtained from the Service (including content of QR codes generated by you or others); 
                  and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, 
                  tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, 
                  and even if a remedy set forth herein is found to have failed of its essential purpose.
                </p>
              </section>
              
              <section>
                <h3 className="text-lg font-semibold mt-4 mb-2 text-card-foreground">5. User Responsibility for QR Code Content</h3>
                <p>
                  You are solely responsible for the data and content you choose to encode into QR codes using our Service. This includes ensuring that
                  the content is lawful, does not infringe on any third-party rights, and is not malicious or harmful. We do not review,
                  endorse, or take responsibility for the content encoded by users. You agree to indemnify and hold harmless Jphabs Khalifa
                  from any claims arising out of or related to the content you encode in QR codes.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mt-4 mb-2 text-card-foreground">6. Termination</h3>
                <p>
                  We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever,
                  including without limitation if you breach the Terms. All provisions of the Terms which by their nature should survive
                  termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity,
                  and limitations of liability.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mt-4 mb-2 text-card-foreground">7. Governing Law</h3>
                <p>
                  These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction - e.g., "your country/state"], 
                  without regard to its conflict of law provisions. (Please update this placeholder with your actual jurisdiction if desired, or remove if not applicable for a personal project).
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mt-4 mb-2 text-card-foreground">8. Changes to Terms</h3>
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is
                  material we will try to provide at least 30 days&apos; notice prior to any new terms taking effect by posting the updated
                  Terms on this page. What constitutes a material change will be determined at our sole discretion.
                </p>
                <p>
                  By continuing to access or use our Service after those revisions become effective, you agree to be bound by the
                  revised terms. If you do not agree to the new terms, please stop using the Service.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mt-4 mb-2 text-card-foreground">9. Contact Us</h3>
                <p>
                  If you have any questions about these Terms, please{' '}
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
