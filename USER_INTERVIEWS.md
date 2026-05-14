# User Interviews

## Interview 1
**Name:** Mark, works in X
**Company Stage:** SaaS
**Summary:** I cold DM'd M.T. on X asking how they track AI dev tool spending.

> "Honestly, we just pay the OpenAI and Cursor bills on the corporate card and wince."
> "I tried mapping out our seats last month, but GitHub Copilot billing is so confusing when mixed with our Enterprise plan."
> "If a tool just told me 'You have 12 inactive seats, click here to cancel them', I'd use it immediately."

**Most surprising thing:** He cared more about *inactive seat waste* than finding a cheaper alternative tool. He didn't want to force his devs to switch from Cursor to Copilot just to save $10/mo, but he was furious that he was paying for 5 seats for devs who had left the company or weren't using the tool.
**What it changed about the design:** I added specific logic to the audit engine to flag overprovisioned seats (when `seats` > `teamSize`) as a "High Priority" optimization.

## Interview 2
**Name:** Saad Nawaz
**Company Stage:** Intern at Prism Global
**Summary:** 
> "We didn't take any AIs subsription, and we had to work on it using the free tier. I also didn't take on epersonally. But I used to frequent my friend's Claude's Max"

**Most surprising thing:** The company didn't take any subscriptions and they didn't know how to use AI. In this day and age, I wonder how easy their work would have been if they took an AI.
**What it changed about the design:** I added a guide and frequently asked questions section to help users.
