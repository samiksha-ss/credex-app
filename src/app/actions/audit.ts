'use server';

import { auditFormSchema, AuditFormData } from '@/features/calculator/schema';
import { performAudit } from '@/core/engine';
import { AuditResult } from '@/types/audit';

export async function submitAuditAction(data: AuditFormData): Promise<{ success: boolean; result?: AuditResult; error?: string; auditId?: string }> {
  try {
    // Validate data on server
    const validated = auditFormSchema.parse(data);

    // Perform deterministic audit
    const result = performAudit(validated);

    // Save to Supabase
    const { saveAudit } = await import('@/services/audit');
    const savedAudit = await saveAudit({
      team_size: validated.teamSize,
      use_case: validated.useCase,
      total_spend: result.totalMonthlySpend,
      potential_savings: result.totalPotentialSavings,
      items: validated.items,
    });

    return {
      success: true,
      result,
      auditId: savedAudit.id,
    };
  } catch (err) {
    console.error('Audit submission error:', err);
    return {
      success: false,
      error: 'Failed to process audit. Please check your inputs.',
    };
  }
}
