
"use client";

import type React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MountainIcon, ArrowRight, Type, Palette, Download } from 'lucide-react';

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

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 md:py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
              How QRCodeForge Works
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="p-4 bg-primary/10 rounded-full mb-4 inline-flex items-center justify-center ring-8 ring-primary/5">
                  <Type className="h-10 w-10 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-card-foreground">1. Input Your Data</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Simply type your text, paste a URL, or upload common file types like .txt (for content) or .pdf (for filename).
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="p-4 bg-primary/10 rounded-full mb-4 inline-flex items-center justify-center ring-8 ring-primary/5">
                  <Palette className="h-10 w-10 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-card-foreground">2. Customize & Preview</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Personalize your QR code with custom colors, add your brand logo, and adjust technical settings. See live updates in the preview panel.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="p-4 bg-primary/10 rounded-full mb-4 inline-flex items-center justify-center ring-8 ring-primary/5">
                  <Download className="h-10 w-10 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-card-foreground">3. Download & Share</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Instantly download your high-quality QR code as a PNG or SVG file, or copy it directly to your clipboard, ready for use anywhere.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
