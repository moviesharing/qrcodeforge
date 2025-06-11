
"use client";

import type React from 'react';
import { useState } from 'react';
import { QrCodeForm, type QrCodeInputData } from '@/components/qr-code-form';
import { QrCodeDisplay, type QrCodeDisplayData } from '@/components/qr-code-display';
import { MountainIcon } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';

export default function QRCodeGeneratorPage() {
  const [qrData, setQrData] = useState<QrCodeDisplayData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrGenerated, setQrGenerated] = useState(false);
  const { toast } = useToast();

  const handleGenerateQr = (data: QrCodeInputData) => {
    setIsGenerating(true);
    setQrGenerated(false); 

    // Simulate generation delay
    setTimeout(() => {
      setQrData({
        value: data.value,
        errorCorrectionLevel: data.errorCorrectionLevel,
        margin: data.margin,
        fgColor: data.fgColor,
        bgColor: data.bgColor,
        logoImage: data.logoImage,
      });
      setIsGenerating(false);
      setQrGenerated(true); 
      toast({
        title: "QR Code Generated!",
        description: "Your QR code is ready in the preview panel.",
      });
    }, 200); 
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh_-_var(--footer-height,0px))]">
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

      <main className="flex-grow">
        {/* QR Code Generator Section */}
        <section id="qr-generator-section" className="py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              Let's Get Started
            </h3>
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 w-full max-w-6xl mx-auto">
              <div>
                <QrCodeForm onSubmit={handleGenerateQr} isGenerating={isGenerating} />
              </div>
              <div className="md:sticky md:top-8 h-fit"> {/* Adjusted top for sticky header */}
                <QrCodeDisplay data={qrData} qrGenerated={qrGenerated} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
