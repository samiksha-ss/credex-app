import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/header';
import { CheckCircle2, ArrowRight, Zap, TrendingDown, Shield } from 'lucide-react';

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
              <Button size="lg" className="rounded-full px-8 h-14 text-lg font-semibold bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black shadow-xl group border-0">
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
      <section className="py-24 container px-4 mx-auto">
        <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto md:mx-0">
              <TrendingDown className="text-primary w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Uncover Seat Waste</h3>
            <p className="text-muted-foreground">Identify exact licenses that have zero activity but are still being billed monthly.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto md:mx-0">
              <Zap className="text-primary w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Tier Optimization</h3>
            <p className="text-muted-foreground">We analyze if you actually need &apos;Enterprise&apos; features or if &apos;Team&apos; tiers are sufficient.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto md:mx-0">
              <Shield className="text-primary w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Switching Intelligence</h3>
            <p className="text-muted-foreground">Financial modeling for competitor alternatives when they offer 2-3x more capital efficiency.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
