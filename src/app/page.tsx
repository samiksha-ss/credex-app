import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/header';
import { CheckCircle2, ArrowRight, Zap, Shield, Calculator } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/30">
      <Header />
      
      {/* Hero Section */}
      <main className="relative pt-32 pb-20 overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-grid -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
        
        <div className="container px-4 mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Pricing intelligence · stack audits · vendor comparison
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6 max-w-4xl mx-auto leading-[1.08] text-foreground">
            AI spend intelligence for startups who need{' '}
            <span className="text-primary">clarity</span>, not hype
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Model seats, tiers, and overlap across ChatGPT, Claude, Gemini, Cursor, Copilot, and more. See
            where billing choices leak runway — then compare platforms with startup-specific lenses.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link href="/audit">
              <Button size="lg" className="rounded-full px-8 h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md group border-0">
                Run stack audit
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/compare">
              <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg font-semibold border-border">
                Compare platforms
              </Button>
            </Link>
            <Link href="/report/demo">
              <Button size="lg" variant="ghost" className="rounded-full px-8 h-14 text-lg font-semibold text-foreground/80 hover:text-foreground">
                View demo report
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mb-16">
            No login required to generate a shareable audit link.
          </p>

          {/* Floating Tool Icons Placeholder */}
          <div className="relative max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
              {['OpenAI', 'Anthropic', 'Cursor', 'Google Cloud', 'AWS', 'Azure', 'Github', 'Meta'].map((tool) => (
                <div key={tool} className="flex items-center justify-center p-4 bg-card rounded-xl border border-border shadow-sm">
                  <span className="font-bold text-sm">{tool}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Trust Ticker */}
      <section className="border-y bg-muted/30 py-6 overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-sm font-medium text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              Transparent assumptions
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              Deterministic modeling
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              Privacy-minded defaults
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              No card to try the audit
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              Shareable reports for stakeholders
            </div>
          </div>
        </div>
      </section>

      {/* Quick Value Prop */}
      <section id="how-it-works" className="py-24 container px-4 mx-auto border-b">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-foreground">How it works</h2>
          <p className="text-lg text-muted-foreground">
            A tight loop from inventory to decision support — built for operators and finance partners.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto md:mx-0">
              <Calculator className="text-primary w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold">1. Inventory your stack</h3>
            <p className="text-muted-foreground">
              Capture tools, tiers, seats, and spend so savings opportunities are grounded in your numbers.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto md:mx-0">
              <Zap className="text-primary w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold">2. Run the audit</h3>
            <p className="text-muted-foreground">
              Credex cross-checks your inputs against maintained pricing rules to surface mismatches and overlap.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto md:mx-0">
              <Shield className="text-primary w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold">3. Compare, share, decide</h3>
            <p className="text-muted-foreground">
              Pair the report with platform intelligence, then share a link with your team or advisors before renewals.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-muted/20">
        <div className="container px-4 mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-foreground">Frequently asked questions</h2>
            <p className="text-lg text-muted-foreground">Straight answers for teams evaluating AI spend tooling.</p>
          </div>
          <div className="grid gap-6">
            {[
              {
                q: "Is my data secure?",
                a: "We minimize what we collect. Sensitive inputs stay oriented around spend modeling — not customer content — and you can use shareable links without creating an account."
              },
              {
                q: "How should I interpret savings numbers?",
                a: "Treat outputs as directional models based on public pricing and the inputs you provide. Always validate against invoices, contracts, and usage dashboards before budgeting."
              },
              {
                q: "Do you take a commission on savings?",
                a: "No. Credex is structured as software and advisory help. That keeps incentives aligned with transparent recommendations."
              }
            ].map((faq, i) => (
              <div key={i} className="p-8 rounded-2xl bg-background border border-border shadow-sm">
                <h3 className="text-lg font-bold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container px-4 mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <CheckCircle2 className="text-primary-foreground w-5 h-5" />
            </div>
            <span className="font-semibold">Credex</span>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary">Privacy</Link>
            <Link href="/terms" className="hover:text-primary">Terms</Link>
            <Link href="mailto:hello@credex.ai" className="hover:text-primary">Support</Link>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 Credex AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
