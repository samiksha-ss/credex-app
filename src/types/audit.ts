import { ToolTier } from '@/config/pricing';

export interface AuditInputItem {
  toolId: string;
  tier: ToolTier;
  monthlySpend: number;
  seats: number;
}

export interface AuditInput {
  items: AuditInputItem[];
  teamSize: number;
  useCase: 'individual' | 'startup' | 'enterprise';
}

export interface Recommendation {
  toolId: string;
  type: 'downgrade' | 'switch' | 'consolidate' | 'optimize' | 'none';
  message: string;
  potentialSavings: number;
  isHighFriction: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface AuditResult {
  totalMonthlySpend: number;
  totalPotentialSavings: number;
  recommendations: Recommendation[];
  efficiencyScore: number; // 0 to 100
}
