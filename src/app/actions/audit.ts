'use server';

import { auditFormSchema, AuditFormData } from '@/features/calculator/schema';
import { performAudit } from '@/core/engine';
import { AuditResult } from '@/types/audit';

export async function submitAuditAction(data: AuditFormData): Promise<{ success: boolean; result?: AuditResult; error?: string }> {
  try {
    // Validate data on server
    const validated = auditFormSchema.parse(data);

    // Perform deterministic audit
    const result = performAudit(validated);

    // In a real app, we would save to Supabase here
    // const { data: audit, error } = await supabase.from('audits').insert({ ... }).select().single();

    return {
      success: true,
      result,
    };
  } catch (err) {
    console.error('Audit submission error:', err);
    return {
      success: false,
      error: 'Failed to process audit. Please check your inputs.',
    };
  }
}
