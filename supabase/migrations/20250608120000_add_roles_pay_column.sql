alter table public.roles add column if not exists pay text;

comment on column public.roles.pay is 'Optional pay display text, e.g. £25,000 pro rata or Unpaid';
