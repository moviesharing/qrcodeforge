
"use client";

import type React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Cookie } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'qrcodeforge_cookie_consent_given';

export function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const consentGiven = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!consentGiven) {
        // Delay showing the banner slightly to avoid layout shifts on load
        const timer = setTimeout(() => setIsVisible(true), 500);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleAccept = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    }
    setIsVisible(false);
    // You could trigger analytics initialization here if needed
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6 transform transition-transform duration-500 ease-out animate-slide-in-from-bottom">
      <Card className="max-w-2xl mx-auto shadow-2xl border-border bg-popover text-popover-foreground">
        <CardHeader className="pb-4">
          <div className="flex items-start sm:items-center gap-3 flex-col sm:flex-row">
            <Cookie className="h-8 w-8 sm:h-7 sm:w-7 text-primary flex-shrink-0" />
            <div>
              <CardTitle className="text-lg font-semibold">We Value Your Privacy</CardTitle>
              <CardDescription className="mt-1 text-sm">
                This website uses cookies to enhance your experience and ensure basic functionalities.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="py-0">
          <p className="text-sm">
            We use essential cookies for features like remembering your consent. By clicking &quot;Accept&quot;, you agree to our approach. 
            For more details, please see our{' '}
            <Link href="/privacy-policy" className="underline hover:text-primary font-medium">
              Privacy Policy
            </Link>.
          </p>
        </CardContent>
        <CardFooter className="pt-4 flex flex-col sm:flex-row gap-2 sm:justify-end">
          <Button onClick={handleAccept} className="w-full sm:w-auto" size="sm">Accept</Button>
        </CardFooter>
      </Card>
      <style jsx global>{`
        @keyframes slide-in-from-bottom {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-in-from-bottom {
          animation: slide-in-from-bottom 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
