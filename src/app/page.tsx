import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/header';
import { CheckCircle2, ArrowRight, Zap, TrendingDown, Shield, Calculator } from 'lucide-react';

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
            NO REGRETS · Real-time AI Cost Analysis
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 max-w-4xl mx-auto leading-[1.1]">
            Save Up To <span className="text-primary italic">60%</span> <br />
            On Your Startup AI Stack
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Stop overpaying for seats you don&apos;t use and tiers you don&apos;t need. 
            Get a deterministic audit of your ChatGPT, Claude, and Cursor spend in seconds.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link href="/audit">
              <Button size="lg" className="rounded-full px-8 h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-white shadow-xl group border-0">
                Start Free Audit
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/report/demo">
              <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg font-semibold border-2">
                View Demo Report
              </Button>
            </Link>
          </div>

          {/* Floating Tool Icons Placeholder */}
          <div className="relative max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
              {['OpenAI', 'Anthropic', 'Cursor', 'Google Cloud', 'AWS', 'Azure', 'Github', 'Meta'].map((tool) => (
                <div key={tool} className="flex items-center justify-center p-4 bg-white dark:bg-black rounded-xl border border-border shadow-sm">
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
              Verified Pricing Data
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              Deterministic Logic
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              Zero-Data Retention
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              No Credit Card Required
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              24/7 Cost Monitoring
            </div>
          </div>
        </div>
      </section>

      {/* Quick Value Prop */}
      <section id="how-it-works" className="py-24 container px-4 mx-auto border-b">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">How it Works</h2>
          <p className="text-xl text-muted-foreground">Three steps to a leaner, more efficient AI stack.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto md:mx-0">
              <Calculator className="text-primary w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">1. Inventory Your Stack</h3>
            <p className="text-muted-foreground">Select the AI tools you use and input your current spend and seat count.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto md:mx-0">
              <Zap className="text-primary w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">2. Run Audit</h3>
            <p className="text-muted-foreground">Our deterministic engine cross-references your data against 50+ vendor pricing rules.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto md:mx-0">
              <Shield className="text-primary w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">3. Get Savings Roadmap</h3>
            <p className="text-muted-foreground">Receive a shareable report with exact steps to downgrade or switch for maximum efficiency.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-muted/20">
        <div className="container px-4 mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">Everything you need to know about Credex.</p>
          </div>
          <div className="grid gap-6">
            {[
              {
                q: "Is my data secure?",
                a: "Absolutely. We follow a zero-data retention policy for your financial details unless you choose to save the report to your account."
              },
              {
                q: "How accurate is the pricing data?",
                a: "We update our database weekly to account for the rapid changes in the AI tool market (like the recent OpenAI and DeepSeek price wars)."
              },
              {
                q: "Do you take a commission on savings?",
                a: "No. Credex is a flat-fee SaaS tool. We don't take a cut of your savings, ensuring our recommendations are unbiased."
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
              <CheckCircle2 className="text-white w-5 h-5" />
            </div>
            <span className="font-bold">credex</span>
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
