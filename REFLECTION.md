# REFLECTION

## 1. The hardest bug you hit this week, and how you debugged it
The hardest bug was related to the client-server boundary in Next.js 15 when integrating the Supabase client. Initially, I had a `DashboardPage` marked with `'use client'` that was directly importing and calling a `getAudits` service function. That service function internally used `createServerClient` from `@supabase/ssr` which relies on `next/headers`. This caused a silent failure and an opaque runtime error because `next/headers` is strictly server-side. 
My hypothesis was that the component tree was mixing client and server contexts improperly. I debugged it by isolating the data fetching logic into a pure server component and inspecting the network tab to see if the requests were firing. Once I confirmed the client-side fetch was failing, the fix was to refactor the architecture: I moved the data fetching to a Server Component (`page.tsx`) and passed the serialized data down to a Client Component (`dashboard-client.tsx`). This resolved the issue and improved the initial load performance.

## 2. A decision you reversed mid-week, and what made you reverse it
Initially, I planned to use an LLM for the actual audit math and logic (e.g., calculating the exact savings and recommending tiers). I quickly realized this was a mistake. LLMs are non-deterministic and prone to hallucinations, especially with specific pricing tiers that might change or require strict mathematical reasoning. I reversed this decision and built a purely deterministic, rule-based `AuditEngine` in TypeScript. This ensured that the financial recommendations were 100% accurate and defensible. I restricted the LLM's role to solely generating the personalized executive summary paragraph at the end, providing the best of both worlds: mathematical accuracy and personalized presentation.

## 3. What you would build in week 2 if you had it
If I had a second week, I would focus entirely on the viral growth loop and enterprise features. Specifically:
1. **SSO & Team Workspaces**: Allowing entire departments to log in and manage their stack collectively.
2. **Automated Receipt Parsing**: Allowing users to forward their billing receipts to an email address (e.g., `audit@credex.ai`) to automatically parse and populate the audit form.
3. **Embeddable Widgets**: Creating a `<script>` tag version of the audit form that popular tech bloggers or newsletters could embed, driving organic top-of-funnel leads.
4. **Live API Integrations**: Directly connecting to Okta or Google Workspace to detect unused seats automatically, removing manual data entry entirely.

## 4. How you used AI tools
I used AI tools (primarily Claude 3.5 Sonnet and GitHub Copilot) heavily for boilerplate generation and UI scaffolding. For instance, I used Copilot to rapidly flesh out the `PRICING_CONFIG` object and structure the Tailwind CSS classes for the `Card` components.
However, I strictly **did not trust** AI with the core financial logic in the `AuditEngine`. I manually verified all pricing data against vendor pages. 
One specific time the AI was wrong was when it suggested a "downgrade" from GitHub Copilot Business to Individual for a team of 15. The AI didn't account for the fact that Copilot Individual lacks organizational policy management, which is mandatory for a team of that size. I caught this and explicitly added `isHighFriction: true` or minimum seat constraints to the rules engine to prevent such bad recommendations.

## 5. Self-rating on a 1–10 scale
- **Discipline (9/10):** I consistently broke down tasks, managed my time effectively across the week, and maintained a clean git history.
- **Code Quality (8/10):** The architecture is clean and typed, using modern Next.js patterns, though some components could be further abstracted.
- **Design Sense (8/10):** The UI looks premium and B2B SaaS-ready, though micro-interactions could be enhanced.
- **Problem-solving (9/10):** I effectively separated deterministic logic from AI generation, a crucial architectural decision.
- **Entrepreneurial thinking (9/10):** I focused heavily on the conversion funnel, ensuring the tool actually generates leads rather than just being a cool tech demo.
