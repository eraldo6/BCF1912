"use client";

import React from "react";
import { Segmented } from "./segmented";
import { StandingsPanel } from "./standings-panel";

/* Discipline colors match those used throughout CalendarSection. */
const DISCIPLINE_COLOR = {
  Pool: "#6fa3e0",
  Snooker: "#6dc98a",
  "Karambol GB": "#e08080",
  "Karambol KB": "#e87a8e",
};

const STAFFEL_LABEL = { LL: "Landesliga", BL: "Bezirksliga", VL: "Verbandsliga", OL: "Oberliga" };

function disciplineColor(spielart) {
  return DISCIPLINE_COLOR[spielart] || "var(--bone-300)";
}

function disciplineGroup(spielart) {
  if (!spielart) return null;
  if (spielart.startsWith("Karambol")) return "Karambol";
  return spielart;
}

function weekdayLabel(date, lang) {
  const locale = lang === "EN" ? "en-GB" : "de-DE";
  return new Intl.DateTimeFormat(locale, { weekday: "short" }).format(date);
}

function fullDateLabel(date, lang) {
  const locale = lang === "EN" ? "en-GB" : "de-DE";
  return new Intl.DateTimeFormat(locale, { day: "2-digit", month: "long", year: "numeric" }).format(date);
}

function timeLabel(iso) {
  const d = new Date(iso);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function isPast(ev) {
  const end = ev.termin_ende ? new Date(ev.termin_ende) : null;
  const start = new Date(ev.termin);
  const ref = end || start;
  return ref.getTime() < Date.now();
}

/* Group events by their local dateKey and split into upcoming / past. */
function partitionAndGroup(events) {
  const past = [];
  const upcoming = [];
  for (const ev of events) {
    (isPast(ev) ? past : upcoming).push(ev);
  }
  const toGroups = (list) => {
    const map = new Map();
    for (const ev of list) {
      if (!map.has(ev.dateKey)) map.set(ev.dateKey, []);
      map.get(ev.dateKey).push(ev);
    }
    for (const [, arr] of map) {
      arr.sort((a, b) => {
        if (a.ganztaegig && !b.ganztaegig) return -1;
        if (!a.ganztaegig && b.ganztaegig) return 1;
        return new Date(a.termin) - new Date(b.termin);
      });
    }
    return Array.from(map.entries());
  };
  const upcomingGroups = toGroups(upcoming).sort((a, b) => a[0].localeCompare(b[0]));
  const pastGroups = toGroups(past).sort((a, b) => b[0].localeCompare(a[0]));
  return { upcomingGroups, pastGroups };
}

/* One match / event row. */
function Row({ ev, t, lang, past }) {
  const color = disciplineColor(ev.spielart);
  const staffelLabel = ev.staffel ? STAFFEL_LABEL[ev.staffel] || ev.staffel : null;

  const kategorieLabel = ev.kategorie ? (t(`cal.kategorie.${ev.kategorie}`) || ev.kategorie) : null;

  const showTeams = ev.heimmannschaft && ev.gastmannschaft && ev.kategorie === "Heimspiel";
  const showScore = ev.spieltag != null && ev.kategorie === "Heimspiel";
  const showMatchday = ev.spieltag != null;

  const time = ev.ganztaegig ? t("cal.allDay") : timeLabel(ev.termin);
  const venue = ev.austragungsort || t("spiele.tba");

  return (
    <div
      className="match-card spiele-row"
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "auto auto 1fr auto auto",
        alignItems: "center",
        gap: 20,
        padding: "18px 22px",
        borderLeft: `3px solid ${color}`,
        opacity: past ? 0.62 : 1,
        filter: past ? "grayscale(0.25)" : "none",
      }}
    >
      {past && (
        <span
          style={{
            position: "absolute",
            top: 10,
            right: 12,
            padding: "3px 9px",
            borderRadius: 999,
            background: "rgba(245, 241, 232, 0.08)",
            border: "1px solid rgba(245, 241, 232, 0.2)",
            color: "var(--bone-300)",
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          {t("spiele.past.tag")}
        </span>
      )}

      {/* Col 1: discipline + staffel badges */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 92 }}>
        {ev.spielart && (
          <span
            className="tc-badge"
            style={{
              background: `color-mix(in oklch, ${color} 16%, transparent)`,
              color,
              border: `1px solid color-mix(in oklch, ${color} 40%, transparent)`,
            }}
          >
            {ev.spielart}
          </span>
        )}
        {staffelLabel && (
          <span
            className="tc-badge"
            style={{
              background: "var(--ink-100)",
              color: "var(--bone-400)",
              border: "1px solid var(--ink-300)",
            }}
          >
            {ev.staffel}
          </span>
        )}
      </div>

      {/* Col 2: matchday or kategorie */}
      <div className="tc-discipline" style={{ minWidth: 130, color: "var(--bone-300)" }}>
        {showMatchday
          ? `${t("spiele.matchday")} ${ev.spieltag}`
          : (kategorieLabel || "")}
      </div>

      {/* Col 3: teams or titel */}
      <div style={{ minWidth: 0 }}>
        {showTeams ? (
          <div className="match-teams" style={{ margin: 0, gap: 4 }}>
            <div className="match-team">
              <span className="team-name" style={{ fontWeight: 500 }}>{ev.heimmannschaft}</span>
            </div>
            <div className="match-team">
              <span className="team-name" style={{ color: "var(--bone-300)" }}>{ev.gastmannschaft}</span>
            </div>
          </div>
        ) : (
          <div style={{ fontFamily: "var(--font-display)", fontSize: 16, color: "var(--bone-100)", lineHeight: 1.3 }}>
            {ev.titel}
          </div>
        )}
      </div>

      {/* Col 4: score placeholder */}
      {showScore ? (
        <div className="match-score" style={{ margin: 0, minWidth: 60 }}>
          <span className="score" style={{ fontSize: "1.15rem", color: "var(--bone-300)" }}>—</span>
        </div>
      ) : (
        <div style={{ minWidth: 60 }} />
      )}

      {/* Col 5: time + venue */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, minWidth: 160 }}>
        <span className="tc-date">{time}</span>
        <span className="tc-venue" style={{ fontSize: 12, textAlign: "right" }}>{venue}</span>
      </div>
    </div>
  );
}

