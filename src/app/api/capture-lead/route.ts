import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { saveLead } from '@/services/audit';

// Simple in-memory rate limit: max 5 submissions per IP per 10 minutes
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT) return true;

  entry.count += 1;
  return false;
}

const leadSchema = z.object({
  audit_id: z.string().uuid(),
  email: z.string().email(),
  company_name: z.string().max(100).optional(),
  role: z.string().max(100).optional(),
  team_size: z.number().int().min(1).optional(),
  // Honeypot field — bots fill this; humans leave it empty
  website: z.string().max(0, 'Bot detected').optional(),
});

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    // Silently reject bots (honeypot) — return 200 so they don't retry
    const issues = parsed.error.issues;
    if (issues.some((i) => i.path.includes('website'))) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { website: _honeypot, ...lead } = parsed.data;

  try {
    await saveLead(lead);
  } catch (err) {
    console.error('Lead save error:', err);
    return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 });
  }

  // Send confirmation email via Resend (graceful fallback if key not set)
  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      const savingsNote =
        lead.team_size && lead.team_size > 0
          ? `We'll keep you updated as new optimizations apply to your stack.`
          : '';

      await resend.emails.send({
        from: 'Credex AI <hello@credex.rocks>',
        to: lead.email,
        subject: 'Your AI Spend Audit is ready 🎯',
        html: `
          <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #111;">
            <h1 style="font-size: 24px; margin-bottom: 8px;">Your audit is saved.</h1>
            <p style="color: #555;">Thanks for using Credex AI Spend Audit. We've saved your report and you can access it anytime via your unique link.</p>
            ${savingsNote ? `<p style="color: #555;">${savingsNote}</p>` : ''}
            <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
            <p style="font-size: 13px; color: #999;">Credex · credex.rocks · We never sell your data.</p>
          </div>
        `,
      });
    } catch (emailErr) {
      // Email failure is non-fatal — lead is already saved
      console.error('Email send error:', emailErr);
    }
  }

  return NextResponse.json({ success: true });
}
