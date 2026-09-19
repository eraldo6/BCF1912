"use client";

import { Nav, Footer } from "../../components/sections";
import { TranslationContext } from "../../components/translation-context";
import { TRANSLATIONS } from "../../lib/translations";
import React from "react";

const VORSTAND_GESCHAEFTSFUEHREND = [
  { name: "Max Mustermann",   rolle: "1. Vorsitzender" },
  { name: "Erika Musterfrau", rolle: "2. Vorsitzende"  },
  { name: "Hans Beispiel",    rolle: "Kassenwart"       },
];

const VORSTAND_ERWEITERT = [
  { name: "Maria Beispiel",   rolle: "Sportwart"        },
  { name: "Peter Muster",     rolle: "Schriftführer"    },
  { name: "Anna Muster",      rolle: "Beisitzerin"      },
  { name: "Klaus Beispiel",   rolle: "Beisitzer"        },
  { name: "Sara Musterfrau",  rolle: "Beisitzerin"      },
];

function PersonCard({ name, rolle }) {
  return (
    <div style={{
      background: "var(--ink-100)",
      border: "1px solid var(--ink-300)",
      borderRadius: 12,
      overflow: "hidden",
    }}>
      {/* Foto-Platzhalter */}
      <div style={{
        background: "var(--ink-200)",
        height: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}>
        <svg viewBox="0 0 200 220" style={{ width: "60%", opacity: 0.12 }} aria-hidden="true">
          <ellipse cx="100" cy="72" rx="38" ry="40" fill="var(--bone-100)" />
          <path d="M20 220 Q20 140 100 140 Q180 140 180 220Z" fill="var(--bone-100)" />
        </svg>
        <span style={{
          position: "absolute",
          bottom: 12,
          left: 14,
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--bone-600)",
        }}>Foto folgt</span>
      </div>
      <div style={{ padding: "16px 18px 20px" }}>
        <div style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, color: "var(--bone-100)", marginBottom: 5 }}>{name}</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--brass-500)" }}>{rolle}</div>
      </div>
    </div>
  );
}

function ImpressumBlock({ label, children }) {
  return (
    <div style={{ paddingBottom: 28, borderBottom: "1px solid var(--ink-300)", marginBottom: 28 }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--bone-500)", marginBottom: 10 }}>
        {label}
      </div>
      <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--bone-200)", lineHeight: 1.7 }}>
        {children}
      </div>
    </div>
  );
}

