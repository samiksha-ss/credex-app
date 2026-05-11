import { Sidebar } from './sidebar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-background overflow-y-auto">
        <div className="lg:hidden p-4 border-b bg-muted/30 flex items-center justify-between">
          <span className="font-bold tracking-tight">credex</span>
          <Link href="/">
            <Button variant="outline" size="sm">Home</Button>
          </Link>
        </div>
        {children}
      </main>
    </div>
  );
}
