
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AppFooter } from '@/components/AppFooter';
import { CookieConsentBanner } from '@/components/CookieConsentBanner';

export const metadata: Metadata = {
  title: 'QRCodeForge',
  description: 'Generate QR codes from text, URLs, or files.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <div className="flex-grow">
          {children}
        </div>
        <AppFooter />
        <CookieConsentBanner />
        <Toaster />
      </body>
    </html>
  );
}
