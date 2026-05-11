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
  if (!audit) return { title: 'Report Not Found — Credex' };

  const savings = Math.round(audit.potential_savings);
  return {
    title: `Save $${savings}/mo — AI Spend Audit by Credex`,
    description: `This audit identified $${savings}/month in potential AI tool savings. See the full breakdown.`,
    openGraph: {
      title: `Save $${savings}/mo on AI Tools`,
      description: `This audit identified $${savings}/month in savings. See the full breakdown.`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Save $${savings}/mo on AI Tools`,
      description: `This audit identified $${savings}/month in savings. See the full breakdown.`,
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
