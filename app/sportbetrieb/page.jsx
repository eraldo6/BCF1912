"use client";

import { Nav, Footer } from "../../components/sections";
import { TranslationContext } from "../../components/translation-context";
import { TRANSLATIONS } from "../../lib/translations";
import React from "react";

export default function SportbetriebPage() {
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
            <span style={{ color: "var(--brass-500)" }}>{t("nav.sportsbetrieb")}</span>
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
          `}</style>
          <div style={{ fontSize: "clamp(80px, 14vw, 140px)", lineHeight: 1, animation: "sloth-sway 4s ease-in-out infinite", transformOrigin: "top center", display: "inline-block" }}>
            🦥
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 7vw, 96px)", fontWeight: 700, color: "var(--bone-100)", letterSpacing: "-0.03em", lineHeight: 1, marginTop: 32, marginBottom: 0 }}>
            Under<br /><em style={{ fontStyle: "italic", color: "var(--brass-500)" }}>Construction</em>
          </h1>
        </div>

        {/* Content placeholder */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px 100px" }}>
          <div style={{ maxWidth: 640, width: "100%", textAlign: "left" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--brass-500)", marginBottom: 32, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--brass-500)" }} />
              {t("sportsbetrieb.eyebrow")}
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: "var(--bone-100)", lineHeight: 1.1, marginBottom: 24, letterSpacing: "-0.02em" }}>
              {t("sportsbetrieb.headline")}
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 17, color: "var(--bone-500)", lineHeight: 1.7, maxWidth: 480 }}>
              {t("sportsbetrieb.lede")}
            </p>
          </div>
        </div>

      </div>
      <Footer />
    </TranslationContext.Provider>
  );
}
