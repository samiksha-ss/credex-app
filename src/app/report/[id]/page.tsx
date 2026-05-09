import { ResultsDashboard } from '@/features/reports/components/results-dashboard';
import { AuditInput, AuditResult } from '@/types/audit';
import { performAudit } from '@/core/engine';
import { ShareButton } from '@/features/reports/components/share-button';
import { Button } from '@/components/ui/button';
import { Share2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Metadata } from 'next';

interface ReportPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ReportPageProps): Promise<Metadata> {
  const { id } = await params;
  const data = await getAuditData(id);
  
  if (!data) return { title: 'Audit Not Found | credex' };

  const savings = data.result.totalPotentialSavings.toFixed(0);
  const ogUrl = new URL('http://localhost:3000/api/og'); // In prod, use site URL
  ogUrl.searchParams.set('savings', savings);
  
  return {
    title: `AI Spend Audit - $${savings}/mo saved | credex`,
    description: `We just uncovered $${savings}/mo in potential savings on our AI tool stack using credex.`,
    openGraph: {
      images: [ogUrl.toString()],
    },
    twitter: {
      card: 'summary_large_image',
      images: [ogUrl.toString()],
    },
  };
}

// Mock function - in production, this would fetch from Supabase
async function getAuditData(id: string): Promise<{ input: AuditInput; result: AuditResult } | null> {
  // Simulate DB fetch delay
  await new Promise(resolve => setTimeout(resolve, 500));

  if (id === 'demo') {
    const input: AuditInput = {
      teamSize: 5,
      useCase: 'startup',
      items: [
        { toolId: 'chatgpt', tier: 'team', monthlySpend: 150, seats: 5 },
        { toolId: 'cursor', tier: 'pro', monthlySpend: 200, seats: 10 }, // Over-provisioned
      ],
    };
    return {
      input,
      result: performAudit(input),
    };
  }

  // Handle other IDs here or return not found
  return null;
}

export default async function ReportPage({ params }: ReportPageProps) {
  const { id } = await params;
  const data = await getAuditData(id);

  if (!data) {
    notFound();
  }

  return (
    <div className="container py-10 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Link href="/audit" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 mb-2">
            <ArrowLeft className="w-4 h-4" /> Back to Audit
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Your AI Spend Audit</h1>
          <p className="text-muted-foreground">Detailed breakdown and optimization report.</p>
        </div>
        <div className="flex gap-3">
          <ShareButton />
          <Button>Save to Dashboard</Button>
        </div>
      </div>

      <ResultsDashboard result={data.result} input={data.input} />

      {/* Placeholder for AI Summary */}
      <Card className="bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950 dark:to-background border-indigo-200">
        <CardHeader>
          <CardTitle className="text-indigo-900 dark:text-indigo-100 flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-500" />
            Strategic Executive Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-indigo-950/80 dark:text-indigo-200/80 leading-relaxed italic">
            &quot;Your current AI stack is heavily weighted toward developer productivity via Cursor, but shows significant seat leakage in your ChatGPT Team workspace. By consolidating over-provisioned seats and aligning your plan tiers with your actual headcount of 5, you can recapture enough capital to fund an entire additional SaaS tool or increase your R&D budget by nearly $1,200 annually.&quot;
          </p>
          <p className="mt-4 text-xs text-indigo-400 font-medium">— AI Insights Powered by Claude 3.5</p>
        </CardContent>
      </Card>
    </div>
  );
}

// Re-using types from dashboard file for local components if needed
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap } from 'lucide-react';
