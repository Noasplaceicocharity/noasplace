-- Public bucket for downloadable role description PDFs
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'role-description-pdfs',
  'role-description-pdfs',
  true,
  10485760,
  array['application/pdf']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Anyone can download PDFs from this bucket
create policy "role_description_pdfs_select_public"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'role-description-pdfs');

-- Service role manages uploads via dashboard
create policy "role_description_pdfs_insert_service_role"
  on storage.objects
  for insert
  to service_role
  with check (bucket_id = 'role-description-pdfs');

create policy "role_description_pdfs_update_service_role"
  on storage.objects
  for update
  to service_role
  using (bucket_id = 'role-description-pdfs')
  with check (bucket_id = 'role-description-pdfs');

create policy "role_description_pdfs_delete_service_role"
  on storage.objects
  for delete
  to service_role
  using (bucket_id = 'role-description-pdfs');

-- URL column on roles table
alter table public.roles add column if not exists description_pdf_url text;

comment on column public.roles.description_pdf_url is 'Public URL to role description PDF in role-description-pdfs storage bucket';
