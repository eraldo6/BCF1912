"use client";

// CueScore API integration — ausgelagert, noch nicht aktiv eingebunden.
// Ursprünglich in components/sections.jsx als useTournaments()-Hook + Tournaments-Section.
// Kann später für automatischen Import oder Live-Anzeige genutzt werden.
// Siehe Nice-to-Haves #30.

import React from "react";

const CUESCORE_ORG_ID = 81469381;
const CUESCORE_LIST_URL = `https://api.cuescore.com/organization/?id=${CUESCORE_ORG_ID}`;
const CUESCORE_TOURNAMENT_URL = (id) => `https://api.cuescore.com/tournament/?id=${id}`;
export const CUESCORE_ALL_URL = "https://cuescore.com/bcfrankfurt1912/tournaments?q=&d=0&season=0&s=0";

const disciplineToType = (discipline) => {
  const d = (discipline || "").toLowerCase();
  if (/snooker/.test(d)) return "snooker";
  if (/(carom|karambol|cushion|cadre|libre|balkline|billiard fran)/.test(d)) return "karambol";
  return "pool";
};

export const sortTournaments = (list) => {
  const now = Date.now();
  const withMeta = list.map((t) => {
    const time = t.date ? new Date(t.date).getTime() : NaN;
    const past = !isNaN(time) && time < now - 1000 * 60 * 60 * 24;
    return { ...t, past, _time: isNaN(time) ? Infinity : time };
  });
  return withMeta.sort((a, b) => {
    if (a.past !== b.past) return a.past ? 1 : -1;
    return a.past ? b._time - a._time : a._time - b._time;
  });
};

const normalise = (raw) => ({
  id: raw.tournamentId,
  type: disciplineToType(raw.discipline),
  discipline: raw.discipline || "Pool",
  name: (raw.name || "").replace(/^.*?>\s*/, ""),
  date: raw.starttime || null,
  displayDate: raw.displayDate || null,
  venue: (raw.venues && raw.venues[0] && raw.venues[0].name) || null,
  status: raw.status || null,
  url: raw.url || null,
});

export const useTournaments = () => {
  const [state, setState] = React.useState({ items: null, loading: true, error: false });

  React.useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch(CUESCORE_LIST_URL);
        if (!res.ok) throw new Error("list");
        const ids = await res.json();
        const live = await Promise.all(
          (Array.isArray(ids) ? ids : []).map(async (id) => {
            try {
              const r = await fetch(CUESCORE_TOURNAMENT_URL(id));
              if (!r.ok) return null;
              return normalise(await r.json());
            } catch { return null; }
          })
        );
        if (cancelled) return;
        setState({ items: sortTournaments(live.filter(Boolean)), loading: false, error: false });
      } catch {
        if (cancelled) return;
        setState({ items: [], loading: false, error: true });
      }
    };

    load();
    return () => { cancelled = true; };
  }, []);

  return state;
};

export const formatTournamentDate = (t, lang) => {
  if (t.displayDate) return t.displayDate;
  if (!t.date) return null;
  const d = new Date(t.date);
  if (isNaN(d.getTime())) return null;
  return d.toLocaleDateString(lang === "DE" ? "de-DE" : "en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });
};

export const TYPE_ICON = { pool: "◉", karambol: "◆", snooker: "▦" };
