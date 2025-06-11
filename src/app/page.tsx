"use client";

import type React from 'react';
import { useState } from 'react';
import { QrCodeForm, type QrCodeInputData } from '@/components/qr-code-form';
import { QrCodeDisplay, type QrCodeDisplayData } from '@/components/qr-code-display';
import { MountainIcon } from 'lucide-react';

export default function QRCodeForgePage() {
  const [qrData, setQrData] = useState<QrCodeDisplayData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrGenerated, setQrGenerated] = useState(false);

  const handleGenerateQr = (data: QrCodeInputData) => {
    setIsGenerating(true);
    setQrGenerated(false); // Reset animation trigger

    // Simulate generation delay for visual feedback if needed
    setTimeout(() => {
      setQrData({
        value: data.value,
        errorCorrectionLevel: data.errorCorrectionLevel,
        margin: data.margin,
      });
      setIsGenerating(false);
      setQrGenerated(true); // Trigger animation
    }, 200); 
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-6 px-4 md:px-6">
        <div className="container mx-auto flex items-center gap-2">
          <MountainIcon className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold font-headline tracking-tight text-primary">
            QRCodeForge
          </h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto">
          <div>
            <QrCodeForm onSubmit={handleGenerateQr} isGenerating={isGenerating} />
          </div>
          <div className="md:sticky md:top-8 h-fit"> {/* Sticky for desktop preview */}
            <QrCodeDisplay data={qrData} qrGenerated={qrGenerated} />
          </div>
        </div>
      </main>

      <footer className="py-6 px-4 md:px-6 border-t">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} QRCodeForge. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
