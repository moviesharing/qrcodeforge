
"use client";

import type React from 'react';
import { useRef, useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Download, Copy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';


export interface QrCodeDisplayData {
  value: string;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  margin: number;
  fgColor: string;
  bgColor: string;
  logoImage?: string; // Data URL of the logo
}

interface QrCodeDisplayProps {
  data: QrCodeDisplayData | null;
  qrGenerated: boolean;
}

export function QrCodeDisplay({ data, qrGenerated }: QrCodeDisplayProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [animated, setAnimated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (qrGenerated) {
      setAnimated(true);
      const timer = setTimeout(() => setAnimated(false), 500); 
      return () => clearTimeout(timer);
    }
  }, [qrGenerated]);

  const downloadQrCode = (format: 'svg' | 'png') => {
    if (!data || !svgRef.current) {
      toast({ title: "Error", description: "No QR code to download.", variant: "destructive"});
      return;
    }

    const fileName = `qrcodeforge_qr.${format}`;
    const link = document.createElement('a');

    if (format === 'svg') {
      const svgString = new XMLSerializer().serializeToString(svgRef.current);
      const blob = new Blob([svgString], { type: 'image/svg+xml' });
      link.href = URL.createObjectURL(blob);
    } else if (format === 'png') {
      const svgString = new XMLSerializer().serializeToString(svgRef.current);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        toast({ title: "Error", description: "Could not create image for download.", variant: "destructive"});
        return;
      }

      const img = document.createElement('img');
      img.onload = () => {
        // Determine canvas size based on SVG natural dimensions or a fixed size for consistency
        const desiredSize = Math.max(img.width, img.height, 256); // Ensure minimum size
        canvas.width = desiredSize;
        canvas.height = desiredSize;
        
        // Fill background if needed (SVG background might be transparent)
        ctx.fillStyle = data.bgColor || '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw the SVG image onto the canvas
        // Calculate aspect ratio to fit image within canvas without distortion
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.min(hRatio, vRatio);
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;

        ctx.drawImage(img, 0, 0, img.width, img.height,
                      centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);

        link.href = canvas.toDataURL('image/png');
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(link.href);
        toast({ title: "Success", description: `QR code downloaded as ${fileName}.`});
      };
      img.onerror = () => {
        toast({ title: "Error", description: "Failed to load QR code image for PNG conversion.", variant: "destructive"});
      };
      // Use btoa for binary string to base64
      const svgDataUrl = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));
      img.src = svgDataUrl;
      return; 
    }

    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
    if (format === 'svg') {
       toast({ title: "Success", description: `QR code downloaded as ${fileName}.`});
    }
  };

  const copyQrCodeAsPng = async () => {
    if (!data || !svgRef.current) {
      toast({ title: "Error", description: "No QR code to copy.", variant: "destructive"});
      return;
    }
    if (!navigator.clipboard || !navigator.clipboard.write) {
      toast({ title: "Error", description: "Clipboard API not available or not permitted.", variant: "destructive"});
      return;
    }

    const svgString = new XMLSerializer().serializeToString(svgRef.current);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
     if (!ctx) {
      toast({ title: "Error", description: "Could not create image for copying.", variant: "destructive"});
      return;
    }

    const img = document.createElement('img');
    img.onload = () => {
      const desiredSize = Math.max(img.width, img.height, 256);
      canvas.width = desiredSize;
      canvas.height = desiredSize;
      ctx.fillStyle = data.bgColor || '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.min(hRatio, vRatio);
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;
      ctx.drawImage(img, 0, 0, img.width, img.height,
                    centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);

      canvas.toBlob(async (blob) => {
        if (blob) {
          try {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob })
            ]);
            toast({ title: "Success", description: "QR code copied to clipboard as PNG." });
          } catch (err) {
            console.error("Failed to copy image:", err);
            toast({ title: "Error", description: "Failed to copy QR code. Check browser permissions.", variant: "destructive" });
          }
        } else {
          toast({ title: "Error", description: "Failed to create image blob for copying.", variant: "destructive" });
        }
      }, 'image/png');
    };
    img.onerror = () => {
      toast({ title: "Error", description: "Failed to load QR code image for copying.", variant: "destructive"});
    };
    const svgDataUrl = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));
    img.src = svgDataUrl;
  };
  
  const qrSize = 256; 
  const logoSize = qrSize * 0.25; // Logo will be 25% of QR code size

  return (
    <Card className={`transition-all duration-300 ease-out ${animated ? 'animate-fade-in-scale-up' : ''} sticky top-8`}>
      <CardHeader>
        <CardTitle className="font-headline">Preview & Download</CardTitle>
        <CardDescription>Your generated QR code will appear below.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6">
        <div
          className="p-4 bg-white rounded-lg shadow-md inline-block"
          style={{ 
            minHeight: `${qrSize + 32}px`, 
            minWidth: `${qrSize + 32}px`,
            backgroundColor: data?.bgColor || '#ffffff' // Ensure preview div bg matches QR bg
          }}
          aria-live="polite"
        >
          {data && data.value ? (
            <QRCodeSVG
              value={data.value}
              size={qrSize}
              level={data.errorCorrectionLevel}
              fgColor={data.fgColor}
              bgColor={data.bgColor}
              includeMargin={data.margin > 0} // qrcode.react uses includeMargin, not marginSize
              // marginSize={data.margin} // This prop caused warnings, using includeMargin and manual padding on parent instead
              imageSettings={data.logoImage ? {
                src: data.logoImage,
                height: logoSize,
                width: logoSize,
                excavate: true,
                x: undefined, // defaults to center
                y: undefined, // defaults to center
              } : undefined}
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
          <div className="flex flex-col space-y-2 w-full">
            <div className="flex space-x-2 w-full">
              <Button onClick={() => downloadQrCode('png')} className="flex-1" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                PNG
              </Button>
              <Button onClick={() => downloadQrCode('svg')} className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                SVG
              </Button>
            </div>
            <Button onClick={copyQrCodeAsPng} className="w-full" variant="secondary">
              <Copy className="mr-2 h-4 w-4" />
              Copy PNG
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

    