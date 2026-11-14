"use client";

import { Nav, Footer } from "../../components/sections";
import { TranslationContext } from "../../components/translation-context";
import { TRANSLATIONS } from "../../lib/translations";
import { VEREINSGESCHICHTE, CHRONIK, CHRONIK_DECADES } from "../../lib/chronik";
import React from "react";

function DecadeCard({ entry, side }) {
  return (
    <div className="erfolge-row" data-side={side} id={`decade-${entry.key}`}>
      {side === "left" && (
        <div className="erfolge-item reveal" style={{ textAlign: "right" }}>
          <DecadeBody entry={entry} />
        </div>
      )}
      <div className="erfolge-node" />
      {side === "right" && (
        <div className="erfolge-item reveal">
          <DecadeBody entry={entry} />
        </div>
      )}
    </div>
  );
}

function DecadeBody({ entry }) {
  return (
    <>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 28,
          fontWeight: 700,
          color: "var(--brass-500)",
          letterSpacing: "-0.02em",
          lineHeight: 1,
          marginBottom: 10,
        }}
      >
        {entry.range}
      </div>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 14,
          color: "var(--bone-300)",
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {entry.text}
      </p>
    </>
  );
}

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

  React.useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in-view"); });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [lang]);

  const t = (key) => TRANSLATIONS[lang]?.[key] || key;

  const narrative = VEREINSGESCHICHTE[lang] || VEREINSGESCHICHTE.DE;
  const chronik = CHRONIK[lang] || CHRONIK.DE;

  const scrollToDecade = (key) => (e) => {
    e.preventDefault();
    document.getElementById(`decade-${key}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

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

        {/* Hero */}
        <div className="container" style={{ paddingTop: 64, paddingBottom: 48 }}>
          <div
            className="reveal"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--brass-500)",
              marginBottom: 24,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--brass-500)" }} />
            {t("history.eyebrow")}
          </div>

          <h1
            className="reveal delay-1"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 6.5vw, 80px)",
              fontWeight: 700,
              color: "var(--bone-100)",
              lineHeight: 1.04,
              marginTop: 0,
              marginBottom: 24,
              letterSpacing: "-0.03em",
            }}
          >
            {t("history.headline1")}{" "}
            <em style={{ fontStyle: "italic", color: "var(--brass-500)" }}>
              {t("history.headline2")}
            </em>{" "}
            {t("history.headline3")}
          </h1>

          <p
            className="reveal delay-2"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 17,
              color: "var(--bone-400)",
              lineHeight: 1.6,
              maxWidth: 640,
              margin: 0,
            }}
          >
            {t("history.lede")}
          </p>
        </div>

        {/* Narrative */}
        <div className="container" style={{ paddingTop: 24, paddingBottom: 48 }}>
          <div className="eyebrow" style={{ marginBottom: 24, color: "var(--brass-500)", fontSize: 11 }}>
            {t("history.narrative.title")}
          </div>
          <div style={{ maxWidth: 680, display: "flex", flexDirection: "column", gap: 22 }}>
            {narrative.map((para, i) => (
              <p
                key={i}
                className="reveal"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 16,
                  color: "var(--bone-300)",
                  lineHeight: 1.72,
                  margin: 0,
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* Chronik */}
        <div className="container" style={{ paddingTop: 48, paddingBottom: 100 }}>
          <div style={{ marginBottom: 24 }}>
            <div className="eyebrow" style={{ marginBottom: 16, color: "var(--brass-500)", fontSize: 11 }}>
              {t("history.chronik.title")}
            </div>
            {/* Era jump-nav */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--bone-500)",
                }}
              >
                {t("history.jumpTo")}
              </span>
              {CHRONIK_DECADES.map(d => (
                <a
                  key={d.key}
                  href={`#decade-${d.key}`}
                  onClick={scrollToDecade(d.key)}
                  className="tc-badge"
                  style={{
                    background: "var(--ink-100)",
                    color: "var(--bone-200)",
                    border: "1px solid var(--ink-300)",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  {d.label}
                </a>
              ))}
            </div>
          </div>

          <div className="erfolge-timeline">
            {chronik.map((entry, i) => (
              <DecadeCard key={entry.key} entry={entry} side={i % 2 === 0 ? "left" : "right"} />
            ))}
          </div>
        </div>

      </div>
      <Footer />
    </TranslationContext.Provider>
  );
}
