export default function MaintenancePage() {
  return (
    <>
      <style>{`
        @keyframes orb-drift {
          0%   { transform: translate(0, 0) scale(1); opacity: 0.18; }
          33%  { transform: translate(40px, -30px) scale(1.1); opacity: 0.25; }
          66%  { transform: translate(-30px, 20px) scale(0.95); opacity: 0.15; }
          100% { transform: translate(0, 0) scale(1); opacity: 0.18; }
        }
        @keyframes orb-drift-2 {
          0%   { transform: translate(0, 0) scale(1); opacity: 0.12; }
          33%  { transform: translate(-50px, 40px) scale(1.05); opacity: 0.2; }
          66%  { transform: translate(30px, -20px) scale(0.9); opacity: 0.1; }
          100% { transform: translate(0, 0) scale(1); opacity: 0.12; }
        }
        @keyframes logo-pulse {
          0%, 100% { opacity: 0.9; filter: drop-shadow(0 0 0px transparent); }
          50%       { opacity: 1;   filter: drop-shadow(0 0 18px color-mix(in srgb, var(--brass-500) 40%, transparent)); }
        }
        @keyframes dots {
          0%   { content: ""; }
          25%  { content: "."; }
          50%  { content: ".."; }
          75%  { content: "..."; }
          100% { content: ""; }
        }
        .dots::after {
          content: "";
          animation: dots 2s steps(1) infinite;
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up-1 { animation: fade-up 0.7s ease both; }
        .fade-up-2 { animation: fade-up 0.7s 0.15s ease both; }
        .fade-up-3 { animation: fade-up 0.7s 0.3s ease both; }
        .fade-up-4 { animation: fade-up 0.7s 0.45s ease both; }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, var(--ink-050) 0%, transparent 120px), radial-gradient(ellipse at 15% -10%, color-mix(in srgb, var(--felt-700) 70%, transparent) 0%, var(--ink-050) 55%, var(--ink-000) 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 32,
        padding: "0 24px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>

        {/* Ambient orbs */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        }}>
          <div style={{
            position: "absolute", top: "15%", left: "20%",
            width: 500, height: 500, borderRadius: "50%",
            background: "radial-gradient(circle, color-mix(in srgb, var(--felt-700) 60%, transparent), transparent 70%)",
            animation: "orb-drift 12s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute", bottom: "10%", right: "15%",
            width: 400, height: 400, borderRadius: "50%",
            background: "radial-gradient(circle, color-mix(in srgb, var(--brass-500) 25%, transparent), transparent 70%)",
            animation: "orb-drift-2 16s ease-in-out infinite",
          }} />
        </div>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>
          <img
            className="fade-up-1"
            src="https://bcfrankfurt.de/wp-content/uploads/2018/02/BCF-Wappen_qu-200x200.png"
            alt="BC Frankfurt 1912 Wappen"
            style={{ width: 140, height: 140, objectFit: "contain", animation: "logo-pulse 3.5s ease-in-out infinite, fade-up 0.7s ease both" }}
          />

          <div className="fade-up-2" style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 5vw, 48px)",
            fontWeight: 700,
            color: "var(--bone-100)",
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}>
            BC Frankfurt <em style={{ color: "var(--brass-500)", fontStyle: "italic" }}>1912</em>
          </div>

          <div className="fade-up-3" style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(40px, 8vw, 72px)",
            fontWeight: 700,
            color: "var(--bone-100)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            textWrap: "balance",
          }}>
            Wir sind gleich <em style={{ color: "var(--brass-500)", fontStyle: "italic" }}>zurück</em>
          </div>

          <p className="fade-up-4 dots" style={{
            fontFamily: "var(--font-sans)",
            fontSize: 15,
            color: "var(--bone-400)",
            maxWidth: 420,
            lineHeight: 1.6,
          }}>
            Unsere Website wird gerade aktualisiert.<br />Bitte schau in Kürze wieder vorbei
          </p>
        </div>

      </div>
    </>
  )
}
