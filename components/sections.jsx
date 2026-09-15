"use client";

import React from "react";
import { useTranslation } from "./translation-context";
import { Arrow, ArrowOut, PoolTableHero, ScrollCue } from "./visuals";
import DOMPurify from "dompurify";

/* Sections — broken down for maintainability */

export const Nav = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <a href="#top" className="nav-logo">
        <img
          src="https://bcfrankfurt.de/wp-content/uploads/2018/02/BCF-Wappen_qu-200x200.png"
          alt="BC Frankfurt 1912"
          style={{ width: 40, height: 40, objectFit: "contain", filter: "drop-shadow(0 0 12px rgba(218,178,96,0.25))" }}
        />
        <span>BC Frankfurt <em style={{ fontStyle: "italic", color: "var(--brass-500)", fontWeight: 400 }}>1912</em> e.V.</span>
      </a>
      <ul className="nav-links">
        <li><a href="#news">News</a></li>
        <li><a href="/calendar">{t("nav.games")}</a></li>
        <li><a href="#about">{t("nav.disciplines")}</a></li>
        <li><a href="#experience">{t("nav.experience")}</a></li>
        <li><a href="#contact">{t("nav.visit")}</a></li>
      </ul>
      <div className="nav-cta">
        <LangPicker />
        <a href="/mitgliedschaft" className="btn btn-brass" style={{ padding: "10px 20px", fontSize: 12 }}>
          {t("nav.becomeMember")} <Arrow size={12} />
        </a>
      </div>
    </nav>
  );
};

export const LangPicker = () => {
  const { lang, setLang } = useTranslation();

  const toggle = () => setLang(lang === "DE" ? "EN" : "DE");

  return (
    <button
      onClick={toggle}
      style={{
        height: 36, padding: "0 12px", borderRadius: 18,
        border: "1px solid var(--ink-300)",
        background: "transparent",
        color: "var(--bone-300)",
        cursor: "pointer", display: "flex", alignItems: "center",
        fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em",
        transition: "border-color 0.2s, color 0.2s",
        overflow: "hidden",
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--brass-500)"; e.currentTarget.style.color = "var(--brass-500)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--ink-300)"; e.currentTarget.style.color = "var(--bone-300)"; }}
      aria-label="Toggle language"
    >
      <span key={lang} style={{ animation: "lang-flip 0.3s var(--ease-out) both", display: "inline-block" }}>
        {lang}
      </span>
    </button>
  );
};

function useCountUp(target, duration = 2400, suffix = "") {
  const [display, setDisplay] = React.useState("0" + suffix);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const ease = Math.pow(Math.sin(p * Math.PI / 2), 0.45);
        setDisplay(Math.round(ease * target) + suffix);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration, suffix]);
  return [display, ref];
}

export const Hero = ({ images = [] }) => {
  const { t, lang } = useTranslation();
  const [parallax, setParallax] = React.useState(0);
  const [slideIndex, setSlideIndex] = React.useState(0);
  const [jahre, jahreRef] = useCountUp(114, 2200);
  const [disziplinen, disziplinenRef] = useCountUp(3, 1400);
  const [mitglieder, mitgliederRef] = useCountUp(240, 2600, "+");
  React.useEffect(() => {
    const onScroll = () => setParallax(window.scrollY * 0.5);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  React.useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => setSlideIndex(i => (i + 1) % images.length), 6000);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <section className="hero felt-texture grain" id="top" style={{ borderBottom: "1px solid var(--ink-300)" }}>
      <div className="hero-table-bg" style={{
        transform: `translateY(${parallax * 0.5}px) scale(${1 + parallax * 0.0003})`,
        opacity: Math.max(0.2, 0.85 - parallax * 0.003),
      }}>
        {images.length > 0 ? images.map((img, i) => (
          <img key={img.id ?? i} src={img.bild_url} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: i === slideIndex ? 1 : 0, transition: "opacity 1.5s ease" }} />
        )) : <PoolTableHero />}
      </div>
      <div className="hero-vignette" />

      <div className="container hero-content">
        <div className="hero-mark reveal in-view">
          <div style={{ width: 40, height: 1, background: "var(--brass-500)" }} />
          <span className="eyebrow">{t("hero.eyebrow")}</span>
        </div>

        <h1 className="hero-title reveal in-view delay-1" dangerouslySetInnerHTML={{ __html: t("hero.title") }} />

        <p className="hero-subtitle reveal in-view delay-2">
          {t("hero.subtitle")}
        </p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 32, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <div className="hero-cta reveal in-view delay-3">
            <a href="#contact" className="btn btn-brass">
              {lang === "DE" ? "Vereinsheim besuchen" : "Visit us"} <ArrowOut />
            </a>
            <a href="#news" className="btn btn-ghost">
              News Board <Arrow />
            </a>
          </div>

          <div className="hero-stats reveal in-view delay-4">
          <div ref={jahreRef}>
            <div className="hero-stat-num">{jahre}</div>
            <div className="hero-stat-label">Jahre</div>
          </div>
          <div ref={disziplinenRef}>
            <div className="hero-stat-num">{disziplinen}</div>
            <div className="hero-stat-label">Disziplinen</div>
          </div>
          <div ref={mitgliederRef}>
            <div className="hero-stat-num">{mitglieder}</div>
            <div className="hero-stat-label">Mitglieder</div>
          </div>
        </div>
        </div>
      </div>

      <ScrollCue />
    </section>
  );
};

export const Marquee = () => {
  const { lang } = useTranslation();
  const words = lang === "DE"
    ? ["Billard", "Leidenschaft", "Snooker", "Training", "Karambol", "Gemeinschaft", "Liga", "Tradition", "Förderung"]
    : ["Pool", "Passion", "Snooker", "Training", "Karambol", "Friends", "League", "Tradition", "Coaching"];

  const wordElements = words.map((word, i) => (
    <React.Fragment key={i}>
      {word} <span className="marquee-dot" />
    </React.Fragment>
  ));

  return (
    <div className="marquee">
      <div className="marquee-track">
        <div className="marquee-content">
          {wordElements}
          {wordElements}
          {wordElements}
          {wordElements}
          {wordElements}
        </div>
        <div className="marquee-content">
          {wordElements}
          {wordElements}
          {wordElements}
          {wordElements}
          {wordElements}
        </div>
      </div>
    </div>
  );
};

export const About = () => {
  const { t } = useTranslation();
  return (
  <section className="section" id="about">
    <div className="container">
      <div className="section-head reveal">
        <div>
          <div className="section-eyebrow-row">
            <span className="section-num">{t("about.num")}</span>
            <span className="section-divider" />
            <span className="eyebrow">{t("about.eyebrow")}</span>
          </div>
          <h2 className="section-title" style={{ marginTop: 24 }} dangerouslySetInnerHTML={{ __html: t("about.title") }} />
        </div>
        <p className="section-lede">
          {t("about.p1")}
        </p>
      </div>

      <div className="about-grid">
        <div className="about-narrative reveal">
          <p>{t("about.p2")}</p>
          <p>{t("about.p3")}</p>

          <div className="about-stats">
            <div className="about-stat">
              <div className="about-stat-num">1912</div>
              <div className="about-stat-label">Founded</div>
            </div>
            <div className="about-stat">
              <div className="about-stat-num">114</div>
              <div className="about-stat-label">Years active</div>
            </div>
            <div className="about-stat">
              <div className="about-stat-num">240+</div>
              <div className="about-stat-label">Members</div>
            </div>
            <div className="about-stat">
              <div className="about-stat-num">5</div>
              <div className="about-stat-label">League teams</div>
            </div>
          </div>
        </div>

        <div className="about-feature-image reveal delay-2">
          <img
            src="https://bcfrankfurt.de/wp-content/uploads/2018/02/vereinsheim1.jpg"
            alt="BC Frankfurt clubhouse interior"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "brightness(0.85) contrast(1.05) saturate(0.85)" }}
          />
        </div>
      </div>
    </div>
  </section>
)};

