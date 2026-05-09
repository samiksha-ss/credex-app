export type ToolTier = 'free' | 'plus' | 'pro' | 'team' | 'business' | 'enterprise';

export interface PricingPlan {
  name: string;
  tier: ToolTier;
  monthlyCostPerSeat: number;
  annualCostPerSeat?: number; // Optional if discounted
  minSeats?: number;
  features: string[];
  limitations?: string[];
}

export interface ToolPricing {
  id: string;
  name: string;
  plans: PricingPlan[];
  alternatives: string[]; // List of tool IDs that could replace this
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
        features: ['Unlimited messages on basic models', 'Limited GPT-4o access'],
      },
      {
        name: 'Plus',
        tier: 'plus',
        monthlyCostPerSeat: 20,
        features: ['Full GPT-4o access', 'DALL-E', 'Data Analysis'],
      },
      {
        name: 'Team',
        tier: 'team',
        monthlyCostPerSeat: 30,
        minSeats: 2,
        features: ['Admin console', 'Higher limits', 'Team workspace'],
      },
      {
        name: 'Enterprise',
        tier: 'enterprise',
        monthlyCostPerSeat: 60, // Estimated/Average for small enterprise
        features: ['SSO', 'Advanced Security', 'Unlimited high-speed GPT-4'],
      },
    ],
    alternatives: ['claude', 'gemini'],
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
        features: ['High-usage Claude 3.5 Sonnet', 'Projects Feature'],
      },
      {
        name: 'Team',
        tier: 'team',
        monthlyCostPerSeat: 30,
        minSeats: 5,
        features: ['Centralized billing', 'Team projects'],
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
        features: ['Unlimited premium models', '500 fast requests'],
      },
      {
        name: 'Business',
        tier: 'business',
        monthlyCostPerSeat: 40,
        features: ['SSO', 'Admin dashboard', 'Privacy mode by default'],
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
        features: ['Code suggestions', 'Chat in IDE'],
      },
      {
        name: 'Business',
        tier: 'business',
        monthlyCostPerSeat: 19,
        features: ['SSO', 'Organization management'],
      },
      {
        name: 'Enterprise',
        tier: 'enterprise',
        monthlyCostPerSeat: 39,
        features: ['Custom models', 'Knowledge base indexing'],
      },
    ],
    alternatives: ['cursor'],
  },
  gemini: {
    id: 'gemini',
    name: 'Google Gemini',
    plans: [
      {
        name: 'Free',
        tier: 'free',
        monthlyCostPerSeat: 0,
        features: ['Basic Gemini model access'],
      },
      {
        name: 'Advanced',
        tier: 'plus',
        monthlyCostPerSeat: 20,
        features: ['Gemini 1.5 Pro', '2TB Google One storage'],
      },
      {
        name: 'Business',
        tier: 'team',
        monthlyCostPerSeat: 20,
        minSeats: 1,
        features: ['Enterprise-grade data protection', 'Admin console'],
      },
    ],
    alternatives: ['chatgpt', 'claude'],
  },
};
