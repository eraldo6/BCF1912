"use client";

import React from "react";

/* Rounded segmented control. Items with an accentColor tint their active state
   with that color; the default is brass. */

export function Segmented({ items, value, onChange, ariaLabel }) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      style={{
        display: "inline-flex",
        gap: 4,
        padding: 4,
        background: "var(--ink-100)",
        border: "1px solid var(--ink-300)",
        borderRadius: 999,
        flexWrap: "wrap",
      }}
    >
      {items.map(it => {
        const active = it.value === value;
        const accent = it.accentColor;
        return (
          <button
            key={it.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(it.value)}
            style={{
              cursor: "pointer",
              padding: "6px 14px",
              borderRadius: 999,
              border: "1px solid transparent",
              background: active
                ? (accent
                    ? `color-mix(in oklch, ${accent} 22%, transparent)`
                    : "color-mix(in oklch, var(--brass-500) 22%, transparent)")
                : "transparent",
              color: active
                ? (accent || "var(--brass-300)")
                : "var(--bone-400)",
              borderColor: active
                ? (accent
                    ? `color-mix(in oklch, ${accent} 45%, transparent)`
                    : "color-mix(in oklch, var(--brass-500) 45%, transparent)")
                : "transparent",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              transition: "background 0.2s, color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={e => {
              if (!active) e.currentTarget.style.color = "var(--bone-100)";
            }}
            onMouseLeave={e => {
              if (!active) e.currentTarget.style.color = "var(--bone-400)";
            }}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}
