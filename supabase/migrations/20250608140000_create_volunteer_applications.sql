create type public.volunteer_send_experience_level as enum (
  'lived_experience',
  'basic_knowledge',
  'expert_knowledge',
  'no_knowledge'
);

create table public.volunteer_applications (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  mobile text not null,
  address text not null,
  send_experience public.volunteer_send_experience_level not null,
  cv_path text,
  consent_contact boolean not null,
  consent_news boolean not null,
  created_at timestamptz not null default now()
);

create index volunteer_applications_created_at_idx on public.volunteer_applications (created_at desc);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'volunteer-cvs',
  'volunteer-cvs',
  false,
  5242880,
  array['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
)
on conflict (id) do nothing;

alter table public.volunteer_applications enable row level security;

create policy "volunteer_applications_insert_anon"
  on public.volunteer_applications
  for insert
  to anon, authenticated
  with check (true);

create policy "volunteer_applications_all_service_role"
  on public.volunteer_applications
  for all
  to service_role
  using (true)
  with check (true);

create policy "volunteer_cvs_insert_service_role"
  on storage.objects
  for insert
  to service_role
  with check (bucket_id = 'volunteer-cvs');

create policy "volunteer_cvs_select_service_role"
  on storage.objects
  for select
  to service_role
  using (bucket_id = 'volunteer-cvs');

create policy "volunteer_cvs_update_service_role"
  on storage.objects
  for update
  to service_role
  using (bucket_id = 'volunteer-cvs')
  with check (bucket_id = 'volunteer-cvs');

create policy "volunteer_cvs_delete_service_role"
  on storage.objects
  for delete
  to service_role
  using (bucket_id = 'volunteer-cvs');
