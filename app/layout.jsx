import "./globals.css";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Fraunces:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <style>{`@import url("https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap");`}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
