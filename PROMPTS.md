# PROMPTS.md

This document tracks how AI tools were used during development of the AI Spend Audit platform.

The goal of this log is transparency:

- what tools were used
- where they helped
- where they failed
- what kinds of prompts produced useful outputs
- what still required manual engineering judgment

---

# AI Tools Used

| Tool           | Purpose                                                                                |
| -------------- | -------------------------------------------------------------------------------------- |
| ChatGPT        | Architecture planning, implementation strategy, debugging assistance, product thinking |
| Antigravity    | Structured implementation planning and feature scaffolding                             |
| Claude         | Copy refinement, summarization experiments, reasoning comparisons                      |
| GitHub Copilot | Inline autocomplete and repetitive implementation assistance                           |

---

# Prompting Philosophy

I intentionally avoided using AI to generate the entire application in one shot.

Instead, I used AI tools in an iterative engineering workflow:

1. Define architecture
2. Define constraints
3. Break work into phases
4. Generate feature-level implementation plans
5. Review outputs critically
6. Refactor and adjust manually

The focus was on using AI as an engineering collaborator rather than an autonomous code generator.

---

# What AI Was Useful For

AI tools were most useful for:

- architecture brainstorming
- refining folder structures
- identifying edge cases
- generating implementation checklists
- improving documentation quality
- exploring tradeoffs between approaches
- suggesting testing strategies
- identifying potential scalability concerns

AI assistance accelerated planning and reduced repetitive boilerplate work.

---

# What I Did Not Trust AI With

I avoided blindly trusting AI for:

- financial recommendation logic
- pricing accuracy
- security assumptions
- Supabase RLS policies
- production deployment decisions
- SEO claims
- accessibility compliance
- audit credibility decisions

All pricing data was manually verified against official vendor pricing pages.

The deterministic audit logic was manually reviewed to ensure recommendations felt financially defensible rather than artificially optimized for exaggerated savings.

---

# PROMPTS LOG

1. Architecture and Directory Structure -  
   "
   You are acting as a senior full-stack architect and startup CTO.

I need you to help me build a production-quality SaaS MVP for a hiring assignment.

The product is:
An AI Spend Audit web app that helps startups analyze whether they are overspending on AI tools like ChatGPT, Claude, Cursor, Copilot, Gemini, etc.

This is NOT a toy project.
The final app will be reviewed by both AI systems and human reviewers.
The codebase must therefore look like a real startup product:

- scalable
- maintainable
- well-structured
- readable
- typed
- documented
- deployable
- thoughtfully architected

IMPORTANT:
Do NOT generate everything in one massive dump.
Work iteratively like a real senior engineer.
Before generating implementation code, first generate:

1. Product architecture
2. Technical architecture
3. Database schema
4. Folder structure
5. API design
6. Audit engine logic design
7. State management strategy
8. Deployment strategy
9. Testing strategy
10. Documentation strategy

Then proceed feature-by-feature.

---

## CORE PRODUCT REQUIREMENTS

The app flow:

1. User lands on homepage
2. User inputs:
   - AI tools used
   - plan tier
   - monthly spend
   - seats
   - team size
   - use case

3. App generates:
   - overspending analysis
   - downgrade opportunities
   - alternative tools
   - annual/monthly savings

4. User sees results BEFORE email gate
5. User can save/share audit
6. High savings users are pushed toward consultation CTA
7. Public shareable audit URL exists with Open Graph support

---

## TECH STACK REQUIREMENTS

Use:

- Next.js 15 App Router
- TypeScript
- TailwindCSS
- shadcn/ui
- Supabase
- Zod
- React Hook Form
- Server Components where possible
- Server Actions when appropriate
- PostgreSQL via Supabase
- Resend for transactional emails
- Vercel deployment

Use modern production patterns.

---

## ARCHITECTURE REQUIREMENTS

The project MUST:

- have clean separation of concerns
- use feature-based architecture
- avoid bloated components
- avoid logic inside UI files
- centralize business logic
- centralize pricing logic
- centralize audit calculations
- use typed interfaces everywhere
- support future scalability

I want:

- reusable service layers
- reusable validation schemas
- reusable UI primitives
- proper env handling
- secure API handling
- proper error handling
- optimistic UX where appropriate
- accessibility-conscious UI

---

## AUDIT ENGINE REQUIREMENTS

