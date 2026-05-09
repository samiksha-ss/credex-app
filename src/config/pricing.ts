export type ToolTier = 'free' | 'go' | 'plus' | 'pro' | 'pro_plus' | 'team' | 'business' | 'enterprise' | 'ultra' | 'max';

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
        features: ['Claude 3.5 Sonnet', 'Projects Feature'],
      },
      {
        name: 'Team',
        tier: 'team',
        monthlyCostPerSeat: 30,
        minSeats: 5,
        features: ['Centralized billing', 'Team features'],
      },
      {
        name: 'Enterprise',
        tier: 'enterprise',
        monthlyCostPerSeat: 60,
        features: ['Enterprise-grade features', 'Highest rate limits'],
      },
    ],
    alternatives: ['chatgpt', 'gemini'],
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
        features: ['Unlimited premium models'],
      },
      {
        name: 'Business',
        tier: 'business',
        monthlyCostPerSeat: 40,
        features: ['SSO', 'Admin dash'],
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
};

