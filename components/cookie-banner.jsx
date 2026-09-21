"use client";

import { useState, useEffect } from "react";
import { TRANSLATIONS } from "../lib/translations";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [lang, setLang] = useState("DE");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("bcf_lang");
      if (saved) setLang(saved);
      if (!localStorage.getItem("bcf_cookie_notice")) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const tr = (key, fallback) => TRANSLATIONS[lang]?.[key] || fallback;

  function dismiss() {
    try { localStorage.setItem("bcf_cookie_notice", "1"); } catch {}
    setClosing(true);
    setTimeout(() => setVisible(false), 150);
  }

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(dismiss, 5000);
    return () => clearTimeout(t);
  }, [visible]);

  if (!visible) return null;

  const r = 10;
  const circ = 2 * Math.PI * r;

  return (
    <div className="cookie-banner-root" style={{
      position: "fixed",
      bottom: 24,
      left: "50%",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      gap: 16,
      background: "var(--ink-100)",
      border: "1px solid var(--ink-300)",
      borderRadius: 12,
      padding: "14px 16px 14px 20px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      maxWidth: "calc(100vw - 32px)",
      width: "max-content",
      opacity: closing ? 0 : 1,
      transform: closing
        ? "translateX(-50%) translateY(32px)"
        : "translateX(-50%) translateY(0)",
      transition: closing
        ? "opacity 0.15s ease, transform 0.15s ease"
        : "none",
    }}>
      <style>{`
        .cookie-close:hover .cookie-x { color: var(--bone-100) !important; }
        .cookie-close:hover { background: var(--ink-300) !important; }
        @keyframes cookie-countdown {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: ${circ}; }
        }
      `}</style>

      {/* Shield SVG */}
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
        <path d="M11 2L4 5v5c0 4.4 3.1 8.5 7 9.5 3.9-1 7-5.1 7-9.5V5L11 2z" fill="var(--felt-500)" stroke="var(--felt-300)" strokeWidth="1.2" strokeLinejoin="round"/>
        <polyline points="8,11 10.5,13.5 14,9" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>

      {/* Text */}
      <span style={{
        fontFamily: "var(--font-sans)",
        fontSize: 15,
        color: "var(--bone-300)",
        lineHeight: 1.5,
      }}>
        {tr("cookie.text", "Diese Website verwendet")}{" "}
        <strong style={{ color: "var(--bone-100)", fontWeight: 600 }}>{tr("cookie.bold", "keine Cookies")}</strong>
        {" "}{tr("cookie.suffix", "nur technisch notwendige Daten.")}{" "}
        <a href="/datenschutz" style={{ color: "var(--brass-500)", textDecoration: "underline", textUnderlineOffset: 3 }}>
          {tr("cookie.link", "Datenschutz")}
        </a>
      </span>

      {/* Close mit Countdown-Ring */}
      <button
        onClick={dismiss}
        aria-label="Schließen"
        className="cookie-close"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          flexShrink: 0,
          position: "relative",
          width: 28,
          height: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          transition: "background 0.15s",
        }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" style={{ position: "absolute", inset: 0, transform: "rotate(90deg) scaleX(-1)" }}>
          <circle cx="14" cy="14" r={r} fill="none" stroke="var(--ink-300)" strokeWidth="1.5"/>
          <circle
            cx="14" cy="14" r={r}
            fill="none"
            stroke="var(--brass-500)"
            strokeWidth="1.5"
            strokeDasharray={circ}
            strokeDashoffset="0"
            strokeLinecap="round"
            style={{ animation: `cookie-countdown 5s linear forwards` }}
          />
        </svg>
        <span className="cookie-x" style={{
          position: "relative",
          fontSize: 12,
          color: "var(--bone-500)",
          lineHeight: 1,
          transition: "color 0.15s",
        }}>✕</span>
      </button>
    </div>
  );
}
