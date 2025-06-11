
"use client";

import type React from 'react';
import { useState } from 'react';
import { QrCodeForm, type QrCodeInputData } from '@/components/qr-code-form';
import { QrCodeDisplay, type QrCodeDisplayData } from '@/components/qr-code-display';
import { Button } from '@/components/ui/button';
import { MountainIcon, ArrowDown } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";


export default function QRCodeForgePage() {
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

  const scrollToGenerator = () => {
    const generatorSection = document.getElementById('qr-generator-section');
    if (generatorSection) {
      generatorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
            <Button size="lg" onClick={scrollToGenerator} className="shadow-md hover:shadow-lg transition-shadow">
              Create Your QR Code Now
              <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

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
              <div className="md:sticky md:top-8 h-fit">
                <QrCodeDisplay data={qrData} qrGenerated={qrGenerated} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
