
"use client";

import type React from 'react';
import { useState } from 'react';
import { QrCodeForm, type QrCodeInputData } from '@/components/qr-code-form';
import { QrCodeDisplay, type QrCodeDisplayData } from '@/components/qr-code-display';
import { MountainIcon } from 'lucide-react';
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

      <main className="flex-grow container mx-auto px-4 py-8 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 w-full max-w-6xl mx-auto"> {/* Increased max-w for better layout */}
          <div>
            <QrCodeForm onSubmit={handleGenerateQr} isGenerating={isGenerating} />
          </div>
          <div className="md:sticky md:top-8 h-fit"> {/* Made preview sticky */}
            <QrCodeDisplay data={qrData} qrGenerated={qrGenerated} />
          </div>
        </div>
      </main>
    </div>
  );
}

    