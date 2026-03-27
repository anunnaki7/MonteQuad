import { useEffect, useState, useRef } from "react";
import logoImage from "@/assets/montequad-logo-transparent.png";

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
      background: `hsl(28 55% 28% / 0.45)`,
      animation: `dustFly ${duration}s ease-out ${delay}s infinite`,
      "--drift": `${drift}px`,
    } as React.CSSProperties}
  />
);

// ─── Speed line ────────────────────────────────────────────────────────────────
const SpeedLine = ({ y, delay, opacity }: { y: number; delay: number; opacity: number }) => (
  <div
    style={{
      position: "absolute",
      left: "-20%",
      top: `${y}%`,
      height: "1px",
      width: "140%",
      background: `linear-gradient(90deg, transparent 0%, hsl(150 80% 40% / ${opacity}) 40%, hsl(168 100% 55% / ${opacity * 1.2}) 60%, transparent 100%)`,
      animation: `speedSweep ${1.9 + delay * 0.4}s ease-in-out ${delay}s infinite`,
    }}
  />
);

// ─── Fuel Segment ──────────────────────────────────────────────────────────────
const FuelSegment = ({ filled, index }: { filled: boolean; index: number }) => {
  const color =
    index < 4
      ? "linear-gradient(180deg, hsl(168 100% 50%), hsl(150 90% 38%))"
      : index < 8
      ? "linear-gradient(180deg, hsl(150 90% 52%), hsl(140 80% 38%))"
      : "linear-gradient(180deg, hsl(130 90% 50%), hsl(120 80% 35%))";

  return (
    <div
      style={{
        flex: 1,
        height: "100%",
        background: filled ? color : "hsl(0 0% 100% / 0.04)",
        borderRadius: "2px",
        boxShadow: filled ? `0 0 7px hsl(155 90% 50% / 0.55)` : "none",
        transition: `background 0.12s ease ${index * 0.045}s, box-shadow 0.12s ease ${index * 0.045}s`,
      }}
    />
  );
};

const DUST = [
  { x: 5,  y: 60, size: 5,   duration: 2.6, delay: 0.0, drift: -60 },
  { x: 10, y: 67, size: 3,   duration: 3.0, delay: 0.5, drift: -42 },
  { x: 3,  y: 72, size: 7,   duration: 2.3, delay: 1.0, drift: -75 },
  { x: 14, y: 56, size: 4,   duration: 3.4, delay: 1.4, drift: -48 },
  { x: 7,  y: 76, size: 5.5, duration: 2.7, delay: 1.9, drift: -55 },
  { x: 83, y: 60, size: 5,   duration: 2.6, delay: 0.3, drift: 60 },
  { x: 89, y: 67, size: 3,   duration: 3.0, delay: 0.8, drift: 42 },
  { x: 93, y: 72, size: 7,   duration: 2.3, delay: 1.2, drift: 75 },
  { x: 86, y: 56, size: 4,   duration: 3.4, delay: 1.7, drift: 48 },
  { x: 96, y: 76, size: 5.5, duration: 2.7, delay: 0.1, drift: 55 },
];

const SPEEDLINES = [
  { y: 25, delay: 0.0, opacity: 0.09 },
  { y: 35, delay: 0.4, opacity: 0.06 },
  { y: 45, delay: 0.8, opacity: 0.11 },
  { y: 55, delay: 0.2, opacity: 0.05 },
  { y: 65, delay: 1.1, opacity: 0.08 },
];

