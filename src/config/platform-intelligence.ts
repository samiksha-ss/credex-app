/**
 * Representative platform intelligence for Credex comparison UX.
 * Figures are indicative for modeling — vendors change pricing frequently.
 */

export type PlatformKind = 'assistant' | 'coding_ide' | 'api';

export type StartupFit = 'strong' | 'moderate' | 'depends';

export interface PlatformIntel {
  id: string;
  name: string;
  kind: PlatformKind;
  /** Lowest typical paid seat / user / month (USD), for sorting — illustrative */
  seatFromUsd: number | null;
  /** Short seat-pricing context */
  seatNote: string;
  /** API or usage-based summary */
  apiSummary: string;
  /** Annual vs monthly angle */
  billingAngle: string;
  planTiers: string[];
  idealUseCases: string[];
  strengths: string[];
  weaknesses: string[];
  startupFit: StartupFit;
  /** 1–10 relative efficiency indicator for typical startup workloads (not a guarantee) */
  costEfficiencyIndicator: number;
  bestFor: string[];
  savingsAngles: string[];
  /** Highlight cards */
  highlights: string[];
}

export const PLATFORM_INTEL_DISCLAIMER =
  'Indicative data for planning. Verify current list prices, seat minimums, and usage limits with each vendor before buying.';

export const PLATFORM_INTEL: PlatformIntel[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT (OpenAI)',
    kind: 'assistant',
    seatFromUsd: 20,
    seatNote: 'Plus ~$20/user/mo; Team ~$25–30; Enterprise custom',
    apiSummary: 'OpenAI API billed per token — separate from ChatGPT seats',
    billingAngle: 'Annual prepay often available on Team/Enterprise; Plus is monthly-first',
    planTiers: ['Free', 'Plus', 'Team', 'Enterprise'],
    idealUseCases: ['General knowledge work', 'Drafting', 'Light analysis', 'Org-wide assistant'],
    strengths: ['Broad model choice', 'Strong ecosystem', 'Admin controls on Team+'],
    weaknesses: ['Seat + usage can stack', 'Tier sprawl as models evolve'],
    startupFit: 'strong',
    costEfficiencyIndicator: 7,
    bestFor: ['Default assistant', 'Mixed teams', 'Non-technical users'],
    savingsAngles: ['Right-size Team vs Plus spread', 'Consolidate duplicate seats', 'Route heavy workloads to API with caps'],
    highlights: ['Best overall reach for mixed startup teams'],
  },
  {
    id: 'claude',
    name: 'Claude (Anthropic)',
    kind: 'assistant',
    seatFromUsd: 20,
    seatNote: 'Pro ~$20/user/mo; Team ~$30 with minimums; Max tier for power users',
    apiSummary: 'Anthropic API — strong long-context pricing dynamics vs OpenAI for some workloads',
    billingAngle: 'Pro often has annual discount; Team priced per seat with org features',
    planTiers: ['Free', 'Pro', 'Team', 'Enterprise', 'Max'],
    idealUseCases: ['Long documents', 'Policy/compliance drafts', 'Research synthesis'],
    strengths: ['Long context', 'Careful tone defaults', 'Strong for writing-heavy workflows'],
    weaknesses: ['Team minimums can bite small shops', 'Model cadence requires re-benchmarking'],
    startupFit: 'strong',
    costEfficiencyIndicator: 8,
    bestFor: ['Writing-heavy roles', 'Legal/ops adjacency', 'Long PDF workflows'],
    savingsAngles: ['Avoid Max unless utilization is provably high', 'Pair Team with API for batch jobs'],
    highlights: ['Often strong $/quality for document-heavy work'],
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    kind: 'assistant',
    seatFromUsd: 0,
    seatNote: 'Google AI Pro/Ultra vary by bundle; Workspace alignment affects TCO',
    apiSummary: 'Gemini API + Vertex — attractive at scale when already on GCP',
    billingAngle: 'Bundling with Workspace can improve effective cost — model carefully',
    planTiers: ['Free', 'Advanced/Pro', 'Business', 'Enterprise'],
    idealUseCases: ['Google Workspace shops', 'Multimodal', 'Cloud-native product teams'],
    strengths: ['Workspace integration', 'GCP billing consolidation', 'Competitive API promos'],
    weaknesses: ['SKU naming changes', 'TCO depends on existing Google contracts'],
    startupFit: 'depends',
    costEfficiencyIndicator: 7,
    bestFor: ['Workspace-native startups', 'GCP-heavy stacks'],
    savingsAngles: ['Bundle vs standalone assistant', 'Use API for bursty workloads'],
    highlights: ['Best when you already live in Google Cloud + Workspace'],
  },
  {
    id: 'cursor',
    name: 'Cursor',
    kind: 'coding_ide',
    seatFromUsd: 20,
    seatNote: 'Pro ~$20/user/mo; Business higher with admin + SSO',
    apiSummary: 'Usage-based model calls inside IDE — monitor per-developer burn',
    billingAngle: 'Annual plans sometimes offered; usage can dominate seat fee',
    planTiers: ['Hobby', 'Pro', 'Business', 'Enterprise'],
    idealUseCases: ['Full-stack shipping', 'Refactors', 'Codebase Q&A'],
    strengths: ['Fast iteration in-repo', 'Strong multi-file edits', 'Agent workflows'],
    weaknesses: ['Power users can spike usage costs', 'Overlap with Copilot if both paid'],
    startupFit: 'strong',
    costEfficiencyIndicator: 7,
    bestFor: ['IC-heavy eng teams', 'Monorepos', 'Agentic coding'],
    savingsAngles: ['Rightsize Business vs Pro', 'Cap premium model usage', 'Avoid duplicate IDE assistants'],
    highlights: ['Best-in-class for agentic IDE workflows'],
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    kind: 'coding_ide',
    seatFromUsd: 10,
    seatNote: 'Individual ~$10–19; Business/Enterprise higher with policy features',
    apiSummary: 'Copilot Chat + completions included; enterprise add-ons separate',
    billingAngle: 'Annual Individual is cheapest per dev for baseline completions',
    planTiers: ['Individual', 'Business', 'Enterprise'],
    idealUseCases: ['GitHub-centric SDLC', 'PR review assist', 'Baseline completions'],
    strengths: ['GitHub-native', 'Predictable seat SKU', 'Enterprise compliance path'],
    weaknesses: ['Less “agent-first” than some IDEs', 'Overlaps with Cursor for some teams'],
    startupFit: 'strong',
    costEfficiencyIndicator: 8,
    bestFor: ['GitHub-first eng orgs', 'Baseline coding assist at lower seat cost'],
    savingsAngles: ['Pick Copilot or Cursor, not both', 'Annual Individual for solo ICs', 'Prune inactive assignees monthly'],
    highlights: ['Strong default for GitHub-native startups on a budget'],
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    kind: 'coding_ide',
    seatFromUsd: 15,
    seatNote: 'Pro tiers competitive; verify current list for your region',
    apiSummary: 'IDE-integrated usage similar to Cursor — watch model spend',
    billingAngle: 'Compare annual vs monthly if offered; validate against team size',
    planTiers: ['Free', 'Pro', 'Enterprise'],
    idealUseCases: ['Flow-style coding', 'Teams evaluating Cursor alternatives'],
    strengths: ['Fast-moving product', 'Competitive positioning', 'Agent flows'],
    weaknesses: ['Smaller ecosystem vs incumbents', 'Pricing moves quickly'],
    startupFit: 'moderate',
    costEfficiencyIndicator: 7,
    bestFor: ['Teams wanting an alternative IDE assistant', 'Price-sensitive pilots'],
    savingsAngles: ['Pilot on a subset of repos', 'Benchmark usage vs Cursor before dual spend'],
    highlights: ['Fast-growing alternative worth A/B testing in the IDE'],
  },
  {
    id: 'openai_api',
    name: 'OpenAI API',
    kind: 'api',
    seatFromUsd: null,
    seatNote: 'N/A — usage-based',
    apiSummary: 'Token pricing across GPT family; batch/discount programs for volume',
    billingAngle: 'Prepaid credits and tier discounts — compare to committed spend',
    planTiers: ['Pay-as-you-go', 'Scale tier programs'],
    idealUseCases: ['Product features', 'Batch jobs', 'Evals', 'RAG pipelines'],
    strengths: ['Broad model matrix', 'Mature tooling', 'Volume economics'],
    weaknesses: ['Cost drift without budgets/alerts', 'Requires engineering guardrails'],
    startupFit: 'depends',
    costEfficiencyIndicator: 6,
    bestFor: ['Productized AI', 'High-scale inference', 'Multi-tenant SaaS'],
    savingsAngles: ['Caching + prompt compression', 'Model routing to smaller models', 'Batch APIs where latency allows'],
    highlights: ['Best API economics when you engineer for cost controls'],
  },
  {
    id: 'anthropic_api',
    name: 'Anthropic API',
    kind: 'api',
    seatFromUsd: null,
    seatNote: 'N/A — usage-based',
    apiSummary: 'Token pricing; strong for long inputs — compare $/1M tokens vs OpenAI per workload',
    billingAngle: 'Committed use / enterprise agreements for stable burn',
    planTiers: ['Pay-as-you-go', 'Enterprise'],
    idealUseCases: ['Long-context ingestion', 'Agent backends', 'Document pipelines'],
    strengths: ['Long context', 'Predictable quality on many tasks', 'Enterprise story'],
    weaknesses: ['Needs spend monitoring', 'Not a replacement for seat planning'],
    startupFit: 'depends',
    costEfficiencyIndicator: 7,
    bestFor: ['Backends where context length drives value'],
    savingsAngles: ['Route short queries to cheaper models', 'Summarize before full doc send'],
    highlights: ['Best API economics when long context reduces pipeline complexity'],
  },
];

