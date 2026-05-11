export type ToolTier = 'free' | 'go' | 'plus' | 'pro' | 'pro_plus' | 'team' | 'business' | 'enterprise' | 'ultra' | 'max' | 'api';

export interface PricingPlan {
  name: string;
  tier: ToolTier;
  monthlyCostPerSeat: number;
  annualCostPerSeat?: number;
  minSeats?: number;
  features: string[];
  limitations?: string[];
}

export interface ToolPricing {
  id: string;
  name: string;
  plans: PricingPlan[];
  alternatives: string[];
}

export const PRICING_CONFIG: Record<string, ToolPricing> = {
  chatgpt: {
    id: 'chatgpt',
    name: 'ChatGPT',
    plans: [
      {
        name: 'Free',
        tier: 'free',
        monthlyCostPerSeat: 0,
        features: ['Basic model access'],
      },
      {
        name: 'Plus',
        tier: 'plus',
        monthlyCostPerSeat: 20,
        features: ['GPT-4o Full Access', 'DALL-E', 'Data Analysis'],
      },
      {
        name: 'Team',
        tier: 'team',
        monthlyCostPerSeat: 30,
        minSeats: 2,
        features: ['Team workspace', 'Admin console'],
      },
      {
        name: 'Enterprise',
        tier: 'enterprise',
        monthlyCostPerSeat: 60,
        features: ['SSO', 'Advanced Security', 'Highest usage limits'],
      },
      {
        name: 'API Direct',
        tier: 'api',
        monthlyCostPerSeat: 5,
        features: ['Pay as you go API'],
      },
    ],
    alternatives: ['claude', 'gemini'],
  },
  gemini: {
    id: 'gemini',
    name: 'Google Gemini',
    plans: [
      {
        name: 'Free',
        tier: 'free',
        monthlyCostPerSeat: 0,
        features: ['Basic model access'],
      },
      {
        name: 'Advanced',
        tier: 'plus',
        monthlyCostPerSeat: 20,
        features: ['1.5 Pro', '2TB Storage'],
      },
      {
        name: 'Business',
        tier: 'team',
        monthlyCostPerSeat: 20,
        features: ['Enterprise-grade data protection', 'Workspace integration'],
      },
      {
        name: 'Enterprise',
        tier: 'enterprise',
        monthlyCostPerSeat: 30,
        features: ['Advanced security', 'Highest context window'],
      },
      {
        name: 'Ultra',
        tier: 'ultra',
        monthlyCostPerSeat: 30,
        features: ['Access to Gemini 1.5 Ultra'],
      },
      {
        name: 'API',
        tier: 'api',
        monthlyCostPerSeat: 5,
        features: ['API Access'],
      },
    ],
    alternatives: ['chatgpt', 'claude'],
  },
  claude: {
    id: 'claude',
    name: 'Claude',
    plans: [
      {
        name: 'Free',
        tier: 'free',
        monthlyCostPerSeat: 0,
        features: ['Basic model access'],
      },
      {
        name: 'Pro',
        tier: 'pro',
        monthlyCostPerSeat: 20,
        annualCostPerSeat: 16,
        features: ['Claude 3.5 Sonnet', 'Projects Feature'],
      },
      {
        name: 'Team',
        tier: 'team',
        monthlyCostPerSeat: 30,
        annualCostPerSeat: 25,
        minSeats: 5,
        features: ['Centralized billing', 'Team features'],
      },
      {
        name: 'Enterprise',
        tier: 'enterprise',
        monthlyCostPerSeat: 60,
        features: ['Enterprise-grade features', 'Highest rate limits'],
      },
      {
        name: 'Max',
        tier: 'max',
        monthlyCostPerSeat: 40,
        features: ['Max features'],
      },
      {
        name: 'API Direct',
        tier: 'api',
        monthlyCostPerSeat: 5,
        features: ['API Access'],
      },
    ],
    alternatives: ['chatgpt', 'gemini'],
  },
  perplexity: {
    id: 'perplexity',
    name: 'Perplexity',
    plans: [
      {
        name: 'Free',
        tier: 'free',
        monthlyCostPerSeat: 0,
        features: ['Standard search'],
      },
      {
        name: 'Pro',
        tier: 'pro',
        monthlyCostPerSeat: 20,
        annualCostPerSeat: 16.67,
        features: ['Pro Search', 'File uploads', 'Model selection'],
      },
      {
        name: 'Enterprise',
        tier: 'enterprise',
        monthlyCostPerSeat: 40,
        features: ['SSO', 'Advanced privacy'],
      },
    ],
    alternatives: ['chatgpt', 'gemini'],
  },
  deepseek: {
    id: 'deepseek',
    name: 'DeepSeek',
    plans: [
      {
        name: 'Free',
        tier: 'free',
        monthlyCostPerSeat: 0,
        features: ['R1 & V3 access'],
      },
      {
        name: 'API (Pay-as-you-go)',
        tier: 'go',
        monthlyCostPerSeat: 5, // Estimated minimum
        features: ['Extremely low cost API access'],
      },
    ],
    alternatives: ['chatgpt', 'claude'],
  },
  cursor: {
    id: 'cursor',
    name: 'Cursor',
    plans: [
      {
        name: 'Hobby',
        tier: 'free',
        monthlyCostPerSeat: 0,
        features: ['Basic AI features'],
      },
      {
        name: 'Pro',
        tier: 'pro',
        monthlyCostPerSeat: 20,
        annualCostPerSeat: 16,
        features: ['Unlimited premium models'],
      },
      {
        name: 'Business',
        tier: 'business',
        monthlyCostPerSeat: 40,
        features: ['SSO', 'Admin dash'],
      },
      {
        name: 'Enterprise',
        tier: 'enterprise',
        monthlyCostPerSeat: 60,
        features: ['Advanced security'],
      },
    ],
    alternatives: ['copilot'],
  },
  copilot: {
    id: 'copilot',
    name: 'GitHub Copilot',
    plans: [
      {
        name: 'Individual',
        tier: 'pro',
        monthlyCostPerSeat: 10,
        annualCostPerSeat: 8.33,
        features: ['Individual dev features'],
      },
      {
        name: 'Business',
        tier: 'team',
        monthlyCostPerSeat: 19,
        features: ['Basic team features'],
      },
      {
        name: 'Enterprise',
        tier: 'enterprise',
        monthlyCostPerSeat: 39,
        features: ['Knowledge bases', 'Custom models'],
      },
    ],
    alternatives: ['cursor'],
  },
  anthropic_api: {
    id: 'anthropic_api',
    name: 'Anthropic API',
    plans: [
      { name: 'API Direct', tier: 'api', monthlyCostPerSeat: 5, features: ['Pay as you go'] }
    ],
    alternatives: ['openai_api'],
  },
  openai_api: {
    id: 'openai_api',
    name: 'OpenAI API',
    plans: [
      { name: 'API Direct', tier: 'api', monthlyCostPerSeat: 5, features: ['Pay as you go'] }
    ],
    alternatives: ['anthropic_api'],
  },
  windsurf: {
    id: 'windsurf',
    name: 'Windsurf',
    plans: [
      { name: 'Free', tier: 'free', monthlyCostPerSeat: 0, features: ['Basic'] },
      { name: 'Pro', tier: 'pro', monthlyCostPerSeat: 15, features: ['Pro features'] },
      { name: 'Enterprise', tier: 'enterprise', monthlyCostPerSeat: 30, features: ['Enterprise features'] }
    ],
    alternatives: ['cursor', 'copilot'],
  },
};

