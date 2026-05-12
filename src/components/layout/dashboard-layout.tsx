import { Sidebar } from './sidebar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="lg:hidden border-b border-border bg-muted/30">
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <span className="font-semibold tracking-tight">Credex</span>
              <p className="truncate text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                AI spend intelligence
              </p>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm" className="shrink-0">
                Home
              </Button>
            </Link>
          </div>
          <nav className="flex gap-1 overflow-x-auto px-3 pb-3 text-sm">
            {[
              { href: '/dashboard', label: 'Dashboard' },
              { href: '/compare', label: 'Compare' },
              { href: '/audit', label: 'Audit' },
              { href: '/pricing', label: 'Pricing' },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="shrink-0 rounded-full border border-border bg-background px-3 py-1.5 font-medium text-foreground/80 hover:bg-muted hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        {children}
      </main>
    </div>
  );
}
