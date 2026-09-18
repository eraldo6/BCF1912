"use client";

import Link from "next/link";
import React from "react";
import { TRANSLATIONS } from "../lib/translations";

export default function NotFound() {
  const [lang, setLang] = React.useState("DE");

  React.useEffect(() => {
    const saved = localStorage.getItem("bcf_lang");
    if (saved) setLang(saved);
  }, []);

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
        404
      </p>
      <h1 style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(36px, 6vw, 72px)",
        color: "var(--bone-100)",
        fontWeight: 700,
        lineHeight: 1.1,
        marginBottom: 20,
      }}>
        {t("notfound.headline")}
      </h1>
      <p style={{
        color: "var(--bone-400)",
        fontSize: 16,
        maxWidth: 420,
        lineHeight: 1.6,
        marginBottom: 40,
      }}>
        {t("notfound.desc")}
      </p>
      <Link href="/" style={{
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
        textDecoration: "none",
        fontWeight: 600,
      }}>
        ← {t("nav.back")}
      </Link>
    </div>
  );
}
