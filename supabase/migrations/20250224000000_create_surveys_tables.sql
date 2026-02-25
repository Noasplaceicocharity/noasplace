-- Surveys table
create table public.surveys (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  created_at timestamptz not null default now(),
  active boolean not null default true
);

-- Survey responses table (links to surveys)
create table public.survey_responses (
  id uuid primary key default gen_random_uuid(),
  survey_id uuid not null references public.surveys(id) on delete cascade,
  answers jsonb not null default '{}',
  created_at timestamptz not null default now()
);

-- Index for listing responses by survey
create index survey_responses_survey_id_idx on public.survey_responses(survey_id);

-- Optional: enable RLS (Row Level Security) - uncomment if you want to use Supabase Auth
-- alter table public.surveys enable row level security;
-- alter table public.survey_responses enable row level security;
