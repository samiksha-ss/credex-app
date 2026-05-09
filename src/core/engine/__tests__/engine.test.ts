import { describe, it, expect } from 'vitest';
import { performAudit } from '../index';
import { AuditInput } from '@/types/audit';

describe('Audit Engine', () => {
  it('should identify over-provisioned seats', () => {
    const input: AuditInput = {
      teamSize: 5,
      useCase: 'startup',
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
      useCase: 'startup',
      items: [
        {
          toolId: 'claude',
          tier: 'team',
          monthlySpend: 150, // 5 seats min * $30
          seats: 5,
        },
      ],
    };

    const result = performAudit(input);

    expect(result.recommendations).toContainEqual(
      expect.objectContaining({
        type: 'downgrade',
        toolId: 'claude',
      })
    );
  });

  it('should return 100 efficiency if already optimized', () => {
    const input: AuditInput = {
      teamSize: 5,
      useCase: 'startup',
      items: [
        {
          toolId: 'chatgpt',
          tier: 'plus',
          monthlySpend: 100, // 5 seats at $20
          seats: 5,
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
      useCase: 'startup',
      items: [
        {
          toolId: 'claude',
          tier: 'team',
          monthlySpend: 300, // 10 seats * $30
          seats: 10,
        },
      ],
    };

    const result = performAudit(input);

    // Gemini Business is $20/seat, saving $10/seat * 10 = $100
    expect(result.recommendations).toContainEqual(
      expect.objectContaining({
        type: 'switch',
        potentialSavings: 100,
      })
    );
  });
});
