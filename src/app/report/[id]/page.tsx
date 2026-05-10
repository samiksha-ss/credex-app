'use client';

import { PageContainer } from '@/components/layout/page-container';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  Lightbulb
} from 'lucide-react';
import Link from 'next/link';

interface ToolRecommendation {
  tool: string;
  currentPlan: string;
  recommendedPlan: string;
  savings: number;
  reason: string;
}

const recommendations: ToolRecommendation[] = [
  { 
    tool: 'ChatGPT', 
    currentPlan: 'Enterprise', 
    recommendedPlan: 'Team', 
    savings: 30, 
    reason: 'Only 3 users utilize SSO features. Team tier covers all active needs.' 
  },
  { 
    tool: 'Claude', 
    currentPlan: 'Pro', 
    recommendedPlan: 'Free', 
    savings: 20, 
    reason: 'Zero activity recorded in the last 30 days.' 
  },
  { 
    tool: 'Cursor', 
    currentPlan: 'Pro', 
    recommendedPlan: 'Pro', 
    savings: 0, 
    reason: 'Usage justifies the current tier.' 
  },
];

export default function ReportPage({ params }: { params: { id: string } }) {
  const totalSpend = 1050;
  const totalSavings = 320;
  const efficiencyScore = 68;

  return (
    <DashboardLayout>
      <PageContainer>
        <div className="flex items-center gap-2 mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Button>
          </Link>
          <Badge variant="outline" className="ml-auto">Audit ID: {params.id || 'DEMO-123'}</Badge>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Audit Report</h1>
            <p className="text-xl text-muted-foreground">Generated on May 10, 2026</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" /> Export PDF
            </Button>
          </div>
        </div>

        {/* Hero Section - The "Money" Shot */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <Card className="bg-primary text-primary-foreground border-0 shadow-2xl relative overflow-hidden">
            <div className="absolute right-[-20px] top-[-20px] opacity-10">
              <TrendingDown size={120} />
            </div>
            <CardHeader>
              <CardTitle className="text-primary-foreground/80 font-medium">Monthly Savings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold mb-2">${totalSavings}</div>
              <p className="text-primary-foreground/60 text-sm">Save ${(totalSavings * 12).toLocaleString()}/year by optimizing tiers.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-muted-foreground font-medium">Current Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold mb-2">{efficiencyScore}%</div>
              <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-primary h-full transition-all duration-1000" 
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
              <div className="text-5xl font-bold mb-2">${totalSpend}</div>
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" /> 32% overspent
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations Section */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Lightbulb className="text-primary w-6 h-6" />
              Optimization Roadmap
            </h2>
            <div className="grid gap-4">
              {recommendations.map((rec, i) => (
                <Card key={i} className="overflow-hidden border-l-4 border-l-primary">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-lg">{rec.tool}</span>
                          <Badge variant="secondary">{rec.currentPlan} → {rec.recommendedPlan}</Badge>
                        </div>
                        <p className="text-muted-foreground text-sm">{rec.reason}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">-${rec.savings}/mo</div>
                        <div className="text-xs text-muted-foreground">Immediate Savings</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <Card className="bg-muted/30 border-dashed">
            <CardHeader>
              <CardTitle className="text-lg">Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              <div className="flex gap-4 items-start p-4 bg-background rounded-lg border">
                <div className="p-2 bg-primary/10 rounded-full shrink-0">
                  <Zap className="text-primary w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Downgrade ChatGPT</div>
                  <p className="text-xs text-muted-foreground">Move to Team tier to save $120/mo instantly.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start p-4 bg-background rounded-lg border">
                <div className="p-2 bg-primary/10 rounded-full shrink-0">
                  <CheckCircle2 className="text-primary w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Cancel Claude Subscription</div>
                  <p className="text-xs text-muted-foreground">Remove 5 unused seats to save $100/mo.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </DashboardLayout>
  );
}
