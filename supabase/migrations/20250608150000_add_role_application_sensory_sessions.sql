-- Summer sensory session date preferences on role applications (checkbox per session date)

alter table public.role_applications
  add column session_thu_30_jul boolean,
  add column session_thu_6_aug boolean,
  add column session_thu_13_aug boolean,
  add column session_thu_20_aug boolean,
  add column session_thu_27_aug boolean;

comment on column public.role_applications.session_thu_30_jul is 'Thu 30th July – summer sensory session';
comment on column public.role_applications.session_thu_6_aug is 'Thu 6th August – summer sensory session';
comment on column public.role_applications.session_thu_13_aug is 'Thu 13th August – summer sensory session';
comment on column public.role_applications.session_thu_20_aug is 'Thu 20th August – summer sensory session';
comment on column public.role_applications.session_thu_27_aug is 'Thu 27th August – summer sensory session';