export const COMPARE_SPOTLIGHTS: { id: string; title: string; description: string; platformIds: string[] }[] = [
  {
    id: 'startup-value',
    title: 'Best value for startups (seats)',
    description: 'Lower entry seat pricing and predictable SKUs for small teams.',
    platformIds: ['copilot', 'chatgpt', 'claude'],
  },
  {
    id: 'coding',
    title: 'Best coding assistant',
    description: 'IDE-native velocity — weigh overlap so you do not double-pay.',
    platformIds: ['cursor', 'copilot', 'windsurf'],
  },
  {
    id: 'enterprise',
    title: 'Best enterprise option',
    description: 'Admin, SSO, and procurement paths — expect custom pricing.',
    platformIds: ['chatgpt', 'claude', 'gemini', 'copilot'],
  },
  {
    id: 'efficient',
    title: 'Most cost-efficient (indicative)',
    description: 'Higher score means fewer friction points for typical startup utilization — still validate in your stack.',
    platformIds: ['claude', 'copilot', 'cursor', 'chatgpt'],
  },
  {
    id: 'api',
    title: 'Best API economics (engineering-dependent)',
    description: 'APIs reward architecture: caching, routing, and batching beat list token prices alone.',
    platformIds: ['openai_api', 'anthropic_api'],
  },
  {
    id: 'alternatives',
    title: 'Fast-growing alternatives',
    description: 'Worth controlled pilots alongside incumbents.',
    platformIds: ['windsurf', 'gemini'],
  },
];
