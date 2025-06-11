
"use client";

import type React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Send } from 'lucide-react'; // Changed from Coffee to a more generic icon or remove

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
            <form 
              action="https://www.paypal.com/cgi-bin/webscr" 
              method="post" 
              target="_blank" 
              className="inline-flex items-center gap-2"
            >
              <input type="hidden" name="cmd" value="_xclick" />
              <input type="hidden" name="business" value="akosijphabs@gmail.com" />
              <input type="hidden" name="item_name" value="Support for QRCodeForge" />
              <input type="hidden" name="currency_code" value="USD" />
              <input type="hidden" name="no_shipping" value="1" />
              <Label htmlFor="supportAmountPayPal" className="sr-only">Amount (USD)</Label>
              <Input
                type="number"
                name="amount"
                id="supportAmountPayPal"
                placeholder="USD"
                min="0.01"
                step="0.01"
                required
                className="h-9 w-20 px-2 py-1 text-sm bg-background border-input rounded-md focus:ring-primary focus:border-primary"
                aria-label="Support amount in USD"
              />
              <Button
                type="submit"
                variant="outline"
                size="sm"
                className="hover:bg-accent hover:text-accent-foreground"
                title="Support QRCodeForge via PayPal"
              >
                Support Us
              </Button>
            </form>
          </nav>
        </div>
      </div>
    </footer>
  );
}
