import Anthropic from '@anthropic-ai/sdk';
import { AuditInput, AuditResult } from '@/types/audit';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function generateAuditSummary(input: AuditInput, result: AuditResult): Promise<string> {
  if (!process.env.ANTHROPIC_API_KEY) {
    return "Your AI stack shows significant opportunities for optimization. Review the recommendations below to identify specific seats and plan tiers that can be adjusted to maximize your efficiency score.";
  }

  const prompt = `
    You are a senior startup CTO and financial auditor. 
    Analyze the following AI spend audit data for a ${input.useCase} team of ${input.teamSize} people.
    
    Current Spend: $${result.totalMonthlySpend}/mo
    Potential Savings: $${result.totalPotentialSavings}/mo
    Efficiency Score: ${result.efficiencyScore}%
    
    Recommendations:
    ${result.recommendations.map(r => `- ${r.message}`).join('\n')}
    
    Write a concise, professional executive summary (2-3 sentences) explaining the strategic impact of these findings. 
    Focus on "runway" and "capital efficiency". Use a direct, entrepreneurial tone.
    Do not use generic fluff. Mention specific savings figures.
  `;

  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 150,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = message.content[0];
    if (content.type === 'text') {
      return content.text;
    }
    
    throw new Error('Unexpected AI response format');
  } catch (error) {
    console.error('AI Summary Error:', error);
    return "Strategic insight unavailable. Please proceed with the deterministic recommendations below.";
  }
}
