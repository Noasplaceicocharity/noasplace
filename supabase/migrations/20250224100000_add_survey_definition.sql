-- Add definition column for structured survey (sections, questions, options)
alter table public.surveys
  add column if not exists definition jsonb;

comment on column public.surveys.definition is 'Structured survey: sections, questions, types (single/multi/scale/text), options, conditional logic';
