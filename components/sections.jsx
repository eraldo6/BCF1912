"use client";

import React from "react";
import { useTranslation } from "./translation-context";
import { Arrow, ArrowOut, PoolTableHero, ScrollCue } from "./visuals";

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
        <span>BC Frankfurt <em style={{ fontStyle: "italic", color: "var(--brass-500)", fontWeight: 400 }}>1912</em></span>
      </a>
      <ul className="nav-links">
        <li><a href="#about">{t("nav.club")}</a></li>
        <li><a href="#disciplines">{t("nav.disciplines")}</a></li>
        <li><a href="#experience">{t("nav.experience")}</a></li>
        <li><a href="#membership">{t("nav.membership")}</a></li>
        <li><a href="#gallery">{t("nav.gallery")}</a></li>
        <li><a href="#news">News</a></li>
        <li><a href="#contact">{t("nav.visit")}</a></li>
      </ul>
      <div className="nav-cta">
        <LangPicker />
        <a href="#membership" className="btn btn-brass" style={{ padding: "10px 20px", fontSize: 12 }}>
          {t("nav.becomeMember")} <Arrow size={12} />
        </a>
      </div>
    </nav>
  );
};

export const LangPicker = () => {
  const { lang, setLang } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const flags = {
    EN: "🇬🇧",
    DE: "🇩🇪"
  };

  const langNames = {
    EN: "English",
    DE: "Deutsch"
  };

  const langs = ["DE", "EN"];

  // Desktop: Two flag buttons
  if (!isMobile) {
    return (
      <div style={{ display: "flex", gap: 8 }}>
        {langs.map(l => (
          <button
            key={l}
            onClick={() => setLang(l)}
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: l === lang ? "2px solid var(--brass-500)" : "1px solid var(--ink-300)",
              background: l === lang ? "rgba(218,178,96,0.1)" : "rgba(10,10,12,0.6)",
              cursor: "pointer",
              fontSize: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "var(--brass-500)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = l === lang ? "var(--brass-500)" : "var(--ink-300)";
              e.currentTarget.style.transform = "scale(1)";
            }}
            title={langNames[l]}
          >
            {flags[l]}
          </button>
        ))}
      </div>
    );
  }

  // Mobile: Dropdown with flags
  return (
    <div style={{ position: "relative" }}>
      <div className="nav-lang" onClick={() => setOpen(o => !o)} style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 18 }}>{flags[lang]}</span>
        {lang}
        <span style={{ opacity: 0.5 }}>▾</span>
      </div>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 8px)", right: 0,
          background: "rgba(10,10,12,0.95)", backdropFilter: "blur(20px)",
          border: "1px solid var(--ink-300)", borderRadius: 12,
          padding: 6, minWidth: 120,
          zIndex: 200, boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
        }}>
          {langs.map(l => (
            <div key={l}
              onClick={() => { setLang(l); setOpen(false); }}
              style={{
                padding: "10px 14px", fontFamily: "var(--font-mono)",
                fontSize: 12, letterSpacing: "0.1em", color: l === lang ? "var(--brass-500)" : "var(--bone-200)",
                cursor: "pointer", borderRadius: 6,
                background: l === lang ? "rgba(218,178,96,0.06)" : "transparent",
                display: "flex", alignItems: "center", gap: 10,
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(218,178,96,0.08)"}
              onMouseLeave={e => e.currentTarget.style.background = l === lang ? "rgba(218,178,96,0.06)" : "transparent"}
            >
              <span style={{ fontSize: 18 }}>{flags[l]}</span>
              {langNames[l]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const Hero = () => {
  const { t } = useTranslation();
  const [parallax, setParallax] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => setParallax(window.scrollY * 0.5);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="hero felt-texture grain" id="top" style={{ borderBottom: "1px solid var(--ink-300)" }}>
      <div className="hero-table-bg" style={{
        transform: `translateY(${parallax * 0.5}px) scale(${1 + parallax * 0.0003})`,
        opacity: Math.max(0.2, 0.85 - parallax * 0.003),
      }}>
        <PoolTableHero />
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

        <div className="hero-cta reveal in-view delay-3">
          <a href="#membership" className="btn btn-brass">
            {t("hero.becomeMember")} <Arrow />
          </a>
          <a href="#contact" className="btn btn-ghost">
            {t("hero.visitClub")} <ArrowOut />
          </a>
        </div>
      </div>

      <div className="hero-stats reveal in-view delay-4">
        <div>
          <div className="hero-stat-num">10</div>
          <div className="hero-stat-label">Tables</div>
        </div>
        <div>
          <div className="hero-stat-num">114</div>
          <div className="hero-stat-label">Years</div>
        </div>
        <div>
          <div className="hero-stat-num">3</div>
          <div className="hero-stat-label">Disciplines</div>
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
            <span className="section-num">03</span>
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
          <a href="#membership" className="btn btn-brass" style={{ marginTop: 24, alignSelf: "flex-start", padding: "12px 20px", fontSize: 12 }}>
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
          <div className="section-eyebrow-row">
            <span className="section-num">04</span>
            <span className="section-divider" />
            <span className="eyebrow">{t("membership.eyebrow")}</span>
          </div>
          <h2 className="section-title" style={{ marginTop: 24 }} dangerouslySetInnerHTML={{ __html: t("membership.threeWays") }} />
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

const GALLERY = [
  { cls: "g1", caption: "Main hall · Saturday evening", img: "https://bcfrankfurt.de/wp-content/uploads/2018/02/atmo1.jpg" },
  { cls: "g2", caption: "Karambol · cadre frame", img: "https://bcfrankfurt.de/wp-content/uploads/2018/02/atmo2.jpg" },
  { cls: "g3", caption: "Brass lamps over the table", img: "https://bcfrankfurt.de/wp-content/uploads/2018/02/atmo4.jpg" },
  { cls: "g4", caption: "Snooker · 12-foot match", img: "https://bcfrankfurt.de/wp-content/uploads/2018/02/atmo5.jpg" },
  { cls: "g5", caption: "The Lounge", img: "https://bcfrankfurt.de/wp-content/uploads/2018/02/03_Raum.jpg" },
  { cls: "g6", caption: "Pool Bundesliga", img: "https://bcfrankfurt.de/wp-content/uploads/2018/02/kugeln2_s.jpg" },
  { cls: "g7", caption: "Karambol training", img: "https://bcfrankfurt.de/wp-content/uploads/2018/02/05_Karambolage.jpg" },
];

export const Gallery = () => {
  const { t } = useTranslation();
  return (
  <section className="section" id="gallery">
    <div className="container">
      <div className="section-head reveal">
        <div>
          <div className="section-eyebrow-row">
            <span className="section-num">05</span>
            <span className="section-divider" />
            <span className="eyebrow">{t("gallery.eyebrow")}</span>
          </div>
          <h2 className="section-title" style={{ marginTop: 24 }} dangerouslySetInnerHTML={{ __html: t("gallery.title") }} />
        </div>
        <p className="section-lede">
          {t("gallery.letLight")}
        </p>
      </div>

      <div className="gallery-grid reveal">
        {GALLERY.map((g, i) => (
          <div key={i} className={`gallery-item ${g.cls}`}>
            <img
              src={g.img}
              alt={g.caption}
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                objectFit: "cover",
                filter: "brightness(0.78) contrast(1.08) saturate(0.85)",
                transition: "filter 0.5s var(--ease-out), transform 0.6s var(--ease-out)",
              }}
              className="gallery-img"
            />
            <div className="gallery-caption">{g.caption}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
};

const NEWS = [
  {
    date: "2026-05-20",
    category: "Tournament",
    title: "Hessen Snooker Cup 2026",
    excerpt: "Annual tournament returns June 15-16. Registration open for all skill levels.",
    badge: "Upcoming"
  },
  {
    date: "2026-05-10",
    category: "Promotion",
    title: "BCF II Promoted to Bundesliga",
    excerpt: "After a dominant season, our second team secures promotion to the top flight.",
    badge: "Team News"
  },
  {
    date: "2026-04-28",
    category: "Event",
    title: "Spring Member Tournament Results",
    excerpt: "Congratulations to Marcel Behr (Karambol), Lisa Weber (Pool), and Thomas Klein (Snooker).",
    badge: "Results"
  },
  {
    date: "2026-04-15",
    category: "Tournament",
    title: "Regional Karambol Championship",
    excerpt: "BCF hosts the Süd Regional Championship, September 8-10. Spectators welcome.",
    badge: "Hosting"
  },
];

export const News = () => {
  const { t } = useTranslation();
  return (
  <section className="section" id="news" style={{ background: "var(--ink-050)" }}>
    <div className="container">
      <div className="section-head reveal">
        <div>
          <div className="section-eyebrow-row">
            <span className="section-num">{t("news.num")}</span>
            <span className="section-divider" />
            <span className="eyebrow">{t("news.eyebrow")}</span>
          </div>
          <h2 className="section-title" style={{ marginTop: 24 }} dangerouslySetInnerHTML={{ __html: t("news.title") }} />
        </div>
        <p className="section-lede">
          {t("news.lede")}
        </p>
      </div>

      <div style={{ display: "grid", gap: "16px", marginTop: 48 }} className="reveal">
        {NEWS.map((item, i) => (
          <div key={i} style={{
            background: "var(--ink-100)",
            border: "1px solid var(--ink-300)",
            borderRadius: "14px",
            padding: "32px",
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            gap: "24px",
            alignItems: "center",
            transition: "all 0.3s var(--ease-out)",
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--brass-500)"}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--ink-300)"}
          >
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "16px",
              background: "var(--ink-050)",
              borderRadius: "10px",
              minWidth: "80px",
            }}>
              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: "32px",
                fontWeight: 500,
                color: "var(--brass-500)",
                lineHeight: 1,
              }}>
                {new Date(item.date).getDate()}
              </div>
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--bone-400)",
                marginTop: 4,
              }}>
                {new Date(item.date).toLocaleDateString('en', { month: 'short' })}
              </div>
            </div>

            <div>
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--brass-500)",
                marginBottom: 8,
              }}>
                {item.category}
              </div>
              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: "24px",
                fontWeight: 400,
                marginBottom: 8,
                color: "var(--bone-100)",
              }}>
                {item.title}
              </h3>
              <p style={{
                color: "var(--bone-300)",
                fontSize: "14px",
                lineHeight: 1.6,
              }}>
                {item.excerpt}
              </p>
            </div>

            <div style={{
              padding: "8px 16px",
              background: "var(--felt-900)",
              border: "1px solid var(--felt-700)",
              borderRadius: "999px",
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--felt-300)",
              whiteSpace: "nowrap",
            }}>
              {item.badge}
            </div>
          </div>
        ))}
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
          <h2 className="section-title" style={{ marginTop: 24 }} dangerouslySetInnerHTML={{ __html: t("contact.borsigallee") }} />
        </div>
        <p className="section-lede">
          {t("contact.fiveMinutes")}
        </p>
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
          </div>

          <div className="contact-info-block">
            <h4>{t("contact.hours.title")}</h4>
            <p style={{ fontSize: 14, color: "var(--bone-200)", fontFamily: "var(--font-sans)", lineHeight: 1.6 }}>
              {t("contact.hours.weekdays")}: {t("contact.hours.weekdaysTimes")}<br />
              {t("contact.hours.weekend")}: {t("contact.hours.weekendTimes")}<br />
              <span style={{ color: "var(--bone-400)", fontStyle: "italic" }}>{t("contact.hours.closed")}</span>
            </p>
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
        </div>
      </div>
    </div>
  </section>
);
};

