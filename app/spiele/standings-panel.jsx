"use client";

import React from "react";

const DISCIPLINE_COLOR = {
  Pool: "#6fa3e0",
  Snooker: "#6dc98a",
};

/* Kompakte Ligatabelle für die /spiele-Sidebar. BCF-Zeile hervorgehoben.
   Hinweis: spiele-content.jsx überschreibt --brass-* auf der /spiele-Seite zu Cyan,
   daher liest der BCF-Highlight auf dieser Seite Cyan (bewusst). */
export function StandingsPanel({ standings, t }) {
  if (!standings || !standings.rows || standings.rows.length === 0) return null;

  const color = DISCIPLINE_COLOR[standings.spielart] || "var(--bone-300)";
  const highlightBg = "color-mix(in oklch, var(--brass-500) 12%, transparent)";

  return (
    <div
      className="standings-panel"
      style={{
        border: "1px solid var(--ink-300)",
        background: "var(--ink-100)",
        padding: "14px 16px",
        borderRadius: 4,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
        <span
          className="tc-badge"
          style={{
            background: `color-mix(in oklch, ${color} 16%, transparent)`,
            color,
            border: `1px solid color-mix(in oklch, ${color} 40%, transparent)`,
          }}
        >
          {standings.staffel_code}
        </span>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 13, color: "var(--bone-100)" }}>
          {standings.staffel_name_full}
        </span>
        <span
          style={{
            marginLeft: "auto",
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--bone-400)",
          }}
        >
          {standings.spielart}
        </span>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: 12,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <thead>
          <tr style={{ color: "var(--bone-400)", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            <th style={{ textAlign: "left", padding: "4px 6px 6px 8px", fontWeight: 400 }}>{t("spiele.standings.col.rank")}</th>
            <th style={{ textAlign: "left", padding: "4px 6px 6px 6px", fontWeight: 400 }}>{t("spiele.standings.col.team")}</th>
            <th style={{ textAlign: "right", padding: "4px 6px 6px 6px", fontWeight: 400 }}>{t("spiele.standings.col.played")}</th>
            <th style={{ textAlign: "right", padding: "4px 6px 6px 6px", fontWeight: 400 }}>{t("spiele.standings.col.points")}</th>
            <th style={{ textAlign: "right", padding: "4px 8px 6px 6px", fontWeight: 400 }}>{t("spiele.standings.col.diff")}</th>
          </tr>
        </thead>
        <tbody>
          {standings.rows.map(row => {
            const isBcf = row.club_id === 26;
            return (
              <tr
                key={row.team_id}
                style={{
                  background: isBcf ? highlightBg : "transparent",
                  borderLeft: isBcf ? "2px solid var(--brass-500)" : "2px solid transparent",
                }}
              >
                <td style={{ padding: "6px 6px 6px 8px", fontFamily: "var(--font-mono)", color: "var(--bone-300)" }}>{row.rank}</td>
                <td style={{ padding: "6px", color: "var(--bone-100)", fontWeight: isBcf ? 500 : 400, minWidth: 0, maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {row.team_name}
                </td>
                <td style={{ padding: "6px", textAlign: "right", color: "var(--bone-300)" }}>{row.played}</td>
                <td style={{ padding: "6px", textAlign: "right", fontFamily: "var(--font-mono)", color: "var(--bone-100)", fontWeight: 500 }}>{row.points}</td>
                <td style={{ padding: "6px 8px 6px 6px", textAlign: "right", color: "var(--bone-400)" }}>{row.diff > 0 ? `+${row.diff}` : row.diff}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
