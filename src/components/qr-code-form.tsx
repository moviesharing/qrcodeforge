
"use client";

import type React from 'react';
import { useState } from 'react';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCcw, FileUp, Palette, Copy, Image as ImageIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const hexColorRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

const formSchema = z.object({
  inputType: z.enum(['text', 'file']).default('text'),
  textValue: z.string().optional(),
  fileValue: z.custom<FileList>().optional(),
  errorCorrectionLevel: z.enum(['L', 'M', 'Q', 'H']).default('M'),
  margin: z.number().min(0).max(20).default(4),
  fgColor: z.string().regex(hexColorRegex, "Invalid HEX color").default('#000000'),
  bgColor: z.string().regex(hexColorRegex, "Invalid HEX color").default('#ffffff'),
  logoFile: z.custom<FileList>().optional(),
});

export type QrFormData = z.infer<typeof formSchema>;
export type QrCodeInputData = {
  value: string;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  margin: number;
  fgColor: string;
  bgColor: string;
  logoImage?: string; // Data URL
};

interface QrCodeFormProps {
  onSubmit: (data: QrCodeInputData) => void;
  isGenerating: boolean;
}

export function QrCodeForm({ onSubmit, isGenerating }: QrCodeFormProps) {
  const [activeTab, setActiveTab] = useState<'text' | 'file'>('text');
  const { toast } = useToast();

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<QrFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inputType: 'text',
      errorCorrectionLevel: 'M',
      margin: 4,
      fgColor: '#000000',
      bgColor: '#ffffff',
    },
  });

  const marginValue = watch('margin', 4);
  const fgColorValue = watch('fgColor', '#000000');
  const bgColorValue = watch('bgColor', '#ffffff');
  const logoFileValue = watch('logoFile');

  const processSubmit: SubmitHandler<QrFormData> = async (data) => {
    let valueToEncode = '';
    let logoDataUrl: string | undefined = undefined;

    if (activeTab === 'text') {
      if (!data.textValue || data.textValue.trim() === '') {
        toast({ title: "Error", description: "Text/URL input cannot be empty.", variant: "destructive" });
        return;
      }
      valueToEncode = data.textValue;
    } else if (activeTab === 'file') {
      if (!data.fileValue || data.fileValue.length === 0) {
        toast({ title: "Error", description: "Please select a file.", variant: "destructive" });
        return;
      }
      const file = data.fileValue[0];
      if (file.type === 'text/plain') {
        valueToEncode = await file.text();
      } else if (file.type === 'application/pdf') {
        valueToEncode = `PDF File: ${file.name}`;
        toast({ title: "Info", description: `For PDF files, the filename "${file.name}" will be encoded.`, variant: "default" });
      } else {
        toast({ title: "Error", description: "Unsupported file type. Please upload a .txt or .pdf file.", variant: "destructive" });
        return;
      }
      if (valueToEncode.trim() === '') {
        toast({ title: "Error", description: "File content is empty.", variant: "destructive" });
        return;
      }
    }

    if (data.logoFile && data.logoFile.length > 0) {
      const file = data.logoFile[0];
      if (!file.type.startsWith('image/')) {
        toast({ title: "Error", description: "Logo must be an image file (PNG, JPG, GIF, SVG).", variant: "destructive" });
        return;
      }
      if (file.size > 500 * 1024) { // 500KB limit
        toast({ title: "Error", description: "Logo file size should not exceed 500KB.", variant: "destructive" });
        return;
      }
      try {
        logoDataUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);
        });
      } catch (error) {
        toast({ title: "Error", description: "Failed to read logo file.", variant: "destructive" });
        return;
      }
    }
    
    if (valueToEncode.length > 2000) { 
        toast({ title: "Warning", description: "Data is very long, QR code might be hard to scan.", variant: "default" });
    }

    onSubmit({
      value: valueToEncode,
      errorCorrectionLevel: data.errorCorrectionLevel,
      margin: data.margin,
      fgColor: data.fgColor,
      bgColor: data.bgColor,
      logoImage: logoDataUrl,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Input Data & Customization</CardTitle>
        <CardDescription>Enter details and customize your QR code.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(processSubmit)} className="space-y-6">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'text' | 'file')} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="text">Text/URL</TabsTrigger>
              <TabsTrigger value="file">File</TabsTrigger>
            </TabsList>
            <TabsContent value="text" className="pt-4">
              <div className="space-y-2">
                <Label htmlFor="textValue">Text or URL</Label>
                <Textarea
                  id="textValue"
                  placeholder="Enter text or URL here"
                  {...register('textValue')}
                  className="min-h-[100px]"
                />
                {errors.textValue && <p className="text-sm text-destructive">{errors.textValue.message}</p>}
              </div>
            </TabsContent>
            <TabsContent value="file" className="pt-4">
              <div className="space-y-2">
                <Label htmlFor="fileValue">Upload File (.txt, .pdf)</Label>
                <div className="flex items-center gap-2">
                  <FileUp className="h-5 w-5 text-muted-foreground" />
                  <Input
                    id="fileValue"
                    type="file"
                    accept=".txt,.pdf"
                    {...register('fileValue')}
                  />
                </div>
                {errors.fileValue && <p className="text-sm text-destructive">{typeof errors.fileValue.message === "string" ? errors.fileValue.message : "Invalid file"}</p>}
                <p className="text-xs text-muted-foreground">
                  For .txt files, content will be encoded. For .pdf files, filename will be encoded.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-medium flex items-center gap-2"><Palette className="h-5 w-5 text-primary" />Colors</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fgColor">Foreground Color</Label>
                <div className="flex items-center gap-2">
                  <Controller
                    name="fgColor"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="color"
                        id="fgColorColorPicker"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="p-1 h-10 w-12 flex-shrink-0"
                      />
                    )}
                  />
                  <Input
                    id="fgColor"
                    type="text"
                    placeholder="#000000"
                    {...register('fgColor')}
                    className="flex-grow"
                  />
                </div>
                {errors.fgColor && <p className="text-sm text-destructive">{errors.fgColor.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="bgColor">Background Color</Label>
                 <div className="flex items-center gap-2">
                  <Controller
                    name="bgColor"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="color"
                        id="bgColorColorPicker"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="p-1 h-10 w-12 flex-shrink-0"
                      />
                    )}
                  />
                  <Input
                    id="bgColor"
                    type="text"
                    placeholder="#FFFFFF"
                    {...register('bgColor')}
                    className="flex-grow"
                  />
                </div>
                {errors.bgColor && <p className="text-sm text-destructive">{errors.bgColor.message}</p>}
              </div>
            </div>
          </div>
          
          <div className="space-y-2 pt-4 border-t">
            <h3 className="text-lg font-medium flex items-center gap-2"><ImageIcon className="h-5 w-5 text-primary" />Logo (Optional)</h3>
            <Label htmlFor="logoFile">Upload Logo Image</Label>
            <div className="flex items-center gap-2">
              <FileUp className="h-5 w-5 text-muted-foreground" />
              <Input
                id="logoFile"
                type="file"
                accept="image/png, image/jpeg, image/gif, image/svg+xml"
                {...register('logoFile')}
              />
            </div>
             {logoFileValue && logoFileValue.length > 0 && (
              <p className="text-xs text-muted-foreground">Selected: {logoFileValue[0].name}</p>
            )}
            {errors.logoFile && <p className="text-sm text-destructive">{typeof errors.logoFile.message === "string" ? errors.logoFile.message : "Invalid logo file"}</p>}
             <p className="text-xs text-muted-foreground">
              Max 500KB. Recommended: Square, simple logo.
            </p>
          </div>


          <div className="space-y-4 pt-4 border-t">
             <h3 className="text-lg font-medium">Advanced Options</h3>
            <div className="space-y-2">
              <Label>Error Correction Level</Label>
              <Controller
                name="errorCorrectionLevel"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-wrap gap-x-4 gap-y-2"
                  >
                    {(['L', 'M', 'Q', 'H'] as const).map((level) => (
                      <div key={level} className="flex items-center space-x-2">
                        <RadioGroupItem value={level} id={`ec-${level}`} />
                        <Label htmlFor={`ec-${level}`} className="font-normal">{level} (Lowest)</Label> 
                      </div>
                    ))}
                  </RadioGroup>
                )}
              />
               <p className="text-xs text-muted-foreground">Higher levels increase scannability but reduce data capacity.</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="margin">Margin Size (Quiet Zone)</Label>
                <span className="text-sm text-muted-foreground">{marginValue} modules</span>
              </div>
              <Controller
                name="margin"
                control={control}
                render={({ field }) => (
                  <Slider
                    id="margin"
                    min={0}
                    max={20}
                    step={1}
                    defaultValue={[field.value]}
                    onValueChange={(value) => field.onChange(value[0])}
                  />
                )}
              />
              <p className="text-xs text-muted-foreground">Space around the QR code. Default is 4.</p>
            </div>
          </div>
          

          <Button type="submit" className="w-full" disabled={isGenerating}>
            <RefreshCcw className="mr-2 h-4 w-4" />
            {isGenerating ? 'Generating...' : 'Generate QR Code'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

    