import { describe, it, expect } from 'vitest';
import { performAudit } from '../index';
import { AuditInput } from '@/types/audit';

describe('Audit Engine', () => {
  it('should identify over-provisioned seats', () => {
    const input: AuditInput = {
      teamSize: 5,
      useCase: 'mixed',
      items: [
        {
          toolId: 'chatgpt',
          tier: 'plus',
          monthlySpend: 200, // 10 seats at $20
          seats: 10,
        },
      ],
    };

    const result = performAudit(input);

    expect(result.totalPotentialSavings).toBeGreaterThan(0);
    expect(result.recommendations).toContainEqual(
      expect.objectContaining({
        type: 'optimize',
        toolId: 'chatgpt',
      })
    );
    // 10 seats - 5 teamSize = 5 seats over. 5 * $20 = $100 savings.
    const rec = result.recommendations.find((r) => r.type === 'optimize');
    expect(rec?.potentialSavings).toBe(100);
  });

  it('should suggest downgrading if team size is below minimum for a tier', () => {
    const input: AuditInput = {
      teamSize: 2,
      useCase: 'mixed',
      items: [
        {
          toolId: 'windsurf',
          tier: 'enterprise',
          monthlySpend: 150, // 5 seats * $30 (Enterprise has minSeats: 5)
          seats: 5,
        },
      ],
    };

    const result = performAudit(input);

    expect(result.recommendations).toContainEqual(
      expect.objectContaining({
        type: 'downgrade',
        toolId: 'windsurf',
      })
    );
  });

  it('should return 100 efficiency if already optimized', () => {
    const input: AuditInput = {
      teamSize: 5,
      useCase: 'mixed',
      items: [
        {
          toolId: 'openai_api',
          tier: 'api',
          monthlySpend: 100,
          seats: 1,
        },
      ],
    };

    const result = performAudit(input);

    expect(result.totalPotentialSavings).toBe(0);
    expect(result.efficiencyScore).toBe(100);
  });

  it('should suggest switching to a cheaper alternative if savings are significant', () => {
    const input: AuditInput = {
      teamSize: 10,
      useCase: 'mixed',
      items: [
        {
          toolId: 'chatgpt',
          tier: 'pro',
          monthlySpend: 2000, // 10 seats * $200
          seats: 10,
        },
      ],
    };

    const result = performAudit(input);

    // Same tier `pro`: Claude Pro ~$20 vs ChatGPT Pro $200 → $180/seat * 10
    expect(result.recommendations).toContainEqual(
      expect.objectContaining({
        type: 'switch',
        toolId: 'chatgpt',
        potentialSavings: 1800,
      })
    );
  });
});
