'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShieldCheck } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="flex items-center justify-between w-full max-w-5xl px-6 py-3 bg-white/80 dark:bg-black/80 backdrop-blur-md border border-border rounded-full shadow-lg">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <ShieldCheck className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">credex</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="#how-it-works" className="hover:text-primary transition-colors">How it Works</Link>
          <Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link>
          <Link href="#faq" className="hover:text-primary transition-colors">FAQ</Link>
          <Link href="#blog" className="hover:text-primary transition-colors">Blog</Link>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/audit">
            <Button variant="ghost" className="rounded-full px-6">Login</Button>
          </Link>
          <Link href="/audit">
            <Button className="rounded-full px-6 bg-primary hover:bg-primary/90 text-white border-0">
              Start Audit
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
