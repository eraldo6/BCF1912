/* SVG visuals: pool table, balls, icons */

const PoolTableHero = ({ tilt = -8 }) => (
  <svg
    viewBox="0 0 1400 700"
    width="100%"
    height="100%"
    style={{
      transform: `perspective(1200px) rotateX(28deg) rotateZ(${tilt}deg)`,
      maxWidth: "1400px",
      margin: "0 auto",
      display: "block",
      filter: "drop-shadow(0 60px 80px rgba(0,0,0,0.7))",
    }}
  >
    <defs>
      <radialGradient id="feltGrad" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="oklch(0.42 0.08 155)" />
        <stop offset="60%" stopColor="oklch(0.32 0.07 155)" />
        <stop offset="100%" stopColor="oklch(0.22 0.05 155)" />
      </radialGradient>
      <linearGradient id="rail" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3a2618" />
        <stop offset="100%" stopColor="#1a0e07" />
      </linearGradient>
      <radialGradient id="cueBall" cx="35%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="60%" stopColor="#e8e3d6" />
        <stop offset="100%" stopColor="#a89e8a" />
      </radialGradient>
      <radialGradient id="redBall" cx="35%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#ff8a78" />
        <stop offset="60%" stopColor="#c43a2a" />
        <stop offset="100%" stopColor="#5a1a10" />
      </radialGradient>
      <radialGradient id="yellowBall" cx="35%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#ffe8a0" />
        <stop offset="60%" stopColor="#d4a82a" />
        <stop offset="100%" stopColor="#604010" />
      </radialGradient>
      <filter id="shadow">
        <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.6" />
      </filter>
    </defs>

    {/* Outer rail */}
    <rect x="40" y="40" width="1320" height="620" rx="40" fill="url(#rail)" />

    {/* Felt */}
    <rect x="100" y="100" width="1200" height="500" rx="12" fill="url(#feltGrad)" />

    {/* Felt weave overlay */}
    <rect x="100" y="100" width="1200" height="500" rx="12" fill="url(#feltGrad)" opacity="0.5" />

    {/* Pockets */}
    {[
      [100, 100], [700, 100], [1300, 100],
      [100, 600], [700, 600], [1300, 600],
    ].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r="28" fill="#000" opacity="0.85" />
    ))}

    {/* Center spot */}
    <circle cx="700" cy="350" r="3" fill="#fff" opacity="0.3" />

    {/* Triangle rack ghost */}
    <g opacity="0.15" stroke="#fff" strokeWidth="1" fill="none">
      <polygon points="900,310 980,350 900,390" />
    </g>

    {/* Balls in rack */}
    <g filter="url(#shadow)">
      <circle cx="900" cy="350" r="14" fill="url(#redBall)" />
      <circle cx="930" cy="335" r="14" fill="url(#yellowBall)" />
      <circle cx="930" cy="365" r="14" fill="url(#redBall)" />
      <circle cx="960" cy="320" r="14" fill="url(#yellowBall)" />
      <circle cx="960" cy="350" r="14" fill="url(#redBall)" />
      <circle cx="960" cy="380" r="14" fill="url(#yellowBall)" />
    </g>

    {/* Cue ball */}
    <g filter="url(#shadow)">
      <circle cx="380" cy="350" r="14" fill="url(#cueBall)" />
    </g>

    {/* Cue stick */}
    <g transform="rotate(0 380 350)">
      <line x1="180" y1="350" x2="350" y2="350" stroke="#3a2618" strokeWidth="6" strokeLinecap="round" />
      <line x1="180" y1="350" x2="200" y2="350" stroke="#1a0e07" strokeWidth="6" strokeLinecap="round" />
      <circle cx="358" cy="350" r="3" fill="#5a8aa0" />
    </g>

    {/* Diamonds */}
    {[280, 460, 640, 820, 1000, 1180].map((x, i) => (
      <g key={i}>
        <polygon points={`${x},85 ${x + 6},92 ${x},99 ${x - 6},92`} fill="#d4a86a" opacity="0.7" />
        <polygon points={`${x},601 ${x + 6},608 ${x},615 ${x - 6},608`} fill="#d4a86a" opacity="0.7" />
      </g>
    ))}
  </svg>
);

const ScrollCue = () => (
  <div style={{
    position: "absolute",
    bottom: 40,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    zIndex: 5,
  }}>
    <div style={{
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: "var(--bone-500)",
    }}>Scroll</div>
    <div style={{
      width: 1,
      height: 40,
      background: "linear-gradient(to bottom, var(--brass-500), transparent)",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 12,
        background: "var(--brass-500)",
        animation: "scroll-cue 2.4s infinite",
      }} />
    </div>
  </div>
);

const Arrow = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className="btn-arrow">
    <path d="M2 8h12m0 0L9 3m5 5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowOut = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M5 11L11 5M11 5H6M11 5V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TableIcon = ({ type = "pool", size = 60 }) => {
  if (type === "carom") {
    // No pockets
    return (
      <svg width={size * 1.6} height={size} viewBox="0 0 96 60">
        <rect x="3" y="3" width="90" height="54" rx="6" fill="#3a2618" />
        <rect x="9" y="9" width="78" height="42" rx="2" fill="oklch(0.32 0.07 155)" />
        <circle cx="30" cy="30" r="2.5" fill="#fff" />
        <circle cx="60" cy="22" r="2.5" fill="#d4a82a" />
        <circle cx="60" cy="38" r="2.5" fill="#c43a2a" />
      </svg>
    );
  }
  if (type === "snooker") {
    return (
      <svg width={size * 1.8} height={size} viewBox="0 0 108 60">
        <rect x="3" y="3" width="102" height="54" rx="6" fill="#3a2618" />
        <rect x="9" y="9" width="90" height="42" rx="2" fill="oklch(0.22 0.05 155)" />
        {[[9, 9], [54, 9], [99, 9], [9, 51], [54, 51], [99, 51]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="#000" />
        ))}
        <circle cx="22" cy="30" r="2" fill="#fff" />
        <circle cx="86" cy="30" r="2" fill="#000" />
      </svg>
    );
  }
  return (
    <svg width={size * 1.7} height={size} viewBox="0 0 102 60">
      <rect x="3" y="3" width="96" height="54" rx="6" fill="#3a2618" />
      <rect x="9" y="9" width="84" height="42" rx="2" fill="oklch(0.32 0.07 155)" />
      {[[9, 9], [51, 9], [93, 9], [9, 51], [51, 51], [93, 51]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="#000" />
      ))}
      <circle cx="20" cy="30" r="2" fill="#fff" />
      <polygon points="70,30 78,26 78,34" fill="#c43a2a" />
    </svg>
  );
};

const Placeholder = ({ label, ratio }) => (
  <div className="placeholder-img" style={ratio ? { aspectRatio: ratio } : null}>
    <div>{label}</div>
  </div>
);

const FeltSwatch = ({ color = "var(--felt-700)", style }) => (
  <div style={{
    background: color,
    width: "100%",
    height: "100%",
    backgroundImage:
      "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)",
    backgroundSize: "3px 3px",
    ...style,
  }} />
);

Object.assign(window, {
  PoolTableHero, ScrollCue, Arrow, ArrowOut, TableIcon, Placeholder, FeltSwatch,
});
