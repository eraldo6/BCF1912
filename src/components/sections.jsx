/* Sections — broken down for maintainability */

const Nav = () => {
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
        <li><a href="#about">Club</a></li>
        <li><a href="#disciplines">Disciplines</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#membership">Membership</a></li>
        <li><a href="#gallery">Gallery</a></li>
        <li><a href="assets/calendar.html">Spiele</a></li>
        <li><a href="#contact">Visit</a></li>
      </ul>
      <div className="nav-cta">
        <LangPicker />
        <a href="#membership" className="btn btn-brass" style={{ padding: "10px 20px", fontSize: 12 }}>
          Become a Member <Arrow size={12} />
        </a>
      </div>
    </nav>
  );
};

const LangPicker = () => {
  const [open, setOpen] = React.useState(false);
  const [lang, setLang] = React.useState("EN");
  const langs = ["EN", "DE", "FR", "ES", "IT", "NL", "PT", "PL", "TR", "RU", "ZH", "JA"];
  return (
    <div style={{ position: "relative" }}>
      <div className="nav-lang" onClick={() => setOpen(o => !o)}>
        {lang} <span style={{ opacity: 0.5, marginLeft: 4 }}>▾</span>
      </div>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 8px)", right: 0,
          background: "rgba(10,10,12,0.95)", backdropFilter: "blur(20px)",
          border: "1px solid var(--ink-300)", borderRadius: 12,
          padding: 6, minWidth: 90, maxHeight: 220, overflowY: "auto",
          zIndex: 200, boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
        }}>
          {langs.map(l => (
            <div key={l}
              onClick={() => { setLang(l); setOpen(false); }}
              style={{
                padding: "8px 14px", fontFamily: "var(--font-mono)",
                fontSize: 11, letterSpacing: "0.1em", color: l === lang ? "var(--brass-500)" : "var(--bone-200)",
                cursor: "pointer", borderRadius: 6,
                background: l === lang ? "rgba(218,178,96,0.06)" : "transparent",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(218,178,96,0.08)"}
              onMouseLeave={e => e.currentTarget.style.background = l === lang ? "rgba(218,178,96,0.06)" : "transparent"}
            >{l}</div>
          ))}
        </div>
      )}
    </div>
  );
};

