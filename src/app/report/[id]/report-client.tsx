'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingDown, 
  ArrowLeft, 
  Download, 
  Share2, 
  Zap, 
  CheckCircle2, 
  AlertTriangle,
  Lightbulb,
  Sparkles,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { AuditResult } from '@/types/audit';
import { AuditRecord } from '@/services/audit';

interface ReportClientProps {
  audit: AuditRecord;
  result: AuditResult;
}

export function ReportClient({ audit, result }: ReportClientProps) {
  const totalSpend = result.totalMonthlySpend;
  const totalSavings = result.totalPotentialSavings;
  const efficiencyScore = Math.round(result.efficiencyScore);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Report link copied to clipboard!');
  };

  return (
    <>
      <div className="flex items-center gap-2 mb-6">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
        </Link>
        <Badge variant="outline" className="ml-auto font-mono">ID: {audit.id.slice(0, 8)}</Badge>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Audit Report</h1>
          <p className="text-xl text-muted-foreground">Generated on {new Date(audit.created_at).toLocaleDateString()}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" /> Export PDF
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="grid gap-6 md:grid-cols-3 mb-12">
        <Card className="bg-primary text-primary-foreground border-0 shadow-2xl relative overflow-hidden group">
          <div className="absolute right-[-20px] top-[-20px] opacity-10 group-hover:scale-110 transition-transform duration-500">
            <TrendingDown size={140} />
          </div>
          <CardHeader>
            <CardTitle className="text-primary-foreground/80 font-medium">Monthly Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold mb-2">${Math.round(totalSavings)}</div>
            <p className="text-primary-foreground/60 text-sm">Save ${(Math.round(totalSavings) * 12).toLocaleString()}/year by optimizing tiers.</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader>
            <CardTitle className="text-muted-foreground font-medium">Current Efficiency</CardTitle>
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
            <p className="text-xs text-muted-foreground mt-3">Target efficiency: 90%+</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-muted-foreground font-medium">Total AI Spend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold mb-2">${Math.round(totalSpend)}</div>
            <p className={cn(
              "text-sm flex items-center gap-1",
              totalSavings > 0 ? "text-destructive" : "text-primary"
            )}>
              {totalSavings > 0 ? (
                <><AlertTriangle className="w-4 h-4" /> Potential waste identified</>
              ) : (
                <><CheckCircle2 className="w-4 h-4" /> Highly optimized stack</>
              )}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Executive Summary */}
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
        {/* Recommendations Section */}
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
                    <p className="text-lg font-semibold">Great job! No overspending detected.</p>
                    <p>Your AI stack is lean and efficient.</p>
                  </CardContent>
                </Card>
              ) : (
                result.recommendations.map((rec, i) => (
                  <Card key={i} className="overflow-hidden border-l-4 border-l-primary hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-lg capitalize">{rec.toolId}</span>
                            <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                              {rec.type.toUpperCase()}
                            </Badge>
                            {rec.priority === 'high' && <Badge className="bg-destructive text-destructive-foreground">HIGH PRIORITY</Badge>}
                          </div>
                          <p className="text-muted-foreground leading-relaxed">{rec.message}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-2xl font-bold text-primary">-${Math.round(rec.potentialSavings)}/mo</div>
                          <div className="text-xs text-muted-foreground">Potential Savings</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Benchmarking Side Panel */}
        <div className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-2">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Industry Benchmarks
              </CardTitle>
              <CardDescription>How you compare to similar {audit.use_case}s.</CardDescription>
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
                  <p className="text-sm">Founders with similar use cases save an average of <span className="font-bold text-primary">$450/mo</span> after auditing.</p>
                </div>
              </div>

              <Button className="w-full variant-outline" variant="outline">
                View Full Market Report
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-primary">Expert Consultation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">Want a custom negotiation strategy for your enterprise tools?</p>
              <Button className="w-full">Book Free Strategy Call</Button>
            </CardContent>
          </Card>
        </div>
      </div>

        {/* Quick Actions / Summary */}
        {result.recommendations.length > 0 && (
          <Card className="bg-muted/30 border-dashed">
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
    </>
  );
}

