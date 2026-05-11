import { AuditForm } from '@/features/calculator/components/audit-form';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { PageContainer } from '@/components/layout/page-container';

export default function AuditPage() {
  return (
    <DashboardLayout>
      <PageContainer>
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight">AI Spend Audit</h1>
          <p className="mt-2 text-muted-foreground">
            Identify overspending and optimize your AI tool stack in 3 simple steps.
          </p>
        </div>

        <AuditForm />
      </PageContainer>
    </DashboardLayout>
  );
}