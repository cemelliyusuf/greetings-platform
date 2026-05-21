-- Templates
create table templates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  subcategory text,
  thumbnail_url text,
  canvas_data jsonb not null,
  tags text[] default '{}',
  orientation text not null default 'portrait',
  is_premium boolean default false,
  is_animated boolean default false,
  has_photo boolean default false,
  color_palette text[] default '{}',
  downloads integer default 0,
  created_at timestamptz default now()
);

-- User designs (saved card states)
create table designs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users,
  template_id uuid references templates,
  title text not null default 'My Card',
  canvas_data jsonb not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RSVP events
create table rsvp_events (
  id uuid primary key default gen_random_uuid(),
  design_id uuid references designs,
  slug text unique not null,
  title text not null,
  event_date date not null,
  event_time time,
  location text,
  description text,
  host_name text not null,
  host_email text not null,
  max_guests integer,
  deadline date,
  created_at timestamptz default now()
);

-- RSVP responses
create table rsvp_responses (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references rsvp_events not null,
  guest_name text not null,
  guest_email text,
  guest_count integer default 1,
  status text not null check (status in ('attending', 'not_attending', 'maybe')),
  message text,
  created_at timestamptz default now()
);

-- RLS policies
alter table templates enable row level security;
alter table designs enable row level security;
alter table rsvp_events enable row level security;
alter table rsvp_responses enable row level security;

-- Templates: public read
create policy "Templates are public" on templates for select using (true);

-- Designs: owner access
create policy "Users own their designs" on designs for all using (auth.uid() = user_id);

-- RSVP events: public read, owner write
create policy "RSVP events public read" on rsvp_events for select using (true);
create policy "RSVP responses public insert" on rsvp_responses for insert with check (true);
create policy "RSVP responses public read" on rsvp_responses for select using (true);
