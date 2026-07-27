-- Paywall setup: subscriptions + weekly search usage
-- Run this in Supabase -> SQL Editor -> New query, AFTER SUPABASE_SETUP.sql.
-- Safe to run more than once.

-- 1. Subscriptions: who is on the paid Pro plan.
--    Only the service role (Netlify function / future PayFast webhook) writes
--    this table. Users can read their own row but cannot set themselves to Pro.
create table if not exists subscriptions (
  user_id    uuid references auth.users on delete cascade primary key,
  plan       text not null default 'free',    -- 'free' | 'pro'
  status     text not null default 'active',   -- 'active' | 'cancelled' | 'expired'
  provider   text not null default '',         -- 'payfast' once wired
  updated_at timestamptz not null default now()
);

-- 2. Weekly search usage counter. One row per user per ISO week (Mon start).
--    Written only by the service role so the free limit cannot be tampered with.
create table if not exists search_usage (
  user_id    uuid references auth.users on delete cascade not null,
  week_start date not null,
  count      integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, week_start)
);

alter table subscriptions enable row level security;
alter table search_usage  enable row level security;

-- Read-only for the signed-in owner. There are deliberately NO insert/update/
-- delete policies, so normal users (the anon/public key) cannot write here.
-- The Netlify function uses the service-role key, which bypasses RLS entirely.
drop policy if exists "read_own_subscription" on subscriptions;
drop policy if exists "read_own_usage"        on search_usage;
create policy "read_own_subscription" on subscriptions for select using (auth.uid() = user_id);
create policy "read_own_usage"        on search_usage  for select using (auth.uid() = user_id);

-- To make YOURSELF Pro for testing (replace with your auth user id from
-- Authentication -> Users), run:
--   insert into subscriptions (user_id, plan, status, provider)
--   values ('YOUR-USER-UUID', 'pro', 'active', 'manual')
--   on conflict (user_id) do update set plan = 'pro', status = 'active';
