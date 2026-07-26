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
    "nav.tournaments": "Tournaments",
    "nav.games": "Games",
    "nav.visit": "Contact",
    "nav.becomeMember": "Become a Member",

    // Hero
    "hero.eyebrow": "Est. 1912 · Frankfurt am Main",
    "hero.title": "Frankfurt's home<br />of <em>Billard</em><br />since 1912.",
    "hero.subtitle": "Karambol. Pool. Snooker. A century of tradition, competition and community, all under one roof on the eastern edge of the city.",
    "hero.becomeMember": "Become a Member",
    "hero.visitClub": "Visit the Club",

    // About
    "about.num": "01",
    "about.eyebrow": "Founded 1912",
    "about.title": "More than a<br /><em>century</em> of play.",
    "about.p1": "BC Frankfurt is a working clubhouse, not a museum. Match-grade tables are in daily use, not roped off. The brass lamps over the carom tables date to 1968, refurbished twice but never replaced.",
    "about.p2": "Founded as Billard Club Frankfurt 1912 e.V., we're one of the oldest dedicated billiard clubs in Germany. Members have ranged from city councillors to shift workers, united by the game.",
    "about.p3": "We compete in the Pool Bundesliga, the 2. Bundesliga, and the Hessen regional leagues, but the heart of the club is the Tuesday and Thursday open play, where regulars teach newcomers the old way: by example, then by correction.",

    // Disciplines
    "disciplines.num": "02",
    "disciplines.eyebrow": "Three disciplines",
    "disciplines.title": "Karambol,<br />Pool, <em>Snooker</em>.",
    "disciplines.lede": "Few clubs in Germany maintain match-grade equipment for all three cue sports under one roof. We do, and we've been doing it since before most of our competitors existed.",
    "disciplines.pickGame": "Pick your <em>game</em>.",
    "disciplines.fewClubs": "Few clubs in Germany maintain match-grade equipment for all three major billiard disciplines. We do, and we play them all, year-round.",
    "disciplines.aboutGame": "About the game",

    // Discipline details
    "disc.pool.desc": "Fast, expressive, social. Open daily for members and guests alike.",
    "disc.pool.tables": "4 Tables",
    "disc.pool.size": "9-foot",
    "disc.pool.detail": "Our four 9-foot tournament tables host everything from casual evenings to Bundesliga 2 matches. 8-Ball, 9-Ball, 10-Ball, Straight Pool, all played here, all night long. Open table on most weekdays; matchroom hire by reservation.",
    "disc.pool.tags": "8-Ball,9-Ball,10-Ball,Straight Pool,Open Daily",
    "disc.karambol.desc": "Three balls, no pockets, pure geometry. The historical heart of the club.",
    "disc.karambol.tables": "4 Tables",
    "disc.karambol.size": "2 big · 2 small",
    "disc.karambol.detail": "From classic three-cushion to free game and cadre, Karambol is the discipline that built this club. Played on heated tables without pockets, it rewards angle, spin and patience over power. Our four tables (two large match-size, two smaller for training) see Bundesliga practice every Tuesday and Thursday.",
    "disc.karambol.tags": "Three-Cushion,Cadre,Free Game,Heated Tables",
    "disc.snooker.desc": "Twelve feet of felt. The longest, most cinematic game we offer.",
    "disc.snooker.tables": "2 Tables",
    "disc.snooker.size": "12-foot",
    "disc.snooker.detail": "Two full-size 12-foot snooker tables, kept under match-grade conditions. We host the Hessen Snooker Cup every spring and run a development programme for juniors. Coaching available by appointment with our certified coaches.",
    "disc.snooker.tags": "12-Foot Match,Hessen Cup,Junior Programme,Coaching",
    "disc.tables": "Tables",
    "disc.size": "Size",
    "disciplines.karambol.title": "Karambol",
    "disciplines.karambol.subtitle": "The oldest discipline",
    "disciplines.karambol.detail": "Four tables (two large at 2.84m, two small at 2.10m), all Müller carom tables with heated slate. We play Libre, Cadre, and 3-cushion. Training on Tuesdays, league matches most Fridays. The club was founded for carom, and it remains the first discipline taught to new members.",
    "disciplines.pool.title": "Pool",
    "disciplines.pool.subtitle": "Bundesliga standard",
    "disciplines.pool.detail": "Four Brunswick Gold Crown tables kept to tournament specification. 8-Ball, 9-Ball, 10-Ball, 14.1 Continuous, we play them all. BCF I competes in the Pool Bundesliga, BCF II in the 2. Bundesliga Süd. Home matches draw 60+ spectators. The tables are re-clothed every July with Simonis 860.",
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
    "experience.cloth.desc": "Every July we close for one week and re-cloth all ten tables with Simonis 860 / 300 Rapide, the same cloth used at world championship play.",
    "experience.lounge.title": "The Lounge",
    "experience.lounge.desc": "Leather, low light, and a dedicated space for spectating, or for the conversation between frames.",
    "experience.snacks.title": "Bar & Kitchen",
    "experience.snacks.desc": "Cold drinks, decent coffee, and a small menu of snacks. Apfelwein on Fridays, by tradition.",
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

    // Membership plans
    "membership.period": "/ month",
    "membership.student.tag": "Tier 01",
    "membership.student.name": "Student",
    "membership.student.tagline": "Discounted rate for students with valid ID.",
    "membership.student.feat1": "Valid student ID required",
    "membership.student.feat2": "Unlimited access during opening hours",
    "membership.student.feat3": "All ten tables, all three disciplines",
    "membership.student.feat4": "Eligibility for league teams",
    "membership.student.cta": "Apply as student",

    "membership.regular.tag": "Tier 02 · recommended",
    "membership.regular.name": "Regular",
    "membership.regular.tagline": "Unlimited play, all tables, all disciplines.",
    "membership.regular.feat1": "Unrestricted access · all opening hours",
    "membership.regular.feat2": "All ten tables, all three disciplines",
    "membership.regular.feat3": "Eligibility for league teams",
    "membership.regular.feat4": "Locker & cue storage",
    "membership.regular.cta": "Apply for membership",

    "membership.family.tag": "Tier 03",
    "membership.family.name": "Family",
    "membership.family.tagline": "Register any family member under one membership.",
    "membership.family.feat1": "Same price as regular membership",
    "membership.family.feat2": "Register spouse and children",
    "membership.family.feat3": "Family members share access",
    "membership.family.feat4": "All regular member benefits",
    "membership.family.cta": "Register family",

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

    // Additional sections
    "disciplines.pickGame": "Pick your <em>game</em>.",
    "disciplines.fewClubs": "Few clubs in Germany maintain match-grade equipment for all three major billiard disciplines. We do, and we play them all, year-round.",
    "experience.whyJoin": "Why Join",
    "experience.moreThan": "More than <em>a room</em><br />with tables.",
    "experience.workingClubhouse": "A working clubhouse with a lounge, a bar, and the kind of regulars who'll stay for one more frame and remember your name when you come back.",
    "experience.cloth.short": "Every July we re-cloth all ten tables with Simonis 860 / 300 Rapide, world championship standard.",
    "membership.threeWays": "Three ways to <em>belong</em>.",
    "membership.flatFair": "A flat, fair contribution structure. No initiation fee, no per-hour billing, just an annual membership and the keys to the room.",
    "gallery.letLight": "We let the light, the wood and the felt do the talking. Photography by club member Andreas Becker.",
    "news.num": "06",
    "news.eyebrow": "News & Updates",
    "news.title": "Tournaments,<br /><em>promotions</em> & events.",
    "news.lede": "Stay up to date with league results, upcoming tournaments, and club achievements.",
    "tournaments.num": "07",
    "tournaments.eyebrow": "Competition",
    "tournaments.title": "Upcoming<br /><em>tournaments</em>.",
    "tournaments.lede": "Pulled live from our CueScore page and updated automatically as new events are announced.",
    "tournaments.pool": "Pool",
    "tournaments.karambol": "Karambol",
    "tournaments.snooker": "Snooker",
    "tournaments.register": "View on CueScore",
    "tournaments.details": "Details",
    "tournaments.loading": "Loading tournaments from CueScore…",
    "tournaments.empty": "No upcoming tournaments listed right now. Check back soon.",
    "tournaments.allOnCuescore": "See all tournaments on CueScore",
    "tournaments.tbd": "Date to be confirmed",
    "tournaments.past": "Past",
    "tournaments.viewResults": "View results",
    "tournaments.prev": "Previous",
    "tournaments.next": "Next",
    "tournaments.page": "Page",
    "contact.num": "08",
    "contact.visitContact": "Contact",
    "contact.borsigallee": "Borsigallee 45,<br /><em>Frankfurt</em> am Main.",
    "contact.fiveMinutes": "Five minutes from Hessen-Center, four from the U7 stop, parking on site. Drop in any evening from 18:00, or send a note ahead.",
    "contact.getDirections": "Get Directions",
    "contact.openInMaps": "Open in Maps",
    "contact.membersOnly": "Members Only",
    "contact.privateClub": "This is a <em>private club</em>,<br />not a public bar.",
    "contact.privateClubDesc1": "BC Frankfurt 1912 is a registered members-only association. We do not operate as a commercial establishment or walk-in venue. Access to our facilities is restricted to active members and their guests.",
    "contact.privateClubDesc2": "If you're interested in becoming a member, please review our membership tiers and contact us via email to begin the application process.",
    "contact.membershipInquiries": "Membership Inquiries",
    "footer.getInvolved": "Get Involved",
    "footer.visit": "Visit",
  },
  DE: {
    // Nav
    "nav.club": "Verein",
    "nav.disciplines": "Disziplinen",
    "nav.experience": "Clubhaus",
    "nav.membership": "Mitgliedschaft",
    "nav.gallery": "Galerie",
    "nav.tournaments": "Turniere",
    "nav.games": "Spiele",
    "nav.visit": "Kontakt",
    "nav.becomeMember": "Mitglied werden",

    // Hero
    "hero.eyebrow": "Gegr. 1912 · Frankfurt am Main",
    "hero.title": "Frankfurts Heimat<br />des <em>Billards</em><br />seit 1912.",
    "hero.subtitle": "Karambol. Pool. Snooker. Ein Jahrhundert Tradition, Wettkampf und Gemeinschaft, unter einem Dach am östlichen Stadtrand.",
    "hero.becomeMember": "Mitglied werden",
    "hero.visitClub": "Club besuchen",

    // About
    "about.num": "01",
    "about.eyebrow": "Gegründet 1912",
    "about.title": "Mehr als ein<br /><em>Jahrhundert</em> Spiel.",
    "about.p1": "Der BC Frankfurt ist ein aktives Vereinshaus, kein Museum. Wettkampftische werden täglich bespielt, nicht abgesperrt. Die Messinglampen über den Karambol-Tischen stammen aus dem Jahr 1968, zweimal restauriert, aber nie ersetzt.",
    "about.p2": "Gegründet als Billard Club Frankfurt 1912 e.V., sind wir einer der ältesten Billardvereine Deutschlands. Unsere Mitglieder reichten von Stadträten bis zu Schichtarbeitern, vereint durch das Spiel.",
    "about.p3": "Wir spielen in der Pool Bundesliga, der 2. Bundesliga und den hessischen Regionalligen, aber das Herzstück des Vereins ist das offene Spiel dienstags und donnerstags, wo Stammgäste Neulingen auf die alte Art beibringen: durch Vorbild, dann durch Korrektur.",

    // Disciplines
    "disciplines.num": "02",
    "disciplines.eyebrow": "Drei Disziplinen",
    "disciplines.title": "Karambol,<br />Pool, <em>Snooker</em>.",
    "disciplines.lede": "Nur wenige Vereine in Deutschland unterhalten wettkampftaugliche Ausrüstung für alle drei Billardarten unter einem Dach. Wir tun es, und das schon seit vor den meisten unserer Konkurrenten.",
    "disciplines.pickGame": "Wähle dein <em>Spiel</em>.",
    "disciplines.fewClubs": "Nur wenige Vereine in Deutschland unterhalten wettkampftaugliche Ausrüstung für alle drei Billardarten unter einem Dach. Wir tun es, das ganze Jahr über.",
    "disciplines.aboutGame": "Über das Spiel",
    "disciplines.karambol.title": "Karambol",
    "disciplines.karambol.subtitle": "Die älteste Disziplin",
    "disciplines.karambol.detail": "Vier Tische, zwei große (2,84m) und zwei kleine (2,10m), alles Müller-Karambol-Tische mit beheizter Schieferplatte. Wir spielen Libre, Cadre und Dreiband. Training dienstags, Ligaspiele meist freitags. Der Verein wurde für Karambol gegründet und es bleibt die erste Disziplin, die neuen Mitgliedern beigebracht wird.",
    "disciplines.pool.title": "Pool",
    "disciplines.pool.subtitle": "Bundesliga-Standard",
    "disciplines.pool.detail": "Vier Brunswick Gold Crown Tische nach Turnierstandard. 8-Ball, 9-Ball, 10-Ball, 14.1 Endlos, wir spielen alles. BCF I spielt in der Pool Bundesliga, BCF II in der 2. Bundesliga Süd. Heimspiele ziehen über 60 Zuschauer an. Die Tische werden jeden Juli mit Simonis 860 neu bezogen.",
    "disciplines.snooker.title": "Snooker",
    "disciplines.snooker.subtitle": "Meisterschaftstische in voller Größe",
    "disciplines.snooker.detail": "Zwei 12-Fuß-Snookertische in voller Größe, gehalten unter Wettkampfbedingungen. Wir veranstalten jeden Frühling den Hessen Snooker Cup und führen ein Entwicklungsprogramm für Junioren durch. Training nach Vereinbarung mit unseren zertifizierten Trainern.",

    // Discipline details
    "disc.pool.desc": "Schnell, ausdrucksstark, gesellig. Täglich geöffnet für Mitglieder und Gäste.",
    "disc.pool.tables": "4 Tische",
    "disc.pool.size": "9-Fuß",
    "disc.pool.detail": "Unsere vier 9-Fuß-Turniertische bieten alles von gemütlichen Abenden bis zu Bundesliga-2-Spielen. 8-Ball, 9-Ball, 10-Ball, 14.1 Endlos, alles wird hier gespielt, die ganze Nacht. Offener Tisch an den meisten Wochentagen; Spielraum-Miete auf Reservierung.",
    "disc.pool.tags": "8-Ball,9-Ball,10-Ball,14.1 Endlos,Täglich geöffnet",
    "disc.karambol.desc": "Drei Kugeln, keine Taschen, reine Geometrie. Das historische Herz des Vereins.",
    "disc.karambol.tables": "4 Tische",
    "disc.karambol.size": "2 groß · 2 klein",
    "disc.karambol.detail": "Vom klassischen Dreiband bis zu Freiem Spiel und Cadre, Karambol ist die Disziplin, die diesen Verein aufgebaut hat. Gespielt auf beheizten Tischen ohne Taschen, belohnt es Winkel, Effet und Geduld statt Kraft. Unsere vier Tische, zwei große Wettkampf-Tische und zwei kleinere für Training, sehen jeden Dienstag und Donnerstag Bundesliga-Training.",
    "disc.karambol.tags": "Dreiband,Cadre,Freies Spiel,Beheizte Tische",
    "disc.snooker.desc": "Zwölf Fuß Tuch. Das längste, filmreifste Spiel, das wir anbieten.",
    "disc.snooker.tables": "2 Tische",
    "disc.snooker.size": "12-Fuß",
    "disc.snooker.detail": "Zwei 12-Fuß-Snookertische in voller Größe, gehalten unter Wettkampfbedingungen. Wir veranstalten jeden Frühling den Hessen Snooker Cup und führen ein Jugendprogramm durch. Training nach Vereinbarung mit unseren zertifizierten Trainern.",
    "disc.snooker.tags": "12-Fuß-Wettkampf,Hessen Cup,Jugendprogramm,Training",
    "disc.tables": "Tische",
    "disc.size": "Größe",

    // Experience
    "experience.num": "03",
    "experience.eyebrow": "Das Clubhaus",
    "experience.title": "Was Sie bei Ihrem<br /><em>ersten Besuch</em> erwartet.",
    "experience.tables.title": "Wettkampftische",
    "experience.tables.desc": "Zwei große Karambol, zwei kleine Karambol, vier 9-Fuß Pool, zwei 12-Fuß Snooker.",
    "experience.cloth.eyebrow": "Jährlich erneuert",
    "experience.cloth.title": "Turniertuch, jeden <em>Sommer</em>.",
    "experience.cloth.desc": "Jeden Juli schließen wir für eine Woche und beziehen alle zehn Tische neu mit Simonis 860 / 300 Rapide, dasselbe Tuch, das bei Weltmeisterschaften verwendet wird.",
    "experience.lounge.title": "Die Lounge",
    "experience.lounge.desc": "Leder, gedämpftes Licht und ein eigener Raum zum Zuschauen, oder für Gespräche zwischen den Frames.",
    "experience.snacks.title": "Bar & Küche",
    "experience.snacks.desc": "Kalte Getränke, guter Kaffee und eine kleine Speisekarte. Apfelwein freitags, aus Tradition.",
    "experience.trial.eyebrow": "Erster Besuch kostenlos",
    "experience.trial.title": "Probemitgliedschaft",
    "experience.trial.desc": "Zwei Abende auf unsere Kosten. Bringen Sie einen Freund mit. Wir leihen Ihnen ein Queue.",
    "experience.trial.reserve": "Reservieren",

    // Membership
    "membership.num": "04",
    "membership.eyebrow": "Dem Verein beitreten",
    "membership.title": "Mitgliedschafts<em>stufen</em>.",
    "membership.threeWays": "Drei Wege <em>dazuzugehören</em>.",
    "membership.flatFair": "Eine faire, transparente Beitragsstruktur. Keine Aufnahmegebühr, keine Stundenabrechnung, nur eine Mitgliedschaft und Zugang zum Vereinsheim.",

    // Membership plans
    "membership.period": "/ Monat",
    "membership.student.tag": "Stufe 01",
    "membership.student.name": "Student",
    "membership.student.tagline": "Ermäßigter Tarif für Studenten mit gültigem Ausweis.",
    "membership.student.feat1": "Gültiger Studentenausweis erforderlich",
    "membership.student.feat2": "Unbegrenzter Zugang während der Öffnungszeiten",
    "membership.student.feat3": "Alle zehn Tische, alle drei Disziplinen",
    "membership.student.feat4": "Berechtigung für Ligateams",
    "membership.student.cta": "Als Student bewerben",

    "membership.regular.tag": "Stufe 02 · empfohlen",
    "membership.regular.name": "Regulär",
    "membership.regular.tagline": "Unbegrenztes Spielen, alle Tische, alle Disziplinen.",
    "membership.regular.feat1": "Uneingeschränkter Zugang · alle Öffnungszeiten",
    "membership.regular.feat2": "Alle zehn Tische, alle drei Disziplinen",
    "membership.regular.feat3": "Berechtigung für Ligateams",
    "membership.regular.feat4": "Schließfach & Queue-Aufbewahrung",
    "membership.regular.cta": "Mitgliedschaft beantragen",

    "membership.family.tag": "Stufe 03",
    "membership.family.name": "Familie",
    "membership.family.tagline": "Registrieren Sie Familienmitglieder unter einer Mitgliedschaft.",
    "membership.family.feat1": "Gleicher Preis wie reguläre Mitgliedschaft",
    "membership.family.feat2": "Partner und Kinder anmelden",
    "membership.family.feat3": "Familienmitglieder teilen den Zugang",
    "membership.family.feat4": "Alle Vorteile der regulären Mitgliedschaft",
    "membership.family.cta": "Familie anmelden",

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

    // Additional sections
    "disciplines.pickGame": "Wähle dein <em>Spiel</em>.",
    "disciplines.fewClubs": "Nur wenige Vereine in Deutschland unterhalten wettkampftaugliche Ausrüstung für alle drei Billardarten unter einem Dach. Wir tun es, das ganze Jahr über.",
    "experience.whyJoin": "Warum beitreten",
    "experience.moreThan": "Mehr als <em>ein Raum</em><br />mit Tischen.",
    "experience.workingClubhouse": "Ein aktives Vereinshaus mit Lounge, Bar und Stammgästen, die gerne noch ein Spiel bleiben und sich an deinen Namen erinnern.",
    "experience.cloth.short": "Jeden Juli beziehen wir alle zehn Tische neu mit Simonis 860 / 300 Rapide, Weltmeisterschaftsstandard.",
    "membership.threeWays": "Drei Wege <em>dazuzugehören</em>.",
    "membership.flatFair": "Eine faire, transparente Beitragsstruktur. Keine Aufnahmegebühr, keine Stundenabrechnung, nur eine Mitgliedschaft und Zugang zum Vereinsheim.",
    "gallery.letLight": "Wir lassen Licht, Holz und Tuch für sich sprechen. Fotografie von Vereinsmitglied Andreas Becker.",
    "news.num": "06",
    "news.eyebrow": "Neuigkeiten",
    "news.title": "Turniere,<br /><em>Aufstiege</em> & Events.",
    "news.lede": "Bleiben Sie auf dem Laufenden über Ligaergebnisse, kommende Turniere und Vereinserfolge.",
    "tournaments.num": "07",
    "tournaments.eyebrow": "Wettkampf",
    "tournaments.title": "Kommende<br /><em>Turniere</em>.",
    "tournaments.lede": "Live von unserer CueScore-Seite geladen und automatisch aktualisiert, sobald neue Events angekündigt werden.",
    "tournaments.pool": "Pool",
    "tournaments.karambol": "Karambol",
    "tournaments.snooker": "Snooker",
    "tournaments.register": "Auf CueScore ansehen",
    "tournaments.details": "Details",
    "tournaments.loading": "Turniere werden von CueScore geladen…",
    "tournaments.empty": "Derzeit sind keine kommenden Turniere gelistet. Schauen Sie bald wieder vorbei.",
    "tournaments.allOnCuescore": "Alle Turniere auf CueScore ansehen",
    "tournaments.tbd": "Datum wird noch bestätigt",
    "tournaments.past": "Vorbei",
    "tournaments.viewResults": "Ergebnisse ansehen",
    "tournaments.prev": "Zurück",
    "tournaments.next": "Weiter",
    "tournaments.page": "Seite",
    "contact.num": "08",
    "contact.visitContact": "Kontakt",
    "contact.borsigallee": "Borsigallee 45,<br /><em>Frankfurt</em> am Main.",
    "contact.fiveMinutes": "Fünf Minuten vom Hessen-Center, vier von der U7-Haltestelle, Parkplätze vor Ort. Kommen Sie jeden Abend ab 18:00 vorbei, oder schreiben Sie uns vorher.",
    "contact.getDirections": "Route planen",
    "contact.openInMaps": "In Maps öffnen",
    "contact.membersOnly": "Nur für Mitglieder",
    "contact.privateClub": "Dies ist ein <em>privater Verein</em>,<br />keine öffentliche Bar.",
    "contact.privateClubDesc1": "BC Frankfurt 1912 ist ein eingetragener Verein nur für Mitglieder. Wir betreiben keine kommerzielle Einrichtung oder Laufkundschaft. Der Zugang zu unseren Räumlichkeiten ist auf aktive Mitglieder und deren Gäste beschränkt.",
    "contact.privateClubDesc2": "Wenn Sie Mitglied werden möchten, lesen Sie bitte unsere Mitgliedschaftsstufen und kontaktieren Sie uns per E-Mail, um den Bewerbungsprozess zu starten.",
    "contact.membershipInquiries": "Mitgliedschaftsanfragen",
    "footer.getInvolved": "Mitmachen",
    "footer.visit": "Besuchen",
  }
};