export const Footer = () => {
  const { t } = useTranslation();
  return (
  <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-brand">
          <h3>Billard Club<br /><em>Frankfurt</em> 1912 e.V.</h3>
          <p>{t("footer.about.line1")}</p>
          <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
            {["Instagram", "Facebook", "YouTube"].map(s => (
              <a key={s} href="#" style={{
                width: 40, height: 40, border: "1px solid var(--ink-300)", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--bone-200)", textDecoration: "none", fontSize: 11,
                fontFamily: "var(--font-mono)", letterSpacing: "0.06em",
              }}>{s[0]}</a>
            ))}
          </div>
        </div>
        <div className="footer-col">
          <h5>{t("footer.about.title")}</h5>
          <ul>
            <li><a href="#about">{t("footer.history")}</a></li>
            <li><a href="#disciplines">{t("nav.disciplines")}</a></li>
            <li><a href="#experience">{t("footer.facilities")}</a></li>
            <li><a href="#">{t("footer.boardStatutes")}</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>{t("footer.getInvolved")}</h5>
          <ul>
            <li><a href="#membership">{t("nav.membership")}</a></li>
            <li><a href="#">{t("footer.trialVisit")}</a></li>
            <li><a href="#">{t("footer.leagueTeams")}</a></li>
            <li><a href="#">{t("footer.juniorProgramme")}</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>{t("footer.visit")}</h5>
          <ul>
            <li><a href="#contact">Borsigallee 45</a></li>
            <li><a href="#contact">{t("contact.hours.title")}</a></li>
            <li><a href="#contact">{t("contact.contact.title")}</a></li>
            <li><a href="#">{t("footer.imprintPrivacy")}</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 1912 — 2026 · Billard Club Frankfurt e.V.</span>
      </div>
    </div>
  </footer>
);
};
