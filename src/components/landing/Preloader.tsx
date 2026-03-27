import { useEffect, useState, useRef } from "react";
import logoImage from "@/assets/montequad-logo-transparent.png";

// ─── Fuel Segment ──────────────────────────────────────────────────────────────
const FuelSegment = ({ filled, index }: { filled: boolean; index: number }) => (
  <div
    style={{
      flex: 1,
      height: "100%",
      background: filled
        ? "linear-gradient(180deg, hsl(168 100% 55%), hsl(150 90% 40%))"
        : "hsl(0 0% 100% / 0.04)",
      borderRadius: "2px",
      boxShadow: filled ? "0 0 6px hsl(155 90% 50% / 0.6)" : "none",
      transition: `background 0.1s ease ${index * 0.04}s, box-shadow 0.1s ease ${index * 0.04}s`,
    }}
  />
);

// ─── RPM Ring SVG ──────────────────────────────────────────────────────────────
const RpmRing = ({
  counter,
  isVisible,
  size,
}: {
  counter: number;
  isVisible: boolean;
  size: number;
}) => {
  const strokeW = 5;
  const r = size / 2 - strokeW - 2;
  const cx = size / 2;
  const cy = size / 2;
  const startAngle = 220;
  const arcSpan = 280;
  const circumference = 2 * Math.PI * r;
  const arcLength = (arcSpan / 360) * circumference;
  const filled = (counter / 100) * arcLength;
  const dashOffset = -(startAngle - 90) / 360 * circumference;

  const toRad = (deg: number) => (deg - 90) * (Math.PI / 180);

  // 11 tick marks
  const ticks = Array.from({ length: 11 }, (_, i) => {
    const angle = startAngle + (i / 10) * arcSpan;
    const rad = toRad(angle);
    const isMajor = i % 5 === 0;
    const inner = r - (isMajor ? 10 : 6);
    const outer = r - 1;
    return {
      x1: cx + Math.cos(rad) * inner,
      y1: cy + Math.sin(rad) * inner,
      x2: cx + Math.cos(rad) * outer,
      y2: cy + Math.sin(rad) * outer,
      lit: i <= Math.floor((counter / 100) * 10),
      major: isMajor,
    };
  });

  // Needle
  const needleAngle = startAngle + (counter / 100) * arcSpan;
  const needleRad = toRad(needleAngle);
  const needleOuter = r - 4;
  const needleInner = -(r * 0.2);
  const nx = cx + Math.cos(needleRad) * needleOuter;
  const ny = cy + Math.sin(needleRad) * needleOuter;
  const nx2 = cx + Math.cos(needleRad) * needleInner;
  const ny2 = cy + Math.sin(needleRad) * needleInner;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{
        position: "absolute",
        inset: 0,
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.8s ease 0.4s",
        filter: "drop-shadow(0 0 12px hsl(155 90% 38% / 0.55))",
        pointerEvents: "none",
      }}
    >
      <defs>
        <linearGradient id="rpmGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(140 85% 38%)" />
          <stop offset="50%" stopColor="hsl(155 100% 52%)" />
          <stop offset="100%" stopColor="hsl(168 100% 68%)" />
        </linearGradient>
        <filter id="glowFilter">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Outer decorative ring */}
      <circle
        cx={cx} cy={cy} r={size / 2 - 2}
        fill="none"
        stroke="hsl(150 30% 15% / 0.3)"
        strokeWidth="1"
        strokeDasharray="3 5"
      />

      {/* BG arc track */}
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke="hsl(150 20% 12% / 0.7)"
        strokeWidth={strokeW}
        strokeDasharray={`${arcLength} ${circumference - arcLength}`}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
      />

      {/* Filled arc */}
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke="url(#rpmGrad)"
        strokeWidth={strokeW}
        strokeDasharray={`${filled} ${circumference - filled}`}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        style={{ transition: "stroke-dasharray 0.1s ease" }}
      />

      {/* Tick marks */}
      {ticks.map((t, i) => (
        <line
          key={i}
          x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
          stroke={t.lit ? (t.major ? "hsl(168 100% 70%)" : "hsl(155 100% 60%)") : "hsl(150 18% 18%)"}
          strokeWidth={t.major ? "2" : "1.2"}
          strokeLinecap="round"
          style={{ transition: "stroke 0.08s ease" }}
        />
      ))}

      {/* Needle */}
      <line
        x1={nx2} y1={ny2} x2={nx} y2={ny}
        stroke="hsl(168 100% 72%)"
        strokeWidth="2"
        strokeLinecap="round"
        filter="url(#glowFilter)"
        style={{ transition: "x2 0.1s ease, y2 0.1s ease" }}
      />

      {/* Hub */}
      <circle cx={cx} cy={cy} r={5} fill="hsl(155 80% 18%)" stroke="hsl(168 100% 60%)" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r={2.5} fill="hsl(168 100% 65%)" />

      {/* RPM label */}
      <text
        x={cx}
        y={cy + r - 18}
        textAnchor="middle"
        fontSize="7.5"
        fill="hsl(0 0% 100% / 0.18)"
        fontFamily="'Space Grotesk', sans-serif"
        letterSpacing="3"
      >
        RPM
      </text>
    </svg>
  );
};

