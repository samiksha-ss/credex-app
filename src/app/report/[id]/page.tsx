import { PageContainer } from '@/components/layout/page-container';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { getAuditById } from '@/services/audit';
import { performAudit } from '@/core/engine';
import { AuditFormData } from '@/features/calculator/schema';
import { ReportClient } from './report-client';
import { Suspense } from 'react';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const audit = await getAuditById(id);
  if (!audit) return { title: 'Report not found — Credex' };

  const savings = Math.round(audit.potential_savings);
  return {
    title: `AI spend report — modeled savings $${savings}/mo — Credex`,
    description: `Modeled AI spend breakdown and recommendations. Savings figures are directional — validate against your invoices.`,
    openGraph: {
      title: `AI spend intelligence report — Credex`,
      description: `Modeled monthly savings around $${savings} — see assumptions and recommendations.`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `AI spend intelligence report — Credex`,
      description: `Modeled monthly savings around $${savings} — see assumptions and recommendations.`,
    },
  };
}

export default async function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  // Next.js 15: params is a Promise
  const { id } = await params;
  const audit = await getAuditById(id);

  if (!audit) {
    return (
      <DashboardLayout>
        <div className="h-[70vh] flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold">Report Not Found</h1>
          <p className="text-muted-foreground">We couldn&apos;t find the audit report you&apos;re looking for.</p>
          <Link href="/audit">
            <Button>Run a New Audit</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const result = performAudit({
    teamSize: audit.team_size,
    useCase: audit.use_case as AuditFormData['useCase'],
    items: audit.items as AuditFormData['items'],
  });

  return (
    <DashboardLayout>
      <PageContainer>
        <Suspense fallback={
          <div className="h-[60vh] flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        }>
          <ReportClient audit={audit} result={result} />
        </Suspense>
      </PageContainer>
    </DashboardLayout>
  );
}
