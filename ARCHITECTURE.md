# ARCHITECTURE

## System Diagram
```mermaid
graph TD
    User([User]) --> |Visits| LandingPage
    LandingPage --> |Navigates| AuditForm
    AuditForm --> |Submits Data| AuditEngine[Audit Engine (Core)]
    AuditEngine --> |Calculates| Recommendations
    AuditEngine --> |Generates| AISummary[AI Summary Generator]
    Recommendations --> AuditResult[Audit Result Page]
    AISummary --> AuditResult
    AuditResult --> |Captures Email| SupabaseDB[(Supabase DB)]
    SupabaseDB --> |Triggers| EmailService[Resend API]
```

## Data Flow
1. **Input**: User fills out the multi-step form with their AI tools, seats, spend, team size, and use case.
2. **Processing**: The data is sent via Server Action to the deterministic `AuditEngine`.
3. **Evaluation**: The engine cross-references the input against `PRICING_CONFIG` to find downgrades, alternative tools, and annual savings.
4. **AI Summary**: (Optional/Fallback) An AI service generates a personalized executive summary based on the calculated savings.
5. **Output**: The user views the result on a dynamic `/report/[id]` page.
6. **Capture**: If the user opts-in, their email is captured into Supabase for lead generation.

## Stack Choice Justification
- **Next.js App Router**: Provides excellent Server Components and Server Actions for secure, fast data processing without exposing pricing logic to the client.
- **Tailwind CSS + shadcn/ui**: Enables rapid development of a premium, accessible, and responsive B2B SaaS interface.
- **Supabase**: Offers a ready-to-use PostgreSQL database with built-in auth and row-level security (RLS), perfect for an MVP that needs to scale.
- **Zod**: Ensures strict type-safety for incoming form data, preventing malformed audit requests.

## Handling 10k Audits/Day
If the app had to scale to 10k audits/day:
1. **Caching**: We would cache the `PRICING_CONFIG` heavily and potentially cache similar audit results using Redis or Next.js unstable_cache.
2. **Asynchronous Processing**: Instead of calculating audits synchronously on the main thread, we would offload complex calculations or AI summary generation to a background worker queue (e.g., Inngest or Upstash).
3. **Database Scaling**: We would ensure proper indexing on the `audits` table in Supabase, specifically on `user_id` and `created_at`.
