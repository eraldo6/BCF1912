/* Calendar — Games, Results & Standings for BC Frankfurt 1912 */

// Import Games component logic
const AVAILABLE_SEASONS = [
  { id: "5", name: "2024/2025" },
  { id: "4", name: "2023/2024" },
  { id: "3", name: "2022/2023" },
];

const Games = () => {
  const [selectedSeason, setSelectedSeason] = React.useState("5");
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [showSeasonPicker, setShowSeasonPicker] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`../src/data/bcf_season_${selectedSeason}.json`);

        if (!response.ok) {
          throw new Error(`Failed to load season data`);
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        console.error("Error loading data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedSeason]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "TBD";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  const getMatchResult = (match, teamName) => {
    const isHome = match.home_team.includes("BC Frankfurt");

    if (match.home_score === null || match.away_score === null) {
      return "scheduled";
    }

    if (isHome) {
      if (match.home_score > match.away_score) return "win";
      if (match.home_score < match.away_score) return "loss";
      return "draw";
    } else {
      if (match.away_score > match.home_score) return "win";
      if (match.away_score < match.home_score) return "loss";
      return "draw";
    }
  };

  const currentSeasonName = AVAILABLE_SEASONS.find(s => s.id === selectedSeason)?.name || selectedSeason;

  return (
    <section id="games" className="section games-section reveal">
      <div className="container">
        <div className="section-header">
          <div className="title-wrapper">
            <h2 className="section-title">Spiele & Ergebnisse</h2>
            <div className="season-selector">
              <button
                className="season-btn"
                onClick={() => setShowSeasonPicker(!showSeasonPicker)}
              >
                Saison: {currentSeasonName}
                <span className="arrow">{showSeasonPicker ? "▲" : "▼"}</span>
              </button>

              {showSeasonPicker && (
                <div className="season-dropdown">
                  {AVAILABLE_SEASONS.map(season => (
                    <button
                      key={season.id}
                      className={`season-option ${season.id === selectedSeason ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedSeason(season.id);
                        setShowSeasonPicker(false);
                      }}
                    >
                      {season.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {loading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Lade Spieldaten...</p>
          </div>
        )}

        {error && (
          <div className="error-state">
            <p>❌ {error}</p>
            <p className="error-hint">Bitte führen Sie zuerst das Python-Script aus: <code>python fetch_bcf_season.py {selectedSeason}</code></p>
          </div>
        )}

        {!loading && !error && data && (
          <div className="games-content">
            {data.teams.map((team, idx) => (
              <div key={idx} className="team-section">
                <h3 className="team-name">
                  {team.team_name}
                  <span className="team-league">{team.league}</span>
                </h3>

                {team.standings && team.standings.length > 0 && (
                  <div className="standings-wrapper">
                    <h4 className="subsection-title">Tabelle</h4>
                    <div className="table-container">
                      <table className="standings-table">
                        <thead>
                          <tr>
                            <th>Rang</th>
                            <th>Mannschaft</th>
                            <th>Sp</th>
                            <th>S</th>
                            <th>U</th>
                            <th>N</th>
                            <th>Pkt</th>
                          </tr>
                        </thead>
                        <tbody>
                          {team.standings.map((standing, i) => {
                            const isBCF = standing.team_name.includes("BC Frankfurt");
                            return (
                              <tr key={i} className={isBCF ? "highlight-row" : ""}>
                                <td className="rank">{standing.rank}</td>
                                <td className="team">{standing.team_name}</td>
                                <td>{standing.matches_played}</td>
                                <td>{standing.wins}</td>
                                <td>{standing.draws}</td>
                                <td>{standing.losses}</td>
                                <td className="points"><strong>{standing.points}</strong></td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {team.matches && team.matches.length > 0 && (
                  <div className="matches-wrapper">
                    <h4 className="subsection-title">Letzte Spiele</h4>
                    <div className="matches-grid">
                      {team.matches.slice(0, 6).map((match, i) => {
                        const result = getMatchResult(match, team.team_name);
                        return (
                          <div key={i} className={`match-card ${result}`}>
                            <div className="match-date">{formatDate(match.date)}</div>
                            <div className="match-teams">
                              <div className="match-team home">
                                <span className="team-name">{match.home_team}</span>
                              </div>
                              <div className="match-score">
                                {match.home_score !== null && match.away_score !== null ? (
                                  <span className="score">{match.home_score}:{match.away_score}</span>
                                ) : (
                                  <span className="vs">vs</span>
                                )}
                              </div>
                              <div className="match-team away">
                                <span className="team-name">{match.away_team}</span>
                              </div>
                            </div>
                            {result !== "scheduled" && (
                              <div className={`match-result ${result}`}>
                                {result === "win" ? "Sieg" : result === "loss" ? "Niederlage" : "Unentschieden"}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {(!team.matches || team.matches.length === 0) && (
                  <p className="no-data">Keine Spieldaten verfügbar</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const Nav2 = () => {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <a href="../index.html" className="nav-logo">
        <img
          src="https://bcfrankfurt.de/wp-content/uploads/2018/02/BCF-Wappen_qu-200x200.png"
          alt="BC Frankfurt 1912"
          style={{ width: 40, height: 40, objectFit: "contain", filter: "drop-shadow(0 0 12px rgba(218,178,96,0.25))" }}
        />
        <span>BC Frankfurt <em style={{ fontStyle: "italic", color: "var(--brass-500)", fontWeight: 400 }}>1912</em></span>
      </a>
      <ul className="nav-links">
        <li><a href="../index.html#about">Club</a></li>
        <li><a href="../index.html#disciplines">Disciplines</a></li>
        <li><a href="../index.html#experience">Experience</a></li>
        <li><a href="../index.html#membership">Membership</a></li>
        <li><a href="../index.html#gallery">Gallery</a></li>
        <li><a href="calendar.html" style={{ color: "var(--brass-500)" }}>Calendar</a></li>
        <li><a href="../index.html#contact">Visit</a></li>
      </ul>
      <div className="nav-cta">
        <a href="../index.html#membership" className="btn btn-brass" style={{ padding: "10px 20px", fontSize: 12 }}>
          Become a Member
        </a>
      </div>
    </nav>
  );
};

const TEAMS = [
  { id: "1", name: "BCF I", league: "Pool Bundesliga", short: "1st team — top flight", color: "oklch(0.78 0.13 80)" },
  { id: "2", name: "BCF II", league: "Pool 2. Bundesliga Süd", short: "2nd team — promotion chase", color: "oklch(0.62 0.15 25)" },
  { id: "3", name: "BCF III", league: "Pool Hessen-Liga", short: "3rd team — local league", color: "oklch(0.62 0.13 240)" },
];

const FIXTURES = [
  // Recent results
  { team: "1", opp: "BC Düsseldorf", date: "2026-04-26", time: "14:00", home: true, status: "FT", scoreH: 6, scoreA: 2, venue: "Home" },
  { team: "1", opp: "PBC Joker Altenstadt", date: "2026-04-19", time: "14:00", home: false, status: "FT", scoreH: 4, scoreA: 4, venue: "Away" },
  { team: "2", opp: "BC Sandhausen", date: "2026-04-25", time: "13:00", home: true, status: "FT", scoreH: 5, scoreA: 3, venue: "Home" },
  { team: "3", opp: "1. PBC Frankfurt", date: "2026-04-24", time: "19:30", home: true, status: "FT", scoreH: 7, scoreA: 1, venue: "Home" },

  // Live now
  { team: "1", opp: "BSV Wuppertal", date: "2026-04-29", time: "18:00", home: true, status: "LIVE", scoreH: 3, scoreA: 2, venue: "Home", min: "Frame 6" },

  // Upcoming
  { team: "2", opp: "1. PBC München", date: "2026-05-03", time: "13:00", home: false, status: "UP", venue: "Away" },
  { team: "1", opp: "BC Stuttgart", date: "2026-05-09", time: "14:00", home: true, status: "UP", venue: "Home" },
  { team: "3", opp: "BC Wiesbaden", date: "2026-05-10", time: "15:00", home: false, status: "UP", venue: "Away" },
  { team: "1", opp: "PBC St. Augustin", date: "2026-05-16", time: "14:00", home: false, status: "UP", venue: "Away" },
  { team: "2", opp: "BC Heidelberg", date: "2026-05-17", time: "13:00", home: true, status: "UP", venue: "Home" },
  { team: "3", opp: "BC Offenbach", date: "2026-05-22", time: "19:30", home: true, status: "UP", venue: "Home" },
  { team: "1", opp: "BC Hamburg", date: "2026-05-30", time: "14:00", home: true, status: "UP", venue: "Home" },
];

// Standings — fictional but realistic
const STANDINGS = {
  "1": [ // Pool Bundesliga
    { pos: 1, club: "PBC Joker Altenstadt", p: 18, w: 14, d: 2, l: 2, gf: 92, ga: 52, pts: 44, form: ["W","W","D","W","W"] },
    { pos: 2, club: "BC Stuttgart", p: 18, w: 12, d: 3, l: 3, gf: 86, ga: 58, pts: 39, form: ["W","L","W","W","D"] },
    { pos: 3, club: "BC Frankfurt I", p: 18, w: 11, d: 3, l: 4, gf: 82, ga: 60, pts: 36, form: ["W","D","W","W","L"], us: true },
    { pos: 4, club: "BC Düsseldorf", p: 18, w: 10, d: 3, l: 5, gf: 78, ga: 64, pts: 33, form: ["L","W","D","W","L"] },
    { pos: 5, club: "BSV Wuppertal", p: 18, w: 9, d: 3, l: 6, gf: 74, ga: 68, pts: 30, form: ["D","W","L","W","W"] },
    { pos: 6, club: "BC Hamburg", p: 18, w: 8, d: 4, l: 6, gf: 71, ga: 71, pts: 28, form: ["L","D","W","L","W"] },
    { pos: 7, club: "PBC St. Augustin", p: 18, w: 6, d: 3, l: 9, gf: 64, ga: 78, pts: 21, form: ["L","L","W","D","L"] },
    { pos: 8, club: "BC Köln", p: 18, w: 4, d: 2, l: 12, gf: 56, ga: 86, pts: 14, form: ["L","L","D","L","L"] },
  ],
  "2": [ // 2. Bundesliga
    { pos: 1, club: "BC Frankfurt II", p: 16, w: 12, d: 2, l: 2, gf: 78, ga: 42, pts: 38, form: ["W","W","W","D","W"], us: true },
    { pos: 2, club: "1. PBC München", p: 16, w: 11, d: 2, l: 3, gf: 74, ga: 46, pts: 35, form: ["W","W","D","L","W"] },
    { pos: 3, club: "BC Heidelberg", p: 16, w: 10, d: 2, l: 4, gf: 70, ga: 50, pts: 32, form: ["W","L","W","W","D"] },
    { pos: 4, club: "BC Sandhausen", p: 16, w: 8, d: 3, l: 5, gf: 64, ga: 56, pts: 27, form: ["L","W","D","W","L"] },
    { pos: 5, club: "BC Mannheim", p: 16, w: 7, d: 3, l: 6, gf: 60, ga: 60, pts: 24, form: ["D","L","W","D","W"] },
    { pos: 6, club: "PBC Karlsruhe", p: 16, w: 5, d: 3, l: 8, gf: 54, ga: 66, pts: 18, form: ["L","D","L","W","L"] },
    { pos: 7, club: "BC Saarbrücken", p: 16, w: 3, d: 2, l: 11, gf: 44, ga: 76, pts: 11, form: ["L","L","L","D","L"] },
    { pos: 8, club: "1. PBC Mainz", p: 16, w: 2, d: 1, l: 13, gf: 38, ga: 82, pts: 7, form: ["L","L","L","L","D"] },
  ],
  "3": [ // Hessen-Liga
    { pos: 1, club: "BC Wiesbaden", p: 14, w: 11, d: 1, l: 2, gf: 68, ga: 36, pts: 34, form: ["W","W","W","D","W"] },
    { pos: 2, club: "BC Frankfurt III", p: 14, w: 10, d: 2, l: 2, gf: 64, ga: 38, pts: 32, form: ["W","W","W","W","L"], us: true },
    { pos: 3, club: "1. PBC Frankfurt", p: 14, w: 8, d: 2, l: 4, gf: 56, ga: 46, pts: 26, form: ["W","L","W","D","W"] },
    { pos: 4, club: "BC Offenbach", p: 14, w: 7, d: 2, l: 5, gf: 52, ga: 50, pts: 23, form: ["L","W","D","W","W"] },
    { pos: 5, club: "BC Darmstadt", p: 14, w: 6, d: 1, l: 7, gf: 48, ga: 54, pts: 19, form: ["W","L","L","W","D"] },
    { pos: 6, club: "BC Kassel", p: 14, w: 4, d: 2, l: 8, gf: 42, ga: 58, pts: 14, form: ["L","D","W","L","L"] },
    { pos: 7, club: "BC Marburg", p: 14, w: 2, d: 2, l: 10, gf: 36, ga: 64, pts: 8, form: ["L","L","D","L","L"] },
    { pos: 8, club: "BC Fulda", p: 14, w: 1, d: 2, l: 11, gf: 32, ga: 70, pts: 5, form: ["L","L","L","L","D"] },
  ],
};

const PageHeader = () => (
  <section style={{
    padding: "180px 0 80px",
    borderBottom: "1px solid var(--ink-300)",
    background: "radial-gradient(ellipse at 60% 20%, var(--felt-700) 0%, var(--ink-050) 60%, var(--ink-000) 100%)",
    position: "relative",
    overflow: "hidden",
  }}>
    <div className="container" style={{ position: "relative", zIndex: 2 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
        <a href="BC Frankfurt 1912.html" style={{ color: "var(--bone-300)", textDecoration: "none", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase" }}>← Back</a>
        <span style={{ color: "var(--ink-500)" }}>/</span>
        <span className="eyebrow">Calendar &amp; Standings</span>
      </div>
      <h1 className="h-display" style={{ fontSize: "clamp(56px, 9vw, 140px)", color: "var(--bone-100)", fontStyle: "normal", maxWidth: 1100 }}>
        Live the <em style={{ fontStyle: "italic", color: "var(--brass-500)" }}>season</em><br />with our three teams.
      </h1>
      <p style={{ color: "var(--bone-300)", fontSize: 17, maxWidth: 600, marginTop: 28, lineHeight: 1.6 }}>
        Fixtures, live frames, and standings for BCF I, II and III —
        from the Pool Bundesliga to the Hessen-Liga.
      </p>
    </div>
  </section>
);

const TeamFilter = ({ active, setActive }) => (
  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
    {[{ id: "all", name: "All teams", league: "" }, ...TEAMS].map(t => (
      <button key={t.id}
        onClick={() => setActive(t.id)}
        style={{
          padding: "10px 18px",
          background: active === t.id ? "var(--brass-500)" : "transparent",
          color: active === t.id ? "var(--ink-000)" : "var(--bone-200)",
          border: "1px solid " + (active === t.id ? "var(--brass-500)" : "var(--ink-300)"),
          borderRadius: 999,
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          cursor: "pointer",
          transition: "all 0.3s",
        }}>
        {t.name}{t.league && <span style={{ opacity: 0.6, marginLeft: 8 }}>· {t.league}</span>}
      </button>
    ))}
  </div>
);

const FormDot = ({ r }) => {
  const colors = { W: "oklch(0.65 0.15 145)", D: "oklch(0.7 0.05 80)", L: "oklch(0.55 0.18 25)" };
  return (
    <span style={{
      display: "inline-flex", width: 18, height: 18, borderRadius: 4,
      background: colors[r], color: "var(--ink-000)",
      alignItems: "center", justifyContent: "center",
      fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 700,
    }}>{r}</span>
  );
};

const FixtureCard = ({ f }) => {
  const team = TEAMS.find(t => t.id === f.team);
  const dateObj = new Date(f.date);
  const dayLabel = dateObj.toLocaleDateString("en-GB", { weekday: "short", day: "2-digit", month: "short" });
  const isLive = f.status === "LIVE";
  const isFT = f.status === "FT";
  const homeName = f.home ? "BC Frankfurt " + (team.id === "1" ? "I" : team.id === "2" ? "II" : "III") : f.opp;
  const awayName = f.home ? f.opp : "BC Frankfurt " + (team.id === "1" ? "I" : team.id === "2" ? "II" : "III");

  let won = false, draw = false;
  if (isFT) {
    if (f.scoreH === f.scoreA) draw = true;
    else if ((f.home && f.scoreH > f.scoreA) || (!f.home && f.scoreA > f.scoreH)) won = true;
  }

  return (
    <div style={{
      background: "var(--ink-100)",
      border: "1px solid " + (isLive ? "oklch(0.55 0.18 25)" : "var(--ink-300)"),
      borderRadius: 14,
      overflow: "hidden",
      transition: "all 0.4s var(--ease-out)",
      position: "relative",
    }}>
      {/* Status bar */}
      <div style={{
        padding: "10px 18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: isLive ? "oklch(0.25 0.08 25)" : "var(--ink-200)",
        borderBottom: "1px solid var(--ink-300)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: team.color, boxShadow: `0 0 8px ${team.color}`,
          }} />
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.12em",
            textTransform: "uppercase", color: "var(--bone-200)",
          }}>{team.name} · {team.league}</span>
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--bone-300)", letterSpacing: "0.1em" }}>
          {isLive ? (
            <span style={{ color: "oklch(0.7 0.18 25)", display: "inline-flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "oklch(0.65 0.18 25)", animation: "pulse-glow 1.4s infinite" }} />
              LIVE · {f.min}
            </span>
          ) : isFT ? (
            <span>FULL TIME · {dayLabel}</span>
          ) : (
            <span>{dayLabel} · {f.time}</span>
          )}
        </div>
      </div>

      {/* Teams + score */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        padding: "24px 24px",
        gap: 16,
      }}>
        <div style={{ textAlign: "right" }}>
          <div style={{
            fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500,
            color: f.home ? "var(--bone-100)" : "var(--bone-200)",
            letterSpacing: "-0.01em",
          }}>{homeName}</div>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--bone-500)",
            letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4,
          }}>Home</div>
        </div>

        <div style={{
          display: "flex", alignItems: "center", gap: 14,
          padding: "8px 18px",
          background: "var(--ink-050)",
          borderRadius: 10,
          border: "1px solid var(--ink-300)",
          minWidth: 110,
          justifyContent: "center",
        }}>
          {f.scoreH !== undefined ? (
            <>
              <span style={{
                fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 500,
                color: isLive ? "oklch(0.7 0.18 25)" : "var(--bone-100)", lineHeight: 1,
              }}>{f.scoreH}</span>
              <span style={{ color: "var(--ink-500)", fontFamily: "var(--font-mono)", fontSize: 14 }}>:</span>
              <span style={{
                fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 500,
                color: isLive ? "oklch(0.7 0.18 25)" : "var(--bone-100)", lineHeight: 1,
              }}>{f.scoreA}</span>
            </>
          ) : (
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--brass-500)",
              letterSpacing: "0.12em",
            }}>{f.time}</span>
          )}
        </div>

        <div style={{ textAlign: "left" }}>
          <div style={{
            fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500,
            color: !f.home ? "var(--bone-100)" : "var(--bone-200)",
            letterSpacing: "-0.01em",
          }}>{awayName}</div>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--bone-500)",
            letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4,
          }}>Away</div>
        </div>
      </div>

      {isFT && (
        <div style={{
          padding: "8px 18px",
          borderTop: "1px solid var(--ink-300)",
          fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: won ? "oklch(0.65 0.15 145)" : draw ? "var(--bone-300)" : "oklch(0.55 0.18 25)",
          textAlign: "center",
        }}>
          {won ? "BCF WIN" : draw ? "DRAW" : "DEFEAT"}
        </div>
      )}
    </div>
  );
};

const FixturesBlock = ({ active }) => {
  const filtered = active === "all" ? FIXTURES : FIXTURES.filter(f => f.team === active);
  const live = filtered.filter(f => f.status === "LIVE");
  const upcoming = filtered.filter(f => f.status === "UP");
  const recent = filtered.filter(f => f.status === "FT");

  return (
    <>
      {live.length > 0 && (
        <div style={{ marginBottom: 56 }}>
          <h3 style={{
            fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em",
            textTransform: "uppercase", color: "oklch(0.7 0.18 25)", marginBottom: 16,
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "oklch(0.65 0.18 25)", animation: "pulse-glow 1.4s infinite" }} />
            Live now
          </h3>
          <div style={{ display: "grid", gap: 12 }}>
            {live.map((f, i) => <FixtureCard key={i} f={f} />)}
          </div>
        </div>
      )}

      {upcoming.length > 0 && (
        <div style={{ marginBottom: 56 }}>
          <h3 style={{
            fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em",
            textTransform: "uppercase", color: "var(--brass-500)", marginBottom: 16,
          }}>Upcoming · {upcoming.length} fixtures</h3>
          <div style={{ display: "grid", gap: 12 }}>
            {upcoming.map((f, i) => <FixtureCard key={i} f={f} />)}
          </div>
        </div>
      )}

      {recent.length > 0 && (
        <div>
          <h3 style={{
            fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em",
            textTransform: "uppercase", color: "var(--bone-300)", marginBottom: 16,
          }}>Recent results</h3>
          <div style={{ display: "grid", gap: 12 }}>
            {recent.map((f, i) => <FixtureCard key={i} f={f} />)}
          </div>
        </div>
      )}
    </>
  );
};

const StandingsTable = ({ teamId }) => {
  const team = TEAMS.find(t => t.id === teamId);
  const rows = STANDINGS[teamId];
  return (
    <div style={{
      background: "var(--ink-100)",
      border: "1px solid var(--ink-300)",
      borderRadius: 14,
      overflow: "hidden",
    }}>
      <div style={{
        padding: "20px 24px",
        borderBottom: "1px solid var(--ink-300)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "var(--ink-200)",
      }}>
        <div>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.16em",
            textTransform: "uppercase", color: "var(--bone-500)", marginBottom: 4,
          }}>{team.league}</div>
          <div style={{
            fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 500,
            color: "var(--bone-100)", letterSpacing: "-0.01em",
          }}>{team.name} <span style={{ color: "var(--bone-500)", fontSize: 14, fontFamily: "var(--font-mono)", letterSpacing: "0.08em", marginLeft: 8 }}>· Season 2025/26</span></div>
        </div>
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: team.color, boxShadow: `0 0 14px ${team.color}` }} />
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{
          width: "100%", borderCollapse: "collapse",
          fontFamily: "var(--font-sans)", fontSize: 14,
        }}>
          <thead>
            <tr style={{
              fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em",
              textTransform: "uppercase", color: "var(--bone-500)",
            }}>
              <th style={{ padding: "12px 16px", textAlign: "left", width: 40 }}>#</th>
              <th style={{ padding: "12px 16px", textAlign: "left" }}>Club</th>
              <th style={{ padding: "12px 8px", textAlign: "center" }}>P</th>
              <th style={{ padding: "12px 8px", textAlign: "center" }}>W</th>
              <th style={{ padding: "12px 8px", textAlign: "center" }}>D</th>
              <th style={{ padding: "12px 8px", textAlign: "center" }}>L</th>
              <th style={{ padding: "12px 8px", textAlign: "center" }}>GF</th>
              <th style={{ padding: "12px 8px", textAlign: "center" }}>GA</th>
              <th style={{ padding: "12px 16px", textAlign: "center", color: "var(--brass-500)" }}>PTS</th>
              <th style={{ padding: "12px 16px", textAlign: "center" }}>Form</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.pos} style={{
                background: r.us ? "rgba(218,178,96,0.06)" : "transparent",
                borderTop: "1px solid var(--ink-300)",
              }}>
                <td style={{ padding: "16px", color: r.pos <= 2 ? "oklch(0.65 0.15 145)" : r.pos >= rows.length - 1 ? "oklch(0.55 0.18 25)" : "var(--bone-300)", fontFamily: "var(--font-mono)", fontWeight: 500 }}>
                  {r.pos.toString().padStart(2, "0")}
                </td>
                <td style={{ padding: "16px", color: r.us ? "var(--brass-500)" : "var(--bone-100)", fontWeight: r.us ? 500 : 400 }}>
                  {r.club}{r.us && <span style={{ marginLeft: 8, fontSize: 9, fontFamily: "var(--font-mono)", letterSpacing: "0.12em", color: "var(--brass-500)", border: "1px solid var(--brass-700)", padding: "2px 6px", borderRadius: 999 }}>YOU</span>}
                </td>
                <td style={{ padding: "16px 8px", textAlign: "center", color: "var(--bone-200)", fontFamily: "var(--font-mono)" }}>{r.p}</td>
                <td style={{ padding: "16px 8px", textAlign: "center", color: "var(--bone-200)", fontFamily: "var(--font-mono)" }}>{r.w}</td>
                <td style={{ padding: "16px 8px", textAlign: "center", color: "var(--bone-200)", fontFamily: "var(--font-mono)" }}>{r.d}</td>
                <td style={{ padding: "16px 8px", textAlign: "center", color: "var(--bone-200)", fontFamily: "var(--font-mono)" }}>{r.l}</td>
                <td style={{ padding: "16px 8px", textAlign: "center", color: "var(--bone-300)", fontFamily: "var(--font-mono)" }}>{r.gf}</td>
                <td style={{ padding: "16px 8px", textAlign: "center", color: "var(--bone-300)", fontFamily: "var(--font-mono)" }}>{r.ga}</td>
                <td style={{ padding: "16px", textAlign: "center", color: "var(--brass-500)", fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 500 }}>{r.pts}</td>
                <td style={{ padding: "16px" }}>
                  <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
                    {r.form.map((res, i) => <FormDot key={i} r={res} />)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{
        padding: "12px 24px",
        borderTop: "1px solid var(--ink-300)",
        display: "flex", gap: 24, alignItems: "center",
        fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em",
        textTransform: "uppercase", color: "var(--bone-500)",
        background: "var(--ink-050)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 10, height: 2, background: "oklch(0.65 0.15 145)" }} /> Promotion
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 10, height: 2, background: "oklch(0.55 0.18 25)" }} /> Relegation
        </div>
      </div>
    </div>
  );
};

const TopScorers = ({ teamId }) => {
  const SCORERS = {
    "1": [
      { name: "Marcel Behr", role: "Captain", pts: 84, frames: 28, color: "oklch(0.78 0.13 80)" },
      { name: "Tobias Krug", role: "9-Ball", pts: 71, frames: 26, color: "oklch(0.62 0.15 25)" },
      { name: "Jakob Wendel", role: "8-Ball", pts: 66, frames: 24, color: "oklch(0.62 0.13 240)" },
    ],
    "2": [
      { name: "Felix Born", role: "Captain", pts: 72, frames: 24, color: "oklch(0.78 0.13 80)" },
      { name: "Niko Lehmann", role: "10-Ball", pts: 64, frames: 22, color: "oklch(0.62 0.15 25)" },
      { name: "Sven Holzer", role: "8-Ball", pts: 58, frames: 20, color: "oklch(0.62 0.13 240)" },
    ],
    "3": [
      { name: "Ali Demir", role: "Captain", pts: 62, frames: 20, color: "oklch(0.78 0.13 80)" },
      { name: "Jana Petrova", role: "9-Ball", pts: 56, frames: 18, color: "oklch(0.62 0.15 25)" },
      { name: "Theo Kessler", role: "Straight Pool", pts: 50, frames: 16, color: "oklch(0.62 0.13 240)" },
    ],
  };
  const list = SCORERS[teamId];
  return (
    <div style={{
      background: "var(--ink-100)",
      border: "1px solid var(--ink-300)",
      borderRadius: 14,
      padding: 24,
      marginTop: 16,
    }}>
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.16em",
        textTransform: "uppercase", color: "var(--brass-500)", marginBottom: 16,
      }}>Top scorers — {TEAMS.find(t => t.id === teamId).name}</div>
      <div style={{ display: "grid", gap: 0 }}>
        {list.map((p, i) => (
          <div key={i} style={{
            display: "grid",
            gridTemplateColumns: "32px 1fr auto auto",
            gap: 16,
            alignItems: "center",
            padding: "14px 0",
            borderTop: i > 0 ? "1px solid var(--ink-300)" : "none",
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: `radial-gradient(circle at 30% 30%, ${p.color}, oklch(0.25 0.05 80))`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-000)", fontWeight: 700,
            }}>{i + 1}</div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 17, color: "var(--bone-100)" }}>{p.name}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--bone-500)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{p.role} · {p.frames} frames</div>
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--brass-500)", fontWeight: 500 }}>{p.pts}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--bone-500)", letterSpacing: "0.1em" }}>PTS</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StandingsBlock = ({ active }) => {
  const teams = active === "all" ? ["1", "2", "3"] : [active];
  return (
    <div style={{ display: "grid", gap: 32 }}>
      {teams.map(t => (
        <div key={t}>
          <StandingsTable teamId={t} />
          <TopScorers teamId={t} />
        </div>
      ))}
    </div>
  );
};

const CalendarApp = () => {
  const [active, setActive] = React.useState("all");
  const [tab, setTab] = React.useState("fixtures");

  React.useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty("--brass-500", "oklch(0.78 0.13 80)");
  }, []);

  React.useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("in-view");
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -80px 0px" });
    document.querySelectorAll(".reveal:not(.in-view)").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Nav2 />
      <PageHeader />
      <Games />
      <Footer />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<CalendarApp />);
