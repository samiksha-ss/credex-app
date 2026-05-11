import { createClient } from '@/utils/supabase/server';

export interface AuditRecord {
  id: string;
  created_at: string;
  user_id: string;
  team_size: number;
  use_case: string;
  total_spend: number;
  potential_savings: number;
  items: { toolId: string; monthlySpend: number; seats: number; tier: string }[];
}

export async function getAudits() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from('audits')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching audits:', error);
    return [];
  }

  return data as AuditRecord[];
}

export async function getAuditById(id: string) {
  const supabase = await createClient();
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

export async function saveAudit(audit: Omit<AuditRecord, 'id' | 'created_at' | 'user_id'>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('audits')
    .insert({
      ...audit,
      user_id: user.id,
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving audit:', error);
    throw error;
  }

  return data as AuditRecord;
}