// ─── RPM Arc SVG ───────────────────────────────────────────────────────────────
const RpmGauge = ({ counter, isVisible }: { counter: number; isVisible: boolean }) => {
  const r = 48;
  const cx = 60;
  const cy = 60;
  const startAngle = 215;
  const arcSpan = 250;
  const circumference = 2 * Math.PI * r;
  const arcLength = (arcSpan / 360) * circumference;
  const filled = (counter / 100) * arcLength;

  const toRad = (deg: number) => (deg - 90) * (Math.PI / 180);

  const needleAngle = startAngle + (counter / 100) * arcSpan;
  const needleRad = toRad(needleAngle);
  const needleLen = 34;
  const nx = cx + Math.cos(needleRad) * needleLen;
  const ny = cy + Math.sin(needleRad) * needleLen;

  const ticks = Array.from({ length: 7 }, (_, i) => {
    const angle = startAngle + (i / 6) * arcSpan;
    const rad = toRad(angle);
    const inner = 38;
    const outer = 48;
    return {
      x1: cx + Math.cos(rad) * inner,
      y1: cy + Math.sin(rad) * inner,
      x2: cx + Math.cos(rad) * outer,
      y2: cy + Math.sin(rad) * outer,
      lit: i <= Math.floor((counter / 100) * 6),
    };
  });

  return (
    <svg
      width="120"
      height="88"
      viewBox="0 0 120 88"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.8s ease 0.6s",
        filter: "drop-shadow(0 0 8px hsl(155 90% 40% / 0.4))",
        flexShrink: 0,
      }}
    >
      {/* Track arc */}
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke="hsl(150 30% 15% / 0.5)"
        strokeWidth="5"
        strokeDasharray={`${arcLength} ${circumference - arcLength}`}
        strokeDashoffset={circumference * 0.375}
        strokeLinecap="round"
      />
      {/* Filled arc */}
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke="url(#rpmGrad)"
        strokeWidth="5"
        strokeDasharray={`${filled} ${circumference - filled}`}
        strokeDashoffset={circumference * 0.375}
        strokeLinecap="round"
        style={{ transition: "stroke-dasharray 0.15s ease" }}
      />
      {/* Tick marks */}
      {ticks.map((t, i) => (
        <line
          key={i}
          x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
          stroke={t.lit ? "hsl(155 100% 60%)" : "hsl(150 25% 22%)"}
          strokeWidth={i === 0 || i === 6 ? "2" : "1.5"}
          strokeLinecap="round"
          style={{ transition: "stroke 0.1s ease" }}
        />
      ))}
      {/* Needle */}
      <line
        x1={cx} y1={cy}
        x2={nx} y2={ny}
        stroke="hsl(168 100% 65%)"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{ transition: "x2 0.15s ease, y2 0.15s ease", filter: "drop-shadow(0 0 4px hsl(168 100% 55%))" }}
      />
      {/* Hub */}
      <circle cx={cx} cy={cy} r={3.5} fill="hsl(168 100% 60%)" style={{ filter: "drop-shadow(0 0 5px hsl(168 100% 55%))" }} />
      {/* RPM label */}
      <text x={cx} y={cy + 14} textAnchor="middle" fontSize="6.5" fill="hsl(0 0% 100% / 0.22)" fontFamily="'Space Grotesk', sans-serif" letterSpacing="2">RPM</text>
      <defs>
        <linearGradient id="rpmGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(150 90% 45%)" />
          <stop offset="60%" stopColor="hsl(155 100% 55%)" />
          <stop offset="100%" stopColor="hsl(168 100% 65%)" />
        </linearGradient>
      </defs>
    </svg>
  );
};

