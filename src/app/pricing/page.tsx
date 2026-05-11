import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import Link from 'next/link';

const tiers = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for individual builders and solo founders.',
    features: [
      'Manual AI Stack Audit',
      'Basic Savings Recommendations',
      'Community Support',
      'Limited to 3 reports/mo',
    ],
    cta: 'Get Started',
    href: '/login',
    featured: false,
  },
  {
    name: 'Pro',
    price: '$29',
    description: 'Advanced optimization for growing startups.',
    features: [
      'Everything in Free',
      'Unlimited Audit Reports',
      'Automated Seat Activity Tracking',
      'Market Comparison Intelligence',
      'CSV & PDF Export',
      'Priority Email Support',
    ],
    cta: 'Start 14-day Trial',
    href: '/login?plan=pro',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Custom solutions for large scale operations.',
    features: [
      'Everything in Pro',
      'Custom Tool Integration',
      'SSO & Advanced Security',
      'Dedicated Account Manager',
      'Quarterly Cost Reviews',
      'API Access',
    ],
    cta: 'Contact Sales',
    href: 'mailto:sales@credex.ai',
    featured: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20 container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Simple, Transparent <span className="text-primary">Pricing</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Save thousands on your AI stack today. Choose the plan that fits your team&apos;s scale.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier) => (
            <div 
              key={tier.name}
              className={`relative p-8 rounded-3xl border bg-card shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 ${
                tier.featured ? 'border-primary ring-1 ring-primary' : 'border-border'
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  {tier.price !== 'Custom' && <span className="text-muted-foreground">/mo</span>}
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {tier.description}
                </p>
              </div>
              
              <ul className="space-y-4 mb-10">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href={tier.href} className="block mt-auto">
                <Button 
                  className="w-full rounded-xl py-6 font-bold" 
                  variant={tier.featured ? 'default' : 'outline'}
                >
                  {tier.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-muted-foreground">
            Trusted by founders at <span className="text-foreground font-bold">Y Combinator, Techstars, and 500 Global.</span>
          </p>
        </div>
      </main>
    </div>
  );
}
