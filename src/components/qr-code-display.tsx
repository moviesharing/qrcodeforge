
"use client";

import type React from 'react';
import { useRef, useEffect, useState } from 'react';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';

export interface QrCodeDisplayData {
  value: string;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  margin: number;
}

interface QrCodeDisplayProps {
  data: QrCodeDisplayData | null;
  qrGenerated: boolean;
}

export function QrCodeDisplay({ data, qrGenerated }: QrCodeDisplayProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (qrGenerated) {
      setAnimated(true);
      const timer = setTimeout(() => setAnimated(false), 500); // Duration of animation
      return () => clearTimeout(timer);
    }
  }, [qrGenerated]);

  const downloadQrCode = (format: 'svg' | 'png') => {
    if (!data) return;

    const fileName = `qrcode.${format}`;
    const link = document.createElement('a');

    if (format === 'svg') {
      if (svgRef.current) {
        const svgString = new XMLSerializer().serializeToString(svgRef.current);
        const blob = new Blob([svgString], { type: 'image/svg+xml' });
        link.href = URL.createObjectURL(blob);
      } else {
        // Fallback or error
        return;
      }
    } else if (format === 'png') {
      const canvas = document.createElement('canvas');
      // Temporarily render QRCodeCanvas to get data URL
      const tempDiv = document.createElement('div');
      tempDiv.style.display = 'none';
      document.body.appendChild(tempDiv);
      
      const qrCanvasElement = document.createElement('canvas');
      tempDiv.appendChild(qrCanvasElement);

      // Need to render QRCodeCanvas component to this element
      // This is tricky as QRCodeCanvas is a React component.
      // A simpler way: use the SVG, draw it to canvas.
      if (svgRef.current) {
        const svgString = new XMLSerializer().serializeToString(svgRef.current);
        const svgUrl = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));
        
        const img = document.createElement('img');
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            link.href = canvas.toDataURL('image/png');
            link.download = fileName;
            link.click();
            URL.revokeObjectURL(link.href);
          }
          document.body.removeChild(tempDiv);
        };
        img.onerror = () => {
          document.body.removeChild(tempDiv);
        }
        img.src = svgUrl;
        return; // Return early as img.onload is async
      } else {
        document.body.removeChild(tempDiv);
        return;
      }
    }

    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
  };
  
  const qrSize = 256;

  return (
    <Card className={`transition-all duration-300 ease-out ${animated ? 'animate-fade-in-scale-up' : ''}`}>
      <CardHeader>
        <CardTitle className="font-headline">Preview & Download</CardTitle>
        <CardDescription>Your generated QR code will appear below.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6">
        <div
          className="p-4 bg-white rounded-lg shadow-md inline-block"
          style={{ minHeight: `${qrSize + 32}px`, minWidth: `${qrSize + 32}px` }}
          aria-live="polite"
        >
          {data && data.value ? (
            <QRCodeSVG
              value={data.value}
              size={qrSize}
              level={data.errorCorrectionLevel}
              // marginSize={data.margin} // Removed to prevent console warning due to a bug in qrcode.react v3.1.0
              bgColor="#ffffff"
              fgColor="#000000"
              ref={svgRef} 
              className="rounded"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center text-muted-foreground" style={{ height: `${qrSize}px`, width: `${qrSize}px` }}>
              <Image src="https://placehold.co/128x128.png" alt="QR Code Placeholder" width={128} height={128} data-ai-hint="qr code" className="mb-2 opacity-50 rounded" />
              <p>Generate a QR code to see it here.</p>
            </div>
          )}
        </div>

        {data && data.value && (
          <div className="flex space-x-4 w-full">
            <Button onClick={() => downloadQrCode('png')} className="flex-1" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download PNG
            </Button>
            <Button onClick={() => downloadQrCode('svg')} className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Download SVG
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
