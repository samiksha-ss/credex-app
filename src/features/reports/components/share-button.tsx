'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Check, Copy } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

export function ShareButton() {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareTwitter = () => {
    const text = `I just saved money on my AI stack using credex! Check out my audit:`;
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline">
          <Share2 className="w-4 h-4 mr-2" /> Share Report
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={copyLink} className="cursor-pointer">
          {copied ? (
            <><Check className="w-4 h-4 mr-2 text-green-500" /> Copied!</>
          ) : (
            <><Copy className="w-4 h-4 mr-2" /> Copy Link</>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareTwitter} className="cursor-pointer">
          <TwitterIcon className="w-4 h-4 mr-2" /> Share on X
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
