-- Migration: add the missing age_group column to the guests table.
--
-- Why this is needed:
-- The "age groups" feature (adult / child) was added to the app, and the app
-- writes an age_group value on every guest. But the production guests table was
-- never altered to add the column, so Postgres rejected EVERY guest insert with
-- "column guests.age_group does not exist". Saves failed silently, which is why
-- guest lists vanished when the planner was opened on another device.
--
-- How to run it (once):
--   1. Open your Supabase project dashboard.
--   2. Go to SQL Editor > New query.
--   3. Paste the statement below and click Run.
-- It is safe to run more than once (IF NOT EXISTS guards it).

alter table guests
  add column if not exists age_group text not null default 'adult';
