import { z } from 'zod';

export const auditItemSchema = z.object({
  toolId: z.string().min(1, 'Please select a tool'),
  tier: z.enum(['free', 'go', 'plus', 'pro', 'pro_plus', 'team', 'business', 'enterprise', 'ultra', 'max']),
  monthlySpend: z.number().min(0, 'Spend cannot be negative'),
  seats: z.number().int().min(1, 'Minimum 1 seat required'),
});

export const auditFormSchema = z.object({
  teamSize: z.number().int().min(1, 'Minimum team size is 1'),
  useCase: z.enum(['individual', 'startup', 'enterprise']),
  items: z.array(auditItemSchema).min(1, 'Add at least one tool to audit'),
});

export type AuditFormData = z.infer<typeof auditFormSchema>;