function DayHeader({ dateKey, lang }) {
  const d = new Date(dateKey + "T00:00:00");
  return (
    <div
      className="reveal"
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: 14,
        padding: "24px 0 12px",
        borderBottom: "1px solid var(--ink-300)",
        marginBottom: 12,
      }}
    >
      <span className="section-num" style={{ fontSize: 22 }}>
        {String(d.getDate()).padStart(2, "0")}
      </span>
      <span className="section-divider" />
      <span className="eyebrow" style={{ fontSize: 11 }}>
        {weekdayLabel(d, lang)} · {fullDateLabel(d, lang)}
      </span>
    </div>
  );
}

function GroupSection({ title, groups, t, lang, empty, standings }) {
  if (groups.length === 0) {
    return (
      <div style={{ padding: "60px 0", textAlign: "center", color: "var(--bone-400)", fontFamily: "var(--font-display)", fontSize: 15 }}>
        {empty}
      </div>
    );
  }
  return (
    <div style={{ marginBottom: 48 }}>
      <div
        className="eyebrow"
        style={{ marginBottom: 8, color: "var(--brass-500)", fontSize: 11 }}
      >
        {title}
      </div>
      {groups.map(([dateKey, rows]) => {
        /* Panel-Auswahl pro Tag: eindeutige (spielart, staffel_nr) aus den Heimspiel-Zeilen. */
        const keys = new Set();
        for (const ev of rows) {
          if (ev.kategorie === "Heimspiel" && ev.spielart && ev.staffel_nr != null) {
            keys.add(`${ev.spielart}|${ev.staffel_nr}`);
          }
        }
        const panels = [...keys].map(k => standings?.[k]).filter(Boolean);
        return (
          <div key={dateKey} style={{ marginBottom: 24 }}>
            <div
              className="spiele-day-grid"
              style={{
                display: "grid",
                gridTemplateColumns: panels.length ? "minmax(0, 1fr) 320px" : "1fr",
                gap: 24,
                alignItems: "start",
              }}
            >
              <div className="spiele-day-rows">
                <DayHeader dateKey={dateKey} lang={lang} />
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {rows.map(ev => (
                    <Row key={ev.id} ev={ev} t={t} lang={lang} past={isPast(ev)} />
                  ))}
                </div>
              </div>
              {panels.length > 0 && (
                <aside className="spiele-day-side" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {panels.map(p => (
                    <StandingsPanel key={`${p.spielart}|${p.staffel_nr}`} standings={p} t={t} />
                  ))}
                </aside>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function SpieleListView({ veranstaltungen, standings, disciplineFilter, setDisciplineFilter, t, lang }) {
  const filterItems = [
    { value: "all", label: t("spiele.filter.all") },
    { value: "Pool", label: t("spiele.filter.pool"), accentColor: DISCIPLINE_COLOR.Pool },
    { value: "Snooker", label: t("spiele.filter.snooker"), accentColor: DISCIPLINE_COLOR.Snooker },
    { value: "Karambol", label: t("spiele.filter.karambol"), accentColor: DISCIPLINE_COLOR["Karambol GB"] },
  ];

  const filtered = React.useMemo(() => {
    if (disciplineFilter === "all") return veranstaltungen;
    return veranstaltungen.filter(v => disciplineGroup(v.spielart) === disciplineFilter);
  }, [veranstaltungen, disciplineFilter]);

  const { upcomingGroups, pastGroups } = React.useMemo(() => partitionAndGroup(filtered), [filtered]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 32 }}>
        <Segmented
          items={filterItems}
          value={disciplineFilter}
          onChange={setDisciplineFilter}
          ariaLabel="Discipline filter"
        />
      </div>

      <GroupSection
        title={t("spiele.upcoming")}
        groups={upcomingGroups}
        t={t}
        lang={lang}
        empty={t("spiele.empty")}
      />

      {pastGroups.length > 0 && (
        <GroupSection
          title={t("spiele.past")}
          groups={pastGroups}
          t={t}
          lang={lang}
          empty={t("spiele.empty")}
        />
      )}
    </div>
  );
}
