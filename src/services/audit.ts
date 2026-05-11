import { createServiceClient } from '@/utils/supabase/service';

export interface AuditRecord {
  id: string;
  created_at: string;
  user_id: string | null;
  team_size: number;
  use_case: string;
  total_spend: number;
  potential_savings: number;
  items: { toolId: string; monthlySpend: number; seats: number; tier: string }[];
}

export interface LeadRecord {
  id: string;
  created_at: string;
  audit_id: string;
  email: string;
  company_name?: string;
  role?: string;
  team_size?: number;
}

// ----- Audit CRUD (no auth required) -----

export async function getAudits(): Promise<AuditRecord[]> {
  // Without auth, we can't meaningfully scope audits to a user.
  // Return empty array — dashboard shows an empty state.
  return [];
}

export async function getAuditById(id: string): Promise<AuditRecord | null> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('audits')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching audit:', error);
    return null;
  }

  return data as AuditRecord;
}

export async function saveAudit(
  audit: Omit<AuditRecord, 'id' | 'created_at' | 'user_id'>
): Promise<AuditRecord> {
  const supabase = createServiceClient();

  const { data, error } = await supabase
    .from('audits')
    .insert({ ...audit, user_id: null })
    .select()
    .single();

  if (error) {
    console.error('Error saving audit:', error);
    throw error;
  }

  return data as AuditRecord;
}

// ----- Lead Capture -----

export async function saveLead(lead: Omit<LeadRecord, 'id' | 'created_at'>): Promise<void> {
  const supabase = createServiceClient();

  const { error } = await supabase.from('leads').insert(lead);

  if (error) {
    console.error('Error saving lead:', error);
    throw error;
  }
}
