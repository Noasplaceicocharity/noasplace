-- Enable Row Level Security on survey tables

alter table public.surveys enable row level security;
alter table public.survey_responses enable row level security;

-- surveys: anyone can read active surveys (for the public survey form)
create policy "surveys_select_active"
  on public.surveys
  for select
  to anon, authenticated
  using (active = true);

-- surveys: service role can do everything (migrations, admin)
create policy "surveys_all_service_role"
  on public.surveys
  for all
  to service_role
  using (true)
  with check (true);

-- survey_responses: anyone can insert (submit a response)
create policy "survey_responses_insert_anon"
  on public.survey_responses
  for insert
  to anon, authenticated
  with check (true);

-- survey_responses: no public read (responses are private; use service role or dashboard to view)
-- So we do not add a select policy for anon/authenticated.

-- survey_responses: service role can do everything (export data, admin)
create policy "survey_responses_all_service_role"
  on public.survey_responses
  for all
  to service_role
  using (true)
  with check (true);
