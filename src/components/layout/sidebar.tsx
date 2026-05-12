'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Calculator,
  Settings,
  HelpCircle,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BarChart3,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Compare platforms', href: '/compare', icon: BarChart3 },
  { name: 'Stack audit', href: '/audit', icon: Calculator },
  { name: 'Pricing', href: '/pricing', icon: CreditCard },
];

const secondaryNavItems = [
  { name: 'Settings', href: '/dashboard', icon: Settings },
  { name: 'Help', href: '/#faq', icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside 
      className={cn(
        "flex flex-col border-r bg-muted/30 transition-all duration-300 h-screen sticky top-0",
        collapsed ? "w-16" : "w-64",
        "hidden lg:flex"
      )}
    >
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
          <Sparkles className="text-primary-foreground w-5 h-5" />
        </div>
        {!collapsed && (
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-lg tracking-tight">Credex</span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              AI spend intelligence
            </span>
          </div>
        )}
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive =
            item.href === '/dashboard'
              ? pathname === '/dashboard'
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors group",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t space-y-1">
        {secondaryNavItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors group"
          >
            <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
            {!collapsed && <span>{item.name}</span>}
          </Link>
        ))}
        
        <Button
          variant="ghost"
          size="icon"
          className="w-full mt-4 flex items-center justify-center"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <div className="flex items-center gap-2"><ChevronLeft className="w-4 h-4" /> <span className="text-xs">Collapse</span></div>}
        </Button>
      </div>
    </aside>
  );
}
