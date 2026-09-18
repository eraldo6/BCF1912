"use client";

import { Nav, Footer } from "../../components/sections";
import { TranslationContext } from "../../components/translation-context";
import { TRANSLATIONS } from "../../lib/translations";
import React from "react";

export default function VereinshistoriePage() {
  const [lang, setLang] = React.useState("DE");

  React.useEffect(() => {
    const saved = localStorage.getItem("bcf_lang");
    if (saved) setLang(saved);
    const r = document.documentElement;
    r.style.setProperty("--brass-500", "oklch(0.78 0.13 220)");
    r.style.setProperty("--brass-700", "oklch(0.62 0.11 218)");
    r.style.setProperty("--brass-300", "oklch(0.88 0.10 222)");
    r.style.setProperty("--brass-900", "oklch(0.42 0.08 215)");
  }, []);

  const t = (key) => TRANSLATIONS[lang]?.[key] || key;

  return (
    <TranslationContext.Provider value={{ lang, setLang, t }}>
      <Nav />
      <div style={{ minHeight: "100vh", background: "var(--ink-050)", paddingTop: 80, display: "flex", flexDirection: "column" }}>

        {/* Breadcrumb */}
        <div className="container" style={{ paddingTop: 32 }}>
          <a
            href="/"
            style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none", opacity: 0.7, transition: "opacity 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.querySelector(".back-underline").style.transform = "scaleX(1)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = 0.7; e.currentTarget.querySelector(".back-underline").style.transform = "scaleX(0)"; }}
          >
            <span style={{ color: "var(--bone-500)", display: "inline-flex", flexDirection: "column", gap: 0 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 13 }}>←</span>
                <span>{t("nav.back")}</span>
              </span>
              <span className="back-underline" style={{ display: "block", height: 1, background: "var(--bone-500)", transformOrigin: "left", transform: "scaleX(0)", transition: "transform 0.25s ease" }} />
            </span>
            <span style={{ color: "var(--bone-700)", fontWeight: 300 }}>/</span>
            <span style={{ color: "var(--brass-500)" }}>{t("history.breadcrumb")}</span>
          </a>
        </div>

        {/* Sloth hero */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 72, paddingBottom: 48, textAlign: "center" }}>
          <style>{`
            @keyframes sloth-sway {
              0%   { transform: rotate(-4deg) translateY(0px); }
              50%  { transform: rotate(4deg) translateY(-6px); }
              100% { transform: rotate(-4deg) translateY(0px); }
            }
            @keyframes sloth-hang {
              0%   { transform: scaleY(1); }
              50%  { transform: scaleY(0.96); }
              100% { transform: scaleY(1); }
            }
          `}</style>
          <div style={{ fontSize: "clamp(80px, 14vw, 140px)", lineHeight: 1, animation: "sloth-sway 4s ease-in-out infinite", transformOrigin: "top center", display: "inline-block" }}>
            🦥
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 7vw, 96px)", fontWeight: 700, color: "var(--bone-100)", letterSpacing: "-0.03em", lineHeight: 1, marginTop: 32, marginBottom: 0 }}>
            Under<br /><em style={{ fontStyle: "italic", color: "var(--brass-500)" }}>Construction</em>
          </h1>
        </div>

        {/* Under Construction Content */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px 100px" }}>
          <div style={{ maxWidth: 640, width: "100%", textAlign: "left" }}>

            {/* Eyebrow */}
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--brass-500)", marginBottom: 32, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--brass-500)" }} />
              {t("history.eyebrow")}
            </div>

            {/* Headline */}
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 700, color: "var(--bone-100)", lineHeight: 1.05, marginBottom: 28, letterSpacing: "-0.02em" }}>
              {t("history.headline1")}<br />
              <em style={{ fontStyle: "italic", color: "var(--brass-500)" }}>{t("history.headline2")}</em><br />
              {t("history.headline3")}
            </h1>

            {/* Subtext */}
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 17, color: "var(--bone-500)", lineHeight: 1.7, maxWidth: 480, marginBottom: 48 }}>
              {t("history.lede")}
            </p>

            {/* Timeline placeholder — muted, gestural */}
            <div style={{ borderLeft: "1px solid var(--ink-400)", paddingLeft: 28, display: "flex", flexDirection: "column", gap: 28 }}>
              {[
                { year: t("history.timeline.today"),     label: t("history.timeline.todaylabel") },
                { year: t("history.timeline.1980s"),     label: t("history.timeline.1980label") },
                { year: t("history.timeline.1950s"),     label: t("history.timeline.1950label") },
                { year: "1912",                          label: t("history.timeline.1912") },
              ].map(({ year, label }, i) => (
                <div key={i} style={{ display: "flex", gap: 20, alignItems: "flex-start", opacity: i === 0 ? 1 : 0.3 }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", color: i === 0 ? "var(--brass-500)" : "var(--bone-500)", minWidth: 56, paddingTop: 2 }}>
                    {year}
                  </div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: i === 0 ? "var(--bone-200)" : "var(--bone-500)", lineHeight: 1.4 }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
      <Footer />
    </TranslationContext.Provider>
  );
}
