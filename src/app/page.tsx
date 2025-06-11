
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
        <section className="py-16 md:py-24 lg:py-32 bg-background text-center overflow-hidden">
          <div className="container mx-auto px-4 relative"> {/* Added relative positioning and overflow-hidden */}
            {/* Doodle 1: Star-like element */}
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute top-[-20px] left-[10%] md:top-0 md:left-[15%] text-foreground opacity-30 transform rotate-[15deg] hidden lg:block"
              aria-hidden="true"
            >
              <path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.4l-6.4 4.8 2.4-7.2L2 9.2h7.6L12 2z" />
            </svg>

            {/* Doodle 2: Amorphous Blob */}
            <svg
              width="60"
              height="50"
              viewBox="0 0 60 50"
              fill="currentColor"
              className="absolute top-[0px] right-[8%] md:top-[10px] md:right-[12%] text-primary opacity-20 transform rotate-[-10deg] hidden md:block"
              aria-hidden="true"
            >
              <path d="M53.1,3.1C46.5-1.6,36.9-0.7,30.1,5.8C23.3,12.3,20.5,22.6,20.2,30.5C19.9,38.4,22.1,46,28.2,50C34.3,54,42.7,53.1,49.2,48.1C55.7,43.1,59.7,34.5,58.5,26.5C57.3,18.5,59.7,7.7,53.1,3.1Z" />
            </svg>

            {/* Doodle 3: Comma-like strokes */}
            <svg
              width="35"
              height="30"
              viewBox="0 0 35 30"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="absolute bottom-[100px] left-[15%] md:bottom-[80px] md:left-[20%] text-foreground opacity-25 transform rotate-[25deg] hidden md:block"
              aria-hidden="true"
            >
              <path d="M5 25 Q 15 28, 18 18" />
              <path d="M15 28 Q 25 25, 28 15" />
            </svg>
            
            {/* Doodle 4: Curly Arrow/Swirl */}
             <svg 
                width="45" 
                height="45" 
                viewBox="0 0 50 50" 
                fill="none" 
                className="absolute bottom-[20px] right-[10%] md:bottom-[40px] md:right-[18%] text-accent opacity-40 transform rotate-[-30deg] hidden sm:block" 
                aria-hidden="true"
              >
                <path d="M10 40 Q10 10, 30 10 Q40 10, 40 20 Q40 30, 30 30 Q20 30, 20 40 Q20 50, 10 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M35 8 L30 10 L32 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            {/* Doodle 5: Abstract QR Fragment */}
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              className="absolute top-[30%] left-[5%] md:top-[25%] md:left-[8%] text-accent opacity-25 transform rotate-[10deg] hidden lg:block"
              aria-hidden="true"
            >
              <rect x="5" y="5" width="8" height="8" rx="1" fill="currentColor"/>
              <rect x="17" y="5" width="8" height="8" rx="1" fill="currentColor"/>
              <rect x="5" y="17" width="8" height="8" rx="1" fill="currentColor"/>
              <rect x="17" y="17" width="8" height="8" rx="1" fill="currentColor" opacity="0.6"/>
            </svg>

            {/* Doodle 6: Stylized Data Brackets/Fragment */}
            <svg
              width="45"
              height="30"
              viewBox="0 0 45 30"
              fill="none"
              className="absolute bottom-[15%] right-[5%] md:bottom-[20%] md:right-[10%] text-foreground opacity-15 transform rotate-[5deg] hidden md:block"
              aria-hidden="true"
            >
              <path d="M5 15 L15 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M5 15 L15 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <rect x="18" y="13" width="10" height="4" rx="1" fill="currentColor" opacity="0.7"/>
              <path d="M40 15 L30 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M40 15 L30 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tight text-primary mb-6 relative z-10">
              Forge Your Perfect QR Code
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 relative z-10">
              Effortlessly create, customize, and download QR codes for your text, URLs, or files. Free, fast, and entirely in your browser.
            </p>
            
            <div className="relative z-10">
              <Link href="/generator" passHref>
                <Button size="lg" className="shadow-md hover:shadow-lg transition-shadow">
                  Create Your QR Code Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
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
