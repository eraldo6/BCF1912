"use client";

import React from "react";
import { TRANSLATIONS } from "../lib/translations";
import { TranslationContext } from "./translation-context";
import { useTweaks, TweaksPanel, TweakSection, TweakSlider, TweakSelect } from "./tweaks-panel";
import {
  Nav,
  Hero,
  Marquee,
  ClubSection,
  Experience,
  Gallery,
  Membership,
  News,
  CalendarSection,
  Contact,
  Footer,
} from "./sections";

/* App entry — orchestrates sections + Tweaks */

const TWEAKS_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentHue": 220,
  "feltHue": 155,
  "displayFont": "Space Grotesk"
}/*EDITMODE-END*/;

export const AppContent = ({ galleryImages = [], newsItems = [], turniere = [], veranstaltungen = [] }) => {
  const [tweaks, setTweak] = useTweaks(TWEAKS_DEFAULTS);
  const [lang, setLangState] = React.useState("DE");

  React.useEffect(() => {
    const saved = localStorage.getItem("bcf_lang");
    if (saved) setLangState(saved);
  }, []);

  const setLang = (newLang) => {
    setLangState(newLang);
    localStorage.setItem('bcf_lang', newLang);
    document.documentElement.classList.add('lang-changing');
    setTimeout(() => document.documentElement.classList.remove('lang-changing'), 2000);
  };

  const t = (key) => TRANSLATIONS[lang]?.[key] || key;

  React.useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty("--brass-500", `oklch(0.78 0.13 ${tweaks.accentHue})`);
    r.style.setProperty("--brass-700", `oklch(0.62 0.11 ${tweaks.accentHue - 2})`);
    r.style.setProperty("--brass-300", `oklch(0.88 0.10 ${tweaks.accentHue + 2})`);
    r.style.setProperty("--brass-900", `oklch(0.42 0.08 ${tweaks.accentHue - 5})`);

    r.style.setProperty("--felt-500", `oklch(0.45 0.09 ${tweaks.feltHue})`);
    r.style.setProperty("--felt-700", `oklch(0.32 0.07 ${tweaks.feltHue})`);
    r.style.setProperty("--felt-900", `oklch(0.22 0.05 ${tweaks.feltHue})`);
    r.style.setProperty("--felt-300", `oklch(0.62 0.10 ${tweaks.feltHue})`);

    const fallback = tweaks.displayFont === "Space Grotesk" ? "system-ui, sans-serif" : "Georgia, serif";
    r.style.setProperty("--font-display", `"${tweaks.displayFont}", ${fallback}`);
  }, [tweaks]);

  React.useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("in-view");
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(".reveal:not(.in-view)").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  React.useEffect(() => {
    // Restore exact scroll position with smooth animation
    try {
      const saved = sessionStorage.getItem("bcf_scroll_y");
      if (saved) {
        sessionStorage.removeItem("bcf_scroll_y");
        const y = parseInt(saved, 10);
        requestAnimationFrame(() => window.scrollTo({ top: y, behavior: "smooth" }));
      }
    } catch {}

    // Save exact scroll position on scroll (throttled)
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          try { sessionStorage.setItem("bcf_scroll_y", String(window.scrollY)); } catch {}
          ticking = false;
        });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <TranslationContext.Provider value={{ lang, setLang, t }}>
        <Nav />
        <Hero images={galleryImages} />
        <Marquee />
        <News items={newsItems} turniere={turniere} />
        <CalendarSection veranstaltungen={veranstaltungen} />
        <ClubSection images={galleryImages} hideGallery />
        <Experience />
        <Gallery images={galleryImages} />
        <Contact />
        <Footer />
      </TranslationContext.Provider>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Color">
          <TweakSlider label="Accent hue (brass)" value={tweaks.accentHue} min={20} max={120} step={1}
            onChange={v => setTweak("accentHue", v)} />
          <TweakSlider label="Felt hue" value={tweaks.feltHue} min={120} max={260} step={1}
            onChange={v => setTweak("feltHue", v)} />
        </TweakSection>
        <TweakSection title="Typography">
          <TweakSelect label="Display font" value={tweaks.displayFont}
            options={[
              { value: "Space Grotesk", label: "Space Grotesk" },
              { value: "Cormorant Garamond", label: "Cormorant Garamond" },
              { value: "Fraunces", label: "Fraunces" },
              { value: "Playfair Display", label: "Playfair" },
              { value: "EB Garamond", label: "EB Garamond" },
              { value: "DM Serif Display", label: "DM Serif" },
            ]}
            onChange={v => setTweak("displayFont", v)} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
};
