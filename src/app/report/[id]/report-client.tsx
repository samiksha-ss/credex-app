'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  TrendingDown, 
  Download, 
  Share2, 
  CheckCircle2, 
  AlertTriangle,
  Lightbulb,
  Sparkles,
  BarChart3,
  Mail,
  Zap,
  ArrowRight,
  Bell,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { AuditResult } from '@/types/audit';
import { AuditRecord } from '@/services/audit';

interface ReportClientProps {
  audit: AuditRecord;
  result: AuditResult;
}

interface LeadFormState {
  email: string;
  company_name: string;
  role: string;
  // honeypot
  website: string;
}

export function ReportClient({ audit, result }: ReportClientProps) {
  const totalSpend = result.totalMonthlySpend;
  const totalSavings = result.totalPotentialSavings;
  const efficiencyScore = Math.round(result.efficiencyScore);
  const annualSavings = Math.round(totalSavings * 12);

  const isHighSavings = totalSavings >= 500;
  const isOptimal = totalSavings < 100;

  const [leadState, setLeadState] = useState<LeadFormState>({
    email: '',
    company_name: '',
    role: '',
    website: '', // honeypot
  });
  const [leadStatus, setLeadStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Report link copied to clipboard!');
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLeadStatus('loading');

    try {
      const res = await fetch('/api/capture-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audit_id: audit.id,
          email: leadState.email,
          company_name: leadState.company_name || undefined,
          role: leadState.role || undefined,
          team_size: audit.team_size,
          website: leadState.website, // honeypot
        }),
      });

      if (!res.ok) throw new Error('Submit failed');
      setLeadStatus('success');
    } catch {
      setLeadStatus('error');
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">AI Spend Audit Report</h1>
          <p className="text-xl text-muted-foreground">
            Generated {new Date(audit.created_at).toLocaleDateString(undefined, { dateStyle: 'long' })} · 
            Team of {audit.team_size} · <span className="capitalize">{audit.use_case}</span>
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" /> Share Report
          </Button>
          <Link href="/audit">
            <Button variant="outline">
              New Audit
            </Button>
          </Link>
          <Button>
            <Download className="mr-2 h-4 w-4" /> Export PDF
          </Button>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid gap-6 md:grid-cols-3 mb-12">
        <Card className="bg-primary text-primary-foreground border-0 shadow-2xl relative overflow-hidden group">
          <div className="absolute right-[-20px] top-[-20px] opacity-10 group-hover:scale-110 transition-transform duration-500">
            <TrendingDown size={140} />
          </div>
          <CardHeader>
            <CardTitle className="text-primary-foreground/80 font-medium">Monthly Savings Found</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold mb-2">${Math.round(totalSavings)}</div>
            <p className="text-primary-foreground/60 text-sm">
              That&apos;s <strong className="text-primary-foreground">${annualSavings.toLocaleString()}/year</strong> in runway impact.
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader>
            <CardTitle className="text-muted-foreground font-medium">Stack Efficiency Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold mb-2">{efficiencyScore}%</div>
            <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full transition-all duration-1000",
                  efficiencyScore > 80 ? "bg-primary" : efficiencyScore > 50 ? "bg-yellow-500" : "bg-destructive"
                )}
                style={{ width: `${efficiencyScore}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-3">Target: 90%+ efficiency</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-muted-foreground font-medium">Current Monthly AI Spend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold mb-2">${Math.round(totalSpend)}</div>
            <p className={cn(
              "text-sm flex items-center gap-1",
              totalSavings > 0 ? "text-destructive" : "text-primary"
            )}>
              {totalSavings > 0 ? (
                <><AlertTriangle className="w-4 h-4" /> Overspend identified</>
              ) : (
                <><CheckCircle2 className="w-4 h-4" /> Spending optimally</>
              )}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Credex High-Savings Upsell (>$500/mo) */}
      {isHighSavings && (
        <Card className="mb-12 border-2 border-primary bg-primary/5 shadow-lg">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-primary rounded-xl shrink-0">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-primary mb-1">High Savings Detected</div>
                  <h3 className="text-xl font-bold mb-1">
                    You could save ${annualSavings.toLocaleString()}/year — Credex can make it happen faster.
                  </h3>
                  <p className="text-muted-foreground">
                    Credex sources discounted AI credits (Cursor, Claude, ChatGPT Enterprise) from companies that over-forecasted.
                    Real discounts. No vendor negotiation needed.
                  </p>
                </div>
              </div>
              <a
                href="https://credex.rocks"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0"
              >
                <Button size="lg" className="whitespace-nowrap">
                  Book Free Strategy Call <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Executive Summary */}
      {result.aiSummary && (
        <Card className="mb-12 border-primary/20 bg-primary/5">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="p-3 bg-primary/10 rounded-2xl shrink-0">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-2">Executive Summary</h3>
                <p className="text-xl font-medium leading-relaxed italic">
                  &quot;{result.aiSummary}&quot;
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-12 lg:grid-cols-3 mb-12">
        {/* Recommendations */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Lightbulb className="text-primary w-6 h-6" />
              Optimization Roadmap
            </h2>
            <div className="grid gap-4">
              {result.recommendations.length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="p-12 text-center text-muted-foreground">
                    <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
                    <p className="text-lg font-semibold">You&apos;re spending well.</p>
                    <p>No overspending detected — your AI stack is lean and efficient.</p>
                  </CardContent>
                </Card>
              ) : (
                result.recommendations.map((rec, i) => (
                  <Card key={i} className="overflow-hidden border-l-4 border-l-primary hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-lg capitalize">{rec.toolId}</span>
                            <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                              {rec.type.toUpperCase()}
                            </Badge>
                            {rec.priority === 'high' && (
                              <Badge className="bg-destructive text-destructive-foreground">HIGH PRIORITY</Badge>
                            )}
                            {rec.isHighFriction && (
                              <Badge variant="outline" className="text-xs">Requires action</Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground leading-relaxed">{rec.message}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-2xl font-bold text-primary">-${Math.round(rec.potentialSavings)}/mo</div>
                          <div className="text-xs text-muted-foreground">${Math.round(rec.potentialSavings * 12)}/yr</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-2">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Industry Benchmarks
              </CardTitle>
              <CardDescription>How you compare to similar {audit.use_case} teams.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Efficiency Rank</span>
                  <span className="font-bold">Top 25%</span>
                </div>
                <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[75%]" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  <p className="text-sm">Your spend is <span className="font-bold text-primary">12% higher</span> than average for your team size.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  <p className="text-sm">Teams with similar use cases save an average of <span className="font-bold text-primary">$450/mo</span> after auditing.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Next Steps */}
      {result.recommendations.length > 0 && (
        <Card className="bg-muted/30 border-dashed mb-12">
          <CardHeader>
            <CardTitle className="text-lg">Suggested Next Steps</CardTitle>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-4">
            <div className="flex gap-4 items-start p-4 bg-background rounded-lg border">
              <div className="p-2 bg-primary/10 rounded-full shrink-0">
                <Zap className="text-primary w-4 h-4" />
              </div>
              <div>
                <div className="font-semibold text-sm">Execute Tier Downgrades</div>
                <p className="text-xs text-muted-foreground">Adjust your plans in tool settings to see savings on your next bill.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-4 bg-background rounded-lg border">
              <div className="p-2 bg-primary/10 rounded-full shrink-0">
                <CheckCircle2 className="text-primary w-4 h-4" />
              </div>
              <div>
                <div className="font-semibold text-sm">Remove Unused Seats</div>
                <p className="text-xs text-muted-foreground">Prune users who haven&apos;t logged in for 30+ days.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Email Capture — shown AFTER value (below results) */}
      <Card className={cn(
        "border-2 mb-8",
        isHighSavings ? "border-primary" : "border-border"
      )}>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              {isOptimal ? <Bell className="w-5 h-5 text-primary" /> : <Mail className="w-5 h-5 text-primary" />}
            </div>
            <div>
              <CardTitle>
                {isOptimal
                  ? 'Notify me when new optimizations apply'
                  : 'Save your report & get implementation help'}
              </CardTitle>
              <CardDescription>
                {isOptimal
                  ? "You're spending well. We'll ping you when the market changes in your favour."
                  : 'We\'ll email you this report and flag when new savings opportunities emerge.'}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {leadStatus === 'success' ? (
            <div className="flex items-center gap-3 py-4 text-primary">
              <CheckCircle2 className="w-6 h-6" />
              <p className="font-medium">You&apos;re on the list! Check your inbox for a copy of this report.</p>
            </div>
          ) : (
            <form onSubmit={handleLeadSubmit} className="space-y-4">
              {/* Honeypot — hidden from users, visible to bots */}
              <input
                type="text"
                name="website"
                value={leadState.website}
                onChange={(e) => setLeadState((s) => ({ ...s, website: e.target.value }))}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ display: 'none' }}
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="lead-email">Work Email *</Label>
                  <Input
                    id="lead-email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={leadState.email}
                    onChange={(e) => setLeadState((s) => ({ ...s, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lead-company">Company Name</Label>
                  <Input
                    id="lead-company"
                    type="text"
                    placeholder="Acme Inc."
                    value={leadState.company_name}
                    onChange={(e) => setLeadState((s) => ({ ...s, company_name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lead-role">Your Role</Label>
                  <Input
                    id="lead-role"
                    type="text"
                    placeholder="CTO, Founder, Eng Manager…"
                    value={leadState.role}
                    onChange={(e) => setLeadState((s) => ({ ...s, role: e.target.value }))}
                  />
                </div>
              </div>

              {leadStatus === 'error' && (
                <p className="text-sm text-destructive">Something went wrong. Please try again.</p>
              )}

              <Button type="submit" disabled={leadStatus === 'loading'} className="w-full sm:w-auto">
                {leadStatus === 'loading' ? 'Saving...' : isOptimal ? 'Notify Me' : 'Save My Report'}
                {leadStatus !== 'loading' && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
              <p className="text-xs text-muted-foreground">
                No spam. One email to confirm. We never sell your data.
              </p>
            </form>
          )}
        </CardContent>
      </Card>
    </>
  );
}
