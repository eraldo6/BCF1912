"use client";

import { Nav, Footer } from "../../components/sections";
import { TranslationContext } from "../../components/translation-context";
import { TRANSLATIONS } from "../../lib/translations";
import React from "react";

export default function DatenschutzPage() {
  const [lang, setLang] = React.useState("DE");

  React.useEffect(() => {
    const saved = localStorage.getItem("bcf_lang");
    if (saved) setLang(saved);
  }, []);

  const t = (key) => TRANSLATIONS[lang]?.[key] || key;

  return (
    <TranslationContext.Provider value={{ lang, setLang, t }}>
      <Nav />
      <div style={{ minHeight: "100vh", background: "var(--ink-000)", paddingTop: 80 }}>

        {/* Header */}
        <div style={{ borderBottom: "1px solid var(--ink-300)", padding: "48px 0 56px" }}>
          <div className="container">
            <a
              href="/"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none", opacity: 0.7, transition: "opacity 0.2s", marginBottom: 32 }}
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
              <span style={{ color: "var(--brass-500)" }}>{t("nav.datenschutz")}</span>
            </a>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 7vw, 88px)", fontWeight: 700, color: "var(--bone-100)", lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 16 }}>
              Daten&shy;<em style={{ fontStyle: "italic", color: "var(--brass-500)" }}>schutz</em>
            </h1>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--bone-400)", maxWidth: 480, lineHeight: 1.6 }}>
              Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.
            </p>
          </div>
        </div>

        {/* Platzhalter-Inhalt */}
        <div style={{ padding: "72px 0 100px" }}>
          <div className="container">
            <div style={{ maxWidth: 680, color: "var(--bone-400)", fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.8 }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--bone-600)", marginBottom: 32 }}>
                — Datenschutzerklärung folgt in Kürze —
              </p>
              <p>
                Die vollständige Datenschutzerklärung wird hier vor dem Go-Live veröffentlicht.
                Sie wird Angaben zu Datenverarbeitung, eingesetzten Diensten (Vercel, Supabase)
                sowie zu den Rechten der Nutzerinnen und Nutzer enthalten.
              </p>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </TranslationContext.Provider>
  );
}
