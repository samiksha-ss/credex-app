import { AuditForm } from '@/features/calculator/components/audit-form';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { PageContainer } from '@/components/layout/page-container';

export default function AuditPage() {
  return (
    <DashboardLayout>
      <PageContainer>
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">Stack audit</h1>
          <p className="mt-2 text-muted-foreground leading-relaxed">
            Translate seats, tiers, and spend into a modeled view of overlap and downgrade paths — designed to pair
            with the platform comparison and your finance checks.
          </p>
        </div>

        <AuditForm />
      </PageContainer>
    </DashboardLayout>
  );
}