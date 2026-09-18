"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body style={{
        margin: 0,
        minHeight: "100vh",
        background: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 24px",
        textAlign: "center",
        fontFamily: "system-ui, sans-serif",
      }}>
        <p style={{
          fontSize: 11,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "#666",
          marginBottom: 24,
        }}>
          Fehler
        </p>
        <h1 style={{
          fontSize: "clamp(32px, 5vw, 64px)",
          color: "#f0ece4",
          fontWeight: 700,
          lineHeight: 1.1,
          marginBottom: 20,
        }}>
          Etwas ist schiefgelaufen.
        </h1>
        <p style={{
          color: "#888",
          fontSize: 15,
          maxWidth: 400,
          lineHeight: 1.6,
          marginBottom: 40,
        }}>
          Ein schwerwiegender Fehler ist aufgetreten. Bitte versuche es erneut.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={reset}
            style={{
              padding: "12px 24px",
              background: "#c9a84c",
              color: "#0a0a0a",
              borderRadius: 8,
              fontSize: 12,
              letterSpacing: "0.08em",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Erneut versuchen
          </button>
          <a href="/" style={{
            padding: "12px 24px",
            background: "transparent",
            color: "#aaa",
            border: "1px solid #333",
            borderRadius: 8,
            fontSize: 12,
            letterSpacing: "0.08em",
            textDecoration: "none",
          }}>
            ← Zur Startseite
          </a>
        </div>
      </body>
    </html>
  );
}
