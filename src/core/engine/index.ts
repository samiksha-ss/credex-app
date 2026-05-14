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
    if (currentPlan.monthlyCostPerSeat > 0 && item.monthlySpend > expectedCost + 5) {
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
      if (
        altPlan &&
        altPlan.monthlyCostPerSeat > 0 &&
        altPlan.monthlyCostPerSeat < currentPlan.monthlyCostPerSeat
      ) {
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
 
  // 5. Annual Billing Check
  input.items.forEach((item) => {
    const tool = PRICING_CONFIG[item.toolId];
    if (!tool) return;

    const currentPlan = tool.plans.find((p) => p.tier === item.tier);
    if (!currentPlan || !currentPlan.annualCostPerSeat) return;

    const monthlySavings = (currentPlan.monthlyCostPerSeat - currentPlan.annualCostPerSeat) * item.seats;
    if (monthlySavings > 2) { // Only suggest if savings are meaningful
      recommendations.push({
        toolId: item.toolId,
        type: 'optimize',
        message: `Switching ${tool.name} to annual billing would save you $${(monthlySavings * 12).toFixed(2)} per year ($${monthlySavings.toFixed(2)}/mo).`,
        potentialSavings: monthlySavings,
        isHighFriction: true,
        priority: 'low',
      });
      totalPotentialSavings += monthlySavings;
    }
  });

  // Calculate Efficiency Score
  const efficiencyScore =
    totalMonthlySpend > 0 ? Math.max(0, 100 - (totalPotentialSavings / totalMonthlySpend) * 100) : 100;

  const aiSummary = generateExecutiveSummary(totalMonthlySpend, totalPotentialSavings, efficiencyScore, input.useCase);

  return {
    totalMonthlySpend,
    totalPotentialSavings,
    recommendations,
    efficiencyScore,
    aiSummary,
  };
}

function generateExecutiveSummary(spend: number, savings: number, score: number, useCase: string): string {
  if (savings === 0) {
    return `Your AI stack is exceptionally lean with a ${score}% efficiency score. For a ${useCase} of this scale, your current resource allocation is optimal, leaving zero immediate capital waste.`;
  }

  const impact = savings > 100 ? 'significant' : 'moderate';
  return `We've identified ${impact} capital efficiency leaks in your AI stack, totaling $${Math.round(savings * 12).toLocaleString()} in annual runway impact. By executing the recommended tier optimizations, you can improve your efficiency score to 95%+ while maintaining full operational capability.`;
}
