"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TRANSLATIONS } from "../lib/translations";

export default function Error({ error, reset }) {
  const [lang, setLang] = useState("DE");

  useEffect(() => {
    console.error(error);
    const saved = localStorage.getItem("bcf_lang");
    if (saved) setLang(saved);
  }, [error]);

  const t = (key) => TRANSLATIONS[lang]?.[key] || key;

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--ink-000)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 24px",
      textAlign: "center",
    }}>
      <p style={{
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: "var(--bone-500)",
        marginBottom: 24,
      }}>
        {t("error.eyebrow")}
      </p>
      <h1 style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(36px, 6vw, 72px)",
        color: "var(--bone-100)",
        fontWeight: 700,
        lineHeight: 1.1,
        marginBottom: 20,
      }}>
        {t("error.headline")}
      </h1>
      <p style={{
        color: "var(--bone-400)",
        fontSize: 16,
        maxWidth: 420,
        lineHeight: 1.6,
        marginBottom: 40,
      }}>
        {t("error.desc")}
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <button
          onClick={reset}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 24px",
            background: "var(--brass-500)",
            color: "var(--ink-000)",
            borderRadius: 8,
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.08em",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          {t("error.retry")}
        </button>
        <Link href="/" style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "12px 24px",
          background: "transparent",
          color: "var(--bone-300)",
          border: "1px solid var(--ink-300)",
          borderRadius: 8,
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          letterSpacing: "0.08em",
          textDecoration: "none",
        }}>
          ← {t("nav.back")}
        </Link>
      </div>
    </div>
  );
}
