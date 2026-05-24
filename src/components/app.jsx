/* App entry — orchestrates sections + Tweaks */

const TWEAKS_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentHue": 80,
  "feltHue": 155,
  "displayFont": "Cormorant Garamond"
}/*EDITMODE-END*/;

const App = () => {
  const [tweaks, setTweak] = useTweaks(TWEAKS_DEFAULTS);
  const [lang, setLangState] = React.useState(() => {
    return localStorage.getItem('bcf_lang') || 'EN';
  });

  const setLang = (newLang) => {
    setLangState(newLang);
    localStorage.setItem('bcf_lang', newLang);
  };

  const t = (key) => {
    const translations = window.TRANSLATIONS || {};
    return translations[lang]?.[key] || key;
  };

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

    r.style.setProperty("--font-display", `"${tweaks.displayFont}", Georgia, serif`);
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

  return (
    <>
      <window.TranslationContext.Provider value={{ lang, setLang, t }}>
        <Nav />
        <Hero />
        <Marquee />
        <About />
        <Disciplines />
        <Experience />
        <Membership />
        <Gallery />
        <News />
        <Contact />
        <Footer />
      </window.TranslationContext.Provider>

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

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
