-- Enums for recruitment roles and applications

create type public.role_status as enum ('draft', 'open', 'closed');
create type public.compensation_type as enum ('paid', 'volunteer');
create type public.employment_type as enum ('full_time', 'part_time', 'freelance');
create type public.send_experience_level as enum ('lived_experience', 'basic_knowledge', 'professional');

-- Open opportunities managed in Supabase (replaces Notion vacancies)
create table public.roles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  role_name text not null,
  role_type text not null,
  compensation_type public.compensation_type not null,
  employment_type public.employment_type not null,
  short_description text not null default '',
  long_description text not null default '',
  closing_date date,
  status public.role_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index roles_status_idx on public.roles (status);
create index roles_closing_date_idx on public.roles (closing_date);

create table public.role_applications (
  id uuid primary key default gen_random_uuid(),
  role_id uuid not null references public.roles (id) on delete cascade,
  first_name text not null,
  last_name text not null,
  email text not null,
  mobile text not null,
  address text not null,
  dbs_held boolean not null,
  send_experience public.send_experience_level not null,
  cv_path text,
  consent_contact boolean not null,
  consent_news boolean not null,
  created_at timestamptz not null default now()
);

create index role_applications_role_id_idx on public.role_applications (role_id);

-- Storage bucket for optional CV uploads
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'role-cvs',
  'role-cvs',
  false,
  5242880,
  array['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
)
on conflict (id) do nothing;

-- RLS
alter table public.roles enable row level security;
alter table public.role_applications enable row level security;

-- Public can read open roles
create policy "roles_select_open"
  on public.roles
  for select
  to anon, authenticated
  using (status = 'open');

-- Service role full access to roles
create policy "roles_all_service_role"
  on public.roles
  for all
  to service_role
  using (true)
  with check (true);

-- Public can submit applications
create policy "role_applications_insert_anon"
  on public.role_applications
  for insert
  to anon, authenticated
  with check (true);

-- Service role full access to applications
create policy "role_applications_all_service_role"
  on public.role_applications
  for all
  to service_role
  using (true)
  with check (true);

-- Storage: service role manages CV uploads via API
create policy "role_cvs_insert_service_role"
  on storage.objects
  for insert
  to service_role
  with check (bucket_id = 'role-cvs');

create policy "role_cvs_select_service_role"
  on storage.objects
  for select
  to service_role
  using (bucket_id = 'role-cvs');

create policy "role_cvs_update_service_role"
  on storage.objects
  for update
  to service_role
  using (bucket_id = 'role-cvs')
  with check (bucket_id = 'role-cvs');

create policy "role_cvs_delete_service_role"
  on storage.objects
  for delete
  to service_role
  using (bucket_id = 'role-cvs');
