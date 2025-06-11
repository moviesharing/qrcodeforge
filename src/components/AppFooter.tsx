
"use client";

import type React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Coffee } from 'lucide-react'; 

export function AppFooter() {
  return (
    <footer className="py-8 px-4 md:px-6 border-t mt-auto bg-card text-card-foreground">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} QRCodeForge by Jphabs Khalifa.
            </p>
            <p className="text-xs text-muted-foreground">
              All rights reserved. Vibe Coding in progress!
            </p>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end items-center gap-x-4 gap-y-2 text-sm">
            <Link href="/about" className="hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-primary transition-colors">
              Terms
            </Link>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="hover:bg-accent hover:text-accent-foreground"
              title="Support QRCodeForge via PayPal"
            >
              <Link href="https://www.paypal.com/ncp/payment/E684ESAKGVUF4" target="_blank" rel="noopener noreferrer">
                <Coffee className="mr-2 h-4 w-4" />
                Support Us
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </footer>
  );
}