// ─── Dust particle ─────────────────────────────────────────────────────────────
const DustParticle = ({
  x, y, size, duration, delay, drift,
}: {
  x: number; y: number; size: number; duration: number; delay: number; drift: number;
}) => (
  <div
    style={{
      position: "absolute",
      left: `${x}%`,
      top: `${y}%`,
      width: `${size}px`,
      height: `${size * 0.55}px`,
      borderRadius: "50%",
      background: "hsl(28 55% 28% / 0.4)",
      animation: `dustFly ${duration}s ease-out ${delay}s infinite`,
      "--drift": `${drift}px`,
    } as React.CSSProperties}
  />
);

const DUST = [
  { x: 4,  y: 70, size: 4,   duration: 2.6, delay: 0.0, drift: -55 },
  { x: 9,  y: 76, size: 2.5, duration: 3.0, delay: 0.6, drift: -38 },
  { x: 2,  y: 80, size: 6,   duration: 2.3, delay: 1.1, drift: -68 },
  { x: 87, y: 70, size: 4,   duration: 2.6, delay: 0.3, drift: 55  },
  { x: 91, y: 76, size: 2.5, duration: 3.0, delay: 0.9, drift: 38  },
  { x: 94, y: 80, size: 6,   duration: 2.3, delay: 1.4, drift: 68  },
];

