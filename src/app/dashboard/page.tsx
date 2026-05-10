'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { PageContainer } from '@/components/layout/page-container';
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
  FileText
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

const spendData = [
  { name: 'Jan', amount: 2400 },
  { name: 'Feb', amount: 1398 },
  { name: 'Mar', amount: 9800 },
  { name: 'Apr', amount: 3908 },
  { name: 'May', amount: 4800 },
  { name: 'Jun', amount: 3800 },
];

const toolData = [
  { name: 'ChatGPT', value: 450, color: 'hsl(var(--primary))' },
  { name: 'Claude', value: 300, color: 'hsl(var(--primary) / 0.8)' },
  { name: 'Cursor', value: 200, color: 'hsl(var(--primary) / 0.6)' },
  { name: 'Midjourney', value: 100, color: 'hsl(var(--primary) / 0.4)' },
];

const stats = [
  { 
    title: 'Total Monthly Spend', 
    value: '$1,050', 
    change: '+12%', 
    trend: 'up',
    icon: Zap 
  },
  { 
    title: 'Potential Savings', 
    value: '$320', 
    change: '24% of total', 
    trend: 'down',
    icon: TrendingDown 
  },
  { 
    title: 'Active Tool Seats', 
    value: '42', 
    change: '5 unused', 
    trend: 'neutral',
    icon: AlertCircle 
  },
  { 
    title: 'Audit Efficiency', 
    value: '88%', 
    change: 'Top 10%', 
    trend: 'up',
    icon: Calculator 
  },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <PageContainer>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back. Here&apos;s your AI spend overview.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">Download CSV</Button>
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
            <CardContent className="h-[300px]">
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
                    cursor={{ fill: 'hsl(var(--muted) / 0.4)' }}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: 'var(--radius-lg)'
                    }}
                  />
                  <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
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
            <CardContent className="h-[300px] flex items-center justify-center">
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
                      backgroundColor: 'hsl(var(--background))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: 'var(--radius-lg)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold">$1.1k</span>
                <span className="text-xs text-muted-foreground">Total</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Audits */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Audits</CardTitle>
            <CardDescription>Your latest cost analysis reports.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { date: 'May 10, 2026', tools: 5, spend: '$840', savings: '$120', status: 'Completed' },
                { date: 'Apr 22, 2026', tools: 3, spend: '$210', savings: '$45', status: 'Completed' },
                { date: 'Mar 15, 2026', tools: 8, spend: '$1,200', savings: '$310', status: 'Completed' },
              ].map((audit, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="font-semibold">{audit.date}</div>
                      <div className="text-xs text-muted-foreground">{audit.tools} tools audited</div>
                    </div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <div className="font-medium">Potential Savings: <span className="text-primary">{audit.savings}</span></div>
                    <div className="text-xs text-muted-foreground">Total Spend: {audit.spend}</div>
                  </div>
                  <Button variant="ghost" size="sm">View Report</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </PageContainer>
    </DashboardLayout>
  );
}
