
"use client";

import type React from 'react';
import { useState, useEffect } from 'react';
import { MountainIcon, Mail, Send } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function ContactPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("Form submission is not yet implemented. Please use the email link for now!");
  };

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
            <CardHeader>
              <div className="flex items-center gap-3 mb-1">
                <Send className="h-7 w-7 text-accent" />
                <CardTitle className="text-2xl font-bold text-foreground">Contact Us</CardTitle>
              </div>
              <CardDescription className="text-muted-foreground text-base">
                Have questions, feedback, or just want to say hi? I&apos;d love to hear from you!
                As a Vibe Coder, I&apos;m always open to suggestions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid md:grid-cols-1 gap-6">
                <div className="flex items-start gap-4 p-4 border rounded-lg bg-card/50 hover:shadow-md transition-shadow">
                  <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-card-foreground">Email</h3>
                    <p className="text-sm text-muted-foreground">
                      Reach out at: <a href="mailto:jphabswebsites@gmail.com" className="text-primary hover:underline">jphabswebsites@gmail.com</a>
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Send a Message (Demo)</h3>
                {isClient && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-muted-foreground">Your Name</Label>
                      <Input id="name" type="text" placeholder="Jphabs Khalifa" required className="mt-1"/>
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-muted-foreground">Your Email</Label>
                      <Input id="email" type="email" placeholder="vibe.coder@example.com" required className="mt-1"/>
                    </div>
                    <div>
                      <Label htmlFor="message" className="text-muted-foreground">Message</Label>
                      <Textarea id="message" placeholder="Your awesome feedback or question..." required rows={5} className="mt-1"/>
                    </div>
                    <Button type="submit" className="w-full sm:w-auto">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                )}
              </div>

              <p className="text-sm text-center text-muted-foreground pt-6 border-t border-border">
                I&apos;ll do my best to respond as quickly as I can. Thanks for your interest in QRCodeForge!
                <br />- Jphabs Khalifa
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
