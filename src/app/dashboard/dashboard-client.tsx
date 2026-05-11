'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calculator, 
  Zap, 
  AlertCircle,
  Plus,
  FileText,
  ChevronRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from 'recharts';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { AuditRecord } from '@/services/audit';

const COLORS = ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#d1fae5'];

interface DashboardClientProps {
  audits: AuditRecord[];
}

export function DashboardClient({ audits }: DashboardClientProps) {
  const totalMonthlySpend = audits.reduce((acc, curr) => acc + curr.total_spend, 0) / (audits.length || 1);
  const totalPotentialSavings = audits.reduce((acc, curr) => acc + curr.potential_savings, 0) / (audits.length || 1);
  
  // Prepare chart data from audits
  const spendData = audits.slice(0, 6).reverse().map(a => ({
    name: new Date(a.created_at).toLocaleDateString('en-US', { month: 'short' }),
    amount: a.total_spend
  }));

  const toolCounts: Record<string, number> = {};
  audits.forEach(a => {
    a.items.forEach(item => {
      toolCounts[item.toolId] = (toolCounts[item.toolId] || 0) + (item.monthlySpend || 0);
    });
  });

  const toolData = Object.entries(toolCounts).map(([name, value], i) => ({
    name,
    value,
    color: COLORS[i % COLORS.length]
  }));

  const stats = [
    { 
      title: 'Avg. Monthly Spend', 
      value: `$${Math.round(totalMonthlySpend)}`, 
      change: audits.length > 0 ? 'Active' : 'No data', 
      trend: 'neutral',
      icon: Zap 
    },
    { 
      title: 'Potential Savings', 
      value: `$${Math.round(totalPotentialSavings)}`, 
      change: `${Math.round((totalPotentialSavings / (totalMonthlySpend || 1)) * 100)}% of total`, 
      trend: 'down',
      icon: TrendingDown 
    },
    { 
      title: 'Total Audits', 
      value: audits.length.toString(), 
      change: 'Lifetime', 
      trend: 'up',
      icon: Calculator 
    },
    { 
      title: 'Top Tool', 
      value: audits[0]?.items[0]?.toolId || 'N/A', 
      change: 'Most used', 
      trend: 'neutral',
      icon: AlertCircle 
    },
  ];

  const downloadCSV = () => {
    if (audits.length === 0) return;
    
    const headers = ['Date', 'Tools Count', 'Total Spend', 'Potential Savings', 'Efficiency Score'];
    const rows = audits.map(a => [
      new Date(a.created_at).toLocaleDateString(),
      a.items.length,
      a.total_spend,
      a.potential_savings,
      Math.round(100 - (a.potential_savings / (a.total_spend || 1)) * 100)
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `credex_audits_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back. Here&apos;s your AI spend overview.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={downloadCSV}
            disabled={audits.length === 0}
          >
            Download CSV
          </Button>
          <Link href="/audit">
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" /> New Audit
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={cn(
                "text-xs mt-1 flex items-center gap-1",
                stat.trend === 'up' && stat.title.includes('Savings') ? "text-primary" : 
                stat.trend === 'up' ? "text-destructive" : 
                stat.trend === 'down' ? "text-primary" : "text-muted-foreground"
              )}>
                {stat.trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : 
                 stat.trend === 'down' ? <ArrowDownRight className="h-3 w-3" /> : null}
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mb-8">
        {/* Main Chart */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Spending Trend</CardTitle>
            <CardDescription>Monthly spend across all AI tools.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={spendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                  contentStyle={{ 
                    backgroundColor: 'white',
                    borderColor: '#e2e8f0',
                    borderRadius: '8px',
                    color: 'black'
                  }}
                  itemStyle={{ color: 'black' }}
                />
                <Bar dataKey="amount" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribution Chart */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Spend Distribution</CardTitle>
            <CardDescription>Breakdown by tool category.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={toolData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {toolData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    borderColor: '#e2e8f0',
                    borderRadius: '8px',
                    color: 'black'
                  }}
                  itemStyle={{ color: 'black' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold">${Math.round(totalMonthlySpend)}</span>
              <span className="text-xs text-muted-foreground">Avg/Mo</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Audits */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/30 border-b">
          <CardTitle>Recent Audits</CardTitle>
          <CardDescription>Your latest cost analysis reports.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {audits.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center px-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Calculator className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No audits yet</h3>
                <p className="text-muted-foreground max-w-sm mb-6">
                  Ready to see how much you can save? Start your first AI spend audit now.
                </p>
                <Link href="/audit">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Start First Audit
                  </Button>
                </Link>
              </div>
            ) : (
              audits.map((audit) => (
                <Link key={audit.id} href={`/report/${audit.id}`}>
                  <div className="flex items-center justify-between p-6 hover:bg-muted/50 transition-all cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-lg">{new Date(audit.created_at).toLocaleDateString(undefined, { dateStyle: 'long' })}</div>
                        <div className="text-sm text-muted-foreground">{audit.items.length} tools analyzed · {audit.team_size} seats</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right hidden sm:block">
                        <div className="text-sm text-muted-foreground">Potential Savings</div>
                        <div className="font-bold text-primary text-xl">${Math.round(audit.potential_savings)}<span className="text-xs font-normal text-muted-foreground ml-1">/mo</span></div>
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