// ══════════════════════════════════════════════════════════════════════════════
const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"enter" | "show" | "exit">("enter");
  const [counter, setCounter] = useState(0);
  const [enginePulse, setEnginePulse] = useState(false);
  const counterRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pulseRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const enterTimer = setTimeout(() => setPhase("show"), 60);

    counterRef.current = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          if (counterRef.current) clearInterval(counterRef.current);
          return 100;
        }
        const remaining = 100 - prev;
        const step = Math.max(1, Math.floor(remaining * 0.07));
        return Math.min(100, prev + step);
      });
    }, 48);

    pulseRef.current = setInterval(() => setEnginePulse((p) => !p), 380);

    const exitTimer = setTimeout(() => setPhase("exit"), 2600);
    const doneTimer = setTimeout(() => onComplete(), 3300);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      if (counterRef.current) clearInterval(counterRef.current);
      if (pulseRef.current) clearInterval(pulseRef.current);
    };
  }, [onComplete]);

  const isVisible = phase === "show";
  const isExit = phase === "exit";

  // Responsive ring size — small on mobile, larger on desktop
  const RING_SIZE = 240;
  const LOGO_SIZE = 160; // logo is ~67% of ring so arc is clearly visible

  const segments = 12;
  const filledSegments = Math.floor((counter / 100) * segments);

  const statusText =
    counter < 25 ? "ENGINE START"
    : counter < 55 ? "LOADING TRAIL"
    : counter < 85 ? "GEAR UP"
    : "LET'S RIDE";

  return (
    <>
      <style>{`
        @keyframes dustFly {
          0%   { opacity: 0; transform: translate(0,0) scale(0.5); }
          20%  { opacity: 0.6; }
          100% { opacity: 0; transform: translate(var(--drift), -80px) scale(1.4); }
        }
        @keyframes logoReveal {
          from { opacity: 0; transform: scale(0.82); filter: blur(14px); }
          to   { opacity: 1; transform: scale(1);   filter: blur(0); }
        }
        @keyframes logoPulse {
          0%, 100% { filter: drop-shadow(0 0 18px hsl(150 65% 26% / 0.85)) drop-shadow(0 3px 12px hsl(0 0% 0% / 0.95)); }
          50%       { filter: drop-shadow(0 0 32px hsl(150 75% 34% / 1))    drop-shadow(0 3px 12px hsl(0 0% 0% / 0.95)); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bracketPulse {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 0.85; }
        }
        @keyframes scanLine {
          0%   { top: -2px; opacity: 0.45; }
          100% { top: 102%; opacity: 0; }
        }
        @keyframes terrainDrift {
          from { background-position: 0 0; }
          to   { background-position: -40px 0; }
        }
        @keyframes engineGlow {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50%       { opacity: 1;    transform: scale(1.05); }
        }
        @keyframes groundRumble {
          0%, 100% { transform: scaleX(1); }
          50%       { transform: scaleX(1.012); }
        }
        @keyframes counterFlicker {
          0%, 93%, 100% { opacity: 1; }
          95%            { opacity: 0.35; }
          97%            { opacity: 1; }
          99%            { opacity: 0.55; }
        }
        @keyframes trackRoll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes ringReveal {
          from { opacity: 0; transform: scale(0.88) rotate(-10deg); }
          to   { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes outerRingRotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>

      {/* ════ MAIN WRAPPER ════ */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99999,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(ellipse 120% 80% at 50% 48%, hsl(150 38% 5%) 0%, hsl(220 28% 3%) 55%, hsl(220 18% 1%) 100%)",
          opacity: isExit ? 0 : 1,
          transition: isExit ? "opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
          overflow: "hidden",
        }}
      >
        {/* Terrain grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage:
            "linear-gradient(0deg, hsl(150 28% 12% / 0.06) 1px, transparent 1px), linear-gradient(90deg, hsl(150 28% 12% / 0.05) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          animation: isVisible ? "terrainDrift 1.8s linear infinite" : "none",
          opacity: isVisible ? 0.8 : 0,
          transition: "opacity 1s ease",
        }} />

        {/* Ground glow */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: "35%",
          background: "linear-gradient(0deg, hsl(150 45% 7% / 0.45) 0%, transparent 100%)",
          pointerEvents: "none",
        }} />

        {/* Tyre tracks */}
        {[{ bottom: 28, delay: 0 }, { bottom: 7, delay: 0.9 }].map((t, idx) => (
          <div key={idx} style={{
            position: "absolute", left: 0, right: 0, bottom: `${t.bottom}px`,
            height: "11px", overflow: "hidden", opacity: 0.14, pointerEvents: "none",
          }}>
            <div style={{
              display: "flex", gap: "5px",
              animation: `trackRoll 2.5s linear ${t.delay}s infinite`,
              width: "200%",
            }}>
              {Array.from({ length: 36 }).map((_, i) => (
                <div key={i} style={{
                  width: "15px", height: "11px", flexShrink: 0, borderRadius: "2px",
                  background: "hsl(150 40% 28%)",
                  borderTop: "2px solid hsl(150 50% 36%)",
                  borderBottom: "2px solid hsl(150 28% 16%)",
                }} />
              ))}
            </div>
          </div>
        ))}

        {/* Dust particles */}
        {DUST.map((d, i) => <DustParticle key={i} {...d} />)}

        {/* Ambient glow */}
        <div style={{
          position: "absolute",
          width: `${RING_SIZE + 160}px`,
          height: `${RING_SIZE + 160}px`,
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, hsl(150 60% 18% / 0.25) 0%, transparent 65%)",
          filter: "blur(55px)",
          animation: isVisible ? "engineGlow 1.5s ease-in-out infinite" : "none",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 1.2s ease",
        }} />

        {/* ══ MAIN CONTENT ══ */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.9rem",
          zIndex: 5,
          width: "100%",
        }}>

          {/* ── RING + LOGO ── */}
          <div style={{
            position: "relative",
            width: `${RING_SIZE}px`,
            height: `${RING_SIZE}px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: isVisible ? "ringReveal 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards" : "none",
            opacity: isVisible ? undefined : 0,
          }}>

            {/* Outer dashed spinning ring */}
            <div style={{
              position: "absolute",
              inset: -8,
              borderRadius: "50%",
              border: "1px dashed hsl(150 40% 22% / 0.4)",
              animation: isVisible ? "outerRingRotate 12s linear infinite" : "none",
              opacity: isVisible ? 1 : 0,
              transition: "opacity 1s ease 0.5s",
            }} />

            {/* RPM arc ring */}
            <RpmRing counter={counter} isVisible={isVisible} size={RING_SIZE} />

            {/* Corner HUD brackets */}
            {[
              { top: 4,    left: 4,    borderTop: "2px solid hsl(168 100% 52% / 0.7)", borderLeft:  "2px solid hsl(168 100% 52% / 0.7)", delay: "0s"   },
              { top: 4,    right: 4,   borderTop: "2px solid hsl(168 100% 52% / 0.7)", borderRight: "2px solid hsl(168 100% 52% / 0.7)", delay: "0.5s" },
              { bottom: 4, left: 4,    borderBottom: "2px solid hsl(168 100% 52% / 0.7)", borderLeft:  "2px solid hsl(168 100% 52% / 0.7)", delay: "1s"   },
              { bottom: 4, right: 4,   borderBottom: "2px solid hsl(168 100% 52% / 0.7)", borderRight: "2px solid hsl(168 100% 52% / 0.7)", delay: "1.5s" },
            ].map((b, i) => (
              <div key={i} style={{
                position: "absolute",
                width: 18, height: 18,
                ...b,
                animation: isVisible ? `bracketPulse 2s ease-in-out ${b.delay} infinite` : "none",
                transition: "opacity 0.6s ease",
              }} />
            ))}

            {/* Logo image */}
            <div style={{
              position: "relative",
              width: `${LOGO_SIZE}px`,
              height: `${LOGO_SIZE}px`,
              zIndex: 2,
            }}>
              {/* Scan line over logo */}
              <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 3, pointerEvents: "none" }}>
                <div style={{
                  position: "absolute", left: 0, right: 0, height: "2px",
                  background: "linear-gradient(90deg, transparent, hsl(168 100% 60% / 0.4), transparent)",
                  animation: isVisible ? "scanLine 2.8s ease-in-out 1s infinite" : "none",
                }} />
              </div>
              <img
                src={logoImage}
                alt="MonteQuad & Buggy Kolasin"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  display: "block",
                  mixBlendMode: "screen",
                  animation: isVisible ? "logoPulse 2.4s ease-in-out 1.2s infinite" : "none",
                } as React.CSSProperties}
              />
            </div>

            {/* Counter inside ring at bottom */}
            <div style={{
              position: "absolute",
              bottom: 18,
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "'Space Grotesk', monospace",
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: "hsl(155 100% 65% / 0.92)",
              textShadow: "0 0 14px hsl(155 100% 55% / 0.75)",
              animation: isVisible ? "counterFlicker 2.5s ease 2s infinite" : "none",
              zIndex: 4,
              whiteSpace: "nowrap",
            }}>
              {String(counter).padStart(3, "0")}%
            </div>
          </div>

          {/* ── Status + engine pulse dots ── */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            opacity: isVisible ? 1 : 0,
            animation: isVisible ? "slideUp 0.7s ease 0.65s both" : "none",
          }}>
            {[true, false].map((side, idx) => (
              <div key={idx} style={{
                width: 5, height: 5, borderRadius: "50%",
                background: (side ? enginePulse : !enginePulse)
                  ? "hsl(168 100% 58%)"
                  : "hsl(150 35% 20%)",
                boxShadow: (side ? enginePulse : !enginePulse)
                  ? "0 0 8px hsl(168 100% 55%), 0 0 18px hsl(168 100% 45% / 0.5)"
                  : "none",
                transition: "all 0.15s ease",
              }} />
            )).reduce((acc: React.ReactNode[], el, idx) => {
              if (idx === 1) {
                return [
                  acc[0],
                  <span key="label" style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.57rem",
                    fontWeight: 600,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "hsl(155 75% 58% / 0.75)",
                  }}>{statusText}</span>,
                  el,
                ];
              }
              return [...acc, el];
            }, [])}
          </div>

          {/* ── FUEL BAR ── */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.4rem",
            opacity: isVisible ? 1 : 0,
            animation: isVisible ? "slideUp 0.7s ease 0.85s both" : "none",
          }}>
            {/* Label row */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <svg width="9" height="12" viewBox="0 0 10 13" fill="none">
                  <path d="M5 1 C5 1, 1 6, 1 8.5 A4 4 0 0 0 9 8.5 C9 6 5 1 5 1Z" fill="hsl(155 90% 52% / 0.65)" />
                </svg>
                <span style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.47rem",
                  letterSpacing: "0.36em",
                  color: "hsl(0 0% 100% / 0.22)",
                  textTransform: "uppercase",
                }}>FUEL</span>
              </div>
              <span style={{
                fontFamily: "'Space Grotesk', monospace",
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "hsl(155 100% 62% / 0.88)",
                minWidth: "2.4rem",
                textAlign: "right",
                animation: isVisible ? "counterFlicker 2.2s ease 2.2s infinite" : "none",
              }}>
                {String(counter).padStart(3, "0")}%
              </span>
            </div>

            {/* Segmented bar */}
            <div style={{
              display: "flex",
              gap: "2px",
              width: "min(200px, 56vw)",
              height: "10px",
              padding: "1.5px",
              background: "hsl(0 0% 100% / 0.04)",
              borderRadius: "4px",
              border: "1px solid hsl(150 35% 22% / 0.35)",
              boxShadow: "inset 0 1px 4px hsl(0 0% 0% / 0.5), 0 0 16px hsl(150 50% 14% / 0.25)",
            }}>
              {Array.from({ length: segments }).map((_, i) => (
                <FuelSegment key={i} filled={i < filledSegments} index={i} />
              ))}
            </div>

            {/* Tagline */}
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.43rem",
              letterSpacing: "0.45em",
              color: "hsl(0 0% 100% / 0.1)",
              textTransform: "uppercase",
              marginTop: "1px",
            }}>
              Kolašin · Montenegro
            </div>
          </div>
        </div>

        {/* Ground rumble line */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "2px",
          background:
            "linear-gradient(90deg, transparent 5%, hsl(150 55% 28% / 0.4) 28%, hsl(168 100% 48% / 0.65) 50%, hsl(150 55% 28% / 0.4) 72%, transparent 95%)",
          boxShadow: "0 -5px 20px hsl(150 55% 20% / 0.45)",
          animation: isVisible ? "groundRumble 0.42s ease-in-out infinite" : "none",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 1s ease 0.5s",
        }} />
      </div>
    </>
  );
};

export default Preloader;