const Hero = () => {
  const [parallax, setParallax] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => setParallax(window.scrollY * 0.3);
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
          <span className="eyebrow">Est. 1912 — Frankfurt am Main</span>
        </div>

        <h1 className="hero-title reveal in-view delay-1">
          Frankfurt's home<br />
          of <em>Billard</em><br />
          since 1912.
        </h1>

        <p className="hero-subtitle reveal in-view delay-2">
          Karambol. Pool. Snooker. A century of tradition,
          competition and community — under one roof on the
          eastern edge of the city.
        </p>

        <div className="hero-cta reveal in-view delay-3">
          <a href="#membership" className="btn btn-brass">
            Become a Member <Arrow />
          </a>
          <a href="#contact" className="btn btn-ghost">
            Visit the Club <ArrowOut />
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

const Marquee = () => (
  <div className="marquee">
    <div className="marquee-track">
      <span>
        Karambol <span className="marquee-dot" />
        Pool <span className="marquee-dot" />
        Snooker <span className="marquee-dot" />
        Bundesliga <span className="marquee-dot" />
        Tradition <span className="marquee-dot" />
        Community <span className="marquee-dot" />
        Karambol <span className="marquee-dot" />
        Pool <span className="marquee-dot" />
        Snooker <span className="marquee-dot" />
        Bundesliga <span className="marquee-dot" />
        Tradition <span className="marquee-dot" />
        Community <span className="marquee-dot" />
      </span>
    </div>
  </div>
);

const About = () => (
  <section className="section" id="about">
    <div className="container">
      <div className="section-head reveal">
        <div>
          <div className="section-eyebrow-row">
            <span className="section-num">01</span>
            <span className="section-divider" />
            <span className="eyebrow">The Club</span>
          </div>
          <h2 className="section-title" style={{ marginTop: 24 }}>
            One of <em>Germany's</em><br />oldest billiard clubs.
          </h2>
        </div>
        <p className="section-lede">
          Founded in 1912 and continuously active for over a century,
          BC Frankfurt is a working clubhouse — not a museum. Match-grade
          equipment, serious players, an open door for those who want to learn.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-narrative reveal">
          <p>
            For more than a hundred years, generations of Frankfurters have
            chalked their cues at our tables. The club has moved, grown, and
            modernised — but the rhythm of a quiet evening among the felt has
            never changed.
          </p>
          <p>
            Today we field competitive teams across all three disciplines,
            host regional and national tournaments, and welcome newcomers
            on every weekday. Equipment is renewed annually. Cloth is kept
            tournament-ready. Lighting is engineered to international standards.
          </p>
          <p>
            What you'll find inside is rare: a place where Bundesliga players
            and first-time visitors share the same room, the same drink at the
            bar, and the same respect for a clean break.
          </p>

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

      <div className="league-strip reveal">
        <div className="league-item">
          <div className="league-status live"><span className="dot" /> Live now</div>
          <div className="league-title">Pool Bundesliga</div>
          <div className="league-meta">vs. BC Düsseldorf · 18:00</div>
        </div>
        <div className="league-item">
          <div className="league-status"><span className="dot" /> Upcoming</div>
          <div className="league-title">Karambol Regionalliga</div>
          <div className="league-meta">Sat 03 May · Home</div>
        </div>
        <div className="league-item">
          <div className="league-status"><span className="dot" /> Open</div>
          <div className="league-title">Hessen Snooker Cup</div>
          <div className="league-meta">17–19 May · Registration open</div>
        </div>
        <div className="league-item">
          <div className="league-status"><span className="dot" /> Weekly</div>
          <div className="league-title">Members' Tournament</div>
          <div className="league-meta">Every Thursday · 19:30</div>
        </div>
      </div>
    </div>
  </section>
);

const DISCIPLINES = [
  {
    num: "01",
    name: "Karambol",
    nameItalic: "Karambol",
    desc: "Three balls, no pockets, pure geometry. The historical heart of the club.",
    tables: "4 Tables",
    size: "2.84m & 2.10m",
    league: "Regionalliga Süd",
    detail: "From classic three-cushion to free game and cadre — Karambol is the discipline that built this club. Played on heated tables without pockets, it rewards angle, spin and patience over power. Our four tables — two large match-size, two smaller for training — see Bundesliga practice every Tuesday and Thursday.",
    tags: ["Three-Cushion", "Cadre", "Free Game", "Heated Tables"],
    image: "https://bcfrankfurt.de/wp-content/uploads/2018/02/Karambolage.jpg",
  },
  {
    num: "02",
    name: "Pool",
    nameItalic: "Pool",
    desc: "Fast, expressive, social. Open daily for members and guests alike.",
    tables: "4 Tables",
    size: "9-foot tournament",
    league: "Bundesliga 2",
    detail: "Our four 9-foot tournament tables host everything from casual evenings to Bundesliga 2 matches. 8-Ball, 9-Ball, 10-Ball, Straight Pool — all played here, all night long. Open table on most weekdays; matchroom hire by reservation.",
    tags: ["8-Ball", "9-Ball", "10-Ball", "Straight Pool", "Open Daily"],
    image: "https://bcfrankfurt.de/wp-content/uploads/2018/02/kugeln_s.jpg",
  },
  {
    num: "03",
    name: "Snooker",
    nameItalic: "Snooker",
    desc: "Twelve feet of felt. The longest, most cinematic game we offer.",
    tables: "2 Tables",
    size: "12-foot match",
    league: "Hessen Cup",
    detail: "Two full-size 12-foot snooker tables, kept under match-grade conditions. We host the Hessen Snooker Cup every spring and run a development programme for juniors. Coaching available by appointment with our certified coaches.",
    tags: ["12-Foot Match", "Hessen Cup", "Junior Programme", "Coaching"],
    image: "https://bcfrankfurt.de/wp-content/uploads/2018/02/atmo3.jpg",
  },
];

const Disciplines = () => {
  const [open, setOpen] = React.useState(0);
  return (
    <section className="section disciplines felt-texture" id="disciplines">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="section-eyebrow-row">
              <span className="section-num">02</span>
              <span className="section-divider" />
              <span className="eyebrow">Three Disciplines</span>
            </div>
            <h2 className="section-title" style={{ marginTop: 24 }}>
              Pick your <em>game</em>.
            </h2>
          </div>
          <p className="section-lede">
            Few clubs in Germany maintain match-grade equipment for all three
            major billiard disciplines. We do — and we play them all, year-round.
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
                  <span className="discipline-meta-key">Tables</span>
                  <span className="discipline-meta-val">{d.tables}</span>
                </div>
                <div className="discipline-meta-row">
                  <span className="discipline-meta-key">Size</span>
                  <span className="discipline-meta-val">{d.size}</span>
                </div>
                <div className="discipline-meta-row">
                  <span className="discipline-meta-key">League</span>
                  <span className="discipline-meta-val">{d.league}</span>
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
                    <h4>About the game</h4>
                    <p>{d.detail}</p>
                    <div className="discipline-tags">
                      {d.tags.map(t => (
                        <span key={t} className="discipline-tag">{t}</span>
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

const Experience = () => (
  <section className="section experience" id="experience">
    <div className="container">
      <div className="section-head reveal">
        <div>
          <div className="section-eyebrow-row">
            <span className="section-num">03</span>
            <span className="section-divider" />
            <span className="eyebrow">Why Join</span>
          </div>
          <h2 className="section-title" style={{ marginTop: 24 }}>
            More than <em>a room</em><br />with tables.
          </h2>
        </div>
        <p className="section-lede">
          A working clubhouse with a lounge, a bar, and the kind of regulars
          who'll stay for one more frame — and remember your name when you come back.
        </p>
      </div>

      <div className="experience-grid reveal">
        <div className="exp-card exp-card-tables">
          <div className="exp-card-num">10</div>
          <h3>Match-grade tables</h3>
          <p>Two large carom, two small carom, four 9-foot pool, two 12-foot snooker.</p>
          <div className="tables-viz">
            <div className="mini-table carom-l" />
            <div className="mini-table carom-l" />
            <div className="mini-table" style={{ gridColumn: "span 2", aspectRatio: "1.4/1" }} />
            <div />
            <div className="mini-table pool" />
            <div className="mini-table pool" />
            <div className="mini-table pool" />
            <div className="mini-table pool" />
            <div className="mini-table snooker" style={{ gridColumn: "span 5", aspectRatio: "5/1" }} />
          </div>
        </div>

        <div className="exp-card exp-card-cloth">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 16 }}>Annually renewed</div>
              <h3 style={{ fontSize: 56, lineHeight: 1, marginBottom: 16 }}>
                Tournament cloth, every <em style={{ fontStyle: "italic", color: "var(--brass-500)" }}>summer</em>.
              </h3>
              <p style={{ maxWidth: "44ch", marginTop: 16 }}>
                Every July we close for one week and re-cloth all ten tables with
                Simonis 860 / 300 Rapide — the same cloth used at world championship play.
              </p>
            </div>
            <div style={{
              width: 120, height: 120, borderRadius: "50%",
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
          <h3>The Lounge</h3>
          <p>Leather, low light, and a dedicated space for spectating — or for the conversation between frames.</p>
        </div>

        <div className="exp-card exp-card-snacks">
          <svg className="exp-card-icon" viewBox="0 0 24 24" fill="none">
            <path d="M6 3v6a4 4 0 008 0V3M10 13v8M7 21h6" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <h3>Bar & Kitchen</h3>
          <p>Cold drinks, decent coffee, and a small menu of snacks — Apfelwein on Fridays, by tradition.</p>
        </div>

        <div className="exp-card exp-card-trial">
          <div className="eyebrow" style={{ marginBottom: 12, color: "var(--brass-300)" }}>First visit free</div>
          <h3>Trial Membership</h3>
          <p style={{ color: "var(--bone-200)" }}>
            Two evenings on us. Bring a friend. We'll lend you a cue.
          </p>
          <a href="#membership" className="btn btn-brass" style={{ marginTop: 24, alignSelf: "flex-start", padding: "12px 20px", fontSize: 12 }}>
            Reserve <Arrow size={12} />
          </a>
        </div>
      </div>
    </div>
  </section>
);

const PLANS = [
  {
    tag: "Tier 01",
    name: "Trial",
    price: "0",
    period: "/ first visits",
    tagline: "Two evenings, fully equipped, no commitment.",
    features: [
      "Two full evenings of play",
      "Equipment provided",
      "Introduction by a board member",
      "Optional rules walk-through",
    ],
    cta: "Reserve a visit",
    featured: false,
  },
  {
    tag: "Tier 02 — most chosen",
    name: "Full Member",
    price: "320",
    period: "/ year",
    tagline: "Unlimited play, all tables, all disciplines.",
    features: [
      "Unrestricted access · all opening hours",
      "All ten tables, all three disciplines",
      "Eligibility for league teams",
      "Locker & cue storage",
      "Member rates on tournaments",
      "Guest passes (4 / year)",
    ],
    cta: "Apply for membership",
    featured: true,
  },
  {
    tag: "Tier 03",
    name: "Student & Family",
    price: "180",
    period: "/ year",
    tagline: "For those under 27, in study, or joining as a household.",
    features: [
      "Full member benefits",
      "Reduced annual contribution",
      "Family rate covers two adults + minors",
      "Coaching sessions discounted",
    ],
    cta: "Check eligibility",
    featured: false,
  },
];

const Membership = () => (
  <section className="section membership" id="membership">
    <div className="container">
      <div className="section-head reveal">
        <div>
          <div className="section-eyebrow-row">
            <span className="section-num">04</span>
            <span className="section-divider" />
            <span className="eyebrow">Membership</span>
          </div>
          <h2 className="section-title" style={{ marginTop: 24 }}>
            Three ways to <em>belong</em>.
          </h2>
        </div>
        <p className="section-lede">
          A flat, fair contribution structure. No initiation fee, no per-hour
          billing — just an annual membership and the keys to the room.
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

const GALLERY = [
  { cls: "g1", caption: "Main hall · Saturday evening", img: "https://bcfrankfurt.de/wp-content/uploads/2018/02/atmo1.jpg" },
  { cls: "g2", caption: "Karambol · cadre frame", img: "https://bcfrankfurt.de/wp-content/uploads/2018/02/atmo2.jpg" },
  { cls: "g3", caption: "Brass lamps over the table", img: "https://bcfrankfurt.de/wp-content/uploads/2018/02/atmo4.jpg" },
  { cls: "g4", caption: "Snooker · 12-foot match", img: "https://bcfrankfurt.de/wp-content/uploads/2018/02/atmo5.jpg" },
  { cls: "g5", caption: "The Lounge", img: "https://bcfrankfurt.de/wp-content/uploads/2018/02/03_Raum.jpg" },
  { cls: "g6", caption: "Pool Bundesliga", img: "https://bcfrankfurt.de/wp-content/uploads/2018/02/kugeln2_s.jpg" },
  { cls: "g7", caption: "Karambol training", img: "https://bcfrankfurt.de/wp-content/uploads/2018/02/05_Karambolage.jpg" },
];

const Gallery = () => (
  <section className="section" id="gallery">
    <div className="container">
      <div className="section-head reveal">
        <div>
          <div className="section-eyebrow-row">
            <span className="section-num">05</span>
            <span className="section-divider" />
            <span className="eyebrow">Inside the Club</span>
          </div>
          <h2 className="section-title" style={{ marginTop: 24 }}>
            <em>Atmosphere</em><br />in still frames.
          </h2>
        </div>
        <p className="section-lede">
          We let the light, the wood and the felt do the talking.
          Photography by club member Andreas Becker.
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

const Contact = () => (
  <section className="section contact" id="contact">
    <div className="container">
      <div className="section-head reveal">
        <div>
          <div className="section-eyebrow-row">
            <span className="section-num">06</span>
            <span className="section-divider" />
            <span className="eyebrow">Visit & Contact</span>
          </div>
          <h2 className="section-title" style={{ marginTop: 24 }}>
            Borsigallee 45,<br /><em>Frankfurt</em> am Main.
          </h2>
        </div>
        <p className="section-lede">
          Five minutes from Hessen-Center, four from the U7 stop, parking
          on site. Drop in any evening from 18:00 — or send a note ahead.
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
              Get Directions <ArrowOut />
            </a>
            <a href="https://www.google.com/maps/place/Borsigallee+45+Frankfurt" target="_blank" rel="noopener" className="btn btn-ghost" style={{ padding: "12px 20px", fontSize: 12 }}>
              Open in Maps <ArrowOut />
            </a>
          </div>

          <div className="contact-info-block">
            <h4>Address</h4>
            <p>Borsigallee 45<br />60388 Frankfurt am Main</p>
          </div>

          <div className="contact-info-block">
            <h4>Open Hours</h4>
            <p style={{ fontSize: 22, fontStyle: "italic", color: "var(--brass-500)" }}>
              24 / 7 / 365.
            </p>
            <p style={{ fontSize: 14, color: "var(--bone-300)", fontFamily: "var(--font-sans)", marginTop: 8, lineHeight: 1.6, fontStyle: "normal" }}>
              10 tables. 365 days. ∞ Apfelwein, ∞ coffee, ∞ ways to miss the easy ones.<br />
              The lights stay on. The cloth stays green. Someone is always racking.
            </p>
          </div>

          <div className="contact-info-block">
            <h4>Email</h4>
            <a href="mailto:hello@bcfrankfurt.de">hello@bcfrankfurt.de</a>
          </div>
        </div>

        <div className="contact-form">
          <div className="eyebrow" style={{ marginBottom: 24 }}>Send us a message</div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 400, marginBottom: 8, lineHeight: 1, letterSpacing: "-0.02em" }}>
            Plan your <em style={{ fontStyle: "italic", color: "var(--brass-500)" }}>first visit</em>.
          </h3>
          <p style={{ color: "var(--bone-300)", fontSize: 14, marginBottom: 32 }}>
            We'll get back to you within a working day.
          </p>

          <form onSubmit={(e) => { e.preventDefault(); alert("Thank you. We'll be in touch."); }}>
            <div className="form-row">
              <div className="form-field">
                <label>First name</label>
                <input type="text" defaultValue="" />
              </div>
              <div className="form-field">
                <label>Last name</label>
                <input type="text" defaultValue="" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-field full">
                <label>Email address</label>
                <input type="email" defaultValue="" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-field full">
                <label>Interested in</label>
                <select defaultValue="">
                  <option value="">Select an option</option>
                  <option>Trial membership</option>
                  <option>Full membership</option>
                  <option>Student / family rate</option>
                  <option>Tournament inquiry</option>
                  <option>Coaching</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-field full">
                <label>Message</label>
                <textarea defaultValue=""></textarea>
              </div>
            </div>
            <button type="submit" className="btn btn-brass" style={{ width: "100%", justifyContent: "space-between", marginTop: 8 }}>
              Send message <Arrow />
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-brand">
          <h3>Billard Club<br /><em>Frankfurt</em> 1912 e.V.</h3>
          <p>Frankfurt's home of Karambol, Pool and Snooker since 1912.</p>
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
          <h5>The Club</h5>
          <ul>
            <li><a href="#about">History</a></li>
            <li><a href="#disciplines">Disciplines</a></li>
            <li><a href="#experience">Facilities</a></li>
            <li><a href="#">Board & Statutes</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Get Involved</h5>
          <ul>
            <li><a href="#membership">Membership</a></li>
            <li><a href="#">Trial visit</a></li>
            <li><a href="#">League teams</a></li>
            <li><a href="#">Junior programme</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Visit</h5>
          <ul>
            <li><a href="#contact">Borsigallee 45</a></li>
            <li><a href="#contact">24/7 Open</a></li>
            <li><a href="calendar.html">Calendar</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#">Imprint · Datenschutz</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 1912 — 2026 · Billard Club Frankfurt e.V.</span>
        <span>Designed in Frankfurt · Felt by Simonis</span>
      </div>
    </div>
  </footer>
);

Object.assign(window, {
  Nav, Hero, Marquee, About, Disciplines, Experience, Membership, Gallery, Contact, Footer, LangPicker,
});
