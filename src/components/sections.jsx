/* Sections — broken down for maintainability */

// Translation context
const TranslationContext = React.createContext({ lang: "EN", t: (key) => key, setLang: () => {} });
window.TranslationContext = TranslationContext;

const TRANSLATIONS = {
  EN: {
    // Nav
    "nav.club": "Club",
    "nav.disciplines": "Disciplines",
    "nav.experience": "Experience",
    "nav.membership": "Membership",
    "nav.gallery": "Gallery",
    "nav.games": "Games",
    "nav.visit": "Visit",
    "nav.becomeMember": "Become a Member",

    // Hero
    "hero.eyebrow": "Est. 1912 — Frankfurt am Main",
    "hero.title": "Frankfurt's home<br />of <em>Billard</em><br />since 1912.",
    "hero.subtitle": "Karambol. Pool. Snooker. A century of tradition, competition and community — under one roof on the eastern edge of the city.",
    "hero.becomeMember": "Become a Member",
    "hero.visitClub": "Visit the Club",

    // About
    "about.num": "01",
    "about.eyebrow": "Founded 1912",
    "about.title": "More than a<br /><em>century</em> of play.",
    "about.p1": "BC Frankfurt is a working clubhouse — not a museum. Match-grade tables are in daily use, not roped off. The brass lamps over the carom tables date to 1968, refurbished twice but never replaced.",
    "about.p2": "Founded as Billard Club Frankfurt 1912 e.V., we're one of the oldest dedicated billiard clubs in Germany. Members have ranged from city councillors to shift workers, united by the game.",
    "about.p3": "We compete in the Pool Bundesliga, the 2. Bundesliga, and the Hessen regional leagues — but the heart of the club is the Tuesday and Thursday open play, where regulars teach newcomers the old way: by example, then by correction.",

    // Disciplines
    "disciplines.num": "02",
    "disciplines.eyebrow": "Three disciplines",
    "disciplines.title": "Karambol,<br />Pool, <em>Snooker</em>.",
    "disciplines.lede": "Few clubs in Germany maintain match-grade equipment for all three cue sports under one roof. We do — and we've been doing it since before most of our competitors existed.",
    "disciplines.karambol.title": "Karambol",
    "disciplines.karambol.subtitle": "The oldest discipline",
    "disciplines.karambol.detail": "Four tables — two large (2.84m), two small (2.10m) — all Müller carom tables with heated slate. We play Libre, Cadre, and 3-cushion. Training on Tuesdays, league matches most Fridays. The club was founded for carom, and it remains the first discipline taught to new members.",
    "disciplines.pool.title": "Pool",
    "disciplines.pool.subtitle": "Bundesliga standard",
    "disciplines.pool.detail": "Four Brunswick Gold Crown tables kept to tournament specification. 8-Ball, 9-Ball, 10-Ball, 14.1 Continuous — we play them all. BCF I competes in the Pool Bundesliga, BCF II in the 2. Bundesliga Süd. Home matches draw 60+ spectators. The tables are re-clothed every July with Simonis 860.",
    "disciplines.snooker.title": "Snooker",
    "disciplines.snooker.subtitle": "Full-size championship tables",
    "disciplines.snooker.detail": "Two full-size 12-foot snooker tables, kept under match-grade conditions. We host the Hessen Snooker Cup every spring and run a development programme for juniors. Coaching available by appointment with our certified coaches.",

    // Experience
    "experience.num": "03",
    "experience.eyebrow": "The Clubhouse",
    "experience.title": "What to expect<br />on your <em>first visit</em>.",
    "experience.tables.title": "Match-grade tables",
    "experience.tables.desc": "Two large carom, two small carom, four 9-foot pool, two 12-foot snooker.",
    "experience.cloth.eyebrow": "Annually renewed",
    "experience.cloth.title": "Tournament cloth, every <em>summer</em>.",
    "experience.cloth.desc": "Every July we close for one week and re-cloth all ten tables with Simonis 860 / 300 Rapide — the same cloth used at world championship play.",
    "experience.lounge.title": "The Lounge",
    "experience.lounge.desc": "Leather, low light, and a dedicated space for spectating — or for the conversation between frames.",
    "experience.snacks.title": "Bar & Kitchen",
    "experience.snacks.desc": "Cold drinks, decent coffee, and a small menu of snacks — Apfelwein on Fridays, by tradition.",
    "experience.trial.eyebrow": "First visit free",
    "experience.trial.title": "Trial Membership",
    "experience.trial.desc": "Two evenings on us. Bring a friend. We'll lend you a cue.",
    "experience.trial.reserve": "Reserve",

    // Membership
    "membership.num": "04",
    "membership.eyebrow": "Join the Club",
    "membership.title": "Membership<br /><em>tiers</em>.",
    "membership.trial.tag": "Tier 01",
    "membership.trial.name": "Trial",
    "membership.trial.price": "Free",
    "membership.trial.feat1": "Two complimentary evenings",
    "membership.trial.feat2": "All tables + equipment",
    "membership.trial.feat3": "Introduction to house rules",
    "membership.trial.feat4": "No commitment required",
    "membership.trial.cta": "Book Trial",

    "membership.social.tag": "Tier 02",
    "membership.social.name": "Social",
    "membership.social.price": "€18",
    "membership.social.period": "per month",
    "membership.social.feat1": "Unlimited weekday access (Mon–Fri)",
    "membership.social.feat2": "All disciplines + tables",
    "membership.social.feat3": "Member lounge + bar access",
    "membership.social.feat4": "Guest privileges (2/month)",
    "membership.social.cta": "Join as Social",

    "membership.full.tag": "Tier 03",
    "membership.full.name": "Full Member",
    "membership.full.price": "€32",
    "membership.full.period": "per month",
    "membership.full.feat1": "Unlimited access (7 days/week)",
    "membership.full.feat2": "Voting rights at general assembly",
    "membership.full.feat3": "League team eligibility",
    "membership.full.feat4": "Reserved table booking",
    "membership.full.cta": "Become Full Member",

    // Gallery
    "gallery.num": "05",
    "gallery.eyebrow": "Inside the Club",
    "gallery.title": "<em>Atmosphere</em><br />in still frames.",

    // Contact
    "contact.num": "06",
    "contact.eyebrow": "Location",
    "contact.title": "Visit <em>us</em>.",
    "contact.address.title": "Address",
    "contact.address.line1": "BC Frankfurt 1912 e.V.",
    "contact.address.line2": "Borsigallee 45",
    "contact.address.line3": "60388 Frankfurt am Main",
    "contact.hours.title": "Opening Hours",
    "contact.hours.weekdays": "Tue–Fri",
    "contact.hours.weekdaysTimes": "18:00–23:00",
    "contact.hours.weekend": "Sat–Sun",
    "contact.hours.weekendTimes": "14:00–23:00",
    "contact.hours.closed": "Closed Mondays",
    "contact.contact.title": "Contact",

    // Footer
    "footer.about.title": "The Club",
    "footer.about.line1": "Frankfurt's oldest billiard club.",
    "footer.about.line2": "Founded 1912. Pool Bundesliga,",
    "footer.about.line3": "Karambol, Snooker.",
    "footer.info.title": "Quick Links",
    "footer.info.membership": "Become a member",
    "footer.info.visit": "Visit the club",
    "footer.info.games": "Games & Results",
    "footer.info.contact": "Contact & Hours",
    "footer.legal.title": "Legal",
    "footer.legal.imprint": "Imprint",
    "footer.legal.privacy": "Privacy Policy",
    "footer.legal.terms": "Terms of Use",
    "footer.copyright": "BC Frankfurt 1912 e.V. All rights reserved.",
  },
  DE: {
    // Nav
    "nav.club": "Verein",
    "nav.disciplines": "Disziplinen",
    "nav.experience": "Clubhaus",
    "nav.membership": "Mitgliedschaft",
    "nav.gallery": "Galerie",
    "nav.games": "Spiele",
    "nav.visit": "Besuchen",
    "nav.becomeMember": "Mitglied werden",

    // Hero
    "hero.eyebrow": "Gegr. 1912 — Frankfurt am Main",
    "hero.title": "Frankfurts Heimat<br />des <em>Billards</em><br />seit 1912.",
    "hero.subtitle": "Karambol. Pool. Snooker. Ein Jahrhundert Tradition, Wettkampf und Gemeinschaft — unter einem Dach am östlichen Stadtrand.",
    "hero.becomeMember": "Mitglied werden",
    "hero.visitClub": "Club besuchen",

    // About
    "about.num": "01",
    "about.eyebrow": "Gegründet 1912",
    "about.title": "Mehr als ein<br /><em>Jahrhundert</em> Spiel.",
    "about.p1": "Der BC Frankfurt ist ein aktives Vereinshaus — kein Museum. Wettkampftische werden täglich bespielt, nicht abgesperrt. Die Messinglampen über den Karambol-Tischen stammen aus dem Jahr 1968, zweimal restauriert, aber nie ersetzt.",
    "about.p2": "Gegründet als Billard Club Frankfurt 1912 e.V., sind wir einer der ältesten Billardvereine Deutschlands. Unsere Mitglieder reichten von Stadträten bis zu Schichtarbeitern, vereint durch das Spiel.",
    "about.p3": "Wir spielen in der Pool Bundesliga, der 2. Bundesliga und den hessischen Regionalligen — aber das Herzstück des Vereins ist das offene Spiel dienstags und donnerstags, wo Stammgäste Neulingen auf die alte Art beibringen: durch Vorbild, dann durch Korrektur.",

    // Disciplines
    "disciplines.num": "02",
    "disciplines.eyebrow": "Drei Disziplinen",
    "disciplines.title": "Karambol,<br />Pool, <em>Snooker</em>.",
    "disciplines.lede": "Nur wenige Vereine in Deutschland unterhalten wettkampftaugliche Ausrüstung für alle drei Billardarten unter einem Dach. Wir tun es — und das schon seit vor den meisten unserer Konkurrenten.",
    "disciplines.karambol.title": "Karambol",
    "disciplines.karambol.subtitle": "Die älteste Disziplin",
    "disciplines.karambol.detail": "Vier Tische — zwei große (2,84m), zwei kleine (2,10m) — alles Müller-Karambol-Tische mit beheizter Schieferplatte. Wir spielen Libre, Cadre und Dreiband. Training dienstags, Ligaspiele meist freitags. Der Verein wurde für Karambol gegründet und es bleibt die erste Disziplin, die neuen Mitgliedern beigebracht wird.",
    "disciplines.pool.title": "Pool",
    "disciplines.pool.subtitle": "Bundesliga-Standard",
    "disciplines.pool.detail": "Vier Brunswick Gold Crown Tische nach Turnierstandard. 8-Ball, 9-Ball, 10-Ball, 14.1 Endlos — wir spielen alles. BCF I spielt in der Pool Bundesliga, BCF II in der 2. Bundesliga Süd. Heimspiele ziehen über 60 Zuschauer an. Die Tische werden jeden Juli mit Simonis 860 neu bezogen.",
    "disciplines.snooker.title": "Snooker",
    "disciplines.snooker.subtitle": "Meisterschaftstische in voller Größe",
    "disciplines.snooker.detail": "Zwei 12-Fuß-Snookertische in voller Größe, gehalten unter Wettkampfbedingungen. Wir veranstalten jeden Frühling den Hessen Snooker Cup und führen ein Entwicklungsprogramm für Junioren durch. Training nach Vereinbarung mit unseren zertifizierten Trainern.",

    // Experience
    "experience.num": "03",
    "experience.eyebrow": "Das Clubhaus",
    "experience.title": "Was Sie bei Ihrem<br /><em>ersten Besuch</em> erwartet.",
    "experience.tables.title": "Wettkampftische",
    "experience.tables.desc": "Zwei große Karambol, zwei kleine Karambol, vier 9-Fuß Pool, zwei 12-Fuß Snooker.",
    "experience.cloth.eyebrow": "Jährlich erneuert",
    "experience.cloth.title": "Turniertuch, jeden <em>Sommer</em>.",
    "experience.cloth.desc": "Jeden Juli schließen wir für eine Woche und beziehen alle zehn Tische neu mit Simonis 860 / 300 Rapide — dasselbe Tuch, das bei Weltmeisterschaften verwendet wird.",
    "experience.lounge.title": "Die Lounge",
    "experience.lounge.desc": "Leder, gedämpftes Licht und ein eigener Raum zum Zuschauen — oder für Gespräche zwischen den Frames.",
    "experience.snacks.title": "Bar & Küche",
    "experience.snacks.desc": "Kalte Getränke, guter Kaffee und eine kleine Speisekarte — Apfelwein freitags, aus Tradition.",
    "experience.trial.eyebrow": "Erster Besuch kostenlos",
    "experience.trial.title": "Probemitgliedschaft",
    "experience.trial.desc": "Zwei Abende auf unsere Kosten. Bringen Sie einen Freund mit. Wir leihen Ihnen ein Queue.",
    "experience.trial.reserve": "Reservieren",

    // Membership
    "membership.num": "04",
    "membership.eyebrow": "Dem Verein beitreten",
    "membership.title": "Mitgliedschafts<em>stufen</em>.",
    "membership.trial.tag": "Stufe 01",
    "membership.trial.name": "Probe",
    "membership.trial.price": "Kostenlos",
    "membership.trial.feat1": "Zwei kostenlose Abende",
    "membership.trial.feat2": "Alle Tische + Ausrüstung",
    "membership.trial.feat3": "Einführung in die Hausregeln",
    "membership.trial.feat4": "Keine Verpflichtung erforderlich",
    "membership.trial.cta": "Probe buchen",

    "membership.social.tag": "Stufe 02",
    "membership.social.name": "Sozial",
    "membership.social.price": "18€",
    "membership.social.period": "pro Monat",
    "membership.social.feat1": "Unbegrenzter Zugang wochentags (Mo–Fr)",
    "membership.social.feat2": "Alle Disziplinen + Tische",
    "membership.social.feat3": "Mitglieder-Lounge + Bar-Zugang",
    "membership.social.feat4": "Gästeprivilegien (2/Monat)",
    "membership.social.cta": "Als Sozial beitreten",

    "membership.full.tag": "Stufe 03",
    "membership.full.name": "Vollmitglied",
    "membership.full.price": "32€",
    "membership.full.period": "pro Monat",
    "membership.full.feat1": "Unbegrenzter Zugang (7 Tage/Woche)",
    "membership.full.feat2": "Stimmrecht in der Mitgliederversammlung",
    "membership.full.feat3": "Ligateam-Berechtigung",
    "membership.full.feat4": "Reservierte Tischbuchung",
    "membership.full.cta": "Vollmitglied werden",

    // Gallery
    "gallery.num": "05",
    "gallery.eyebrow": "Im Verein",
    "gallery.title": "<em>Atmosphäre</em><br />in Standbildern.",

    // Contact
    "contact.num": "06",
    "contact.eyebrow": "Standort",
    "contact.title": "Besuchen Sie <em>uns</em>.",
    "contact.address.title": "Adresse",
    "contact.address.line1": "BC Frankfurt 1912 e.V.",
    "contact.address.line2": "Borsigallee 45",
    "contact.address.line3": "60388 Frankfurt am Main",
    "contact.hours.title": "Öffnungszeiten",
    "contact.hours.weekdays": "Di–Fr",
    "contact.hours.weekdaysTimes": "18:00–23:00",
    "contact.hours.weekend": "Sa–So",
    "contact.hours.weekendTimes": "14:00–23:00",
    "contact.hours.closed": "Montags geschlossen",
    "contact.contact.title": "Kontakt",

    // Footer
    "footer.about.title": "Der Verein",
    "footer.about.line1": "Frankfurts ältester Billardverein.",
    "footer.about.line2": "Gegründet 1912. Pool Bundesliga,",
    "footer.about.line3": "Karambol, Snooker.",
    "footer.info.title": "Schnellzugriff",
    "footer.info.membership": "Mitglied werden",
    "footer.info.visit": "Verein besuchen",
    "footer.info.games": "Spiele & Ergebnisse",
    "footer.info.contact": "Kontakt & Öffnungszeiten",
    "footer.legal.title": "Rechtliches",
    "footer.legal.imprint": "Impressum",
    "footer.legal.privacy": "Datenschutz",
    "footer.legal.terms": "Nutzungsbedingungen",
    "footer.copyright": "BC Frankfurt 1912 e.V. Alle Rechte vorbehalten.",
  }
};

