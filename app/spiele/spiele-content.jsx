"use client";

import React from "react";
import { Nav, Footer, CalendarSection } from "../../components/sections";
import { TranslationContext } from "../../components/translation-context";
import { TRANSLATIONS } from "../../lib/translations";
import { Segmented } from "./segmented";
import { SpieleListView } from "./spiele-list-view";

export default function SpieleContent({ veranstaltungen, standings }) {
  const [lang, setLang] = React.useState("DE");
  const [viewMode, setViewMode] = React.useState("list");
  const [disciplineFilter, setDisciplineFilter] = React.useState("all");

  React.useEffect(() => {
    const saved = localStorage.getItem("bcf_lang");
    if (saved) setLang(saved);
    const r = document.documentElement;
    r.style.setProperty("--brass-500", "oklch(0.78 0.13 220)");
    r.style.setProperty("--brass-700", "oklch(0.62 0.11 218)");
    r.style.setProperty("--brass-300", "oklch(0.88 0.10 222)");
    r.style.setProperty("--brass-900", "oklch(0.42 0.08 215)");
  }, []);

  /* Persist lang selection so the LangPicker in Nav keeps working. */
  React.useEffect(() => {
    localStorage.setItem("bcf_lang", lang);
  }, [lang]);

  /* Read ?view= once on mount. Does not push URL updates on toggle. */
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const v = params.get("view");
    if (v === "list" || v === "calendar") setViewMode(v);
  }, []);

  /* Intersection observer for .reveal fade-in, matching sibling subpages. */
  React.useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in-view"); });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [viewMode, disciplineFilter]);

  const t = (key) => TRANSLATIONS[lang]?.[key] || key;

  const viewItems = [
    { value: "list", label: t("spiele.view.list") },
    { value: "calendar", label: t("spiele.view.calendar") },
  ];

  return (
    <TranslationContext.Provider value={{ lang, setLang, t }}>
      <Nav />
      <div style={{ paddingTop: 80, background: "var(--ink-050)", minHeight: "100vh" }}>
        <div className="container" style={{ paddingTop: 32 }}>
          <a
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              textDecoration: "none",
              opacity: 0.7,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.opacity = 1;
              e.currentTarget.querySelector(".back-underline").style.transform = "scaleX(1)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.opacity = 0.7;
              e.currentTarget.querySelector(".back-underline").style.transform = "scaleX(0)";
            }}
          >
            <span style={{ color: "var(--bone-500)", display: "inline-flex", flexDirection: "column", gap: 0 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 13 }}>←</span>
                <span>{t("nav.back")}</span>
              </span>
              <span className="back-underline" style={{ display: "block", height: 1, background: "var(--bone-500)", transformOrigin: "left", transform: "scaleX(0)", transition: "transform 0.25s ease" }} />
            </span>
            <span style={{ color: "var(--bone-700)", fontWeight: 300 }}>/</span>
            <span style={{ color: "var(--brass-500)" }}>{t("spiele.breadcrumb")}</span>
          </a>
        </div>

        <section className="section" style={{ paddingTop: 40 }}>
          <div className="container">
            <div className="reveal" style={{ marginBottom: 32 }}>
              <div className="section-eyebrow-row">
                <span className="section-num">02</span>
                <span className="section-divider" />
                <span className="eyebrow">{t("spiele.eyebrow")}</span>
              </div>
              <h1 className="section-title" style={{ marginTop: 16 }}>
                {t("spiele.headline1")} <em>{t("spiele.headline2")}</em>
              </h1>
              <p style={{ marginTop: 12, fontSize: 15, color: "var(--bone-400)", fontFamily: "var(--font-display)", maxWidth: 640 }}>
                {t("spiele.lede")}
              </p>
            </div>

            <div className="reveal" style={{ marginBottom: 32 }}>
              <Segmented
                items={viewItems}
                value={viewMode}
                onChange={setViewMode}
                ariaLabel="View mode"
              />
            </div>

            {viewMode === "list" ? (
              <SpieleListView
                veranstaltungen={veranstaltungen}
                standings={standings ?? {}}
                disciplineFilter={disciplineFilter}
                setDisciplineFilter={setDisciplineFilter}
                t={t}
                lang={lang}
              />
            ) : (
              <div style={{ margin: "0 -24px" }}>
                <CalendarSection veranstaltungen={veranstaltungen} />
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </TranslationContext.Provider>
  );
}