The audit engine is the most important part.

Build deterministic rule-based logic.
DO NOT rely on AI for calculations.

The engine should:

- evaluate if plan tiers make sense
- compare team size against plan cost
- identify cheaper same-vendor options
- identify cheaper competitor options
- estimate realistic savings
- explain WHY recommendations exist

Example:
“ChatGPT Team for 2 users may be unnecessary because Plus provides similar capability at lower monthly cost.”

The logic should feel financially defensible and realistic.

Structure pricing data cleanly.
Pricing data should be abstracted into:

- constants
- config objects
- pricing providers
  or similar maintainable structures.

---

## AI SUMMARY FEATURE

Use Claude or OpenAI API ONLY for generating a personalized summary paragraph.

Requirements:

- graceful fallback if API fails
- prompt abstraction
- token-conscious prompts
- deterministic audit remains independent of AI

---

## DATABASE REQUIREMENTS

Use Supabase with proper schema design.

Need:

- audits table
- leads table
- shareable public reports
- email capture
- audit snapshots
- timestamps
- analytics-friendly structure

Design for future scale.

---

## UI/UX REQUIREMENTS

The app should feel like:

- modern SaaS
- startup-grade
- Product Hunt ready

Need:

- responsive design
- polished dashboard feel
- beautiful results page
- visual savings breakdown
- strong typography hierarchy
- premium card design
- smooth loading states
- empty states
- error states
- skeleton loaders

Do NOT create generic template-looking UI.

---

## SEO + PERFORMANCE

Need:

- metadata handling
- Open Graph support
- dynamic OG images if possible
- Lighthouse optimization
- accessibility
- mobile-first responsiveness
- proper caching strategy
- lazy loading where appropriate

---

## TESTING REQUIREMENTS

Need:

- unit tests for audit engine
- validation tests
- integration tests
- CI workflow planning
- linting strategy

---

## DOCUMENTATION REQUIREMENTS

The assignment requires:

- README.md
- ARCHITECTURE.md
- DEVLOG.md
- REFLECTION.md
- TESTS.md
- PRICING_DATA.md
- PROMPTS.md
- GTM.md
- ECONOMICS.md
- USER_INTERVIEWS.md
- LANDING_COPY.md
- METRICS.md

Help me generate these progressively during development.

The documentation should sound thoughtful, realistic, technical, and entrepreneurial.

---

## IMPORTANT WORKING STYLE

You are NOT allowed to:

- generate shallow boilerplate
- dump giant unreadable files
- use fake architecture
- overengineer useless abstractions
- create fake startup jargon
- create generic placeholder logic

You SHOULD:

- explain tradeoffs
- think like a startup CTO
- optimize for shipping speed + maintainability
- prioritize MVP correctness first
- suggest realistic simplifications
- create code incrementally
- explain folder organization clearly
- keep implementation production-friendly

Start by generating:

1. Product architecture overview
2. Technical architecture
3. Folder structure
4. Database schema
5. Audit engine design
6. Development roadmap
7. Suggested Git commit strategy
8. Deployment plan
9. Testing strategy
10. Risk areas and pitfalls
    DO NOT CODE YET MAKE A DETAILED PLAN FIRST
    "

11. Refined Plan:
    "
    The architecture direction is strong. Before implementation begins, refine and expand the plan with the following improvements:

12. Move testing and CI earlier in the roadmap.
    I want:

- Vitest configured early
- ESLint + Prettier setup
- GitHub Actions initialized before feature implementation
- audit-engine tests written alongside engine development
- CI discipline treated as part of core engineering, not a final-stage addition

2. Expand the database and security architecture.
   Include:

- detailed Row Level Security strategy
- public share URL access model
- private vs public audit visibility rules
- abuse prevention strategy
- rate limiting approach
- honeypot/captcha considerations
- protection against spam audit generation
- secure handling of email capture and shareable reports

3. Expand the SEO and viral distribution architecture.
   Treat the shareable audit page as a growth/distribution loop, not just a utility feature.

Include:

- metadata generation strategy
- dynamic Open Graph image generation
- canonical URLs
- schema.org structured data
- Twitter/X preview optimization
- SEO-friendly public report pages
- share-card UX considerations
- performance considerations for crawlability

4. Add documentation workflow planning.
   I want documentation generated progressively during development, not retroactively.

