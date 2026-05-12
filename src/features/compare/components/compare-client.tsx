'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  COMPARE_SPOTLIGHTS,
  PLATFORM_INTEL,
  PLATFORM_INTEL_DISCLAIMER,
  type PlatformIntel,
  type PlatformKind,
} from '@/config/platform-intelligence';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import {
  ArrowUpRight,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Layers,
  Sparkles,
} from 'lucide-react';

type KindFilter = 'all' | PlatformKind;

const KIND_LABEL: Record<KindFilter, string> = {
  all: 'All',
  assistant: 'Assistants',
  coding_ide: 'Coding IDEs',
  api: 'APIs',
};

function startupFitLabel(fit: PlatformIntel['startupFit']) {
  if (fit === 'strong') return 'Strong';
  if (fit === 'moderate') return 'Moderate';
  return 'Case-by-case';
}

function kindLabel(kind: PlatformKind) {
  if (kind === 'assistant') return 'Assistant';
  if (kind === 'coding_ide') return 'Coding IDE';
  return 'API';
}

export function CompareClient() {
  const [kind, setKind] = useState<KindFilter>('all');
  const [sort, setSort] = useState<'name' | 'seat' | 'efficiency'>('efficiency');
  const [spotlightId, setSpotlightId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const rows = useMemo(() => {
    let list = PLATFORM_INTEL.filter((p) => (kind === 'all' ? true : p.kind === kind));
    if (spotlightId) {
      const s = COMPARE_SPOTLIGHTS.find((x) => x.id === spotlightId);
      if (s) list = list.filter((p) => s.platformIds.includes(p.id));
    }
    const next = [...list];
    next.sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'efficiency') return b.costEfficiencyIndicator - a.costEfficiencyIndicator;
      const sa = a.seatFromUsd ?? 9999;
      const sb = b.seatFromUsd ?? 9999;
      return sa - sb;
    });
    return next;
  }, [kind, sort, spotlightId]);

  return (
    <div className="space-y-10 pb-16">
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
          <BarChart3 className="size-3.5 text-primary" aria-hidden />
          Platform intelligence
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Compare AI platforms, plans, and pricing models
        </h1>
        <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
          Credex helps startups interpret AI infrastructure spend: where tiers overlap, when APIs beat
          seats, and how billing choices affect runway. Use this view alongside your audit — not as a
          vendor quote.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/audit">
            <Button size="sm" className="rounded-lg">
              Audit your stack
              <ArrowUpRight className="ml-1.5 size-4 opacity-80" />
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="rounded-lg">
              Dashboard
            </Button>
          </Link>
        </div>
      </div>

      {/* Spotlights */}
      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Curated lenses</h2>
            <p className="text-sm text-muted-foreground">
              Jump to a startup-relevant angle. Clears other filters until you reset.
            </p>
          </div>
          {spotlightId && (
            <Button variant="ghost" size="sm" className="shrink-0 text-muted-foreground" onClick={() => setSpotlightId(null)}>
              Clear lens
            </Button>
          )}
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {COMPARE_SPOTLIGHTS.map((s) => {
            const active = spotlightId === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setSpotlightId(active ? null : s.id)}
                className={cn(
                  'rounded-xl border bg-card p-4 text-left shadow-sm transition-all hover:shadow-md',
                  active ? 'border-primary ring-1 ring-primary/20' : 'border-border hover:border-primary/30',
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="font-medium leading-snug">{s.title}</div>
                  <Sparkles className="size-4 shrink-0 text-primary/80" aria-hidden />
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.description}</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Controls */}
      <Card className="border-border/80 shadow-sm">
        <CardHeader className="border-b border-border/60 pb-4">
          <CardTitle className="text-base">Explore</CardTitle>
          <CardDescription>Filter by category, sort, and expand rows for strengths, risks, and savings angles.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {(Object.keys(KIND_LABEL) as KindFilter[]).map((k) => (
              <Button
                key={k}
                type="button"
                size="sm"
                variant={kind === k ? 'default' : 'outline'}
                className="rounded-lg"
                onClick={() => setKind(k)}
              >
                {KIND_LABEL[k]}
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-2 sm:w-56">
            <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">Sort</span>
            <Select value={sort} onValueChange={(v) => setSort(v as typeof sort)}>
              <SelectTrigger className="rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="efficiency">Cost-efficiency indicator</SelectItem>
                <SelectItem value="seat">Seat price (low → high)</SelectItem>
                <SelectItem value="name">Name (A → Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table / cards */}
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="hidden grid-cols-12 gap-3 border-b border-border bg-muted/40 px-4 py-3 text-xs font-medium uppercase tracking-wide text-muted-foreground lg:grid">
          <div className="col-span-3">Platform</div>
          <div className="col-span-2">Plans</div>
          <div className="col-span-2">Seat pricing</div>
          <div className="col-span-2">API / usage</div>
          <div className="col-span-1 text-center">Fit</div>
          <div className="col-span-1 text-center">Score</div>
          <div className="col-span-1" />
        </div>
        <ul className="divide-y divide-border">
          {rows.map((p) => {
            const open = expanded === p.id;
            return (
              <li key={p.id}>
                <div className="grid grid-cols-1 gap-3 px-4 py-4 lg:grid-cols-12 lg:items-center lg:gap-3 lg:py-3">
                  <div className="lg:col-span-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{p.name}</span>
                      <Badge variant="secondary" className="font-normal">
                        {kindLabel(p.kind)}
                      </Badge>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5 lg:hidden">
                      {p.bestFor.slice(0, 2).map((b) => (
                        <Badge key={b} variant="outline" className="font-normal text-[0.65rem]">
                          {b}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground lg:col-span-2">
                    <span className="font-medium text-foreground/80 lg:hidden">Plans: </span>
                    {p.planTiers.join(' · ')}
                  </div>
                  <div className="text-sm text-muted-foreground lg:col-span-2">
                    <span className="font-medium text-foreground/80 lg:hidden">Seats: </span>
                    {p.seatFromUsd != null ? `From ~$${p.seatFromUsd}/user/mo` : 'Seat N/A'}
                    <span className="mt-0.5 block text-xs text-muted-foreground">{p.seatNote}</span>
                  </div>
                  <div className="text-sm text-muted-foreground lg:col-span-2">
                    <span className="font-medium text-foreground/80 lg:hidden">API: </span>
                    {p.apiSummary}
                  </div>
                  <div className="flex items-center gap-2 lg:col-span-1 lg:justify-center">
                    <span className="text-xs font-medium text-muted-foreground lg:hidden">Startup fit:</span>
                    <Badge variant="outline" className="font-normal">
                      {startupFitLabel(p.startupFit)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 lg:col-span-1 lg:justify-center">
                    <span className="text-xs font-medium text-muted-foreground lg:hidden">Score:</span>
                    <span className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-muted/50 text-sm font-semibold tabular-nums">
                      {p.costEfficiencyIndicator}
                    </span>
                  </div>
                  <div className="flex justify-end lg:col-span-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="rounded-lg text-muted-foreground"
                      onClick={() => setExpanded(open ? null : p.id)}
                      aria-expanded={open}
                    >
                      {open ? (
                        <>
                          Less <ChevronUp className="ml-1 size-4" />
                        </>
                      ) : (
                        <>
                          Details <ChevronDown className="ml-1 size-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {open && (
                  <div className="border-t border-border bg-muted/20 px-4 py-5">
                    <div className="grid gap-6 lg:grid-cols-2">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                          <Layers className="size-4 text-primary" />
                          Ideal use cases
                        </div>
                        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                          {p.idealUseCases.map((x) => (
                            <li key={x}>{x}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <div className="text-sm font-semibold text-foreground">Strengths</div>
                        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                          {p.strengths.map((x) => (
                            <li key={x}>{x}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <div className="text-sm font-semibold text-foreground">Weaknesses / watch-outs</div>
                        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                          {p.weaknesses.map((x) => (
                            <li key={x}>{x}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <div className="text-sm font-semibold text-foreground">Billing angle</div>
                        <p className="text-sm leading-relaxed text-muted-foreground">{p.billingAngle}</p>
                        <div className="text-sm font-semibold text-foreground">Where savings show up</div>
                        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                          {p.savingsAngles.map((x) => (
                            <li key={x}>{x}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="text-xs font-medium text-muted-foreground">Best for:</span>
                      {p.bestFor.map((b) => (
                        <Badge key={b} variant="secondary" className="font-normal">
                          {b}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <Card className="border-dashed border-border/80 bg-muted/20">
        <CardContent className="py-6 text-sm leading-relaxed text-muted-foreground">
          <p className="font-medium text-foreground">Disclaimer</p>
          <p className="mt-2">{PLATFORM_INTEL_DISCLAIMER}</p>
          <p className="mt-3">
            The efficiency score is an internal relative index for prioritization in this UI, not a vendor
            benchmark. For procurement support and discount sourcing,{' '}
            <a href="mailto:hello@credex.ai" className="font-medium text-primary underline-offset-4 hover:underline">
              contact Credex
            </a>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