export default function ImpressumPage() {
  const [lang, setLang] = React.useState("DE");

  React.useEffect(() => {
    const saved = localStorage.getItem("bcf_lang");
    if (saved) setLang(saved);
  }, []);

  const t = (key) => TRANSLATIONS[lang]?.[key] || key;

  return (
    <TranslationContext.Provider value={{ lang, setLang, t }}>
      <Nav />
      <div style={{ minHeight: "100vh", background: "var(--ink-000)", paddingTop: 80 }}>

        {/* Header */}
        <div style={{
          borderBottom: "1px solid var(--ink-300)",
          padding: "48px 0 56px",
          background: "radial-gradient(ellipse at 70% 0%, color-mix(in srgb, var(--felt-700) 40%, transparent) 0%, transparent 60%)",
        }}>
          <div className="container">
            <a
              href="/"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none", opacity: 0.7, transition: "opacity 0.2s", marginBottom: 32 }}
              onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.querySelector(".back-underline").style.transform = "scaleX(1)"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = 0.7; e.currentTarget.querySelector(".back-underline").style.transform = "scaleX(0)"; }}
            >
              <span style={{ color: "var(--bone-500)", display: "inline-flex", flexDirection: "column", gap: 0 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 13 }}>←</span>
                  <span>{t("nav.back")}</span>
                </span>
                <span className="back-underline" style={{ display: "block", height: 1, background: "var(--bone-500)", transformOrigin: "left", transform: "scaleX(0)", transition: "transform 0.25s ease" }} />
              </span>
              <span style={{ color: "var(--bone-700)", fontWeight: 300 }}>/</span>
              <span style={{ color: "var(--brass-500)" }}>{t("nav.impressum")}</span>
            </a>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 7vw, 88px)", fontWeight: 700, color: "var(--bone-100)", lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 16 }}>
              Impressum &amp; <em style={{ fontStyle: "italic", color: "var(--brass-500)" }}>Vorstand</em>
            </h1>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--bone-400)", maxWidth: 480, lineHeight: 1.6 }}>
              Angaben gemäß § 5 DDG. Verantwortlich für den Betrieb dieser Website.
            </p>
          </div>
        </div>

        {/* Hauptinhalt: Impressum links, Vorstand rechts */}
        <div style={{ padding: "72px 0 100px" }}>
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px 80px", alignItems: "start" }}>

              {/* Impressum */}
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--bone-500)", marginBottom: 40, display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ display: "inline-block", width: 20, height: 1, background: "var(--bone-500)", opacity: 0.4 }} />
                  Impressum
                </div>

                <ImpressumBlock label="Angaben gemäß § 5 DDG">
                  Billard Club Frankfurt 1912 e.V.<br />
                  Borsigallee 45<br />
                  60388 Frankfurt am Main<br />
                  Deutschland
                </ImpressumBlock>

                <ImpressumBlock label="Vertreten durch">
                  Sydney Schindhelm<br />
                  <a href="mailto:info@bcfrankfurt.de" style={{ color: "var(--brass-500)", textDecoration: "none" }}>info@bcfrankfurt.de</a>
                </ImpressumBlock>

                <ImpressumBlock label="Kontakt">
                  E-Mail: <a href="mailto:info@bcfrankfurt.de" style={{ color: "var(--brass-500)", textDecoration: "none" }}>info@bcfrankfurt.de</a><br />
                  Telefon: 06109 / 36780
                </ImpressumBlock>

                <ImpressumBlock label="Registereintrag">
                  Eingetragen im Vereinsregister<br />
                  Registergericht: Frankfurt am Main<br />
                  Vereinsregisternummer: VR 8330
                </ImpressumBlock>

                <ImpressumBlock label="Bankverbindung">
                  Bank: Postbank Frankfurt am Main<br />
                  IBAN: DE13 5001 0060 0376 2416 07<br />
                  BIC: PBNKDEFFXXX
                </ImpressumBlock>

                <ImpressumBlock label="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
                  Sydney Schindhelm<br />
                  <a href="mailto:info@bcfrankfurt.de" style={{ color: "var(--brass-500)", textDecoration: "none" }}>info@bcfrankfurt.de</a>
                </ImpressumBlock>

                <ImpressumBlock label="Haftungsausschluss">
                  Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich. Alle hier verwendeten Namen, Begriffe, Zeichen und Grafiken können Marken- oder Warenzeichen im Besitze ihrer rechtlichen Eigentümer sein. Die Rechte aller erwähnten und benutzten Marken- und Warenzeichen liegen ausschließlich bei deren Besitzern.
                </ImpressumBlock>

                <div style={{ paddingTop: 4 }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--bone-500)", marginBottom: 10 }}>
                    Datenschutz
                  </div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--bone-200)", lineHeight: 1.7 }}>
                    Informationen zur Verarbeitung personenbezogener Daten findest du in unserer{" "}
                    <a href="/datenschutz" style={{ color: "var(--brass-500)", textDecoration: "underline", textUnderlineOffset: 3 }}>
                      Datenschutzerklärung
                    </a>.
                  </div>
                </div>
              </div>

              {/* Vorstand */}
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--bone-500)", marginBottom: 40, display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ display: "inline-block", width: 20, height: 1, background: "var(--bone-500)", opacity: 0.4 }} />
                  Der Vorstand
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--bone-600)", marginBottom: 16 }}>
                  Geschäftsführender Vorstand
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 40 }}>
                  {VORSTAND_GESCHAEFTSFUEHREND.map(p => <PersonCard key={p.name} {...p} />)}
                </div>

                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--bone-600)", marginBottom: 16 }}>
                  Erweiterter Vorstand
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
                  {VORSTAND_ERWEITERT.map((p, i) => (
                    <div key={p.name} style={{ width: "calc(33.333% - 11px)" }}>
                      <PersonCard {...p} />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
      <Footer />
    </TranslationContext.Provider>
  );
}
