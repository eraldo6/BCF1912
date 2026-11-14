"use client";

import { Nav, Footer } from "../../components/sections";
import { TranslationContext } from "../../components/translation-context";
import { TRANSLATIONS } from "../../lib/translations";
import React from "react";

/* Static trophy data — chronological, every podium finish from the Erfolge section. */
const TROPHIES = [
  { year: 1939, discipline: "karambol", catKey: "cat.world",      rankKey: "rank.world",       title: "Fünfkampf",                 athlete: "Walter Lütgehetmann", noteKey: "note.wm1939" },
  { year: 1952, discipline: "karambol", catKey: "cat.euro",       rankKey: "rank.euro",        title: "Cadre 71/2",                athlete: "Walter Lütgehetmann" },
  { year: 1953, discipline: "karambol", catKey: "cat.euro",       rankKey: "rank.euro",        title: "Cadre 71/2 · Cadre 47/2",   athlete: "Walter Lütgehetmann" },
  { year: 1954, discipline: "karambol", catKey: "cat.euro",       rankKey: "rank.euro",        title: "Einband",                   athlete: "Walter Lütgehetmann" },
  { year: 1959, discipline: "karambol", catKey: "cat.world",      rankKey: "rank.worldVice",   title: "Cadre 71/2",                athlete: "Walter Lütgehetmann" },
  { year: 1961, discipline: "karambol", catKey: "cat.german",     rankKey: "rank.german",      title: "25 Deutsche Meistertitel",  athlete: "Walter Lütgehetmann (1935 – 1961)" },
  { year: 1986, discipline: "karambol", catKey: "cat.dpmm",       rankKey: "rank.third",       title: "Dreiband",                  athlete: "Schiwek · Köstner · Stavrakidis · Blach" },
  { year: 1988, discipline: "karambol", catKey: "cat.dpmm",       rankKey: "rank.germanVice",  title: "Dreiband",                  athlete: "Köstner · Schiwek · Erogul · Stein" },
  { year: 1990, discipline: "karambol", catKey: "cat.bundesliga2", rankKey: "rank.promotion",  title: "Aufstieg in die 1. Bundesliga", athlete: "Lotz · Köstner · Erogul · Stavrakidis · Schiwek · Eversmann" },
  { year: 1991, discipline: "karambol", catKey: "cat.teamSmall4", rankKey: "rank.cupWin",      title: "Vierkampf · kleines Billard", athlete: "Köstner · Erogul · Stavrakidis · Ettelbrück · Wagner" },
  { year: 1992, discipline: "karambol", catKey: "cat.german",     rankKey: "rank.germanVice",  title: "Einband",                   athlete: "Orhan Erogul" },
  { year: 1992, discipline: "karambol", catKey: "cat.german",     rankKey: "rank.germanVice",  title: "Cadre 47/2",                athlete: "Efstratios Stavrakidis" },
  { year: 1994, discipline: "karambol", catKey: "cat.german",     rankKey: "rank.germanVice",  title: "Dreiband",                  athlete: "Reiner Schiwek" },
  { year: 1994, discipline: "karambol", catKey: "cat.german",     rankKey: "rank.third",       title: "Dreiband",                  athlete: "Ralf Köstner" },
  { year: 1995, discipline: "karambol", catKey: "cat.bundesliga", rankKey: "rank.germanVice",  title: "1. Bundesliga Dreiband",    athlete: "Köstner · Eversmann · Schiwek · Erogul · Stavrakidis" },
  { year: 1996, discipline: "karambol", catKey: "cat.bundesliga", rankKey: "rank.germanVice",  title: "1. Bundesliga Dreiband",    athlete: "Köstner · Schiwek · Eversmann · Erogul · Stavrakidis" },
  { year: 1996, discipline: "karambol", catKey: "cat.europeanCup", rankKey: "rank.fourth",     title: "Endrunde Essen",            athlete: "Köstner · Schiwek · Eversmann · Erogul", noteKey: "note.ep1996" },
  { year: 1997, discipline: "karambol", catKey: "cat.dpmm",       rankKey: "rank.third",       title: "Dreiband",                  athlete: "Köstner · Schiwek · Eversmann · Erogul" },
  { year: 1998, discipline: "karambol", catKey: "cat.german",     rankKey: "rank.third",       title: "Dreiband",                  athlete: "Ralf Köstner" },
  { year: 1999, discipline: "karambol", catKey: "cat.german",     rankKey: "rank.german",      title: "Biathlon Dreiband & Kegelbillard", athlete: "Ralf Köstner" },
  { year: 1999, discipline: "karambol", catKey: "cat.german",     rankKey: "rank.germanVice",  title: "Biathlon",                  athlete: "Efstratios Stavrakidis" },
  { year: 2000, discipline: "karambol", catKey: "cat.german",     rankKey: "rank.german",      title: "Biathlon Dreiband & Kegelbillard", athlete: "Ralf Köstner" },
  { year: 2001, discipline: "karambol", catKey: "cat.dpmm",       rankKey: "rank.third",       title: "Dreiband",                  athlete: "Köstner · Schiwek · Erogul · Stavrakidis" },
  { year: 2002, discipline: "karambol", catKey: "cat.dpmm",       rankKey: "rank.cupWin",      title: "Deutscher Pokalsieger",     athlete: "Köstner · Schiwek · Erogul · Stavrakidis", noteKey: "note.dpmm2002" },
  { year: 2006, discipline: "karambol", catKey: "cat.german",     rankKey: "rank.third",       title: "Biathlon",                  athlete: "Heiko Roth" },
  { year: 2011, discipline: "karambol", catKey: "cat.german",     rankKey: "rank.germanVice",  title: "Biathlon",                  athlete: "Orhan Erogul" },
  { year: 2011, discipline: "karambol", catKey: "cat.german",     rankKey: "rank.germanVice",  title: "Dreiband kleines Billard",  athlete: "Heiko Roth" },
  { year: 2013, discipline: "karambol", catKey: "cat.teamSmall3", rankKey: "rank.germanVice",  title: "Bundesmannschaft",          athlete: "Erogul · Roth · Stavrakidis · Schiwek" },
];

