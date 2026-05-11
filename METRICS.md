# Metrics Strategy

## North Star Metric
**Number of High-Intent Consultations Booked**
*Why:* For a B2B lead-generation tool, vanity metrics like "Daily Active Users" (DAU) or "Pageviews" are meaningless. Startups only audit their software stack occasionally (maybe once a quarter). The sole purpose of this tool is to identify startups with significant AI spend and convert them into sales conversations for Credex's core credit product. A booked consultation is the highest signal of product-market fit for this specific growth loop.

## 3 Input Metrics
To drive the North Star metric, we must monitor and optimize the following inputs:
1. **Audit Completion Rate:** The percentage of landing page visitors who successfully complete the multi-step form and view their report. (Target: >15%)
2. **High-Savings Identification Rate:** The percentage of completed audits that result in >$500/mo in identified savings. This tells us if we are acquiring the right *type* of user (scaled startups vs solo indie hackers). (Target: >25%)
3. **Share Link Generation Rate:** The percentage of users who click the "Share" or "Export PDF" button. This measures the viral coefficient and indicates that the report is valuable enough to pass to a decision-maker (CFO/CEO). (Target: >10%)

## What I'd Instrument First
Before launching, I would integrate PostHog or Amplitude to instrument the core funnel:
1. `landing_page_viewed`
2. `audit_started`
3. `audit_completed` (with properties: `total_spend`, `total_savings`, `tools_count`)
4. `report_shared`
5. `consultation_clicked`

This allows us to build a funnel visualization immediately and identify drop-off points.

## The Pivot Trigger
If, after 1,000 visitors, the **Audit Completion Rate is below 5%**, it triggers a pivot decision. This would indicate that the form is either too invasive (asking for too much financial data upfront) or the perceived value proposition is too weak to justify the effort. The pivot would be to simplify the input to a single question (e.g., "Connect your Stripe account for a 1-click audit") or completely redesign the landing page messaging.
