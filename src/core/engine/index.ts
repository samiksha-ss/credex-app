import { AuditInput, AuditResult, Recommendation } from '@/types/audit';
import { PRICING_CONFIG } from '@/config/pricing';

export function performAudit(input: AuditInput): AuditResult {
  const recommendations: Recommendation[] = [];
  let totalMonthlySpend = 0;
  let totalPotentialSavings = 0;

  input.items.forEach((item) => {
    totalMonthlySpend += item.monthlySpend;
    const tool = PRICING_CONFIG[item.toolId];

    if (!tool) return;

    const currentPlan = tool.plans.find((p) => p.tier === item.tier);
    if (!currentPlan) return;

    // 1. Seat Efficiency Check
    if (item.seats > input.teamSize) {
      const overprovisionedSeats = item.seats - input.teamSize;
      const seatSavings = overprovisionedSeats * currentPlan.monthlyCostPerSeat;

      if (seatSavings > 0) {
        recommendations.push({
          toolId: item.toolId,
          type: 'optimize',
          message: `You have ${item.seats} seats but a team size of ${input.teamSize}. Removing ${overprovisionedSeats} unused seat(s) could save you $${seatSavings.toFixed(2)}/mo.`,
          potentialSavings: seatSavings,
          isHighFriction: false,
          priority: 'high',
        });
        totalPotentialSavings += seatSavings;
      }
    }

    // 2. Team Tier Check (Minimum Seats)
    if (currentPlan.minSeats && input.teamSize < currentPlan.minSeats) {
      // Find the best lower tier
      const lowerTier = tool.plans
        .filter((p) => p.monthlyCostPerSeat < currentPlan.monthlyCostPerSeat && !p.minSeats)
        .sort((a, b) => b.monthlyCostPerSeat - a.monthlyCostPerSeat)[0];

      if (lowerTier) {
        const tierSavings =
          item.monthlySpend - lowerTier.monthlyCostPerSeat * Math.min(item.seats, input.teamSize);
        if (tierSavings > 0) {
          recommendations.push({
            toolId: item.toolId,
            type: 'downgrade',
            message: `You're on the ${currentPlan.name} plan which has a minimum of ${currentPlan.minSeats} seats. Downgrading to ${lowerTier.name} would be more cost-effective for your team of ${input.teamSize}.`,
            potentialSavings: tierSavings,
            isHighFriction: false,
            priority: 'medium',
          });
          totalPotentialSavings += tierSavings;
        }
      }
    }

    // 3. Simple Overspend Check (User inputs more than calculated cost)
    const expectedCost = currentPlan.monthlyCostPerSeat * item.seats;
    if (item.monthlySpend > expectedCost + 5) {
      // Allow $5 buffer
      const overcharge = item.monthlySpend - expectedCost;
      recommendations.push({
        toolId: item.toolId,
        type: 'optimize',
        message: `Your reported spend for ${tool.name} ($${item.monthlySpend}) is higher than the standard ${currentPlan.name} pricing ($${expectedCost}). Check for hidden add-ons or tax issues.`,
        potentialSavings: overcharge,
        isHighFriction: false,
        priority: 'low',
      });
      totalPotentialSavings += overcharge;
    }
  });

  // 4. Market Comparison (Switching Alternatives)
  // Logic: Only suggest if the potential savings are significant (> $50/mo total)
  input.items.forEach((item) => {
    const tool = PRICING_CONFIG[item.toolId];
    if (!tool) return;

    const currentPlan = tool.plans.find((p) => p.tier === item.tier);
    if (!currentPlan || currentPlan.monthlyCostPerSeat === 0) return;

    tool.alternatives.forEach((altId) => {
      const altTool = PRICING_CONFIG[altId];
      if (!altTool) return;

      // Find equivalent tier in alternative tool
      const altPlan = altTool.plans.find((p) => p.tier === item.tier);
      if (altPlan && altPlan.monthlyCostPerSeat < currentPlan.monthlyCostPerSeat) {
        const switchSavings =
          (currentPlan.monthlyCostPerSeat - altPlan.monthlyCostPerSeat) *
          Math.min(item.seats, input.teamSize);

        if (switchSavings >= 50) {
          recommendations.push({
            toolId: item.toolId,
            type: 'switch',
            message: `Switching from ${tool.name} to ${altTool.name} could save you $${switchSavings.toFixed(2)}/mo for similar features.`,
            potentialSavings: switchSavings,
            isHighFriction: true,
            priority: 'medium',
          });
          totalPotentialSavings += switchSavings;
        }
      }
    });
  });

  // Calculate Efficiency Score (simple version)
  const efficiencyScore =
    totalMonthlySpend > 0 ? Math.max(0, 100 - (totalPotentialSavings / totalMonthlySpend) * 100) : 100;

  return {
    totalMonthlySpend,
    totalPotentialSavings,
    recommendations,
    efficiencyScore,
  };
}
