import { AuditForm } from '@/features/calculator/components/audit-form';

export default function AuditPage() {
  return (
    <div className="container mx-auto max-w-4xl py-10 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">AI Spend Audit</h1>
        <p className="mt-2 text-muted-foreground">
          Identify overspending and optimize your AI tool stack in 3 simple steps.
        </p>
      </div>

      <AuditForm />
    </div>
  );
}