Include workflow plans for continuously updating:

- DEVLOG.md
- ARCHITECTURE.md
- TESTS.md
- PRICING_DATA.md
- PROMPTS.md

5. Refine the audit engine philosophy.
   The audit must prioritize credibility and trust over exaggerated savings.

Requirements:

- do not invent savings opportunities
- identify when the user is already optimized
- explain recommendations honestly
- avoid unrealistic migration suggestions
- account for migration/switching friction
- distinguish between “quick wins” and “high-effort strategic changes”
- recommendations should feel financially defensible to a startup founder or finance lead

6. Expand observability and production-readiness planning.
   Include:

- error handling strategy
- logging strategy
- analytics/event tracking plan
- monitoring considerations
- graceful fallback behavior for AI/API failures
- resilience planning for pricing config changes

7. Expand the development roadmap into clearly defined implementation phases.
   For each phase include:

- goals
- deliverables
- dependencies
- risks
- estimated complexity
- testing expectations

Do not generate implementation code yet.

We are still in architecture and planning mode.

The goal is to produce a production-quality implementation plan that feels like it was written by a senior startup engineering lead preparing a Product Hunt-ready SaaS MVP.
"
** this worked properly and I got a solid base to start working on, the architecture seemed incomplete and faulty, fixing it took priority now.**

13. AI Summary Generation (Claude 3.5 Sonnet):
    "
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
    "


---

# PROMPT 3:
"Implement the plan, do not do any changes to the markdown files"


# PROMPT 4:
"You are working on an existing Next.js SaaS application called an AI Spend Audit tool.

Your task is NOT to rebuild the app from scratch.

Your task is to fully audit, polish, complete, and productionize the existing application.

FIRST:

1. Run through the entire folder structure carefully
2. Understand the current architecture
3. Identify unfinished features, broken UI, inconsistent styling, missing layouts, bad spacing, and incomplete flows
4. Run:

* npm install
* npm run dev
* npm run lint
* npm run build

Fix all major errors before adding features.

IMPORTANT:
The current app feels visually messy and incomplete.
Dropdowns are broken/misaligned.
Spacing and layout are inconsistent.
The dashboard is either missing or underdeveloped.
Some components feel unpolished and disconnected.

Your job is to transform this into a polished, modern SaaS product suitable for a Product Hunt launch and internship evaluation.

GOALS:

* Make the app feel premium and intentional
* Improve UX consistency everywhere
* Ensure responsive design on mobile + desktop
* Improve visual hierarchy and spacing
* Make all forms, dropdowns, dialogs, and cards feel cohesive
* Remove ugly alignment issues
* Fix overflowing layouts and broken widths
* Standardize typography, paddings, gaps, border radii, and shadows
* Ensure accessibility and keyboard usability

TECH STACK:

* Next.js App Router
* TailwindCSS
* shadcn/ui
* TypeScript

UI DIRECTION:

* Clean modern B2B SaaS aesthetic
* Inspired by Linear, Vercel, Stripe Dashboard, and Notion
* Calm neutral palette with one accent color
* Minimal but premium
* Strong spacing consistency
* Avoid clutter and random gradients

CRITICAL FIXES:

1. Layout System

* Create a proper responsive page container system
* Add proper horizontal padding everywhere
* Ensure all pages are centered correctly
* Standardize max widths
* Fix sidebar/content alignment

2. Dashboard
   Build a proper dashboard homepage with:

* Hero KPI section
* Total monthly AI spend
* Potential savings
* Savings percentage
* Top overspending tools
* Recommended actions
* Recent audits
* Charts/visual summaries
* Empty states if no audits exist

3. Navigation

* Improve sidebar and top navbar
* Add active states
* Fix hover states
* Ensure mobile responsiveness
* Make navigation feel premium and smooth

4. Forms + Dropdowns

* Audit every dropdown/select/popover/dialog
* Fix z-index issues
* Fix clipping/overflow problems
* Improve widths and alignment
* Ensure all forms have proper spacing and labels
* Add validation states
* Improve loading states

5. Audit Results Page
   This is the MOST important screen.

It should feel highly shareable and screenshot-worthy.

Improve:

* Savings summary section
* Per-tool breakdown cards
* Recommendation clarity
* Typography hierarchy
* Call-to-action sections
* Visual emphasis on savings

6. Consistency Pass
   Standardize:

* Buttons
* Cards
* Inputs
* Tables
* Badge styles
* Shadows
* Radius values
* Font sizing
* Section spacing
* Empty states
* Loading skeletons

7. UX Improvements

* Add proper loading states
* Add skeletons where needed
* Add error handling
* Add optimistic UI where useful
* Improve transitions subtly
* Improve responsiveness across breakpoints

8. Code Quality

* Refactor duplicated UI
* Create reusable layout wrappers/components
* Improve component organization
* Remove dead code
* Ensure clean TypeScript usage
* Improve naming consistency

9. Performance

* Reduce unnecessary client components
* Optimize rendering
* Ensure Lighthouse-friendly structure
* Improve accessibility scores

10. Final Review
    At the end:

* Run lint/build again
* Fix all warnings/errors possible
* Provide a summary of:

  * what was fixed
  * what was improved
  * remaining issues
  * recommended next steps

Use the assignment requirements as product direction:

* The app should feel trustworthy and finance-oriented
* The audit logic should feel serious and defensible
* The final UI should look investor/demo ready, not like a student project

Do NOT rewrite everything unnecessarily.
Improve and refine the existing codebase intelligently.
"

# PROMPT 5:
We are now entering UX refinement and product-completion phase.

I need a major usability and product-alignment pass across the application.

IMPORTANT:
Do not assume existing filenames, component names, or folder structures.
First inspect the current project structure and existing implementation before making modifications.

Goals:

1. Fix broken/invisible UI states
2. Improve visual consistency
3. Add a platform comparison/intelligence experience
4. Make the product align more closely with Credex’s actual value proposition:
   helping startups understand AI pricing, discounts, alternatives, and savings opportunities.

---

## PART 1 — UI/UX REFINEMENT

Audit the entire UI for:

* invisible text
* poor button contrast
* unreadable hover states
* inconsistent spacing
* inconsistent typography
* weak visual hierarchy
* low-contrast cards
* broken dark/light combinations
* inaccessible color combinations

Fix all major usability issues.

The design direction should feel:

* clean
* modern
* premium
* trustworthy
* financially credible
* Product Hunt ready

Visual inspiration:

* Stripe
* Linear
* Vercel
* modern fintech SaaS

Color direction:

* green + white primary palette
* subtle neutral grays
* dark text on light backgrounds
* accessible contrast ratios
* restrained accent usage
* avoid crypto/neon aesthetics

UI principles:

* whitespace first
* strong typography hierarchy
* clean cards
* minimal visual clutter
* clear CTAs
* soft shadows
* subtle borders
* readable data presentation

Do not overuse gradients.
Do not make the UI look template-heavy.

---

## PART 2 — PLATFORM COMPARISON / MARKET INTELLIGENCE PAGE

The app currently lacks a strong “comparison” experience.

I want a new feature/page accessible from the dashboard and/or navigation that helps users compare AI platforms, plans, and pricing models.

This should NOT feel like a generic pricing table.

The purpose is:

* helping startups understand pricing differences
* surfacing cost-efficiency insights
* showing where savings opportunities exist
* reinforcing Credex’s expertise in AI infrastructure spend optimization

The page should include:

* comparison of major AI platforms
* plan tiers
* seat pricing
* API pricing summaries
* ideal use cases
* strengths/weaknesses
* startup-fit recommendations
* estimated cost-efficiency indicators
* annual vs monthly billing comparisons
* “best for” labels
* potential savings indicators

Supported tools should include:

* ChatGPT
* Claude
* Gemini
* Cursor
* GitHub Copilot
* Windsurf
* OpenAI API
* Anthropic API

The experience should feel:

* interactive
* analytical
* useful
* shareable
* startup-focused

Potential sections:

* comparison table
* “best value for startups”
* “best coding assistant”
* “best enterprise option”
* “most cost-efficient”
* “best API economics”
* “fast-growing alternatives”

Allow filtering/sorting where appropriate.

---


## PART 3 — IMPLEMENTATION REQUIREMENTS

Before generating code:

1. Audit the current implementation
2. Identify missing product flows
3. Explain architectural changes needed
4. Explain data structures needed for comparisons

Then implement incrementally.

Do not massively rewrite the application.
Build on top of the current architecture and preserve consistency.



#PROMPT 6:
"Run npm run build and fix errors"