const getDisciplines = (t, lang) => [
  {
    num: "01",
    name: lang === "DE" ? "Billard" : "Pool",
    nameItalic: lang === "DE" ? "Billard" : "Pool",
    desc: t("disc.pool.desc"),
    tables: t("disc.pool.tables"),
    size: t("disc.pool.size"),
    detail: t("disc.pool.detail"),
    tags: t("disc.pool.tags").split(","),
    image: "https://bcfrankfurt.de/wp-content/uploads/2018/02/kugeln_s.jpg",
  },
  {
    num: "02",
    name: "Karambol",
    nameItalic: "Karambol",
    desc: t("disc.karambol.desc"),
    tables: t("disc.karambol.tables"),
    size: t("disc.karambol.size"),
    detail: t("disc.karambol.detail"),
    tags: t("disc.karambol.tags").split(","),
    image: "https://bcfrankfurt.de/wp-content/uploads/2018/02/Karambolage.jpg",
  },
  {
    num: "03",
    name: "Snooker",
    nameItalic: "Snooker",
    desc: t("disc.snooker.desc"),
    tables: t("disc.snooker.tables"),
    size: t("disc.snooker.size"),
    detail: t("disc.snooker.detail"),
    tags: t("disc.snooker.tags").split(","),
    image: "https://bcfrankfurt.de/wp-content/uploads/2018/02/atmo3.jpg",
  },
];