/* Rank glyph (medal emoji) by rankKey. */
const RANK_GLYPH = {
  "rank.world":       "🥇",
  "rank.worldVice":   "🥈",
  "rank.euro":        "🥇",
  "rank.euroVice":    "🥈",
  "rank.german":      "🥇",
  "rank.germanVice":  "🥈",
  "rank.third":       "🥉",
  "rank.fourth":      "4.",
  "rank.promotion":   "↑",
  "rank.cupWin":      "🏆",
};

const ERAS = [
  { key: "luetgehetmann", accent: "var(--brass-500)" },
  { key: "fusion",        accent: "var(--felt-300)" },
  { key: "golden",        accent: "var(--brass-300)" },
  { key: "modern",        accent: "var(--bone-400)" },
];

function TrophyCard({ trophy, side, t }) {
  const glyph = RANK_GLYPH[trophy.rankKey] || "•";
  const disciplineClass = `tc-${trophy.discipline}`;
  const note = trophy.noteKey ? t(`sportsbetrieb.${trophy.noteKey}`) : null;

  return (
    <div className={`erfolge-row`} data-side={side}>
      {side === "left" && (
        <div
          className={`erfolge-item reveal ${disciplineClass}`}
          style={{ textAlign: "right" }}
        >
          <TrophyBody trophy={trophy} glyph={glyph} note={note} align="right" t={t} />
        </div>
      )}
      <div className="erfolge-node" />
      {side === "right" && (
        <div className={`erfolge-item reveal ${disciplineClass}`}>
          <TrophyBody trophy={trophy} glyph={glyph} note={note} align="left" t={t} />
        </div>
      )}
    </div>
  );
}

function TrophyBody({ trophy, glyph, note, align, t }) {
  const flexJustify = align === "right" ? "flex-end" : "flex-start";
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          justifyContent: flexJustify,
          marginBottom: 10,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            letterSpacing: "0.12em",
            color: "var(--brass-500)",
            fontWeight: 500,
          }}
        >
          {trophy.year}
        </span>
        <span style={{ color: "var(--ink-400)" }}>·</span>
        <span className="tc-badge">{t(`sportsbetrieb.disc.${trophy.discipline}`)}</span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          justifyContent: flexJustify,
          marginBottom: 8,
        }}
      >
        <span style={{ fontSize: 18, lineHeight: 1 }}>{glyph}</span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--bone-400)",
          }}
        >
          {t(`sportsbetrieb.${trophy.rankKey}`)} · {t(`sportsbetrieb.${trophy.catKey}`)}
        </span>
      </div>

      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 18,
          fontWeight: 600,
          color: "var(--bone-100)",
          lineHeight: 1.25,
          margin: 0,
          marginBottom: 6,
          letterSpacing: "-0.01em",
        }}
      >
        {trophy.title}
      </h3>

      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 13,
          color: "var(--bone-400)",
          lineHeight: 1.45,
          margin: 0,
        }}
      >
        {trophy.athlete}
      </p>

      {note && (
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 12,
            fontStyle: "italic",
            color: "var(--bone-500)",
            lineHeight: 1.5,
            margin: 0,
            marginTop: 10,
            paddingTop: 10,
            borderTop: "1px solid var(--ink-300)",
          }}
        >
          {note}
        </p>
      )}
    </>
  );
}