window.TRANSLATIONS = TRANSLATIONS;

const useTranslation = () => React.useContext(TranslationContext);

// Reliable in-page anchor scroll. The page has `scroll-behavior: smooth`
// globally, and the Tournaments section grows after its async CueScore fetch,
// so the target's position moves while scrolling. We compute an absolute Y
// (offset for the fixed nav) and do ONE smooth scroll, then a SINGLE instant
// re-correction once layout has settled — never competing smooth animations.
const NAV_OFFSET = 80;

const targetY = (el) => {
  const rect = el.getBoundingClientRect();
  return Math.max(0, window.scrollY + rect.top - NAV_OFFSET);
};

const scrollToHash = (hash) => {
  const el = document.getElementById(hash.replace(/^#/, ""));
  if (!el) return;
  window.scrollTo({ top: targetY(el), behavior: "smooth" });
  // After the smooth scroll + any late layout changes settle, snap to the
  // final position instantly (no animation, so nothing to fight with).
  const settle = () => window.scrollTo({ top: targetY(el), behavior: "auto" });
  setTimeout(settle, 700);
  setTimeout(settle, 1200);
  if (history.replaceState) history.replaceState(null, "", hash);
};

const handleNavClick = (e) => {
  const href = e.currentTarget.getAttribute("href") || "";
  if (href.startsWith("#") && href.length > 1) {
    e.preventDefault();
    scrollToHash(href);
  }
};

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
        <li><a href="#about" onClick={handleNavClick}>{t("nav.club")}</a></li>
        <li><a href="#disciplines" onClick={handleNavClick}>{t("nav.disciplines")}</a></li>
        <li><a href="#experience" onClick={handleNavClick}>{t("nav.experience")}</a></li>
        <li><a href="#membership" onClick={handleNavClick}>{t("nav.membership")}</a></li>
        <li><a href="#gallery" onClick={handleNavClick}>{t("nav.gallery")}</a></li>
        <li><a href="#news" onClick={handleNavClick}>News</a></li>
        <li><a href="#tournaments" onClick={handleNavClick}>{t("nav.tournaments")}</a></li>
        <li><a href="#contact" onClick={handleNavClick}>{t("nav.visit")}</a></li>
        <li><a href="assets/calendar.html">{t("nav.games")}</a></li>
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
            src="assets/Images/Gallery/20260415_065214.jpg"
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

const Disciplines = () => {
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
              <div className="discipline-num">· {d.num}</div>
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

const Experience = () => {
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
            src="assets/Images/floor-plan.png"
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

const Membership = () => {
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
  { cls: "g1", caption: "Main hall · Saturday evening", img: "assets/Images/Gallery/20260415_065214.jpg" },
  { cls: "g2", caption: "Karambol · cadre frame", img: "assets/Images/Gallery/20260415_064711.jpg" },
  { cls: "g3", caption: "Brass lamps over the table", img: "assets/Images/Gallery/20260415_064907.jpg" },
  { cls: "g4", caption: "Snooker · 12-foot match", img: "assets/Images/Gallery/20260415_065329.jpg" },
  { cls: "g5", caption: "The Lounge", img: "assets/Images/Gallery/20260415_065144.jpg" },
  { cls: "g6", caption: "Pool Bundesliga", img: "assets/Images/Gallery/20260415_065737.jpg" },
  { cls: "g7", caption: "Karambol training", img: "assets/Images/Gallery/20260415_065858.jpg" },
];

// Fullscreen lightbox with arrow navigation, keyboard controls, and swipe.
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

const Gallery = () => {
  const { t } = useTranslation();
  const [active, setActive] = React.useState(null);

  const nav = React.useCallback((dir) => {
    setActive((cur) => (cur == null ? cur : (cur + dir + GALLERY.length) % GALLERY.length));
  }, []);

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
          <div key={i} className={`gallery-item ${g.cls}`} onClick={() => setActive(i)}
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
                filter: "brightness(0.72) contrast(1.06) saturate(0.82) sepia(0.12)",
                transition: "filter 0.5s var(--ease-out), transform 0.6s var(--ease-out)",
              }}
              className="gallery-img"
            />
            <div className="gallery-zoom-hint" aria-hidden="true">⤢</div>
          </div>
        ))}
      </div>
    </div>

    <Lightbox items={GALLERY} index={active} onClose={() => setActive(null)} onNav={nav} />
  </section>
);
};