export const Disciplines = () => {
  const { t, lang } = useTranslation();
  const [open, setOpen] = React.useState(0);
  const DISCIPLINES = getDisciplines(t, lang);
  return (
    <section className="section disciplines felt-texture" id="disciplines">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="section-eyebrow-row">
              <span className="section-num">02</span>
              <span className="section-divider" />
              <span className="eyebrow">{t("disciplines.eyebrow")}</span>
            </div>
            <h2 className="section-title" style={{ marginTop: 24 }} dangerouslySetInnerHTML={{ __html: t("disciplines.pickGame") }} />
          </div>
          <p className="section-lede">
            {t("disciplines.fewClubs")}
          </p>
        </div>

        <div className="discipline-list reveal">
          {DISCIPLINES.map((d, i) => (
            <div
              key={d.num}
              className={`discipline-row ${open === i ? "open" : ""}`}
              onClick={() => setOpen(open === i ? -1 : i)}
            >
              <div className="discipline-num">— {d.num}</div>
              <div className="discipline-name">
                <em>{d.nameItalic}</em>
              </div>
              <div className="discipline-desc">{d.desc}</div>
              <div className="discipline-meta">
                <div className="discipline-meta-row">
                  <span className="discipline-meta-key">{t("disc.tables")}</span>
                  <span className="discipline-meta-val">{d.tables}</span>
                </div>
                <div className="discipline-meta-row">
                  <span className="discipline-meta-key">{t("disc.size")}</span>
                  <span className="discipline-meta-val">{d.size}</span>
                </div>
              </div>
              <div className="discipline-arrow">
                {open === i ? "−" : "+"}
              </div>

              <div className="discipline-detail">
                <div className="discipline-detail-grid">
                  <div className="discipline-detail-img">
                    <img src={d.image} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.9) contrast(1.05) saturate(0.85)" }} />
                  </div>
                  <div className="discipline-detail-text">
                    <h4>{t("disciplines.aboutGame")}</h4>
                    <p>{d.detail}</p>
                    <div className="discipline-tags">
                      {d.tags.map(tag => (
                        <span key={tag} className="discipline-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Experience = () => {
  const { t } = useTranslation();
  return (
  <section className="section experience" id="experience">
    <div className="container">
      <div className="section-head reveal">
        <div>
          <div className="section-eyebrow-row">
            <span className="section-num">04</span>
            <span className="section-divider" />
            <span className="eyebrow">{t("experience.whyJoin")}</span>
          </div>
          <h2 className="section-title" style={{ marginTop: 24 }} dangerouslySetInnerHTML={{ __html: t("experience.moreThan") }} />
        </div>
        <p className="section-lede">
          {t("experience.workingClubhouse")}
        </p>
      </div>

      <div className="experience-grid reveal">
        <div className="exp-card exp-card-tables" style={{ padding: 0, overflow: "hidden" }}>
          <img
            src="/images/floor-plan.png"
            alt="Club floor plan with 10 match-grade tables"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        <div className="exp-card exp-card-cloth">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 12 }}>{t("experience.cloth.eyebrow")}</div>
              <h3 style={{ fontSize: 28, lineHeight: 1.2, marginBottom: 12 }} dangerouslySetInnerHTML={{ __html: t("experience.cloth.title") }} />
              <p style={{ fontSize: 13, maxWidth: "36ch" }}>
                {t("experience.cloth.short")}
              </p>
            </div>
            <div style={{
              width: 60, height: 60, borderRadius: "50%",
              background: "var(--felt-500)",
              border: "1px solid var(--felt-300)",
              flexShrink: 0,
              backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)",
              backgroundSize: "3px 3px",
              boxShadow: "inset 0 0 40px rgba(0,0,0,0.4)",
            }} />
          </div>
        </div>

        <div className="exp-card exp-card-lounge">
          <svg className="exp-card-icon" viewBox="0 0 24 24" fill="none">
            <path d="M3 18h18M5 18V8a2 2 0 012-2h10a2 2 0 012 2v10M9 18v-6h6v6" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <h3>{t("experience.lounge.title")}</h3>
          <p>{t("experience.lounge.desc")}</p>
        </div>

        <div className="exp-card exp-card-trial">
          <div className="eyebrow" style={{ marginBottom: 12, color: "var(--brass-300)" }}>{t("experience.trial.eyebrow")}</div>
          <h3>{t("experience.trial.title")}</h3>
          <p style={{ color: "var(--bone-200)" }}>
            {t("experience.trial.desc")}
          </p>
          <a href="/mitgliedschaft" className="btn btn-brass" style={{ marginTop: 24, alignSelf: "flex-start", padding: "12px 20px", fontSize: 12 }}>
            {t("experience.trial.reserve")} <Arrow size={12} />
          </a>
        </div>

        <div className="exp-card exp-card-snacks">
          <svg className="exp-card-icon" viewBox="0 0 24 24" fill="none">
            <path d="M6 3v6a4 4 0 008 0V3M10 13v8M7 21h6" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <h3>{t("experience.snacks.title")}</h3>
          <p>{t("experience.snacks.desc")}</p>
        </div>
      </div>
    </div>
  </section>
);
};

const getPlans = (t) => [
  {
    tag: t("membership.student.tag"),
    name: t("membership.student.name"),
    price: "20",
    period: t("membership.period"),
    tagline: t("membership.student.tagline"),
    features: [
      t("membership.student.feat1"),
      t("membership.student.feat2"),
      t("membership.student.feat3"),
      t("membership.student.feat4"),
    ],
    cta: t("membership.student.cta"),
    featured: false,
  },
  {
    tag: t("membership.regular.tag"),
    name: t("membership.regular.name"),
    price: "40",
    period: t("membership.period"),
    tagline: t("membership.regular.tagline"),
    features: [
      t("membership.regular.feat1"),
      t("membership.regular.feat2"),
      t("membership.regular.feat3"),
      t("membership.regular.feat4"),
    ],
    cta: t("membership.regular.cta"),
    featured: true,
  },
  {
    tag: t("membership.family.tag"),
    name: t("membership.family.name"),
    price: "40",
    period: t("membership.period"),
    tagline: t("membership.family.tagline"),
    features: [
      t("membership.family.feat1"),
      t("membership.family.feat2"),
      t("membership.family.feat3"),
      t("membership.family.feat4"),
    ],
    cta: t("membership.family.cta"),
    featured: false,
  },
];

export const Membership = () => {
  const { t } = useTranslation();
  const PLANS = getPlans(t);
  return (
  <section className="section membership" id="membership">
    <div className="container">
      <div className="section-head reveal">
        <div>
          <h2 className="section-title" dangerouslySetInnerHTML={{ __html: t("membership.threeWays") }} />
        </div>
        <p className="section-lede">
          {t("membership.flatFair")}
        </p>
      </div>

      <div className="member-grid reveal">
        {PLANS.map(p => (
          <div key={p.name} className={`member-card ${p.featured ? "featured" : ""}`}>
            <div className="member-tag">{p.tag}</div>
            <div className="member-name">{p.name}</div>
            <div className="member-price">
              <span className="member-price-cur">€</span>
              <span className="member-price-num">{p.price}</span>
              <span className="member-price-period">{p.period}</span>
            </div>
            <p className="member-tagline">{p.tagline}</p>
            <ul className="member-features">
              {p.features.map(f => <li key={f}>{f}</li>)}
            </ul>
            <a href="#contact" className={`btn ${p.featured ? "btn-brass" : "btn-ghost"} member-cta`}>
              {p.cta} <Arrow />
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);
};


const Lightbox = ({ items, index, onClose, onNav }) => {
  const touchX = React.useRef(null);
  const isOpen = index != null;

  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onNav(1);
      else if (e.key === "ArrowLeft") onNav(-1);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose, onNav]);

  if (index == null) return null;
  const item = items[index];

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) onNav(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  return (
    <div className="lightbox" role="dialog" aria-modal="true" onClick={onClose}
         onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <button className="lightbox-close" aria-label="Close" onClick={onClose}>&times;</button>
      <button className="lightbox-arrow lightbox-prev" aria-label="Previous"
              onClick={(e) => { e.stopPropagation(); onNav(-1); }}>&#8249;</button>
      <figure className="lightbox-figure" onClick={(e) => e.stopPropagation()}>
        <img className="lightbox-img" src={item.img} alt={item.caption} />
      </figure>
      <button className="lightbox-arrow lightbox-next" aria-label="Next"
              onClick={(e) => { e.stopPropagation(); onNav(1); }}>&#8250;</button>
    </div>
  );
};

export const Gallery = ({ images = [] }) => {
  const { t } = useTranslation();
  const [active, setActive] = React.useState(null);

  const items = images.map((row, i) => ({
    cls: `g${(i % 7) + 1}`,
    caption: row.titel ?? '',
    img: row.bild_url,
  }));

  const nav = React.useCallback((dir) => {
    setActive((cur) => (cur == null ? cur : (cur + dir + items.length) % items.length));
  }, [items.length]);

  return (
  <section className="section" id="gallery" style={{ paddingTop: 0 }}>
    <div className="container">
      <div className="reveal" style={{ marginBottom: 48 }}>
        <h2 className="section-title" style={{ fontSize: "clamp(42px, 5vw, 80px)" }} dangerouslySetInnerHTML={{ __html: t("gallery.title") }} />
        <p className="section-lede" style={{ marginTop: 20 }}>
          {t("gallery.letLight")}
        </p>
      </div>

      {items.length > 0 && (
        <div className="gallery-scroll reveal">
          {items.map((g, i) => (
            <div key={i} className="gallery-item" onClick={() => setActive(i)}
                 role="button" tabIndex={0} aria-label={`Open image: ${g.caption}`}
                 onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(i); } }}>
              <img
                src={g.img}
                alt={g.caption}
                loading="lazy"
                style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  imageOrientation: "from-image",
                  filter: "brightness(0.85) contrast(1.05) saturate(0.9)",
                  transition: "filter 0.5s var(--ease-out), transform 0.6s var(--ease-out)",
                }}
              />
              {g.caption && (
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  padding: "48px 24px 24px",
                  background: "linear-gradient(transparent, rgba(5,5,6,0.85))",
                  fontFamily: "var(--font-mono)", fontSize: 12,
                  letterSpacing: "0.06em", color: "var(--bone-300)",
                }}>
                  {g.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>

    <Lightbox items={items} index={active} onClose={() => setActive(null)} onNav={nav} />
  </section>
);
};

export const ClubSection = ({ images = [], hideGallery = false }) => {
  const { t, lang } = useTranslation();
  const [active, setActive] = React.useState(null);

  const items = images.map((row) => ({ caption: row.titel ?? '', img: row.bild_url }));
  const nav = React.useCallback((dir) => {
    setActive((cur) => (cur == null ? cur : (cur + dir + items.length) % items.length));
  }, [items.length]);

  const disciplines = [
    { name: "Pool", desc: t("disc.pool.desc"), image: "https://bcfrankfurt.de/wp-content/uploads/2018/02/kugeln_s.jpg" },
    { name: "Karambol", desc: t("disc.karambol.desc"), image: "https://bcfrankfurt.de/wp-content/uploads/2018/02/Karambolage.jpg" },
    { name: "Snooker", desc: t("disc.snooker.desc"), image: "https://bcfrankfurt.de/wp-content/uploads/2018/02/atmo3.jpg" },
  ];

  return (
    <section className="section" id="about" style={{ paddingBottom: 0 }}>
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="section-eyebrow-row">
              <span className="section-num">03</span>
              <span className="section-divider" />
              <span className="eyebrow">{t("about.eyebrow")}</span>
            </div>
            <h2 className="section-title" style={{ marginTop: 24 }} dangerouslySetInnerHTML={{ __html: t("about.title") }} />
          </div>
          <p className="section-lede">{t("about.p1")}</p>
        </div>
      </div>

      {/* Discipline image strip */}
      <div className="club-disc-strip reveal" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, marginBottom: 2 }}>
        {disciplines.map((d) => (
          <div key={d.name} className="club-disc-card">
            <img src={d.image} alt={d.name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.55) contrast(1.05) saturate(0.75)", transition: "transform 0.7s var(--ease-out), filter 0.5s" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 35%, rgba(5,5,6,0.92))" }} />
            <div style={{ position: "absolute", bottom: 28, left: 28, right: 28 }}>
              <div style={{ fontFamily: 'var(--loaded-cormorant), "Cormorant Garamond", Georgia, serif', fontStyle: "italic", fontWeight: 300, fontSize: 40, letterSpacing: "-0.02em", color: "var(--bone-100)", lineHeight: 1 }}>{d.name}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--bone-400)", marginTop: 10, letterSpacing: "0.04em", lineHeight: 1.5 }}>{d.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Sportbetrieb CTA */}
      <div style={{ display: "flex", justifyContent: "center", padding: "40px 0 8px" }}>
        <a href="/sportbetrieb" className="btn btn-ghost" style={{ padding: "12px 22px", fontSize: 12 }}>
          Zum Sportbetrieb &amp; unseren Mannschaften <ArrowOut size={11} />
        </a>
      </div>

      {/* Gallery scroll */}
      {!hideGallery && items.length > 0 && (
        <div className="gallery-scroll" style={{ marginTop: 0 }}>
          {items.map((g, i) => (
            <div key={i} className="gallery-item" onClick={() => setActive(i)}
                 role="button" tabIndex={0} aria-label={`Open image: ${g.caption}`}
                 onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(i); } }}>
              <img src={g.img} alt={g.caption} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", imageOrientation: "from-image", filter: "brightness(0.85) contrast(1.05) saturate(0.9)", transition: "filter 0.5s var(--ease-out), transform 0.6s var(--ease-out)" }} />
              {g.caption && (
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "48px 24px 24px", background: "linear-gradient(transparent, rgba(5,5,6,0.85))", fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.06em", color: "var(--bone-300)" }}>
                  {g.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <Lightbox items={items} index={active} onClose={() => setActive(null)} onNav={nav} />
    </section>
  );
};

// ─── Tournaments (CueScore Live-Fetch) ────────────────────────────────────────
// Ausgelagert nach lib/cuescore-tournament-importScript.js — Nice-to-Haves #30

// ─── News illustrations (dummy) ───────────────────────────────────────────────

const NewsIllustrationFeatured = () => (
  <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
    <rect width="200" height="300" fill="#0d1420"/>
    {/* table */}
    <rect x="15" y="210" width="170" height="58" rx="6" fill="#15432b"/>
    <rect x="15" y="210" width="170" height="58" rx="6" fill="none" stroke="#1e5c38" strokeWidth="1.5"/>
    {/* balls */}
    <circle cx="60" cy="238" r="11" fill="#c9a84c"/>
    <circle cx="88" cy="228" r="11" fill="#e8e4d9"/>
    <circle cx="116" cy="240" r="11" fill="#2b7fff"/>
    <circle cx="144" cy="226" r="11" fill="#f87171"/>
    {/* cue */}
    <line x1="10" y1="280" x2="130" y2="215" stroke="#9a7a4a" strokeWidth="3" strokeLinecap="round"/>
    {/* person */}
    <circle cx="100" cy="88" r="22" fill="#d4a574"/>
    <ellipse cx="100" cy="74" rx="22" ry="12" fill="#3d2b0a"/>
    <circle cx="92" cy="87" r="3" fill="#5a3e20"/>
    <circle cx="108" cy="87" r="3" fill="#5a3e20"/>
    <path d="M90 100 Q100 108 110 100" fill="none" stroke="#5a3e20" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M78 110 Q100 102 122 110 L126 172 L74 172 Z" fill="#2b5fa5"/>
    {/* arms up */}
    <line x1="78" y1="125" x2="42" y2="82" stroke="#d4a574" strokeWidth="10" strokeLinecap="round"/>
    <line x1="122" y1="125" x2="158" y2="82" stroke="#d4a574" strokeWidth="10" strokeLinecap="round"/>
    {/* trophy */}
    <path d="M148 82 Q148 64 155 61 Q162 64 162 82 Z" fill="#c9a84c"/>
    <path d="M148 72 Q138 72 138 79 Q138 85 148 83" fill="none" stroke="#c9a84c" strokeWidth="2.5"/>
    <path d="M162 72 Q172 72 172 79 Q172 85 162 83" fill="none" stroke="#c9a84c" strokeWidth="2.5"/>
    <rect x="153" y="82" width="4" height="12" fill="#c9a84c"/>
    <rect x="148" y="94" width="14" height="4" rx="2" fill="#c9a84c"/>
    {/* legs */}
    <rect x="82" y="172" width="14" height="28" rx="5" fill="#1a3a6b"/>
    <rect x="104" y="172" width="14" height="28" rx="5" fill="#1a3a6b"/>
    <ellipse cx="89" cy="200" rx="10" ry="5" fill="#111"/>
    <ellipse cx="111" cy="200" rx="10" ry="5" fill="#111"/>
    {/* confetti */}
    <circle cx="28" cy="42" r="4" fill="#c9a84c" opacity="0.8"/>
    <circle cx="172" cy="35" r="5" fill="#c9a84c" opacity="0.6"/>
    <circle cx="22" cy="140" r="3" fill="#2b7fff" opacity="0.6"/>
    <circle cx="178" cy="145" r="3" fill="#f87171" opacity="0.6"/>
    <circle cx="48" cy="52" r="2.5" fill="#4ade80" opacity="0.7"/>
    <circle cx="156" cy="55" r="2.5" fill="#e8e4d9" opacity="0.5"/>
    <rect x="26" y="160" width="8" height="3" rx="1" fill="#c9a84c" opacity="0.4" transform="rotate(-20 26 160)"/>
    <rect x="166" y="170" width="8" height="3" rx="1" fill="#4ade80" opacity="0.4" transform="rotate(15 166 170)"/>
  </svg>
);

const NEWS_ILLUSTRATIONS = [
  // Card 0: Player taking a shot
  <svg viewBox="0 0 300 140" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
    <rect width="300" height="140" fill="#0d1420"/>
    <rect x="0" y="75" width="300" height="65" rx="0" fill="#15432b" opacity="0.7"/>
    <rect x="0" y="75" width="300" height="2" fill="#1e5c38"/>
    {/* balls */}
    <circle cx="180" cy="100" r="13" fill="#e8e4d9"/>
    <circle cx="215" cy="96" r="13" fill="#c9a84c"/>
    <circle cx="240" cy="105" r="13" fill="#2b7fff"/>
    {/* cue */}
    <line x1="20" y1="118" x2="166" y2="96" stroke="#9a7a4a" strokeWidth="4" strokeLinecap="round"/>
    {/* person leaning */}
    <ellipse cx="55" cy="72" rx="18" ry="18" fill="#d4a574"/>
    <ellipse cx="55" cy="59" rx="18" ry="10" fill="#3d2b0a"/>
    <circle cx="47" cy="71" r="2.5" fill="#5a3e20"/>
    <circle cx="63" cy="71" r="2.5" fill="#5a3e20"/>
    <path d="M47 82 Q55 88 63 82" fill="none" stroke="#5a3e20" strokeWidth="2" strokeLinecap="round"/>
    {/* body leaning forward */}
    <path d="M37 90 L73 90 L85 118 L25 118 Z" fill="#2b5fa5"/>
    {/* arm extended holding cue */}
    <line x1="73" y1="95" x2="120" y2="105" stroke="#d4a574" strokeWidth="9" strokeLinecap="round"/>
    {/* motion lines */}
    <line x1="155" y1="88" x2="168" y2="88" stroke="#c9a84c" strokeWidth="1.5" opacity="0.5"/>
    <line x1="152" y1="93" x2="167" y2="93" stroke="#c9a84c" strokeWidth="1.5" opacity="0.3"/>
    <line x1="155" y1="98" x2="168" y2="98" stroke="#c9a84c" strokeWidth="1.5" opacity="0.5"/>
  </svg>,
  // Card 1: Two people celebrating
  <svg viewBox="0 0 300 140" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
    <rect width="300" height="140" fill="#0d1420"/>
    {/* person 1 */}
    <circle cx="100" cy="45" r="20" fill="#d4a574"/>
    <ellipse cx="100" cy="32" rx="20" ry="10" fill="#3d2b0a"/>
    <circle cx="92" cy="44" r="2.5" fill="#5a3e20"/>
    <circle cx="108" cy="44" r="2.5" fill="#5a3e20"/>
    <path d="M90 56 Q100 64 110 56" fill="none" stroke="#5a3e20" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M80 65 Q100 58 120 65 L122 120 L78 120 Z" fill="#c9a84c" opacity="0.9"/>
    <line x1="80" y1="78" x2="45" y2="40" stroke="#d4a574" strokeWidth="9" strokeLinecap="round"/>
    <line x1="120" y1="78" x2="148" y2="48" stroke="#d4a574" strokeWidth="9" strokeLinecap="round"/>
    {/* person 2 */}
    <circle cx="210" cy="48" r="20" fill="#c9a58a"/>
    <ellipse cx="210" cy="35" rx="20" ry="10" fill="#5a3e20"/>
    <circle cx="202" cy="47" r="2.5" fill="#3d2b0a"/>
    <circle cx="218" cy="47" r="2.5" fill="#3d2b0a"/>
    <path d="M200 59 Q210 67 220 59" fill="none" stroke="#3d2b0a" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M190 68 Q210 61 230 68 L232 120 L188 120 Z" fill="#2b5fa5"/>
    <line x1="190" y1="80" x2="152" y2="48" stroke="#c9a58a" strokeWidth="9" strokeLinecap="round"/>
    <line x1="230" y1="80" x2="262" y2="42" stroke="#c9a58a" strokeWidth="9" strokeLinecap="round"/>
    {/* high five hands meeting */}
    <circle cx="150" cy="48" r="10" fill="#d4a574" opacity="0.9"/>
    <circle cx="150" cy="48" r="10" fill="#c9a58a" opacity="0.5"/>
    {/* confetti */}
    <circle cx="30" cy="20" r="4" fill="#c9a84c" opacity="0.7"/>
    <circle cx="270" cy="18" r="4" fill="#4ade80" opacity="0.7"/>
    <circle cx="150" cy="15" r="5" fill="#f87171" opacity="0.6"/>
    <circle cx="60" cy="110" r="3" fill="#2b7fff" opacity="0.5"/>
    <circle cx="240" cy="108" r="3" fill="#c9a84c" opacity="0.5"/>
    <rect x="28" y="70" width="9" height="3" rx="1" fill="#c9a84c" opacity="0.5" transform="rotate(-30 28 70)"/>
    <rect x="262" y="72" width="9" height="3" rx="1" fill="#4ade80" opacity="0.5" transform="rotate(25 262 72)"/>
    <rect x="148" y="125" width="9" height="3" rx="1" fill="#f87171" opacity="0.4" transform="rotate(10 148 125)"/>
  </svg>,
  // Card 2: Trophy with energy rays
  <svg viewBox="0 0 300 140" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
    <rect width="300" height="140" fill="#0d1420"/>
    {/* rays */}
    {[0,30,60,90,120,150,180,210,240,270,300,330].map((angle, i) => (
      <line key={i}
        x1="150" y1="70"
        x2={150 + Math.cos(angle * Math.PI/180) * 90}
        y2={70 + Math.sin(angle * Math.PI/180) * 90}
        stroke="#c9a84c" strokeWidth="1.5" opacity="0.12"
      />
    ))}
    {/* glow */}
    <circle cx="150" cy="70" r="40" fill="#c9a84c" opacity="0.06"/>
    <circle cx="150" cy="70" r="25" fill="#c9a84c" opacity="0.08"/>
    {/* trophy */}
    <path d="M125 90 Q125 48 150 44 Q175 48 175 90 Z" fill="#c9a84c"/>
    <path d="M125 66 Q108 66 108 76 Q108 86 125 82" fill="none" stroke="#c9a84c" strokeWidth="4"/>
    <path d="M175 66 Q192 66 192 76 Q192 86 175 82" fill="none" stroke="#c9a84c" strokeWidth="4"/>
    <rect x="144" y="90" width="12" height="20" fill="#c9a84c"/>
    <rect x="130" y="110" width="40" height="8" rx="4" fill="#c9a84c"/>
    {/* star on trophy */}
    <polygon points="150,55 153,63 162,63 155,68 158,77 150,72 142,77 145,68 138,63 147,63" fill="#fff" opacity="0.9"/>
    {/* billiard balls bottom */}
    <circle cx="55" cy="118" r="14" fill="#e8e4d9" opacity="0.8"/>
    <circle cx="55" cy="118" r="7" fill="none" stroke="#1a1f2e" strokeWidth="1.5"/>
    <text x="55" y="122" textAnchor="middle" fontSize="9" fill="#1a1f2e" fontWeight="bold">8</text>
    <circle cx="240" cy="120" r="12" fill="#2b7fff" opacity="0.8"/>
    <circle cx="265" cy="112" r="10" fill="#f87171" opacity="0.7"/>
    <circle cx="38" cy="108" r="10" fill="#4ade80" opacity="0.6"/>
    {/* sparkles */}
    <circle cx="80" cy="32" r="3.5" fill="#c9a84c" opacity="0.7"/>
    <circle cx="220" cy="28" r="3.5" fill="#c9a84c" opacity="0.7"/>
    <circle cx="50" cy="58" r="2.5" fill="#c9a84c" opacity="0.5"/>
    <circle cx="250" cy="55" r="2.5" fill="#c9a84c" opacity="0.5"/>
  </svg>
];

// ─── News ─────────────────────────────────────────────────────────────────────

const CATEGORY_STYLE = {
  "Turnier":  { color: "#2b7fff", bg: "rgba(43,127,255,0.1)",  border: "rgba(43,127,255,0.25)" },
  "Aufstieg": { color: "#4ade80", bg: "rgba(74,222,128,0.1)",  border: "rgba(74,222,128,0.25)" },
  "Event":    { color: "#fbbf24", bg: "rgba(251,191,36,0.1)",  border: "rgba(251,191,36,0.25)" },
  "News":     { color: "#a5b4c8", bg: "rgba(165,180,200,0.08)", border: "rgba(165,180,200,0.2)" },
};


const CategoryChip = ({ cat }) => {
  const s = CATEGORY_STYLE[cat] ?? CATEGORY_STYLE["News"];
  return (
    <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 999, fontSize: 10, fontFamily: "var(--font-mono)", letterSpacing: "0.1em", textTransform: "uppercase", color: s.color, background: s.bg, border: `1px solid ${s.border}` }}>
      {cat}
    </span>
  );
};

const formatDate = (dateStr, lang) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString(lang === "DE" ? "de-DE" : "en-GB", { day: "numeric", month: "long", year: "numeric" });
};

const ArticleModal = ({ item, lang, onClose }) => {
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px", overflowY: "auto" }}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="article-modal-inner"
        style={{ background: "var(--ink-100)", border: "1px solid var(--ink-300)", borderRadius: 20, width: "100%", maxWidth: 720, maxHeight: "90vh", overflowY: "auto", display: "flex", flexDirection: "column", scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {item.bild_url && (
          <div style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden", borderRadius: "20px 20px 0 0", flexShrink: 0 }}>
            <img src={item.bild_url} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}
        <div style={{ padding: "36px 40px 44px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--bone-400)", letterSpacing: "0.06em" }}>{formatDate(item.date, lang)}</span>
            <button
              onClick={onClose}
              onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.querySelector(".back-underline").style.transform = "scaleX(1)"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = 0.7; e.currentTarget.querySelector(".back-underline").style.transform = "scaleX(0)"; }}
              style={{ background: "transparent", border: "none", color: "var(--bone-400)", cursor: "pointer", fontSize: 20, lineHeight: 1, padding: "0 0 0 16px", opacity: 0.7, display: "flex", flexDirection: "column", gap: 3 }}
            >
              ✕
              <span className="back-underline" style={{ display: "block", height: 1, background: "var(--bone-500)", transformOrigin: "left", transform: "scaleX(0)", transition: "transform 0.25s ease" }} />
            </button>
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 400, lineHeight: 1.2, letterSpacing: "-0.02em", color: "var(--bone-100)", margin: "0 0 12px" }}>{item.title}</h2>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--bone-300)", margin: "0 0 28px" }}>{item.excerpt}</p>
          {item.inhalt && (
            <div
              className="article-body"
              style={{ borderTop: "1px solid var(--ink-300)", paddingTop: 28 }}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.inhalt) }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export const News = ({ items = [], turniere = [] }) => {
  const { t, lang } = useTranslation();
  const sorted = [...items].sort((a, b) => new Date(b.date) - new Date(a.date));
  const featured = sorted[0];
  const rest = sorted.slice(1);

  const [openArticle, setOpenArticle] = React.useState(null);

  const sidebarRef = React.useRef(null);
  const featuredRef = React.useRef(null);
  const btnRef = React.useRef(null);
  const columnsContainerRef = React.useRef(null);
  const [sidebarHeight, setSidebarHeight] = React.useState(null);
  const [columnsHeight, setColumnsHeight] = React.useState(null);
  const [colWidth, setColWidth] = React.useState(null);

  // Simulate CSS columns column-fill:auto using measured column width for accurate image card heights
  const visibleRest = React.useMemo(() => {
    const ch = columnsHeight ?? 260;
    const colW = colWidth ?? 300;
    const imageCardH = Math.round(colW * (2 / 3)) + 18; // aspect-ratio 3/2 + marginBottom
let col = 0, colH = 0, count = 0;
    for (const item of rest) {
      const h = item.noImage ? 150 : imageCardH;
      if (colH + h > ch) {
        col++;
        if (col >= 3) break;
        colH = 0;
      }
      colH += h;
      count++;
    }
    return rest.slice(0, count);
  }, [rest, columnsHeight, colWidth]);

  React.useEffect(() => {
    const measure = () => {
      const sidebar = sidebarRef.current;
      const featured = featuredRef.current;
      const btn = btnRef.current;
      const cols = columnsContainerRef.current;
      if (!sidebar) return;
      const sh = sidebar.offsetHeight;
      setSidebarHeight(sh);
      if (cols) {
        const gap = 18;
        setColWidth((cols.offsetWidth - gap * 2) / 3);
      }
      if (featured && btn) {
        setColumnsHeight(Math.max(sh - featured.offsetHeight - btn.offsetHeight - 18 * 2, 100));
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (sidebarRef.current) ro.observe(sidebarRef.current);
    if (featuredRef.current) ro.observe(featuredRef.current);
    if (columnsContainerRef.current) ro.observe(columnsContainerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
  <section className="section" id="news" style={{ background: "var(--ink-050)", position: "relative" }}>
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }} className="reveal">
        <div>
          <div className="section-eyebrow-row">
            <span className="section-num">{t("news.num")}</span>
            <span className="section-divider" />
            <span className="eyebrow">News Board</span>
          </div>
          <h2 className="section-title" style={{ marginTop: 16 }}>Aktuelles aus <em>dem Verein</em>.</h2>
        </div>
        <button onClick={() => document.getElementById("kalender")?.scrollIntoView({ behavior: "smooth" })} className="btn btn-ghost" style={{ padding: "10px 18px", fontSize: 12, display: "inline-flex", alignItems: "center", gap: 6, flexShrink: 0, cursor: "pointer" }}>
          Kalender <ArrowOut size={12} />
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16, alignItems: "start" }} className="reveal">
        <div style={{ display: "flex", flexDirection: "column", gap: 18, height: sidebarHeight ?? undefined }}>
          {/* Featured card */}
          {featured && (
            featured.bild_url ? (
              <div ref={featuredRef} className="news-card" onClick={() => setOpenArticle(featured)} style={{ borderRadius: 16, overflow: "hidden", position: "relative", height: 250, flexShrink: 0, cursor: "pointer" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${featured.bild_url}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
                <div className="news-card-overlay" />
                <div style={{ position: "absolute", inset: 0, padding: "32px 36px", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 10 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 15, color: "rgba(255,255,255,0.7)", letterSpacing: "0.06em" }}>{formatDate(featured.date, lang)}</span>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 400, lineHeight: 1.2, letterSpacing: "-0.02em", color: "var(--bone-100)", margin: 0, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{featured.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.65, color: "rgba(255,255,255,0.6)", margin: 0, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{featured.excerpt}</p>
                </div>
              </div>
            ) : (
              <div ref={featuredRef} className="news-card" onClick={() => setOpenArticle(featured)} style={{ borderRadius: 16, overflow: "hidden", flexShrink: 0, background: "linear-gradient(135deg, var(--ink-200) 0%, var(--ink-100) 100%)", padding: "28px 36px", display: "flex", flexDirection: "column", gap: 10, cursor: "pointer" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 15, color: "var(--bone-400)", letterSpacing: "0.06em" }}>{formatDate(featured.date, lang)}</span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 400, lineHeight: 1.2, letterSpacing: "-0.02em", color: "var(--bone-100)", margin: 0 }}>{featured.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: "var(--bone-400)", margin: 0 }}>{featured.excerpt}</p>
              </div>
            )
          )}

          {/* Card grid — fills remaining space, columns flow top-to-bottom */}
          <div>
            <div ref={columnsContainerRef} style={{ columns: 3, columnGap: 18, columnFill: "auto", height: columnsHeight ?? "auto" }}>
              {visibleRest.map((item, i) => (
                <div key={i} className="news-card" onClick={() => setOpenArticle(item)} style={{ borderRadius: 14, overflow: "hidden", position: "relative", breakInside: "avoid", marginBottom: 18, aspectRatio: item.noImage ? undefined : "3/2", cursor: "pointer" }}>
                  {item.noImage ? (
                    <div style={{ background: "linear-gradient(135deg, var(--ink-200) 0%, var(--ink-100) 100%)", padding: "20px 22px", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 7 }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--bone-400)", letterSpacing: "0.06em" }}>{formatDate(item.date, lang)}</span>
                      <h4 style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 400, lineHeight: 1.3, color: "var(--bone-100)", margin: 0, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{item.title}</h4>
                      <p style={{ fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.55)", margin: 0, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>{item.excerpt}</p>
                    </div>
                  ) : (
                    <>
                      <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${item.bild_url}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
                      <div className="news-card-overlay" />
                      <div style={{ position: "absolute", inset: 0, padding: "20px 22px", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 7 }}>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "rgba(255,255,255,0.7)", letterSpacing: "0.06em" }}>{formatDate(item.date, lang)}</span>
                        <h4 style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 400, lineHeight: 1.3, color: "var(--bone-100)", margin: 0, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{item.title}</h4>
                        <p style={{ fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.55)", margin: 0, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{item.excerpt}</p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          <a ref={btnRef} href="/vereinshistorie" className="btn btn-ghost" style={{ padding: "12px 22px", fontSize: 12, alignSelf: "flex-start", flexShrink: 0 }}>
            Zu unserer Vereinshistorie <ArrowOut size={11} />
          </a>
        </div>

        {/* Kommende Turniere sidebar */}
        <div ref={sidebarRef} style={{ background: "var(--ink-100)", border: "1px solid var(--ink-300)", borderRadius: 16, padding: "28px 24px", display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 400, letterSpacing: "-0.02em", color: "var(--bone-100)", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span><em style={{ fontStyle: "italic", color: "var(--brass-500)", marginRight: "0.2em" }}>Kommende</em>{" "}Turniere</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--brass-500)", flexShrink: 0 }}>
              <path d="M7 3h10v7a5 5 0 0 1-10 0V3z"/>
              <path d="M7 7H4a2 2 0 0 0 0 4h3"/>
              <path d="M17 7h3a2 2 0 0 1 0 4h-3"/>
              <line x1="12" y1="15" x2="12" y2="19"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0, flex: 1 }}>
            {(() => {
              const now = new Date();
              const upcoming = turniere.filter(t => new Date(t.turnierbeginn) >= now);
              const pastList = turniere.filter(t => new Date(t.turnierbeginn) < now);
              const hasPast = pastList.length > 0;
              const maxUpcoming = hasPast ? 3 : 4;
              const upcomingSlots = [...upcoming].sort((a, b) => new Date(b.turnierbeginn) - new Date(a.turnierbeginn));
              while (upcomingSlots.length < maxUpcoming) upcomingSlots.unshift(null);
              const slots = hasPast ? [...upcomingSlots, pastList[0]] : upcomingSlots;
              return slots.map((t, i) => {
                const isLast = i === slots.length - 1;
                if (!t) return (
                  <div key={`ph-${i}`} style={{ padding: "20px 0", borderBottom: isLast ? "none" : "1px solid var(--ink-300)", opacity: 0.18 }}>
                    <div style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.06em", marginBottom: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ fontSize: 13, lineHeight: 1, color: "var(--bone-500)" }}>— —</div>
                      </div>
                      <div style={{ fontSize: 12, lineHeight: 1, color: "var(--bone-500)", marginTop: 14 }}>Kein Turnier geplant</div>
                    </div>
                    <div style={{ fontSize: 17, fontWeight: 400, color: "var(--bone-500)", lineHeight: 1.3, marginBottom: 6, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>—</div>
                    <a className="turnier-link" style={{ pointerEvents: "none", color: "var(--bone-500)" }}>— <ArrowOut size={11} /></a>
                  </div>
                );
                const past = new Date(t.turnierbeginn) < new Date();
                const uhrzeit = t.turnierbeginn ? new Date(t.turnierbeginn).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }) : null;
                return (
                  <div key={t.id ?? i} style={{ padding: "20px 0", borderBottom: isLast ? "none" : "1px solid var(--ink-300)" }}>
                    <div style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.06em", marginBottom: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ fontSize: 13, lineHeight: 1, color: past ? "var(--bone-500)" : "var(--brass-500)", opacity: past ? 0.4 : 1, minWidth: 0, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                          {new Date(t.turnierbeginn).toLocaleDateString("de-DE", { day: "2-digit", month: "short" })}
                          {uhrzeit && <span style={{ color: "var(--bone-500)", marginLeft: 12, fontSize: 12 }}>{uhrzeit}</span>}
                          <span style={{ color: "var(--bone-500)", marginLeft: 8 }}>· {t.disziplin}</span>
                        </div>
                        {past && <span style={{ fontSize: 11, color: "var(--bone-500)", opacity: 0.5, fontFamily: "var(--font-mono)", letterSpacing: "0.06em", flexShrink: 0, marginLeft: 8 }}>Vergangen</span>}
                      </div>
                      <div style={{ fontSize: 12, lineHeight: 1, color: t.typ === "intern" ? "rgba(248,113,113,0.5)" : "rgba(134,239,172,0.5)", marginTop: 14, fontFamily: "inherit" }}>{t.typ === "intern" ? "Internes Vereinsturnier" : "Öffentliches Hausturnier"}</div>
                    </div>
                    <div style={{ fontSize: 17, fontWeight: 400, color: "var(--bone-100)", lineHeight: 1.3, marginBottom: 6, opacity: past ? 0.4 : 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.name}</div>
                    <a href={t.href} target="_blank" rel="noopener" className="turnier-link" style={{}}>
                      {past ? "Ergebnisse auf CueScore" : "Anmelden auf CueScore"} <ArrowOut size={11} />
                    </a>
                  </div>
                );
              });
            })()}
          </div>
          <a href="/calendar" className="btn btn-ghost" style={{ marginTop: 20, padding: "9px 14px", fontSize: 11, display: "inline-flex", alignItems: "center", gap: 5, justifyContent: "center" }}>
            Alle Turniere auf CueScore ansehen <ArrowOut size={11} />
          </a>
        </div>
      </div>

      <button
        onClick={() => document.getElementById("kalender")?.scrollIntoView({ behavior: "smooth" })}
        style={{ position: "absolute", bottom: 64, left: "50%", transform: "translateX(-50%)", background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: 0, opacity: 0.7, transition: "opacity 0.2s", zIndex: 10, pointerEvents: "all" }}
        onMouseEnter={e => e.currentTarget.style.opacity = 1}
        onMouseLeave={e => e.currentTarget.style.opacity = 0.7}
      >
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--bone-500)" }}>Zum Kalender</div>
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, var(--brass-500), transparent)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 12, background: "var(--brass-500)", animation: "scroll-cue 3.6s ease-in-out infinite" }} />
        </div>
      </button>
    </div>
    {openArticle && <ArticleModal item={openArticle} lang={lang} onClose={() => setOpenArticle(null)} />}
  </section>
);
};

// ─── Calendar ─────────────────────────────────────────────────────────────────

const WEEKDAYS_SHORT = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

function buildCalendarDays(year, month) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const offset = (first.getDay() + 6) % 7;
  const days = Array(offset).fill(null);
  for (let d = 1; d <= last.getDate(); d++) days.push(new Date(year, month, d));
  return days;
}

const CALENDAR_EVENTS = [
  { cat: "Pool", format: "8-Ball", title: "Sunday-Break-Out 8-Ball", dateKey: "2026-09-16", date: "16. Sep 2026", timeFrom: "10:00", timeTo: "12:00", org: "BCFrankfurt1912", past: false, link: "Auf CueScore ansehen" },
  { cat: "Pool", format: "9-Ball", title: "Sunday-Break-Out 9-Ball", dateKey: "2026-09-16", date: "16. Sep 2026", timeFrom: "11:00", timeTo: "17:00", org: "BCFrankfurt1912", past: false, link: "Auf CueScore ansehen" },
  { cat: "Pool", format: "9-Ball", title: "Sommercamp Turnier 2026 – Endrunde", dateKey: "2026-09-16", date: "16. Sep 2026", timeFrom: "18:00", timeTo: "22:00", org: "Fordan Pécs", past: false, link: "Auf CueScore ansehen" },
];

export const CalendarSection = () => {
  const [current, setCurrent] = React.useState(() => {
    const t = new Date(); return new Date(t.getFullYear(), t.getMonth(), 1);
  });
  const [selected, setSelected] = React.useState(null);
  const today = new Date();
  const year = current.getFullYear();
  const month = current.getMonth();
  const days = buildCalendarDays(year, month);
  const monthLabel = current.toLocaleDateString("de-DE", { month: "long", year: "numeric" });
  const toKey = (d) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  const selectedKey = selected ? toKey(new Date(selected)) : null;
  const selectedEvents = selectedKey ? CALENDAR_EVENTS.filter(e => e.dateKey === selectedKey) : [];
  const [displayEvents, setDisplayEvents] = React.useState([]);
  const [displayNoEvents, setDisplayNoEvents] = React.useState(false);
  const [contentVisible, setContentVisible] = React.useState(true);
  React.useEffect(() => {
    if (!selectedKey) {
      const t = setTimeout(() => { setDisplayEvents([]); setDisplayNoEvents(false); setContentVisible(true); }, 450);
      return () => clearTimeout(t);
    }
    setContentVisible(false);
    const t = setTimeout(() => {
      if (selectedEvents.length > 0) { setDisplayEvents(selectedEvents); setDisplayNoEvents(false); }
      else { setDisplayEvents([]); setDisplayNoEvents(true); }
      setContentVisible(true);
    }, 180);
    return () => clearTimeout(t);
  }, [selectedKey]);

  return (
  <section className="section" id="kalender" style={{ background: "linear-gradient(to bottom, var(--ink-050) 0%, transparent 120px), radial-gradient(ellipse at 15% -10%, color-mix(in srgb, var(--felt-700) 70%, transparent) 0%, var(--ink-050) 55%, var(--ink-000) 100%)" }}>
    <div className="container">
      <div style={{ marginBottom: 40 }}>
        <div className="section-eyebrow-row">
          <span className="section-num">02</span>
          <span className="section-divider" />
          <span className="eyebrow">Kalender</span>
        </div>
        <h2 className="section-title" style={{ marginTop: 16 }}>Termine &amp; <em>Spielplan.</em></h2>
        <p style={{ marginTop: 12, fontSize: 15, color: "var(--bone-400)", fontFamily: "var(--font-display)" }}>Ligaspiele und interne Termine des BC Frankfurt 1912.</p>
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "stretch" }}>
      <div style={{ flex: "0 0 840px", maxWidth: 840 }}>
        {/* Month nav */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, padding: "16px 24px", background: "var(--ink-100)", borderRadius: 12, border: "1px solid var(--ink-300)" }}>
          <button onClick={() => setCurrent(new Date(year, month - 1, 1))}
            style={{ background: "transparent", border: "none", color: "var(--bone-400)", padding: "6px 8px", cursor: "pointer", lineHeight: 1, transition: "color 0.2s", display: "flex", alignItems: "center" }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--brass-500)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--bone-400)"}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--bone-100)", fontWeight: 400 }}>{monthLabel}</span>
          <button onClick={() => setCurrent(new Date(year, month + 1, 1))}
            style={{ background: "transparent", border: "none", color: "var(--bone-400)", padding: "6px 8px", cursor: "pointer", lineHeight: 1, transition: "color 0.2s", display: "flex", alignItems: "center" }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--brass-500)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--bone-400)"}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>

        {/* Weekday headers */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8, marginBottom: 4 }}>
          {WEEKDAYS_SHORT.map(d => (
            <div key={d} style={{ textAlign: "center", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--bone-500)", padding: 8 }}>{d}</div>
          ))}
        </div>

        {/* Day cells */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
          {days.map((date, i) => {
            if (!date) return <div key={`e-${i}`} />;
            const isToday = date.toDateString() === today.toDateString();
            const isPast = date < today && !isToday;
            const key = toKey(date);
            const cellEvents = CALENDAR_EVENTS.filter(e => e.dateKey === key);
            return (
              <div key={i} onClick={() => setSelected(s => s === date.toDateString() ? null : date.toDateString())} style={{ aspectRatio: "1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "8px 4px 5px", background: "var(--ink-100)", border: selected === date.toDateString() ? "2px solid var(--brass-500)" : isToday ? "2px solid var(--bone-300)" : "1px solid var(--ink-300)", borderRadius: 8, color: selected === date.toDateString() ? "var(--brass-500)" : isToday ? "var(--bone-100)" : "var(--bone-300)", fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: isToday || selected === date.toDateString() ? 700 : 400, opacity: isPast ? 0.25 : 1, cursor: "pointer" }}>
                <span>{date.getDate()}</span>
                {cellEvents.length > 0 && (
                  <div style={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
                    {cellEvents.map((_, ci) => (
                      <span key={ci} style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--brass-500)", display: "block", flexShrink: 0 }} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* Events sidebar */}
      <div style={{ flex: "0 0 340px", maxWidth: selected ? 340 : 0, marginLeft: selected ? 32 : 0, opacity: selected ? 1 : 0, overflow: "hidden", transition: "max-width 0.45s cubic-bezier(0.4,0,0.2,1), margin-left 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease" }}>
      <div style={{ width: 340, height: "100%", display: "flex", flexDirection: "column", gap: 12, opacity: contentVisible ? 1 : 0, transition: "opacity 0.18s ease" }}>
        {displayNoEvents && (
          <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--bone-500)", fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.06em", textAlign: "center", padding: 24, border: "1px solid var(--ink-300)", borderRadius: 10, background: "var(--ink-100)" }}>
            An diesem Tag<br />keine Termine
          </div>
        )}
        {displayEvents.map((ev, i) => (
          <div key={i} style={{ background: "var(--ink-100)", border: "1px solid var(--ink-300)", borderLeft: "3px solid var(--brass-500)", borderRadius: 10, padding: "16px 18px", display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "var(--ink-200)", border: "1px solid var(--ink-300)", borderRadius: 20, padding: "3px 10px", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.06em", color: "var(--bone-300)" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--brass-500)", display: "inline-block" }} />
                {ev.cat.toUpperCase()}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {ev.past && <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em", color: "var(--bone-500)", background: "var(--ink-200)", border: "1px solid var(--ink-300)", borderRadius: 20, padding: "3px 8px" }}>VORBEI</span>}
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em", color: "var(--bone-500)" }}>{ev.format}</span>
              </div>
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, color: ev.past ? "var(--bone-400)" : "var(--bone-100)", lineHeight: 1.3 }}>{ev.title}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--bone-500)" }}>{ev.date}{ev.timeFrom && <span style={{ marginLeft: 10, opacity: 0.7 }}>{ev.timeFrom}{ev.timeTo ? ` – ${ev.timeTo}` : ""} Uhr</span>}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--bone-500)" }}>{ev.org}</div>
            <a href="#" style={{ marginTop: 4, fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--bone-400)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4, borderBottom: "1px solid transparent", transition: "color 0.2s, border-color 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.color = "var(--bone-100)"; e.currentTarget.style.borderBottomColor = "var(--bone-100)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "var(--bone-400)"; e.currentTarget.style.borderBottomColor = "transparent"; }}>
              {ev.link} <ArrowOut size={9} />
            </a>
          </div>
        ))}
      </div>
      </div>

      </div>
    </div>
  </section>
  );
};

export const Contact = () => {
  const { t } = useTranslation();
  return (
  <section className="section contact" id="contact">
    <div className="container">
      <div className="section-head reveal">
        <div>
          <div className="section-eyebrow-row">
            <span className="section-num">{t("contact.num")}</span>
            <span className="section-divider" />
            <span className="eyebrow">{t("contact.visitContact")}</span>
          </div>
          <h2 className="section-title" style={{ marginTop: 24 }} dangerouslySetInnerHTML={{ __html: t("contact.title") }} />
        </div>
      </div>

      <div className="contact-grid reveal">
        <div>
          <div className="map-card" style={{ padding: 0, overflow: "hidden" }}>
            <iframe
              src="https://www.google.com/maps?q=Borsigallee+45+Frankfurt&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(0.92) hue-rotate(180deg) saturate(0.6) contrast(0.95)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="BC Frankfurt 1912 location"
            />
          </div>

          <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
            <a href="https://www.google.com/maps/dir/?api=1&destination=Borsigallee+45+Frankfurt" target="_blank" rel="noopener" className="btn btn-brass" style={{ padding: "12px 20px", fontSize: 12 }}>
              {t("contact.getDirections")} <ArrowOut />
            </a>
            <a href="https://www.google.com/maps/place/Borsigallee+45+Frankfurt" target="_blank" rel="noopener" className="btn btn-ghost" style={{ padding: "12px 20px", fontSize: 12 }}>
              {t("contact.openInMaps")} <ArrowOut />
            </a>
          </div>

          <div className="contact-info-block">
            <h4>{t("contact.address.title")}</h4>
            <p>Borsigallee 45<br />60388 Frankfurt am Main</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--bone-300)", fontSize: 15 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: "var(--brass-500)" }}><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 17V8h4a3 3 0 0 1 0 6H9"/></svg>
                <span>Parkplätze direkt vor Ort</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--bone-300)", fontSize: 15 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                  <rect x="1" y="1" width="22" height="22" rx="4" fill="#1a3a6b"/>
                  <text x="12" y="18.5" textAnchor="middle" fontSize="15" fontWeight="800" fontFamily="Arial, system-ui, sans-serif" fill="white">U</text>
                </svg>
                <span>4 Min. von der U7 (Hessen-Center)</span>
              </div>
            </div>
          </div>

          <div className="contact-info-block">
            <h4>{t("contact.contact.title")}</h4>
            <p style={{ marginBottom: 8 }}>
              <a href="mailto:info@bcfrankfurt1912.de" style={{ color: "var(--brass-500)", textDecoration: "none" }}>
                info@bcfrankfurt1912.de
              </a>
            </p>
            <p>
              <a href="mailto:membership@bcfrankfurt1912.de" style={{ color: "var(--brass-500)", textDecoration: "none" }}>
                membership@bcfrankfurt1912.de
              </a>
            </p>
          </div>
        </div>

        <div className="contact-form" style={{
          background: "var(--ink-100)",
          border: "1px solid var(--ink-300)",
          borderRadius: "16px",
          padding: "48px",
          alignSelf: "flex-start",
        }}>
          <div className="eyebrow" style={{ marginBottom: 24, color: "var(--brass-500)" }}>{t("contact.membersOnly")}</div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 400, marginBottom: 16, lineHeight: 1.2, letterSpacing: "-0.02em" }} dangerouslySetInnerHTML={{ __html: t("contact.privateClub") }} />
          <p style={{ color: "var(--bone-300)", fontSize: 15, marginBottom: 24, lineHeight: 1.6 }}>
            {t("contact.privateClubDesc1")}
          </p>
          <p style={{ color: "var(--bone-300)", fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
            {t("contact.privateClubDesc2")}
          </p>

          <div style={{
            background: "var(--ink-050)",
            border: "1px solid var(--ink-300)",
            borderRadius: "12px",
            padding: "24px",
            marginTop: "auto",
          }}>
            <h5 style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--bone-500)",
              marginBottom: 16,
            }}>{t("contact.membershipInquiries")}</h5>
            <p style={{ marginBottom: 12 }}>
              <a href="mailto:info@bcfrankfurt1912.de" style={{
                color: "var(--brass-500)",
                textDecoration: "none",
                fontFamily: "var(--font-mono)",
                fontSize: "14px",
                display: "block",
              }}>
                info@bcfrankfurt1912.de
              </a>
            </p>
            <p>
              <a href="mailto:membership@bcfrankfurt1912.de" style={{
                color: "var(--brass-500)",
                textDecoration: "none",
                fontFamily: "var(--font-mono)",
                fontSize: "14px",
                display: "block",
              }}>
                membership@bcfrankfurt1912.de
              </a>
            </p>
          </div>
          <a href="/mitgliedschaft" className="btn btn-ghost" style={{ marginTop: 40, padding: "10px 18px", fontSize: 12, display: "inline-flex", alignItems: "center", gap: 6, alignSelf: "flex-start" }}>
            Alles zur Mitgliedschaft <Arrow size={12} />
          </a>
        </div>
      </div>
    </div>
  </section>
);
};

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
  </svg>
);

