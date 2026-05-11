# User Interviews

## Interview 1
**Name:** M.T., CTO
**Company Stage:** Series A, SaaS
**Summary:** I cold DM'd M.T. on X asking how they track AI dev tool spending.

> "Honestly, we just pay the OpenAI and Cursor bills on the corporate card and wince."
> "I tried mapping out our seats last month, but GitHub Copilot billing is so confusing when mixed with our Enterprise plan."
> "If a tool just told me 'You have 12 inactive seats, click here to cancel them', I'd use it immediately."

**Most surprising thing:** He cared more about *inactive seat waste* than finding a cheaper alternative tool. He didn't want to force his devs to switch from Cursor to Copilot just to save $10/mo, but he was furious that he was paying for 5 seats for devs who had left the company or weren't using the tool.
**What it changed about the design:** I added specific logic to the audit engine to flag overprovisioned seats (when `seats` > `teamSize`) as a "High Priority" optimization.

## Interview 2
**Name:** A.S., Founder
**Company Stage:** Seed, Consumer AI
**Summary:** Talked to a founder from my college network who is heavily using Anthropic and OpenAI APIs.

> "Our API bills swing wildly depending on our traffic. One month it's $500, the next it's $4,000."
> "I don't even know if we're on the right tier for Anthropic. We just use the pay-as-you-go."
> "Wait, there are discounted credits available? I thought that was only for YC companies."

**Most surprising thing:** She had zero awareness that discounted AI infrastructure credits (Credex's core offering) existed outside of exclusive accelerator perks. 
**What it changed about the design:** I realized the report page needs to heavily emphasize that *anyone* can access discounted credits through Credex, and it needs to be presented as a legitimate financial strategy, not just a shady coupon code.

## Interview 3
**Name:** J.D., VP of Finance
**Company Stage:** Series B, B2B Fintech
**Summary:** Reached out via a CFO Slack community.

> "My problem isn't the cost of the tools, it's the fragmentation. Engineering uses Cursor, Marketing uses ChatGPT Plus, Sales uses Claude."
> "I have no way to benchmark if our total AI spend is 'normal' for a company our size."
> "If you show me a chart that says we are spending 30% more than our peers, I can take that to the executive team to force consolidation."

**Most surprising thing:** The desire for social proof and benchmarking. Savings alone weren't enough; he needed data to prove to other executives that their spend was anomalous.
**What it changed about the design:** I built the entire "Industry Benchmarks" side panel on the report page to directly address this need, showing an "Efficiency Rank" and average savings for similar companies.
