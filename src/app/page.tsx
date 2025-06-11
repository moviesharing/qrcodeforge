
"use client";

import type React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MountainIcon, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh_-_var(--footer-height,0px))]">
      <header className="py-6 px-4 md:px-6">
        <div className="container mx-auto flex items-center gap-2">
          <MountainIcon className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold font-headline tracking-tight text-primary">
            QRCodeForge
          </h1>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 lg:py-32 bg-background text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tight text-primary mb-6">
              Forge Your Perfect QR Code
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Effortlessly create, customize, and download QR codes for your text, URLs, or files. Free, fast, and entirely in your browser.
            </p>
            <Link href="/generator" passHref>
              <Button size="lg" className="shadow-md hover:shadow-lg transition-shadow">
                Create Your QR Code Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
