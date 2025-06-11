
"use client";

import type React from 'react';
import { useRef, useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Download, Copy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import Image from 'next/image'; // No longer needed for placeholder
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

const DEFAULT_QR_VALUE = 'https://qrcodeforge.pages.dev';
const DEFAULT_FG_COLOR = '#000000';
const DEFAULT_BG_COLOR = '#ffffff';
const DEFAULT_ERROR_CORRECTION = 'M';
const DEFAULT_MARGIN = 1; // qrcode.react default margin with includeMargin=true

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

  const getQrProps = () => {
    if (data && data.value) {
      return {
        value: data.value,
        level: data.errorCorrectionLevel,
        fgColor: data.fgColor,
        bgColor: data.bgColor,
        includeMargin: data.margin > 0,
        imageSettings: data.logoImage ? {
          src: data.logoImage,
          height: logoSize,
          width: logoSize,
          excavate: true,
          x: undefined, 
          y: undefined,
        } : undefined,
      };
    }
    return { // Default placeholder QR
      value: DEFAULT_QR_VALUE,
      level: DEFAULT_ERROR_CORRECTION,
      fgColor: DEFAULT_FG_COLOR,
      bgColor: DEFAULT_BG_COLOR,
      includeMargin: DEFAULT_MARGIN > 0,
      imageSettings: undefined,
    };
  };

  const currentBgColor = (data && data.value) ? data.bgColor : DEFAULT_BG_COLOR;

  const downloadQrCode = (format: 'svg' | 'png') => {
    if (!svgRef.current) {
      toast({ title: "Error", description: "No QR code to download.", variant: "destructive"});
      return;
    }
    // Use current QR props for download, whether it's user-generated or the default
    const qrPropsForDownload = getQrProps();


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
        const desiredSize = Math.max(img.width, img.height, 256); 
        canvas.width = desiredSize;
        canvas.height = desiredSize;
        
        ctx.fillStyle = qrPropsForDownload.bgColor || '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
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
    if (!svgRef.current) {
      toast({ title: "Error", description: "No QR code to copy.", variant: "destructive"});
      return;
    }
    if (!navigator.clipboard || !navigator.clipboard.write) {
      toast({ title: "Error", description: "Clipboard API not available or not permitted.", variant: "destructive"});
      return;
    }
    // Use current QR props for copy, whether it's user-generated or the default
    const qrPropsForCopy = getQrProps();

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
      ctx.fillStyle = qrPropsForCopy.bgColor || '#ffffff';
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
  const logoSize = qrSize * 0.25; 

  const displayQrProps = getQrProps();

  return (
    <Card className={`transition-all duration-300 ease-out ${animated ? 'animate-fade-in-scale-up' : ''} sticky top-8`}>
      <CardHeader>
        <CardTitle className="font-headline">Preview & Download</CardTitle>
        {!(data && data.value) && (
            <CardDescription>This is a sample QR code. Generate yours below!</CardDescription>
        )}
        {(data && data.value) && (
            <CardDescription>Your generated QR code will appear below.</CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6">
        <div
          className="p-4 bg-white rounded-lg shadow-md inline-block"
          style={{ 
            minHeight: `${qrSize + 32}px`, 
            minWidth: `${qrSize + 32}px`,
            backgroundColor: currentBgColor
          }}
          aria-live="polite"
        >
          <QRCodeSVG
            value={displayQrProps.value}
            size={qrSize}
            level={displayQrProps.level as 'L' | 'M' | 'Q' | 'H'}
            fgColor={displayQrProps.fgColor}
            bgColor={displayQrProps.bgColor}
            includeMargin={displayQrProps.includeMargin}
            imageSettings={displayQrProps.imageSettings}
            ref={svgRef} 
            className="rounded"
          />
        </div>

        {/* Download and Copy buttons always available for the currently displayed QR (default or user-generated) */}
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
      </CardContent>
    </Card>
  );
}
