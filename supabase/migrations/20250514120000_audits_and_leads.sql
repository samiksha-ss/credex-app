-- Credex: audits (calculator completions) and leads (email capture).
-- Server writes use the Supabase service role key (bypasses RLS).

create extension if not exists "pgcrypto";

create table if not exists public.audits (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id uuid null references auth.users (id) on delete set null,
  team_size integer not null check (team_size >= 1),
  use_case text not null,
  total_spend numeric not null,
  potential_savings numeric not null,
  items jsonb not null
);

create index if not exists audits_created_at_idx on public.audits (created_at desc);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  audit_id uuid not null references public.audits (id) on delete cascade,
  email text not null,
  company_name text null,
  role text null,
  team_size integer null
);

create index if not exists leads_audit_id_idx on public.leads (audit_id);

alter table public.audits enable row level security;
alter table public.leads enable row level security;
