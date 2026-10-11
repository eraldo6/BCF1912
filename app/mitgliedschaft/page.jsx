"use client";

import { Membership } from "../../components/sections";
import { Nav, Footer } from "../../components/sections";
import { TranslationContext } from "../../components/translation-context";
import { TRANSLATIONS } from "../../lib/translations";
import React from "react";

export default function MitgliedschaftPage() {
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

  React.useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in-view"); });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const t = (key) => TRANSLATIONS[lang]?.[key] || key;

  return (
    <TranslationContext.Provider value={{ lang, setLang, t }}>
      <Nav />
      <div style={{ paddingTop: 80, background: "var(--ink-050)" }}>
        <div className="membership-breadcrumb" style={{ paddingTop: 32 }}>
          <div className="container">
          <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none", opacity: 0.7, transition: "opacity 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.querySelector(".back-underline").style.transform = "scaleX(1)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = 0.7; e.currentTarget.querySelector(".back-underline").style.transform = "scaleX(0)"; }}>
            <span style={{ color: "var(--bone-500)", display: "inline-flex", flexDirection: "column", gap: 0 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 13 }}>←</span>
                <span>{t("nav.back")}</span>
              </span>
              <span className="back-underline" style={{ display: "block", height: 1, background: "var(--bone-500)", transformOrigin: "left", transform: "scaleX(0)", transition: "transform 0.25s ease" }} />
            </span>
            <span style={{ color: "var(--bone-700)", fontWeight: 300 }}>/</span>
            <span style={{ color: "var(--brass-500)" }}>{t("nav.membership")}</span>
          </a>
          </div>
        </div>
        <Membership />

        {/* Probetraining */}
        <div id="ansprechpartner" className="membership-probetraining" style={{ borderTop: "1px solid var(--ink-300)", padding: "88px 0 100px", background: "var(--ink-000)" }}>
          <div className="container">
            <div className="membership-contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>

              {/* Left: text */}
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--brass-500)", marginBottom: 28 }}>
                  {t("membership.contact.eyebrow")}
                </div>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(30px, 3.5vw, 52px)", fontWeight: 400, color: "var(--bone-100)", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 28 }}>
                  {t("membership.contact.headline1")}<br /><em style={{ fontStyle: "italic", color: "var(--brass-500)" }}>{t("membership.contact.headline2")}</em>
                </h2>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(18px, 2vw, 26px)", fontWeight: 400, color: "var(--bone-300)", lineHeight: 1.35, letterSpacing: "-0.01em", maxWidth: 520 }} dangerouslySetInnerHTML={{ __html: t("membership.contact.desc") }} />
              </div>

              {/* Right: contacts + CTA */}
              <div className="contact-col-right" style={{ paddingTop: 60, display: "flex", flexDirection: "column", gap: 16, maxWidth: 360 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--bone-500)", marginBottom: 4 }}>{t("membership.contact.contacts")}</div>
                {[
                  { u: "1vorsitzender", d: "bcfrankfurt", t: "de", label: t("membership.contact.label1") },
                  { u: "vize-sport",    d: "bcfrankfurt", t: "de", label: t("membership.contact.label2") },
                ].map(({ u, d, t: tld, label }) => (
                  <div
                    key={u}
                    className="membership-contact-card" style={{ padding: "28px 32px", border: "1px solid rgba(245,241,232,0.08)", borderRadius: "var(--radius-lg)", background: "rgba(17,17,20,0.6)", transition: "border-color 0.3s, background 0.3s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--brass-500)"; e.currentTarget.style.background = "rgba(17,17,20,0.9)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(245,241,232,0.08)"; e.currentTarget.style.background = "rgba(17,17,20,0.6)"; }}
                  >
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--bone-500)", marginBottom: 10 }}>
                      {label}
                    </div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--brass-500)", letterSpacing: "0.04em", wordBreak: "break-all" }}>
                      {u}@{d}.{tld}
                    </div>
                  </div>
                ))}
                <a
                  href="#"
                  onClick={e => { e.preventDefault(); window.location.href = `mailto:${"1vorsitzender"}@${"bcfrankfurt"}.${"de"},${"vize-sport"}@${"bcfrankfurt"}.${"de"}?subject=Probetraining%20Anfrage%20%7C%20BC%20Frankfurt%201912%20e.V.`; }}
                  className="btn btn-brass"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 8 }}
                >
                  {t("membership.contact.cta")}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
                </a>
              </div>

            </div>
          </div>
        </div>

      </div>
      <Footer />
    </TranslationContext.Provider>
  );
}
