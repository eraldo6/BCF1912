import { Space_Grotesk, JetBrains_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { AuthHashRouter } from "./components/auth-hash-router";
import { Analytics } from "@vercel/analytics/next";
import { CookieBanner } from "../components/cookie-banner";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--loaded-space-grotesk",
  display: "block",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--loaded-cormorant",
  display: "block",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--loaded-jetbrains-mono",
  display: "swap",
});

export const metadata = {
  title: "BC Frankfurt 1912 — Frankfurt's Home of Billard Since 1912",
  description:
    "Billard Club Frankfurt 1912 e.V. — Karambol, Pool and Snooker. One of Germany's oldest billiard clubs. Borsigallee 45, Frankfurt am Main.",
  icons: {
    icon: "https://bcfrankfurt.de/wp-content/uploads/2018/02/BCF-Wappen_qu-200x200.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${cormorant.variable}`}>
      <body>
        <AuthHashRouter />
        <Analytics />
        <CookieBanner />
        <div id="page-wrap">{children}</div>
      </body>
    </html>
  );
}