const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M14 8.5V6.9c0-.7.2-1.1 1.2-1.1H16.5V3.1C16.1 3 15.2 3 14.3 3c-2 0-3.4 1.2-3.4 3.5v2H8.5V11h2.4v9h2.9v-9h2.2l.4-2.5H14z" />
  </svg>
);

const CueScoreIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
    <text x="12" y="16" textAnchor="middle" fontSize="11" fontWeight="700"
      fontFamily="var(--font-mono), monospace" fill="currentColor">C</text>
  </svg>
);

const YouTubeIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="2.5" y="6" width="19" height="12" rx="3.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M10.5 9.2v5.6l4.8-2.8-4.8-2.8z" fill="currentColor" />
  </svg>
);

export const Footer = () => {
  const { t } = useTranslation();
  const socialLinks = [
    { label: "Instagram", href: "#", icon: <InstagramIcon /> },
    { label: "Facebook", href: "#", icon: <FacebookIcon /> },
    { label: "YouTube", href: "#", icon: <YouTubeIcon /> },
    { label: "CueScore", href: "https://cuescore.com/bcfrankfurt1912", icon: <CueScoreIcon /> },
  ];
  return (
  <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-brand">
          <h3>Billard Club<br /><em>Frankfurt</em> 1912 e.V.</h3>
          <p>{t("footer.about.line1")}</p>
          {/* Social icons — ausgeblendet bis URLs feststehen
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 32 }}>
            {socialLinks.map(({ label, href, icon }) => (
              <a key={label} href={href} aria-label={label}
                {...(href !== "#" ? { target: "_blank", rel: "noopener" } : {})}
                style={{
                  width: 40, height: 40, border: "1px solid var(--ink-300)", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--bone-200)", textDecoration: "none",
                }}>{icon}</a>
            ))}
          </div>
          */}
        </div>
        <div className="footer-col footer-nav">
          <ul>
            <li><a href="#news">News</a></li>
            <li><a href="/calendar">{t("nav.games")}</a></li>
            <li><a href="#about">{t("nav.disciplines")}</a></li>
            <li><a href="#experience">{t("nav.experience")}</a></li>
            <li><a href="#contact">{t("nav.visit")}</a></li>
            <li><a href="/impressum">Impressum &amp; Vorstand</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 1912–{new Date().getFullYear()} · Billard Club Frankfurt e.V.</span>
        <a href="/admin/login" style={{ color: 'var(--bone-500)', fontSize: '0.75rem', opacity: 0.5 }}>Vorstandslogin</a>
      </div>
    </div>
  </footer>
);
};