function EraCard({ eraKey, accent, t }) {
  return (
    <div
      className="reveal"
      style={{
        flex: "1 1 220px",
        minWidth: 220,
        padding: "20px 22px",
        background: "var(--ink-100)",
        border: "1px solid var(--ink-300)",
        borderTop: `3px solid ${accent}`,
        borderRadius: 6,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: accent,
        }}
      >
        {t(`sportsbetrieb.era.${eraKey}.range`)}
      </span>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 20,
          fontWeight: 600,
          color: "var(--bone-100)",
          margin: 0,
          letterSpacing: "-0.01em",
          lineHeight: 1.2,
        }}
      >
        {t(`sportsbetrieb.era.${eraKey}`)}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 13,
          color: "var(--bone-400)",
          margin: 0,
          lineHeight: 1.5,
        }}
      >
        {t(`sportsbetrieb.era.${eraKey}.count`)}
      </p>
    </div>
  );
}

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
            <span style={{ color: "var(--brass-500)" }}>{t("sportsbetrieb.breadcrumb")}</span>
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
            {t("sportsbetrieb.hero.eyebrow")}
          </div>

          <h1
            className="reveal delay-1"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(44px, 7vw, 88px)",
              fontWeight: 700,
              color: "var(--bone-100)",
              lineHeight: 1.02,
              marginTop: 0,
              marginBottom: 24,
              letterSpacing: "-0.03em",
            }}
          >
            {t("sportsbetrieb.hero.headline1")}{" "}
            <em style={{ fontStyle: "italic", color: "var(--brass-500)" }}>
              {t("sportsbetrieb.hero.headline2")}
            </em>
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
            {t("sportsbetrieb.lede")}
          </p>
        </div>

        {/* Era summary strip */}
        <div className="container" style={{ paddingTop: 24, paddingBottom: 48 }}>
          <div
            className="eyebrow"
            style={{ marginBottom: 20, color: "var(--brass-500)", fontSize: 11 }}
          >
            {t("sportsbetrieb.eras.title")}
          </div>
          <div
            style={{
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
              alignItems: "stretch",
            }}
          >
            {ERAS.map(era => (
              <EraCard key={era.key} eraKey={era.key} accent={era.accent} t={t} />
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="container" style={{ paddingTop: 48, paddingBottom: 48 }}>
          <div style={{ marginBottom: 32 }}>
            <div
              className="eyebrow"
              style={{ marginBottom: 10, color: "var(--brass-500)", fontSize: 11 }}
            >
              {t("sportsbetrieb.timeline.title")}
            </div>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                color: "var(--bone-500)",
                margin: 0,
              }}
            >
              {t("sportsbetrieb.timeline.subtitle")}
            </p>
          </div>

          <div className="erfolge-timeline">
            {TROPHIES.map((trophy, i) => (
              <TrophyCard
                key={`${trophy.year}-${i}`}
                trophy={trophy}
                side={i % 2 === 0 ? "left" : "right"}
                t={t}
              />
            ))}
          </div>
        </div>

        {/* Weitere Ehrungen */}
        <div className="container" style={{ paddingTop: 48, paddingBottom: 100 }}>
          <div
            className="eyebrow"
            style={{ marginBottom: 20, color: "var(--brass-500)", fontSize: 11 }}
          >
            {t("sportsbetrieb.honors.title")}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 20,
            }}
          >
            <HonorCard
              title={t("sportsbetrieb.honors.silverLaurel")}
              detail={t("sportsbetrieb.honors.silverLaurel.detail")}
              date="31.03.1953"
              icon="🏅"
            />
            <HonorCard
              title={t("sportsbetrieb.honors.hessePlaque")}
              detail={t("sportsbetrieb.honors.hessePlaque.detail")}
              date="22.04.2013"
              icon="🏛"
            />
          </div>
        </div>

      </div>
      <Footer />
    </TranslationContext.Provider>
  );
}

function HonorCard({ title, detail, date, icon }) {
  return (
    <div
      className="reveal"
      style={{
        padding: "28px 28px",
        background: "var(--ink-100)",
        border: "1px solid var(--ink-300)",
        borderLeft: "3px solid var(--brass-500)",
        borderRadius: 6,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
        <span style={{ fontSize: 28, lineHeight: 1 }}>{icon}</span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--brass-500)",
          }}
        >
          {date}
        </span>
      </div>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 20,
          fontWeight: 600,
          color: "var(--bone-100)",
          margin: 0,
          letterSpacing: "-0.01em",
          lineHeight: 1.25,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 14,
          color: "var(--bone-400)",
          lineHeight: 1.55,
          margin: 0,
        }}
      >
        {detail}
      </p>
    </div>
  );
}
