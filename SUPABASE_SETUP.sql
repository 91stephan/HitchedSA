-- Run this entire script in Supabase → SQL Editor → New query

-- 1. Profiles (linked to auth users)
create table if not exists profiles (
  id            uuid references auth.users on delete cascade primary key,
  partner1      text    not null default '',
  partner2      text    not null default '',
  wedding_date  date,
  theme         text    not null default 'blossom',
  venue_location text   not null default '',
  budget_total  numeric not null default 200000,
  created_at    timestamptz not null default now()
);

-- 2. Guests
create table if not exists guests (
  id         text    primary key,
  user_id    uuid    references auth.users on delete cascade not null,
  name       text    not null default '',
  email      text    not null default '',
  phone      text    not null default '',
  rsvp       text    not null default 'pending',
  dietary    text    not null default '',
  table_id   text    not null default '',
  plus_one   boolean not null default false,
  created_at timestamptz not null default now()
);

-- 3. Budget categories
create table if not exists budget_categories (
  id           text    not null,
  user_id      uuid    references auth.users on delete cascade not null,
  category     text    not null,
  allocated    numeric not null default 0,
  spent        numeric not null default 0,
  deposit_paid boolean not null default false,
  primary key (user_id, id)
);

-- 4. Checklist items
create table if not exists checklist_items (
  id         text    not null,
  user_id    uuid    references auth.users on delete cascade not null,
  phase      text    not null default '',
  label      text    not null default '',
  done       boolean not null default false,
  notes      text    not null default '',
  due_date   text    not null default '',
  sort_order integer not null default 0,
  primary key (user_id, id)
);

-- 5. Ideas board
create table if not exists ideas (
  id          text not null,
  user_id     uuid references auth.users on delete cascade not null,
  title       text not null default '',
  description text not null default '',
  category    text not null default 'General',
  colour      text not null default '',
  image_url   text not null default '',
  thumb_url   text not null default '',
  source      text not null default '',
  note        text not null default '',
  created_at  timestamptz not null default now(),
  primary key (user_id, id)
);

-- 6. Seating tables
create table if not exists seating_tables (
  id       text    not null,
  user_id  uuid    references auth.users on delete cascade not null,
  name     text    not null,
  capacity integer not null default 8,
  shape    text    not null default 'round',
  x        numeric not null default 100,
  y        numeric not null default 100,
  primary key (user_id, id)
);

-- Enable Row Level Security (users can only see their own data)
alter table profiles         enable row level security;
alter table guests           enable row level security;
alter table budget_categories enable row level security;
alter table checklist_items  enable row level security;
alter table ideas            enable row level security;
alter table seating_tables   enable row level security;

-- RLS Policies
create policy "own_profiles"  on profiles          for all using (auth.uid() = id)      with check (auth.uid() = id);
create policy "own_guests"    on guests            for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own_budget"    on budget_categories for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own_checklist" on checklist_items   for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own_ideas"     on ideas             for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own_seating"   on seating_tables    for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Auto-create a profile row whenever a new user signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();