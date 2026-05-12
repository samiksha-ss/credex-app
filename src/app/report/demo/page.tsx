import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { PageContainer } from '@/components/layout/page-container';
import { ReportClient } from '../[id]/report-client';
import { AuditRecord } from '@/services/audit';
import { performAudit } from '@/core/engine';

// Hardcoded demo audit — no DB required
const DEMO_AUDIT: AuditRecord = {
  id: 'demo',
  created_at: new Date().toISOString(),
  user_id: null,
  team_size: 6,
  use_case: 'coding',
  total_spend: 0, // filled by engine
  potential_savings: 0, // filled by engine
  items: [
    { toolId: 'chatgpt', tier: 'team', monthlySpend: 180, seats: 6 },
    { toolId: 'cursor', tier: 'business', monthlySpend: 240, seats: 6 },
    { toolId: 'claude', tier: 'team', monthlySpend: 180, seats: 6 },
    { toolId: 'copilot', tier: 'team', monthlySpend: 114, seats: 6 },
  ],
};

export default function DemoReportPage() {
  const result = performAudit({
    teamSize: DEMO_AUDIT.team_size,
    useCase: 'coding',
    items: DEMO_AUDIT.items as Parameters<typeof performAudit>[0]['items'],
  });

  const populatedAudit: AuditRecord = {
    ...DEMO_AUDIT,
    total_spend: result.totalMonthlySpend,
    potential_savings: result.totalPotentialSavings,
  };

  return (
    <DashboardLayout>
      <PageContainer>
        <div className="mb-6 rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Demo report</span> — Sample audit for a six-person engineering team.{' '}
          <a href="/audit" className="font-medium text-primary underline-offset-4 hover:underline">
            Run your own audit
          </a>
          {' · '}
          <a href="/compare" className="font-medium text-primary underline-offset-4 hover:underline">
            Compare platforms
          </a>
        </div>
        <ReportClient audit={populatedAudit} result={result} />
      </PageContainer>
    </DashboardLayout>
  );
}
