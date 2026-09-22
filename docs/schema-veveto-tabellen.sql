-- veveto_tabellen — mini-standings snapshot per BCF league, refreshed nightly by
-- /api/cron/sync-veveto. Run once in the Supabase SQL editor.

create table public.veveto_tabellen (
  id                bigserial primary key,
  contest_id        smallint    not null,        -- 1 Pool, 2 Snooker
  spielart          text        not null,        -- 'Pool' | 'Snooker'
  season_id         integer     not null,        -- VeVeTo season id (auto-discovered via active===1)
  league_id         integer     not null,
  staffel_code      text        not null,        -- 'LL' | 'BL' | 'VL' | 'OL'
  staffel_nr        integer,                     -- entspricht veranstaltungen.staffel_nr
  staffel_name_full text,                        -- 'Landesliga' etc.
  team_id           integer     not null,
  team_name         text        not null,
  club_id           integer     not null,        -- 26 == BCF
  rank              smallint    not null,        -- 1-based index in der sortierten Antwort
  played            smallint    not null default 0,
  wins              smallint    not null default 0,
  draws             smallint    not null default 0,
  losses            smallint    not null default 0,
  points            integer     not null default 0,
  diff              integer     not null default 0,
  bcf_in_league     boolean     not null,        -- true für jede Zeile einer BCF-haltigen Liga
  fetched_at        timestamptz not null default now(),
  unique (season_id, league_id, team_id)
);

create index veveto_tabellen_league_idx on public.veveto_tabellen (spielart, staffel_nr, rank);
create index veveto_tabellen_bcf_idx    on public.veveto_tabellen (bcf_in_league) where bcf_in_league;

alter table public.veveto_tabellen enable row level security;
create policy "public read veveto_tabellen"
  on public.veveto_tabellen for select
  to anon, authenticated using (true);
