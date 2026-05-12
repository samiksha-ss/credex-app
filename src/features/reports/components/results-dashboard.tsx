'use client';

import { AuditResult, AuditInput } from '@/types/audit';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Zap, AlertCircle } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';

interface ResultsDashboardProps {
  result: AuditResult;
  input: AuditInput;
}

export function ResultsDashboard({ result }: ResultsDashboardProps) {
  const chartData = [
    { name: 'Current', amount: result.totalMonthlySpend, color: 'var(--color-muted-foreground, #64748b)' },
    { name: 'Optimized', amount: result.totalMonthlySpend - result.totalPotentialSavings, color: 'var(--color-primary, #15803d)' },
  ];

  const annualSavings = result.totalPotentialSavings * 12;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Hero Section */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2 bg-primary text-primary-foreground overflow-hidden relative border-0 shadow-md">
          <div className="absolute right-0 top-0 p-8 opacity-10">
            <CalculatorIcon className="w-32 h-32" />
          </div>
          <CardHeader>
            <CardTitle className="text-xl font-medium text-primary-foreground">
              Estimated monthly savings (modeled)
            </CardTitle>
            <div className="text-5xl font-semibold tracking-tight mt-2 tabular-nums">
              ${result.totalPotentialSavings.toFixed(2)}
            </div>
            <CardDescription className="text-primary-foreground/80 text-base leading-relaxed">
              Annualized for planning: <span className="font-medium text-primary-foreground">${annualSavings.toLocaleString()}</span>
              <span className="text-primary-foreground/70"> — verify against your invoices before budgeting.</span>
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="flex flex-col justify-center items-center p-6 text-center">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="58"
                stroke="currentColor"
                strokeWidth="10"
                fill="transparent"
                className="text-muted/20"
              />
              <circle
                cx="64"
                cy="64"
                r="58"
                stroke="currentColor"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={364.4}
                strokeDashoffset={364.4 - (364.4 * result.efficiencyScore) / 100}
                className="text-primary transition-all duration-1000 ease-out"
              />
            </svg>
            <span className="absolute text-3xl font-bold">{Math.round(result.efficiencyScore)}%</span>
          </div>
          <p className="mt-4 font-medium">Efficiency Score</p>
          <p className="text-sm text-muted-foreground">Based on your current stack utilization</p>
        </Card>
      </div>

      {/* Visualizations & Recommendations Split */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Chart Card */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Spending Comparison</CardTitle>
            <CardDescription>Monthly cost before and after optimization</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="var(--color-chart-grid, #e5e7eb)"
                />
                <XAxis
                  dataKey="name"
                  tick={{ fill: 'var(--color-chart-axis, #64748b)', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fill: 'var(--color-chart-axis, #64748b)', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Amount']}
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{
                    backgroundColor: 'var(--color-card, #ffffff)',
                    border: '1px solid var(--color-border, #e5e7eb)',
                    borderRadius: '8px',
                    color: 'var(--color-foreground, #0f172a)',
                  }}
                />
                <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recommendations List */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center gap-2 text-foreground">
            <Zap className="text-primary w-5 h-5" aria-hidden />
            Recommendations
          </h3>
          {result.recommendations.length === 0 ? (
            <Card className="bg-muted/50 border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                <ShieldCheck className="w-12 h-12 text-primary mb-4" />
                <p className="font-medium">Your stack is perfectly optimized!</p>
                <p className="text-sm text-muted-foreground">No savings opportunities found at this time.</p>
              </CardContent>
            </Card>
          ) : (
            result.recommendations.map((rec, idx) => (
              <Card key={idx} className="relative overflow-hidden group hover:shadow-md transition-shadow">
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 ${
                    rec.priority === 'high' ? 'bg-destructive' : 'bg-primary/50'
                  }`}
                />
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge variant={rec.isHighFriction ? 'secondary' : 'default'} className="mb-2">
                      {rec.type.toUpperCase()}
                    </Badge>
                    <span className="text-lg font-semibold tabular-nums text-primary">
                      +${rec.potentialSavings.toFixed(2)}/mo
                    </span>
                  </div>
                  <CardTitle className="text-base">{rec.message}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    {rec.isHighFriction ? (
                      <><AlertCircle className="w-4 h-4 shrink-0" /> Higher-effort change</>
                    ) : (
                      <><Zap className="w-4 h-4 shrink-0 text-primary" /> Quick win</>
                    )}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function CalculatorIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className}
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor" 
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
}