// ─── Tournaments ───────────────────────────────────────────────────────────
// All tournaments are fetched live from the club's CueScore page — nothing is
// entered by hand. Each event is auto-classified (pool / karambol / snooker)
// so the right card template is used; the karambol and snooker templates stay
// ready for when those disciplines appear on CueScore.

const CUESCORE_ORG_ID = 81469381; // cuescore.com/bcfrankfurt1912
const CUESCORE_LIST_URL = `https://api.cuescore.com/organization/?id=${CUESCORE_ORG_ID}`;
const CUESCORE_TOURNAMENT_URL = (id) => `https://api.cuescore.com/tournament/?id=${id}`;
const CUESCORE_ALL_URL = "https://cuescore.com/bcfrankfurt1912/tournaments?q=&d=0&season=0&s=0";

// Map a CueScore discipline string onto one of our three card templates.
const disciplineToType = (discipline) => {
  const d = (discipline || "").toLowerCase();
  if (/snooker/.test(d)) return "snooker";
  if (/(carom|karambol|cushion|cadre|libre|balkline|billiard fran)/.test(d)) return "karambol";
  // 8-ball, 9-ball, 10-ball, straight/14.1, blackball, one pocket, banks, etc.
  return "pool";
};

// Fetch + normalise the club's CueScore tournaments. Returns {items, loading,
// error}. items is [] when CueScore lists none or the request fails.
const useTournaments = () => {
  const [state, setState] = React.useState({ items: null, loading: true, error: false });

  React.useEffect(() => {
    let cancelled = false;

    const normalise = (raw) => ({
      id: raw.tournamentId,
      type: disciplineToType(raw.discipline),
      discipline: raw.discipline || "Pool",
      name: (raw.name || "").replace(/^.*?>\s*/, ""), // strip "BCFrankfurt1912 > " prefix
      date: raw.starttime || null,
      displayDate: raw.displayDate || null,
      venue: (raw.venues && raw.venues[0] && raw.venues[0].name) || null,
      status: raw.status || null,
      url: raw.url || null,
    });

    const load = async () => {
      try {
        const res = await fetch(CUESCORE_LIST_URL);
        if (!res.ok) throw new Error("list");
        const ids = await res.json();
        const live = await Promise.all(
          (Array.isArray(ids) ? ids : []).map(async (id) => {
            try {
              const r = await fetch(CUESCORE_TOURNAMENT_URL(id));
              if (!r.ok) return null;
              return normalise(await r.json());
            } catch { return null; }
          })
        );
        if (cancelled) return;
        setState({ items: sortTournaments(live.filter(Boolean)), loading: false, error: false });
      } catch {
        if (cancelled) return;
        setState({ items: [], loading: false, error: true });
      }
    };

    load();
    return () => { cancelled = true; };
  }, []);

  return state;
};