window.TRANSLATIONS = TRANSLATIONS;

const useTranslation = () => React.useContext(TranslationContext);

const Nav = () => {
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
        <li><a href="assets/calendar.html">{t("nav.games")}</a></li>
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

const LangPicker = () => {
  const { lang, setLang } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const langs = ["EN", "DE"];
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
          padding: 6, minWidth: 90,
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

const Marquee = () => {
  const { lang } = useTranslation();
  const words = lang === "DE"
    ? ["Pool", "Leidenschaft", "Snooker", "Training", "Karambol", "Gemeinschaft", "Liga", "Tradition", "Förderung"]
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

const About = () => {
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

const DISCIPLINES = [
  {
    num: "01",
    name: "Pool",
    nameItalic: "Pool",
    desc: "Fast, expressive, social. Open daily for members and guests alike.",
    tables: "4 Tables",
    size: "9-foot",
    detail: "Our four 9-foot tournament tables host everything from casual evenings to Bundesliga 2 matches. 8-Ball, 9-Ball, 10-Ball, Straight Pool — all played here, all night long. Open table on most weekdays; matchroom hire by reservation.",
    tags: ["8-Ball", "9-Ball", "10-Ball", "Straight Pool", "Open Daily"],
    image: "https://bcfrankfurt.de/wp-content/uploads/2018/02/kugeln_s.jpg",
  },
  {
    num: "02",
    name: "Karambol",
    nameItalic: "Karambol",
    desc: "Three balls, no pockets, pure geometry. The historical heart of the club.",
    tables: "4 Tables",
    size: "2 big · 2 small",
    detail: "From classic three-cushion to free game and cadre — Karambol is the discipline that built this club. Played on heated tables without pockets, it rewards angle, spin and patience over power. Our four tables — two large match-size, two smaller for training — see Bundesliga practice every Tuesday and Thursday.",
    tags: ["Three-Cushion", "Cadre", "Free Game", "Heated Tables"],
    image: "https://bcfrankfurt.de/wp-content/uploads/2018/02/Karambolage.jpg",
  },
  {
    num: "03",
    name: "Snooker",
    nameItalic: "Snooker",
    desc: "Twelve feet of felt. The longest, most cinematic game we offer.",
    tables: "2 Tables",
    size: "12-foot",
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
          <p style={{ marginBottom: 32 }}>Two large carom, two small carom, four 9-foot pool, two 12-foot snooker.</p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "8px",
            marginTop: "auto",
          }}>
            {/* Row 1 */}
            <div style={{
              background: "var(--brass-700)",
              border: "1px solid var(--brass-500)",
              borderRadius: "6px",
              padding: "16px 8px",
              textAlign: "center",
              fontSize: "10px",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--bone-100)",
              aspectRatio: "1.7/1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>Big Karambol</div>
            <div style={{
              background: "var(--felt-700)",
              border: "1px solid var(--felt-500)",
              borderRadius: "6px",
              padding: "16px 8px",
              textAlign: "center",
              fontSize: "10px",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--bone-100)",
              aspectRatio: "1.7/1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>Pool</div>
            <div style={{
              background: "var(--felt-700)",
              border: "1px solid var(--felt-500)",
              borderRadius: "6px",
              padding: "16px 8px",
              textAlign: "center",
              fontSize: "10px",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--bone-100)",
              aspectRatio: "1.7/1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>Pool</div>

            {/* Row 2 */}
            <div style={{
              background: "var(--brass-700)",
              border: "1px solid var(--brass-500)",
              borderRadius: "6px",
              padding: "16px 8px",
              textAlign: "center",
              fontSize: "10px",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--bone-100)",
              aspectRatio: "1.7/1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>Big Karambol</div>
            <div style={{
              gridColumn: "span 2",
              background: "oklch(0.35 0.08 145)",
              border: "1px solid oklch(0.45 0.10 145)",
              borderRadius: "6px",
              padding: "16px 8px",
              textAlign: "center",
              fontSize: "10px",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--bone-100)",
              aspectRatio: "3.5/1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>Snooker 12ft</div>

            {/* Row 3 */}
            <div style={{
              background: "var(--brass-900)",
              border: "1px solid var(--brass-700)",
              borderRadius: "6px",
              padding: "16px 8px",
              textAlign: "center",
              fontSize: "10px",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--bone-100)",
              aspectRatio: "1.7/1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>Small Karambol</div>
            <div style={{
              background: "var(--brass-900)",
              border: "1px solid var(--brass-700)",
              borderRadius: "6px",
              padding: "16px 8px",
              textAlign: "center",
              fontSize: "10px",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--bone-100)",
              aspectRatio: "1.7/1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>Small Karambol</div>
            <div style={{
              background: "var(--felt-700)",
              border: "1px solid var(--felt-500)",
              borderRadius: "6px",
              padding: "16px 8px",
              textAlign: "center",
              fontSize: "10px",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--bone-100)",
              aspectRatio: "1.7/1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>Pool</div>

            {/* Row 4 */}
            <div style={{
              gridColumn: "span 2",
              background: "oklch(0.35 0.08 145)",
              border: "1px solid oklch(0.45 0.10 145)",
              borderRadius: "6px",
              padding: "16px 8px",
              textAlign: "center",
              fontSize: "10px",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--bone-100)",
              aspectRatio: "3.5/1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>Snooker 12ft</div>
            <div style={{
              background: "var(--felt-700)",
              border: "1px solid var(--felt-500)",
              borderRadius: "6px",
              padding: "16px 8px",
              textAlign: "center",
              fontSize: "10px",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--bone-100)",
              aspectRatio: "1.7/1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>Pool</div>
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
                Professional training available for Karambol, Pool, and Snooker.
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
    name: "Student",
    price: "20",
    period: "/ month",
    tagline: "Discounted rate for students with valid ID.",
    features: [
      "Valid student ID required",
      "Unlimited access during opening hours",
      "All ten tables, all three disciplines",
      "Eligibility for league teams",
      "Member rates on tournaments",
    ],
    cta: "Apply as student",
    featured: false,
  },
  {
    tag: "Tier 02 — recommended",
    name: "Regular",
    price: "40",
    period: "/ month",
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
    name: "Family",
    price: "40",
    period: "/ month",
    tagline: "Register any family member under one membership.",
    features: [
      "Same price as regular membership",
      "Register spouse and children",
      "Family members share access",
      "All regular member benefits",
      "Additional guest passes (6 / year)",
    ],
    cta: "Register family",
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

const News = () => (
  <section className="section" id="news" style={{ background: "var(--ink-050)" }}>
    <div className="container">
      <div className="section-head reveal">
        <div>
          <div className="section-eyebrow-row">
            <span className="section-num">06</span>
            <span className="section-divider" />
            <span className="eyebrow">News & Updates</span>
          </div>
          <h2 className="section-title" style={{ marginTop: 24 }}>
            Tournaments,<br /><em>promotions</em> & events.
          </h2>
        </div>
        <p className="section-lede">
          Stay up to date with league results, upcoming tournaments, and club achievements.
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

const Contact = () => (
  <section className="section contact" id="contact">
    <div className="container">
      <div className="section-head reveal">
        <div>
          <div className="section-eyebrow-row">
            <span className="section-num">07</span>
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
            <h4>Opening Hours</h4>
            <p style={{ fontSize: 14, color: "var(--bone-200)", fontFamily: "var(--font-sans)", lineHeight: 1.6 }}>
              Tuesday–Friday: 18:00–23:00<br />
              Saturday–Sunday: 14:00–23:00<br />
              <span style={{ color: "var(--bone-400)", fontStyle: "italic" }}>Closed Mondays</span>
            </p>
          </div>

          <div className="contact-info-block">
            <h4>Contact</h4>
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
          <div className="eyebrow" style={{ marginBottom: 24, color: "var(--brass-500)" }}>Members Only</div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 400, marginBottom: 16, lineHeight: 1.2, letterSpacing: "-0.02em" }}>
            This is a <em style={{ fontStyle: "italic", color: "var(--brass-500)" }}>private club</em>,<br />
            not a public bar.
          </h3>
          <p style={{ color: "var(--bone-300)", fontSize: 15, marginBottom: 24, lineHeight: 1.6 }}>
            BC Frankfurt 1912 is a registered members-only association. We do not operate
            as a commercial establishment or walk-in venue. Access to our facilities is
            restricted to active members and their guests.
          </p>
          <p style={{ color: "var(--bone-300)", fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
            If you're interested in becoming a member, please review our membership tiers
            and contact us via email to begin the application process.
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
            }}>Membership Inquiries</h5>
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
      </div>
    </div>
  </footer>
);

Object.assign(window, {
  Nav, Hero, Marquee, About, Disciplines, Experience, Membership, Gallery, Contact, Footer, LangPicker,
});
