'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav className={cn(
        "flex flex-col md:flex-row items-center justify-between w-full max-w-5xl bg-white/80 dark:bg-black/80 backdrop-blur-md border border-border transition-all duration-300",
        isOpen ? "rounded-3xl p-6" : "rounded-full px-6 py-3 px-6 py-3 h-14"
      )}>
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <ShieldCheck className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">credex</span>
          </Link>

          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        <div className={cn(
          "flex-col md:flex-row items-center gap-6 md:gap-8 text-sm font-medium text-muted-foreground mt-4 md:mt-0 w-full md:w-auto",
          isOpen ? "flex" : "hidden md:flex"
        )}>
          <Link href="/#how-it-works" className="hover:text-primary transition-colors">How it Works</Link>
          <Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
          <Link href="/#faq" className="hover:text-primary transition-colors">FAQ</Link>
          
          <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto pt-4 md:pt-0 border-t md:border-0 mt-4 md:mt-0">
            <Link href="/login" className="w-full md:w-auto">
              <Button variant="ghost" className="rounded-full px-6 w-full">Login</Button>
            </Link>
            <Link href="/audit" className="w-full md:w-auto">
              <Button className="rounded-full px-6 bg-primary hover:bg-primary/90 text-white border-0 w-full shadow-lg shadow-primary/20">
                Start Audit
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