// ─── Tyre Track strip ──────────────────────────────────────────────────────────
const TyreTrack = ({ bottom, delay }: { bottom: number; delay: number }) => (
  <div
    style={{
      position: "absolute",
      left: 0, right: 0,
      bottom: `${bottom}px`,
      height: "12px",
      overflow: "hidden",
      opacity: 0.15,
      pointerEvents: "none",
    }}
  >
    <div
      style={{
        display: "flex",
        gap: "5px",
        animation: `trackRoll 2.8s linear ${delay}s infinite`,
        width: "200%",
      }}
    >
      {Array.from({ length: 36 }).map((_, i) => (
        <div
          key={i}
          style={{
            width: "16px",
            height: "12px",
            flexShrink: 0,
            borderRadius: "2px",
            background: "hsl(150 40% 30%)",
            borderTop: "2px solid hsl(150 50% 40%)",
            borderBottom: "2px solid hsl(150 30% 18%)",
          }}
        />
      ))}
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════════════════════════
const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"enter" | "show" | "exit">("enter");
  const [counter, setCounter] = useState(0);
  const [enginePulse, setEnginePulse] = useState(false);
  const counterRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pulseRef   = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const enterTimer = setTimeout(() => setPhase("show"), 60);

    counterRef.current = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) { if (counterRef.current) clearInterval(counterRef.current); return 100; }
        const step = Math.max(1, Math.floor((100 - prev) * 0.065));
        return Math.min(100, prev + step);
      });
    }, 52);

    pulseRef.current = setInterval(() => setEnginePulse((p) => !p), 380);

    const exitTimer = setTimeout(() => setPhase("exit"), 2300);
    const doneTimer = setTimeout(() => onComplete(), 3050);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      if (counterRef.current) clearInterval(counterRef.current);
      if (pulseRef.current)   clearInterval(pulseRef.current);
    };
  }, [onComplete]);

  const isVisible = phase === "show";
  const isExit    = phase === "exit";

  const segments      = 12;
  const filledSegs    = Math.floor((counter / 100) * segments);

  const statusText =
    counter < 25 ? "ENGINE START"
    : counter < 55 ? "LOADING TRAIL"
    : counter < 85 ? "GEAR UP"
    : "LET'S RIDE";

  return (
    <>
      <style>{`
        @keyframes dustFly {
          0%   { opacity:0; transform:translate(0,0) scale(0.5) rotate(0deg); }
          20%  { opacity:0.7; }
          100% { opacity:0; transform:translate(var(--drift),-85px) scale(1.5) rotate(50deg); }
        }
        @keyframes speedSweep {
          0%   { transform:translateX(-55%) scaleX(0.2); opacity:0; }
          30%  { opacity:1; }
          70%  { opacity:0.5; }
          100% { transform:translateX(55%) scaleX(1.3); opacity:0; }
        }
        @keyframes trackRoll {
          from { transform:translateX(0); }
          to   { transform:translateX(-50%); }
        }
        @keyframes logoReveal {
          from { opacity:0; transform:scale(0.88) translateY(14px); filter:blur(12px); }
          to   { opacity:1; transform:scale(1)    translateY(0);    filter:blur(0); }
        }
        @keyframes logoBounce {
          0%,100% { transform:translateY(0px); }
          50%     { transform:translateY(-4px); }
        }
        @keyframes slideUp {
          from { opacity:0; transform:translateY(12px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes engineGlow {
          0%,100% { box-shadow:0 0 30px hsl(150 65% 22%/0.25),0 0 80px hsl(150 50% 15%/0.12); }
          50%     { box-shadow:0 0 55px hsl(150 75% 28%/0.5), 0 0 120px hsl(150 55% 20%/0.28); }
        }
        @keyframes terrainDrift {
          from { background-position:0 0; }
          to   { background-position:-50px 0; }
        }
        @keyframes counterFlicker {
          0%,94%,100% { opacity:1; }
          95%         { opacity:0.5; }
          97%         { opacity:1; }
          99%         { opacity:0.65; }
        }
        @keyframes bracketPulse {
          0%,100% { opacity:0.35; }
          50%     { opacity:1; }
        }
        @keyframes scanLine {
          0%   { top:-2px; opacity:0.45; }
          100% { top:102%; opacity:0; }
        }
        @keyframes groundRumble {
          0%,100% { transform:translateX(0) scaleX(1); }
          25%     { transform:translateX(-1.5px) scaleX(1.01); }
          75%     { transform:translateX(1.5px) scaleX(0.99); }
        }
        @keyframes exhaustPuff {
          0%   { opacity:0; transform:translateX(0) scale(0.4); }
          20%  { opacity:0.5; }
          100% { opacity:0; transform:translateX(-40px) scale(1.6); }
        }
      `}</style>

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
            "radial-gradient(ellipse 120% 75% at 50% 42%, hsl(150 38% 5%) 0%, hsl(220 28% 3%) 55%, hsl(220 18% 1%) 100%)",
          opacity: isExit ? 0 : 1,
          transition: isExit ? "opacity 0.75s cubic-bezier(0.22,1,0.36,1)" : "none",
          overflow: "hidden",
        }}
      >
        {/* Terrain grid */}
        <div
          style={{
            position: "absolute", inset: 0,
            backgroundImage:
              "linear-gradient(0deg,hsl(150 28% 12%/0.07) 1px,transparent 1px),linear-gradient(90deg,hsl(150 28% 12%/0.05) 1px,transparent 1px)",
            backgroundSize: "28px 28px",
            animation: isVisible ? "terrainDrift 1.6s linear infinite" : "none",
            opacity: isVisible ? 0.9 : 0,
            transition: "opacity 1s ease",
          }}
        />

        {/* Ground glow */}
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"35%", background:"linear-gradient(0deg,hsl(150 45% 7%/0.5) 0%,transparent 100%)", pointerEvents:"none" }} />

        {/* Tyre tracks */}
        <TyreTrack bottom={28} delay={0} />
        <TyreTrack bottom={7}  delay={0.7} />

        {/* Speed lines */}
        {SPEEDLINES.map((s, i) => <SpeedLine key={i} {...s} />)}

        {/* Dust */}
        {DUST.map((d, i) => <DustParticle key={i} {...d} />)}

        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            width: "min(500px, 120vw)", height: "min(500px, 120vw)",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center,hsl(150 60% 18%/0.18) 0%,transparent 68%)",
            filter: "blur(55px)",
            animation: isVisible ? "engineGlow 1.3s ease-in-out infinite" : "none",
            opacity: isVisible ? 1 : 0,
            transition: "opacity 1.2s ease",
          }}
        />

        {/* ══ MAIN CONTENT ══ */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.6rem",
            zIndex: 5,
            width: "100%",
            padding: "0 1rem",
          }}
        >

          {/* ── Corner brackets + Logo ── */}
          <div style={{ position: "relative", display: "inline-flex" }}>
            {/* Corner brackets */}
            {[
              { top: -12, left: -12,   borderTop:    "2px solid hsl(168 100% 52%/0.6)", borderLeft:  "2px solid hsl(168 100% 52%/0.6)", animDelay: "0s" },
              { top: -12, right: -12,  borderTop:    "2px solid hsl(168 100% 52%/0.6)", borderRight: "2px solid hsl(168 100% 52%/0.6)", animDelay: "0.4s" },
              { bottom: -12, left: -12,  borderBottom: "2px solid hsl(168 100% 52%/0.6)", borderLeft:  "2px solid hsl(168 100% 52%/0.6)", animDelay: "0.8s" },
              { bottom: -12, right: -12, borderBottom: "2px solid hsl(168 100% 52%/0.6)", borderRight: "2px solid hsl(168 100% 52%/0.6)", animDelay: "1.2s" },
            ].map((b, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: 20, height: 20,
                  ...b,
                  animation: isVisible ? `bracketPulse 1.8s ease-in-out ${b.animDelay} infinite` : "none",
                  opacity: isVisible ? 1 : 0,
                  transition: `opacity 0.8s ease ${parseFloat(b.animDelay) + 0.4}s`,
                }}
              />
            ))}

            {/* Logo */}
            <div
              style={{
                position: "relative",
                width: "min(240px, 62vw)",
                height: "min(240px, 62vw)",
                animation: isVisible
                  ? "logoReveal 0.95s cubic-bezier(0.22,1,0.36,1) forwards, logoBounce 3.2s ease-in-out 1.1s infinite"
                  : "none",
                opacity: isVisible ? undefined : 0,
              }}
            >
              {/* Scan line */}
              <div style={{ position:"absolute", inset:0, overflow:"hidden", borderRadius:6, zIndex:3, pointerEvents:"none" }}>
                <div style={{
                  position: "absolute", left:0, right:0, height:"3px",
                  background: "linear-gradient(90deg,transparent,hsl(168 100% 60%/0.3),transparent)",
                  animation: isVisible ? "scanLine 2.4s ease-in-out 0.8s infinite" : "none",
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
                  filter: "drop-shadow(0 0 24px hsl(150 65% 25%/0.85)) drop-shadow(0 4px 16px hsl(0 0% 0%/0.9))",
                } as React.CSSProperties}
              />
            </div>
          </div>

          {/* ── RPM Gauge row ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              opacity: isVisible ? 1 : 0,
              animation: isVisible ? "slideUp 0.75s ease 0.55s both" : "none",
            }}
          >
            {/* Exhaust puffs */}
            <div style={{ position:"relative", width:24, height:28, flexShrink:0 }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    right: 2,
                    bottom: `${i * 8}px`,
                    width: `${6 + i * 2}px`,
                    height: `${6 + i * 2}px`,
                    borderRadius: "50%",
                    background: "hsl(200 10% 55%/0.28)",
                    animation: isVisible ? `exhaustPuff ${1.4 + i * 0.3}s ease-out ${i * 0.35}s infinite` : "none",
                  }}
                />
              ))}
            </div>

            <RpmGauge counter={counter} isVisible={isVisible} />

            {/* Engine dots */}
            <div style={{ display:"flex", flexDirection:"column", gap:"5px", flexShrink:0 }}>
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 5, height: 5,
                    borderRadius: "50%",
                    background: (enginePulse ? i % 2 === 0 : i % 2 !== 0) && counter > i * 25
                      ? "hsl(168 100% 58%)"
                      : "hsl(150 30% 18%)",
                    boxShadow: (enginePulse ? i % 2 === 0 : i % 2 !== 0) && counter > i * 25
                      ? "0 0 7px hsl(168 100% 55%),0 0 16px hsl(168 100% 45%/0.5)"
                      : "none",
                    transition: "background 0.12s ease, box-shadow 0.12s ease",
                  }}
                />
              ))}
            </div>
          </div>

          {/* ── Status label ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              opacity: isVisible ? 1 : 0,
              animation: isVisible ? "slideUp 0.75s ease 0.75s both" : "none",
            }}
          >
            <div style={{
              width:5, height:5, borderRadius:"50%",
              background: enginePulse ? "hsl(168 100% 58%)" : "hsl(150 55% 32%)",
              boxShadow: enginePulse ? "0 0 8px hsl(168 100% 55%),0 0 18px hsl(168 100% 45%/0.55)" : "none",
              transition: "background 0.15s ease, box-shadow 0.15s ease",
            }} />
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.58rem",
              fontWeight: 600,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "hsl(155 75% 58%/0.72)",
              animation: isVisible ? "counterFlicker 3s ease-in-out 1.8s infinite" : "none",
            }}>
              {statusText}
            </span>
            <div style={{
              width:5, height:5, borderRadius:"50%",
              background: !enginePulse ? "hsl(168 100% 58%)" : "hsl(150 55% 32%)",
              boxShadow: !enginePulse ? "0 0 8px hsl(168 100% 55%),0 0 18px hsl(168 100% 45%/0.55)" : "none",
              transition: "background 0.15s ease, box-shadow 0.15s ease",
            }} />
          </div>

          {/* ── FUEL BAR ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.38rem",
              opacity: isVisible ? 1 : 0,
              animation: isVisible ? "slideUp 0.75s ease 0.95s both" : "none",
            }}
          >
            {/* Label row */}
            <div style={{ display:"flex", alignItems:"center", gap:"0.65rem" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"4px" }}>
                <svg width="9" height="12" viewBox="0 0 10 13" fill="none">
                  <path d="M5 1 C5 1,1 6,1 8.5 A4 4 0 0 0 9 8.5 C9 6 5 1 5 1Z" fill="hsl(155 90% 50%/0.6)" />
                </svg>
                <span style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.48rem",
                  letterSpacing: "0.32em",
                  color: "hsl(0 0% 100%/0.2)",
                  textTransform: "uppercase",
                }}>FUEL</span>
              </div>
              <span style={{
                fontFamily: "'Space Grotesk', monospace",
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "hsl(155 100% 60%/0.88)",
                animation: isVisible ? "counterFlicker 2.2s ease 2.2s infinite" : "none",
                minWidth: "2.4rem",
                textAlign: "right",
              }}>
                {String(counter).padStart(3, "0")}%
              </span>
            </div>

            {/* Segmented bar */}
            <div style={{
              display: "flex",
              gap: "2.5px",
              width: "min(220px, 58vw)",
              height: "12px",
              padding: "1.5px",
              background: "hsl(0 0% 100%/0.04)",
              borderRadius: "4px",
              border: "1px solid hsl(150 35% 22%/0.35)",
              boxShadow: "inset 0 1px 4px hsl(0 0% 0%/0.55),0 0 12px hsl(150 50% 15%/0.2)",
            }}>
              {Array.from({ length: segments }).map((_, i) => (
                <FuelSegment key={i} filled={i < filledSegs} index={i} />
              ))}
            </div>

            {/* Tagline */}
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.45rem",
              letterSpacing: "0.42em",
              color: "hsl(0 0% 100%/0.12)",
              textTransform: "uppercase",
              marginTop: "1px",
            }}>
              Kolašin · Montenegro
            </div>
          </div>

        </div>

        {/* Ground rumble line */}
        <div
          style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            height: "2px",
            background:
              "linear-gradient(90deg,transparent 4%,hsl(150 55% 28%/0.45) 28%,hsl(168 100% 48%/0.65) 50%,hsl(150 55% 28%/0.45) 72%,transparent 96%)",
            boxShadow: "0 -6px 22px hsl(150 55% 22%/0.45)",
            animation: isVisible ? "groundRumble 0.38s ease-in-out infinite" : "none",
            opacity: isVisible ? 1 : 0,
            transition: "opacity 1s ease 0.5s",
          }}
        />
      </div>
    </>
  );
};

export default Preloader;
