import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { PageContainer } from '@/components/layout/page-container';
import { CompareClient } from '@/features/compare/components/compare-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Platform comparison — Credex',
  description:
    'Interactive AI platform, plan, and pricing intelligence for startups: seats, APIs, billing angles, and savings opportunities.',
};

export default function ComparePage() {
  return (
    <DashboardLayout>
      <PageContainer>
        <CompareClient />
      </PageContainer>
    </DashboardLayout>
  );
}