// Keep ALL events, tag each as past/upcoming, and order them: upcoming first
// (soonest first), then past events (most recent first). Undated events are
// treated as upcoming and sorted last within that group.
const sortTournaments = (list) => {
  const now = Date.now();
  const withMeta = list.map((t) => {
    const time = t.date ? new Date(t.date).getTime() : NaN;
    // "Past" once the start date is more than a day behind us.
    const past = !isNaN(time) && time < now - 1000 * 60 * 60 * 24;
    return { ...t, past, _time: isNaN(time) ? Infinity : time };
  });
  return withMeta.sort((a, b) => {
    if (a.past !== b.past) return a.past ? 1 : -1;      // upcoming before past
    return a.past ? b._time - a._time : a._time - b._time; // past: newest first; upcoming: soonest first
  });
};

const formatTournamentDate = (t, lang) => {
  if (t.displayDate) return t.displayDate;
  if (!t.date) return null;
  const d = new Date(t.date);
  if (isNaN(d.getTime())) return null;
  return d.toLocaleDateString(lang === "DE" ? "de-DE" : "en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });
};

const TYPE_ICON = { pool: "◉", karambol: "◆", snooker: "▦" };

const TournamentCard = ({ item }) => {
  const { t, lang } = useTranslation();
  const label = t(`tournaments.${item.type}`);
  const when = formatTournamentDate(item, lang) || t("tournaments.tbd");
  return (
    <article className={`tournament-card tc-${item.type}${item.past ? " tc-past" : ""}`}>
      <div className="tc-accent" aria-hidden="true" />
      {item.past && <span className="tc-past-tag">{t("tournaments.past")}</span>}
      <div className="tc-body">
        <div className="tc-badge-row">
          <span className="tc-badge">
            <span className="tc-icon" aria-hidden="true">{TYPE_ICON[item.type]}</span>
            {label}
          </span>
          <span className="tc-discipline">{item.discipline}</span>
        </div>
        <h3 className="tc-name">{item.name}</h3>
        <div className="tc-meta">
          <span className="tc-date">{when}</span>
          {item.venue && <span className="tc-venue">{item.venue}</span>}
        </div>
      </div>
      {item.url && (
        <a className="tc-cta" href={item.url} target="_blank" rel="noopener noreferrer">
          {item.past ? t("tournaments.viewResults") : t("tournaments.register")} <ArrowOut />
        </a>
      )}
    </article>
  );
};

const TOURNAMENTS_PER_PAGE = 3;

const Tournaments = () => {
  const { t } = useTranslation();
  const { items, loading, error } = useTournaments();
  const [page, setPage] = React.useState(0);

  const total = items ? items.length : 0;
  const pageCount = Math.max(1, Math.ceil(total / TOURNAMENTS_PER_PAGE));
  // Clamp page if the list shrinks (e.g. after a re-fetch).
  const current = Math.min(page, pageCount - 1);
  const start = current * TOURNAMENTS_PER_PAGE;
  const visible = items ? items.slice(start, start + TOURNAMENTS_PER_PAGE) : [];

  const goTo = (next) => {
    setPage(next);
    const sec = document.getElementById("tournaments");
    if (sec) window.scrollTo({ top: Math.max(0, window.scrollY + sec.getBoundingClientRect().top - NAV_OFFSET), behavior: "smooth" });
  };

  return (
    <section className="section" id="tournaments">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="section-eyebrow-row">
              <span className="section-num">{t("tournaments.num")}</span>
              <span className="section-divider" />
              <span className="eyebrow">{t("tournaments.eyebrow")}</span>
            </div>
            <h2 className="section-title" style={{ marginTop: 24 }} dangerouslySetInnerHTML={{ __html: t("tournaments.title") }} />
          </div>
          <p className="section-lede">{t("tournaments.lede")}</p>
        </div>

        <div className="tournament-grid reveal">
          {loading && <div className="tournament-status">{t("tournaments.loading")}</div>}
          {!loading && total === 0 && (
            <div className="tournament-status">{t("tournaments.empty")}</div>
          )}
          {!loading && visible.map((item) => (
            <TournamentCard key={item.id} item={item} />
          ))}
        </div>

        {!loading && pageCount > 1 && (
          <div className="tournament-pagination reveal">
            <button
              className="tp-btn"
              onClick={() => goTo(current - 1)}
              disabled={current === 0}
              aria-label={t("tournaments.prev")}
            >
              ‹ {t("tournaments.prev")}
            </button>
            <span className="tp-status">
              {t("tournaments.page")} {current + 1} / {pageCount}
            </span>
            <button
              className="tp-btn"
              onClick={() => goTo(current + 1)}
              disabled={current >= pageCount - 1}
              aria-label={t("tournaments.next")}
            >
              {t("tournaments.next")} ›
            </button>
          </div>
        )}

        <div className="tournament-footer reveal">
          <a href={CUESCORE_ALL_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            {t("tournaments.allOnCuescore")} <ArrowOut />
          </a>
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

const News = () => {
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

const Contact = () => {
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

const Footer = () => {
  const { t } = useTranslation();
  return (
  <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-brand">
          <h3>Billard Club<br /><em>Frankfurt</em> 1912 e.V.</h3>
          <p>{t("footer.about.line1")}</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 32 }}>
            {[
              { label: "Instagram", href: "#", icon: <InstagramIcon /> },
              { label: "Facebook", href: "#", icon: <FacebookIcon /> },
              { label: "YouTube", href: "#", icon: <YouTubeIcon /> },
              { label: "CueScore", href: "https://cuescore.com/bcfrankfurt1912", icon: <CueScoreIcon /> },
            ].map(({ label, href, icon }) => (
              <a key={label} href={href} aria-label={label}
                {...(href !== "#" ? { target: "_blank", rel: "noopener" } : {})}
                style={{
                  width: 40, height: 40, border: "1px solid var(--ink-300)", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--bone-200)", textDecoration: "none",
                }}>{icon}</a>
            ))}
          </div>
        </div>
        <div className="footer-col">
          <h5>{t("footer.about.title")}</h5>
          <ul>
            <li><a href="#about">{t("nav.club")}</a></li>
            <li><a href="#disciplines">{t("nav.disciplines")}</a></li>
            <li><a href="#experience">{t("nav.experience")}</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>{t("footer.getInvolved")}</h5>
          <ul>
            <li><a href="#membership">{t("nav.membership")}</a></li>
            <li><a href="#gallery">{t("nav.gallery")}</a></li>
            <li><a href="#news">News</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>{t("footer.visit")}</h5>
          <ul>
            <li><a href="#tournaments">{t("nav.tournaments")}</a></li>
            <li><a href="#contact">{t("nav.visit")}</a></li>
            <li><a href="assets/calendar.html">{t("nav.games")}</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 1912–{new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Berlin", year: "numeric" }).format(new Date())} · Billard Club Frankfurt e.V.</span>
      </div>
    </div>
  </footer>
);
};

Object.assign(window, {
  Nav, Hero, Marquee, About, Disciplines, Experience, Membership, Gallery, Tournaments, News, Contact, Footer, LangPicker,
});
