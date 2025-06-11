
"use client";

import type React from 'react';
import { MountainIcon, Smile } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import type { Metadata } from 'next'; // Metadata needs to be handled in page.tsx or layout.tsx for server components, or via hooks/document for client ones.

// export const metadata: Metadata = { 
//   title: 'About QRCodeForge | Jphabs Khalifa',
//   description: 'Learn more about QRCodeForge and its creator, Jphabs Khalifa.',
// };


export default function AboutPage() {
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
              <div className="flex items-center gap-3">
                <Smile className="h-7 w-7 text-accent" />
                <CardTitle className="text-2xl font-bold text-foreground">About QRCodeForge</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground leading-relaxed text-base">
              <p className="text-lg">
                Hey there! I&apos;m <strong className="text-card-foreground font-semibold">Jphabs Khalifa</strong>, the creator of QRCodeForge.
              </p>
              <p>
                I wouldn&apos;t call myself a code expert, but I&apos;m definitely a <strong className="text-card-foreground font-semibold">Vibe Coder</strong>!
                I love tinkering with technology, building cool things, and most importantly, sharing my projects with the world. Hehe.
              </p>
              <p>
                QRCodeForge started as a simple idea: to create an easy-to-use, straightforward QR code generator that just works,
                without any fuss. Whether you need to share a URL, some text, or even the name of a file, I hope this tool
                makes your life a little bit easier.
              </p>
              <p>
                This project is a labor of love, and like all my projects, it&apos;s a way for me to learn, experiment, and hopefully
                provide something useful (or at least fun!) to others.
              </p>
              <p>
                Thanks for stopping by and checking out QRCodeForge. Your Vibe Coding journey inspires mine!
              </p>
              <p className="font-medium text-card-foreground">
                Happy QR coding!
              </p>
              <p className="mt-6 pt-4 border-t border-border text-sm">
                - Jphabs Khalifa
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
