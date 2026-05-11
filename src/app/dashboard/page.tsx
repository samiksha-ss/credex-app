import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { PageContainer } from '@/components/layout/page-container';
import { getAudits } from '@/services/audit';
import { DashboardClient } from './dashboard-client';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export default async function DashboardPage() {
  // Data fetching on the server
  const audits = await getAudits();

  return (
    <DashboardLayout>
      <PageContainer>
        <Suspense fallback={
          <div className="h-[60vh] flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        }>
          <DashboardClient audits={audits} />
        </Suspense>
      </PageContainer>
    </DashboardLayout>
  );
}
