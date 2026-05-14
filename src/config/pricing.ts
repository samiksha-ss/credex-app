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

/** List-price style figures (USD/mo per seat unless noted). Used by the audit engine and calculator UI. */
export const PRICING_CONFIG: Record<string, ToolPricing> = {
  chatgpt: {
    id: 'chatgpt',
    name: 'ChatGPT',
    plans: [
      {
        name: 'Free',
        tier: 'free',
        monthlyCostPerSeat: 0,
        features: ['Limited model access'],
      },
      {
        name: 'Go',
        tier: 'go',
        monthlyCostPerSeat: 5,
        features: ['Lightweight paid access'],
      },
      {
        name: 'Plus',
        tier: 'plus',
        monthlyCostPerSeat: 20,
        features: ['GPT-4 class models', 'Higher limits'],
      },
      {
        name: 'Pro',
        tier: 'pro',
        monthlyCostPerSeat: 200,
        features: ['Highest limits', 'Research-grade workflows'],
      },
      {
        name: 'Business',
        tier: 'business',
        monthlyCostPerSeat: 21,
        features: ['Team workspace', 'Admin & billing'],
      },
      {
        name: 'API (usage)',
        tier: 'api',
        monthlyCostPerSeat: 0,
        features: ['Billed per token — separate from ChatGPT seats'],
        limitations: ['Not a fixed monthly seat price'],
      },
    ],
    alternatives: ['claude', 'gemini'],
  },
  gemini: {
    id: 'gemini',
    name: 'Google AI (Gemini)',
    plans: [
      {
        name: 'Free',
        tier: 'free',
        monthlyCostPerSeat: 0,
        features: ['Basic model access'],
      },
      {
        name: 'AI Plus',
        tier: 'plus',
        monthlyCostPerSeat: 5,
        features: ['Google AI subscription tier'],
      },
      {
        name: 'AI Pro',
        tier: 'pro',
        monthlyCostPerSeat: 23,
        features: ['Stronger models & limits'],
      },
      {
        name: 'AI Ultra',
        tier: 'ultra',
        monthlyCostPerSeat: 288,
        features: ['Top-tier Google AI access'],
      },
      {
        name: 'API (usage)',
        tier: 'api',
        monthlyCostPerSeat: 0,
        features: ['Gemini API / cloud — usage-based'],
        limitations: ['Not a fixed monthly seat price'],
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
        features: ['Higher limits', 'Projects'],
      },
      {
        name: 'Max',
        tier: 'max',
        monthlyCostPerSeat: 150,
        features: ['Power-user tier'],
        limitations: ['Vendor pricing often ~$100–200/mo; midpoint used for modeling'],
      },
      {
        name: 'API (usage)',
        tier: 'api',
        monthlyCostPerSeat: 0,
        features: ['Anthropic API — usage-based'],
        limitations: ['Not a fixed monthly seat price'],
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
        monthlyCostPerSeat: 5,
        features: ['Low-cost API access'],
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
        features: ['Limited agent requests'],
      },
      {
        name: 'Pro',
        tier: 'pro',
        monthlyCostPerSeat: 20,
        annualCostPerSeat: 16,
        features: ['Unlimited tab completions', 'Extended agent limits'],
      },
      {
        name: 'Pro+',
        tier: 'pro_plus',
        monthlyCostPerSeat: 60,
        features: ['3× usage on OpenAI, Claude, Gemini'],
      },
      {
        name: 'Ultra',
        tier: 'ultra',
        monthlyCostPerSeat: 200,
        features: ['20× usage vs Pro', 'Priority access'],
      },
    ],
    alternatives: ['copilot'],
  },
  copilot: {
    id: 'copilot',
    name: 'GitHub Copilot',
    plans: [
      {
        name: 'Pro',
        tier: 'pro',
        monthlyCostPerSeat: 10,
        annualCostPerSeat: 8.33,
        features: ['Completions & Chat for individuals'],
      },
      {
        name: 'Pro+',
        tier: 'pro_plus',
        monthlyCostPerSeat: 39,
        features: ['Premium models', 'Higher limits'],
      },
      {
        name: 'Team',
        tier: 'team',
        monthlyCostPerSeat: 4,
        features: ['Org licensing', 'Policy controls'],
      },
      {
        name: 'Enterprise',
        tier: 'enterprise',
        monthlyCostPerSeat: 21,
        features: ['SSO', 'IP indemnity', 'Audit logs'],
      },
    ],
    alternatives: ['cursor'],
  },
  anthropic_api: {
    id: 'anthropic_api',
    name: 'Anthropic API',
    plans: [{ name: 'API Direct', tier: 'api', monthlyCostPerSeat: 0, features: ['Pay as you go'] }],
    alternatives: ['openai_api'],
  },
  openai_api: {
    id: 'openai_api',
    name: 'OpenAI API',
    plans: [{ name: 'API Direct', tier: 'api', monthlyCostPerSeat: 0, features: ['Pay as you go'] }],
    alternatives: ['anthropic_api'],
  },
  windsurf: {
    id: 'windsurf',
    name: 'Windsurf',
    plans: [
      { name: 'Free', tier: 'free', monthlyCostPerSeat: 0, features: ['Basic'] },
      { name: 'Pro', tier: 'pro', monthlyCostPerSeat: 15, features: ['Pro features'] },
      {
        name: 'Enterprise',
        tier: 'enterprise',
        monthlyCostPerSeat: 30,
        minSeats: 5,
        features: ['Enterprise features'],
      },
    ],
    alternatives: ['cursor', 'copilot'],
  },
};
