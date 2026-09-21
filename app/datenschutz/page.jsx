"use client";

import { Nav, Footer } from "../../components/sections";
import { TranslationContext } from "../../components/translation-context";
import { TRANSLATIONS } from "../../lib/translations";
import React from "react";

function Section({ label, children }) {
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

function P({ children }) {
  return <p style={{ marginBottom: 12 }}>{children}</p>;
}

function A({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--brass-500)", textDecoration: "underline", textUnderlineOffset: 3 }}>
      {children}
    </a>
  );
}

export default function DatenschutzPage() {
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
        <div style={{ borderBottom: "1px solid var(--ink-300)", padding: "48px 0 56px" }}>
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
              <span style={{ color: "var(--brass-500)" }}>{t("nav.datenschutz")}</span>
            </a>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 7vw, 88px)", fontWeight: 700, color: "var(--bone-100)", lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 16 }}>
              Daten&shy;<em style={{ fontStyle: "italic", color: "var(--brass-500)" }}>schutz</em>
            </h1>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--bone-400)", maxWidth: 480, lineHeight: 1.6 }}>
              Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.
            </p>
          </div>
        </div>

        {/* Inhalt */}
        <div style={{ padding: "72px 0 100px" }}>
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 80px", alignItems: "start" }}>

              {/* Linke Spalte */}
              <div>
                <Section label="1. Verantwortlicher">
                  <P>Billard Club Frankfurt 1912 e.V.<br />
                  Borsigallee 45<br />
                  60388 Frankfurt am Main<br />
                  Deutschland</P>
                  <P>
                    E-Mail: <A href="mailto:info@bcfrankfurt.de">info@bcfrankfurt.de</A><br />
                    Telefon: 06109 / 36780
                  </P>
                  <P>Vertretungsberechtigte Person: Sydney Schindhelm</P>
                </Section>

                <Section label="2. Hosting">
                  <P>
                    Diese Website wird gehostet bei Vercel Inc., 340 Pine Street, Suite 701, San Francisco, CA 94104, USA.
                    Bei jedem Aufruf der Website werden technisch notwendige Verbindungsdaten (IP-Adresse, Zeitstempel, aufgerufene Seite, Browsertyp) in Server-Logfiles gespeichert.
                    Diese Daten werden ausschließlich zur Sicherstellung des Betriebs verwendet und nach spätestens 7 Tagen gelöscht.
                  </P>
                  <P>
                    Die Datenübertragung in die USA erfolgt auf Grundlage der EU-Standardvertragsklauseln gemäß Art. 46 Abs. 2 lit. c DSGVO.
                    Weitere Informationen: <A href="https://vercel.com/legal/privacy-policy">vercel.com/legal/privacy-policy</A>
                  </P>
                </Section>

                <Section label="3. Websiteanalyse (Vercel Analytics)">
                  <P>
                    Diese Website nutzt Vercel Analytics zur anonymisierten Auswertung von Seitenaufrufen.
                    Es werden keine Cookies gesetzt, keine IP-Adressen gespeichert und keine personenbezogenen Daten erhoben.
                    Die Auswertung erfolgt ausschließlich auf Basis aggregierter, nicht personenbeziehbarer Daten (Seitenaufrufe, Geräteklasse, Herkunftsland).
                  </P>
                  <P>
                    Eine Einwilligung ist nach § 25 Abs. 2 Nr. 2 TDDDG nicht erforderlich, da keine personenbezogenen Daten verarbeitet werden.
                  </P>
                </Section>

                <Section label="4. Schriften">
                  <P>
                    Diese Website verwendet Schriftarten (Space Grotesk, Cormorant Garamond, JetBrains Mono), die beim Build-Prozess lokal auf dem Server gespeichert werden.
                    Es findet kein Kontakt zu Google-Servern statt. Eine Übermittlung personenbezogener Daten an Dritte erfolgt nicht.
                  </P>
                </Section>
              </div>

              {/* Rechte Spalte */}
              <div>
                <Section label="5. Spieldaten (VeVeTo-Import)">
                  <P>
                    Spielpläne und Ergebnisse werden automatisiert von der Plattform VeVeTo (<A href="https://hpbv-veveto.de">hpbv-veveto.de</A>) importiert.
                    Dabei werden ausschließlich öffentlich zugängliche Spieldaten (Mannschaftsnamen, Spieltage, Ergebnisse) abgerufen.
                    Es werden keine personenbezogenen Daten übermittelt oder gespeichert.
                  </P>
                </Section>

                <Section label="6. Externe Links">
                  <P>
                    Diese Website enthält Links zu externen Websites, u.&nbsp;a. zu <A href="https://cuescore.com">cuescore.com</A>.
                    Für den Inhalt und die Datenschutzpraktiken dieser externen Seiten sind ausschließlich deren Betreiber verantwortlich.
                    Beim Anklicken eines Links verlässt du unsere Website — die Datenschutzerklärung des jeweiligen Anbieters gilt.
                  </P>
                </Section>

                <Section label="7. Kontakt per E-Mail">
                  <P>
                    Wenn du uns per E-Mail kontaktierst, werden deine Angaben (Name, E-Mail-Adresse, Nachrichteninhalt) zur Bearbeitung deiner Anfrage gespeichert.
                    Eine Weitergabe an Dritte erfolgt nicht. Die Daten werden gelöscht, sobald sie nicht mehr benötigt werden.
                    Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen).
                  </P>
                </Section>

                <Section label="8. Deine Rechte">
                  <P>Du hast gegenüber dem Verantwortlichen folgende Rechte:</P>
                  <ul style={{ paddingLeft: 20, marginBottom: 12 }}>
                    {[
                      "Auskunft über deine gespeicherten Daten (Art. 15 DSGVO)",
                      "Berichtigung unrichtiger Daten (Art. 16 DSGVO)",
                      "Löschung deiner Daten (Art. 17 DSGVO)",
                      "Einschränkung der Verarbeitung (Art. 18 DSGVO)",
                      "Datenübertragbarkeit (Art. 20 DSGVO)",
                      "Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)",
                    ].map(r => (
                      <li key={r} style={{ marginBottom: 6 }}>{r}</li>
                    ))}
                  </ul>
                  <P>
                    Du hast außerdem das Recht, dich bei der zuständigen Aufsichtsbehörde zu beschweren.
                    Für Hessen: <A href="https://www.datenschutz.hessen.de">Hessischer Beauftragter für Datenschutz und Informationsfreiheit</A>.
                  </P>
                </Section>

                <div style={{ paddingTop: 4 }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--bone-500)", marginBottom: 12 }}>
                    Stand
                  </div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--bone-400)", lineHeight: 1.8 }}>
                    September 2026. Diese Datenschutzerklärung wird bei Änderungen der Website oder der eingesetzten Dienste aktualisiert.
                  </div>
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
