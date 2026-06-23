"use client";

import React from "react";

/* Games Section — Display matches and standings with season selector */

const AVAILABLE_SEASONS = [
  { id: "5", name: "2024/2025" },
  { id: "4", name: "2023/2024" },
  { id: "3", name: "2022/2023" },
];

export const Games = () => {
  const [selectedSeason, setSelectedSeason] = React.useState("5"); // Current season
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [showSeasonPicker, setShowSeasonPicker] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/data/bcf_season_${selectedSeason}.json`);

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
    const isBCF = match.home_team.includes("BC Frankfurt") || match.away_team.includes("BC Frankfurt");

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

                {/* Standings Table */}
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

                {/* Recent Matches */}
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
