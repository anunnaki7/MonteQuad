import { useEffect, useState, useRef } from "react";
import logoImage from "@/assets/montequad-logo-transparent.png";

// ─── Dust particle (flying dirt chunks) ───────────────────────────────────────
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
      height: `${size * 0.6}px`,
      borderRadius: "50%",
      background: `hsl(${25 + Math.random() * 15} 60% ${30 + Math.random() * 20}% / 0.55)`,
      animation: `dustFly ${duration}s ease-out ${delay}s infinite`,
      "--drift": `${drift}px`,
    } as React.CSSProperties}
  />
);

// ─── Tread mark (horizontal track line) ───────────────────────────────────────
const TreadMark = ({ y, delay, width }: { y: number; delay: number; width: number }) => (
  <div
    style={{
      position: "absolute",
      left: 0,
      top: `${y}%`,
      height: "2px",
      width: `${width}%`,
      background:
        "repeating-linear-gradient(90deg, hsl(150 40% 18% / 0.0) 0px, hsl(150 40% 18% / 0.0) 6px, hsl(150 60% 30% / 0.18) 6px, hsl(150 60% 30% / 0.18) 14px)",
      animation: `treadSlide 3.2s linear ${delay}s infinite`,
    }}
  />
);

// ─── Speedline (motion blur streak) ───────────────────────────────────────────
const SpeedLine = ({ y, delay, opacity }: { y: number; delay: number; opacity: number }) => (
  <div
    style={{
      position: "absolute",
      left: "-20%",
      top: `${y}%`,
      height: "1px",
      width: "140%",
      background: `linear-gradient(90deg, transparent 0%, hsl(150 80% 40% / ${opacity}) 40%, hsl(168 100% 55% / ${opacity * 1.3}) 60%, transparent 100%)`,
      animation: `speedSweep ${1.8 + Math.random()}s ease-in-out ${delay}s infinite`,
    }}
  />
);

const DUST = [
  { x: 8,  y: 62, size: 5,   duration: 2.8, delay: 0.0, drift: -55 },
  { x: 12, y: 68, size: 3.5, duration: 3.2, delay: 0.4, drift: -40 },
  { x: 6,  y: 72, size: 7,   duration: 2.5, delay: 0.8, drift: -70 },
  { x: 15, y: 58, size: 4,   duration: 3.6, delay: 1.2, drift: -45 },
  { x: 4,  y: 75, size: 6,   duration: 2.2, delay: 1.6, drift: -60 },
  { x: 18, y: 65, size: 3,   duration: 4.0, delay: 0.2, drift: -35 },
  { x: 9,  y: 80, size: 5.5, duration: 2.9, delay: 2.0, drift: -50 },
  // right side
  { x: 82, y: 62, size: 5,   duration: 2.8, delay: 0.3, drift: 55 },
  { x: 88, y: 68, size: 3.5, duration: 3.2, delay: 0.7, drift: 40 },
  { x: 92, y: 72, size: 7,   duration: 2.5, delay: 1.1, drift: 70 },
  { x: 85, y: 58, size: 4,   duration: 3.6, delay: 1.5, drift: 45 },
  { x: 95, y: 75, size: 6,   duration: 2.2, delay: 1.9, drift: 60 },
];

const TREADS = [
  { y: 60, delay: 0.0, width: 100 },
  { y: 65, delay: 0.5, width: 100 },
  { y: 70, delay: 1.0, width: 100 },
  { y: 75, delay: 1.5, width: 100 },
];

const SPEEDLINES = [
  { y: 30, delay: 0.0, opacity: 0.12 },
  { y: 38, delay: 0.3, opacity: 0.08 },
  { y: 45, delay: 0.7, opacity: 0.14 },
  { y: 52, delay: 0.2, opacity: 0.06 },
  { y: 58, delay: 0.9, opacity: 0.10 },
];

// ─── Wheel SVG ─────────────────────────────────────────────────────────────────
const Wheel = ({
  size, style, spinDuration,
}: {
  size: number; style?: React.CSSProperties; spinDuration: string;
}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      border: "2px solid hsl(150 50% 25% / 0.5)",
      boxShadow:
        "0 0 0 1px hsl(150 60% 35% / 0.2), inset 0 0 0 6px hsl(0 0% 8% / 0.9), inset 0 0 0 7px hsl(150 40% 20% / 0.3)",
      background:
        "radial-gradient(circle at 50% 50%, hsl(0 0% 12%) 0%, hsl(0 0% 8%) 55%, hsl(150 30% 15%) 100%)",
      animation: `wheelSpin ${spinDuration} linear infinite`,
      position: "relative",
      flexShrink: 0,
      ...style,
    }}
  >
    {/* Spokes */}
    {[0, 45, 90, 135].map((angle) => (
      <div
        key={angle}
        style={{
          position: "absolute",
          inset: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `rotate(${angle}deg)`,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "1.5px",
            background:
              "linear-gradient(90deg, hsl(150 60% 35% / 0.2), hsl(150 70% 50% / 0.6), hsl(150 60% 35% / 0.2))",
            borderRadius: "2px",
          }}
        />
      </div>
    ))}
    {/* Hub */}
    <div
      style={{
        position: "absolute",
        inset: "38%",
        borderRadius: "50%",
        background:
          "radial-gradient(circle, hsl(168 100% 55% / 0.9), hsl(150 80% 35% / 0.7))",
        boxShadow: "0 0 6px hsl(168 100% 55% / 0.8)",
      }}
    />
  </div>
);

// ─── Fuel/load bar segment ─────────────────────────────────────────────────────
const FuelSegment = ({ filled, delay }: { filled: boolean; delay: number }) => (
  <div
    style={{
      flex: 1,
      height: "100%",
      background: filled
        ? "linear-gradient(180deg, hsl(150 90% 55% / 0.95), hsl(168 100% 45% / 0.8))"
        : "hsl(0 0% 100% / 0.05)",
      borderRadius: "2px",
      boxShadow: filled ? "0 0 6px hsl(168 100% 55% / 0.5)" : "none",
      transition: filled ? `background 0.15s ease ${delay}s, box-shadow 0.15s ease ${delay}s` : "none",
    }}
  />
);

// ══════════════════════════════════════════════════════════════════════════════
const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"enter" | "show" | "exit">("enter");
  const [counter, setCounter] = useState(0);
  const [enginePulse, setEnginePulse] = useState(false);
  const counterRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pulseRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const enterTimer = setTimeout(() => setPhase("show"), 60);

    // counter 0→100
    counterRef.current = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          if (counterRef.current) clearInterval(counterRef.current);
          return 100;
        }
        const remaining = 100 - prev;
        const step = Math.max(1, Math.floor(remaining * 0.065));
        return Math.min(100, prev + step);
      });
    }, 55);

    // engine pulse every ~400ms
    pulseRef.current = setInterval(() => {
      setEnginePulse((p) => !p);
    }, 400);

    const exitTimer = setTimeout(() => setPhase("exit"), 2100);
    const doneTimer = setTimeout(() => onComplete(), 2850);

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

  const segments = 10;
  const filledSegments = Math.floor((counter / 100) * segments);

  const statusText =
    counter < 30 ? "ENGINE START" : counter < 65 ? "LOADING TRAIL" : counter < 90 ? "GEAR UP" : "LET'S RIDE";

  return (
    <>
      <style>{`
        /* ── Dust chunks fly sideways and up ── */
        @keyframes dustFly {
          0%   { opacity: 0;   transform: translate(0, 0) scale(0.6) rotate(0deg); }
          15%  { opacity: 0.8; }
          100% { opacity: 0;   transform: translate(var(--drift), -80px) scale(1.4) rotate(45deg); }
        }

        /* ── Tread marks slide across screen ── */
        @keyframes treadSlide {
          0%   { transform: translateX(100%); opacity: 0.6; }
          80%  { opacity: 0.4; }
          100% { transform: translateX(-100%); opacity: 0; }
        }

        /* ── Speed lines sweep ── */
        @keyframes speedSweep {
          0%   { transform: translateX(-60%) scaleX(0.3); opacity: 0; }
          30%  { opacity: 1; }
          70%  { opacity: 0.6; }
          100% { transform: translateX(60%) scaleX(1.2); opacity: 0; }
        }

        /* ── Wheel spin ── */
        @keyframes wheelSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* ── Ground shake under wheels ── */
        @keyframes groundShake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-1px); }
          40%       { transform: translateX(1.5px); }
          60%       { transform: translateX(-1px); }
          80%       { transform: translateX(0.5px); }
        }

        /* ── Logo reveal ── */
        @keyframes logoReveal {
          from { opacity: 0; transform: scale(0.85) translateY(18px); filter: blur(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
        }

        /* ── Logo hover bounce (idle) ── */
        @keyframes logoBounce {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-4px); }
        }

        /* ── Slide up text ── */
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Engine glow pulse ── */
        @keyframes engineGlow {
          0%, 100% { box-shadow: 0 0 20px hsl(150 70% 30% / 0.3), 0 0 60px hsl(150 60% 20% / 0.15); }
          50%       { box-shadow: 0 0 40px hsl(150 80% 35% / 0.55), 0 0 100px hsl(150 60% 25% / 0.3); }
        }

        /* ── Background terrain grid ── */
        @keyframes terrainDrift {
          from { background-position: 0 0; }
          to   { background-position: -60px 0; }
        }

        /* ── Chevron move ── */
        @keyframes chevronMove {
          0%   { transform: translateX(-30px); opacity: 0; }
          30%  { opacity: 1; }
          70%  { opacity: 0.7; }
          100% { transform: translateX(30px); opacity: 0; }
        }

        /* ── Counter flicker ── */
        @keyframes counterFlicker {
          0%, 96%, 100% { opacity: 1; }
          97%           { opacity: 0.6; }
          98%           { opacity: 1; }
          99%           { opacity: 0.75; }
        }

        /* ── Scan line ── */
        @keyframes scanLine {
          0%   { top: -2px; opacity: 0.5; }
          100% { top: 100%; opacity: 0; }
        }

        /* ── Corner bracket pulse ── */
        @keyframes bracketPulse {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }

        /* ── Odometer digit scroll ── */
        @keyframes odometerIn {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
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
            "radial-gradient(ellipse 110% 70% at 50% 40%, hsl(150 40% 5%) 0%, hsl(220 30% 3%) 55%, hsl(220 20% 1%) 100%)",
          opacity: isExit ? 0 : 1,
          transition: isExit ? "opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
          overflow: "hidden",
        }}
      >
        {/* ── Terrain grid (moving off-road dirt track) ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(0deg, hsl(150 30% 12% / 0.08) 1px, transparent 1px), linear-gradient(90deg, hsl(150 30% 12% / 0.06) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
            animation: isVisible ? "terrainDrift 1.8s linear infinite" : "none",
            opacity: isVisible ? 0.8 : 0,
            transition: "opacity 1s ease",
          }}
        />

        {/* ── Ground / horizon glow ── */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "35%",
            background:
              "linear-gradient(0deg, hsl(150 50% 8% / 0.45) 0%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* ── Tread marks ── */}
        {TREADS.map((t, i) => (
          <TreadMark key={i} {...t} />
        ))}

        {/* ── Speed lines ── */}
        {SPEEDLINES.map((s, i) => (
          <SpeedLine key={i} {...s} />
        ))}

        {/* ── Dust particles ── */}
        {DUST.map((d, i) => (
          <DustParticle key={i} {...d} />
        ))}

        {/* ── Central ambient glow ── */}
        <div
          style={{
            position: "absolute",
            width: "min(600px, 130vw)",
            height: "min(600px, 130vw)",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at center, hsl(150 65% 20% / 0.2) 0%, hsl(150 40% 10% / 0.06) 50%, transparent 70%)",
            filter: "blur(50px)",
            animation: isVisible ? "engineGlow 1.2s ease-in-out infinite" : "none",
            opacity: isVisible ? 1 : 0,
            transition: "opacity 1.2s ease",
          }}
        />

        {/* ══ MAIN CONTENT COLUMN ══ */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0",
            zIndex: 5,
            width: "100%",
          }}
        >
          {/* ── CORNER BRACKETS around logo zone ── */}
          <div style={{ position: "relative", display: "inline-flex" }}>
            {/* TL */}
            <div style={{ position: "absolute", top: -12, left: -12, width: 20, height: 20, borderTop: "2px solid hsl(168 100% 55% / 0.7)", borderLeft: "2px solid hsl(168 100% 55% / 0.7)", animation: isVisible ? "bracketPulse 1.6s ease-in-out infinite" : "none", opacity: isVisible ? 1 : 0, transition: "opacity 0.8s ease 0.6s" }} />
            {/* TR */}
            <div style={{ position: "absolute", top: -12, right: -12, width: 20, height: 20, borderTop: "2px solid hsl(168 100% 55% / 0.7)", borderRight: "2px solid hsl(168 100% 55% / 0.7)", animation: isVisible ? "bracketPulse 1.6s ease-in-out 0.4s infinite" : "none", opacity: isVisible ? 1 : 0, transition: "opacity 0.8s ease 0.7s" }} />
            {/* BL */}
            <div style={{ position: "absolute", bottom: -12, left: -12, width: 20, height: 20, borderBottom: "2px solid hsl(168 100% 55% / 0.7)", borderLeft: "2px solid hsl(168 100% 55% / 0.7)", animation: isVisible ? "bracketPulse 1.6s ease-in-out 0.8s infinite" : "none", opacity: isVisible ? 1 : 0, transition: "opacity 0.8s ease 0.8s" }} />
            {/* BR */}
            <div style={{ position: "absolute", bottom: -12, right: -12, width: 20, height: 20, borderBottom: "2px solid hsl(168 100% 55% / 0.7)", borderRight: "2px solid hsl(168 100% 55% / 0.7)", animation: isVisible ? "bracketPulse 1.6s ease-in-out 1.2s infinite" : "none", opacity: isVisible ? 1 : 0, transition: "opacity 0.8s ease 0.9s" }} />

            {/* ── LOGO ── */}
            <div
              style={{
                position: "relative",
                width: "min(230px, 56vw)",
                height: "min(230px, 56vw)",
                animation: isVisible
                  ? "logoReveal 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards, logoBounce 3s ease-in-out 1s infinite"
                  : "none",
                opacity: isVisible ? undefined : 0,
              }}
            >
              {/* Scan line */}
              <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: 8, zIndex: 3, pointerEvents: "none" }}>
                <div style={{ position: "absolute", left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, transparent, hsl(168 100% 65% / 0.35), transparent)", animation: isVisible ? "scanLine 2.2s ease-in-out 0.6s infinite" : "none" }} />
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
                  filter:
                    "drop-shadow(0 0 28px hsl(150 70% 28% / 0.9)) drop-shadow(0 6px 20px hsl(0 0% 0% / 0.95))",
                } as React.CSSProperties}
              />
            </div>
          </div>

          {/* ── WHEELS ROW ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "min(3.5rem, 8vw)",
              marginTop: "1.6rem",
              opacity: isVisible ? 1 : 0,
              animation: isVisible ? "slideUp 0.7s ease 0.5s both" : "none",
            }}
          >
            <Wheel size={42} spinDuration="0.9s" />

            {/* ── Chevron motion arrows between wheels ── */}
            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 0,
                    height: 0,
                    borderTop: "5px solid transparent",
                    borderBottom: "5px solid transparent",
                    borderLeft: "7px solid hsl(168 100% 55% / 0.7)",
                    animation: isVisible
                      ? `chevronMove 1.0s ease-in-out ${i * 0.18}s infinite`
                      : "none",
                  }}
                />
              ))}
            </div>

            <Wheel size={56} spinDuration="0.75s" />

            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 0,
                    height: 0,
                    borderTop: "5px solid transparent",
                    borderBottom: "5px solid transparent",
                    borderLeft: "7px solid hsl(168 100% 55% / 0.7)",
                    animation: isVisible
                      ? `chevronMove 1.0s ease-in-out ${i * 0.18 + 0.1}s infinite`
                      : "none",
                  }}
                />
              ))}
            </div>

            <Wheel size={42} spinDuration="0.9s" />
          </div>

          {/* ── STATUS LABEL ── */}
          <div
            style={{
              marginTop: "1.4rem",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              opacity: isVisible ? 1 : 0,
              animation: isVisible ? "slideUp 0.7s ease 0.7s both" : "none",
            }}
          >
            {/* Engine pulse dot */}
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: enginePulse
                  ? "hsl(168 100% 60%)"
                  : "hsl(150 60% 35%)",
                boxShadow: enginePulse
                  ? "0 0 8px hsl(168 100% 55%), 0 0 18px hsl(168 100% 45% / 0.6)"
                  : "none",
                transition: "background 0.15s ease, box-shadow 0.15s ease",
              }}
            />
            <span
              style={{
                fontFamily: "'Space Grotesk', monospace",
                fontSize: "0.6rem",
                fontWeight: 600,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "hsl(168 80% 60% / 0.75)",
                animation: isVisible ? "counterFlicker 3s ease-in-out 1.5s infinite" : "none",
              }}
            >
              {statusText}
            </span>
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: enginePulse
                  ? "hsl(150 60% 35%)"
                  : "hsl(168 100% 60%)",
                boxShadow: !enginePulse
                  ? "0 0 8px hsl(168 100% 55%), 0 0 18px hsl(168 100% 45% / 0.6)"
                  : "none",
                transition: "background 0.15s ease, box-shadow 0.15s ease",
              }}
            />
          </div>

          {/* ── FUEL / PROGRESS BAR (segmented) ── */}
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.45rem",
              opacity: isVisible ? 1 : 0,
              animation: isVisible ? "slideUp 0.7s ease 0.9s both" : "none",
            }}
          >
            {/* Label */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontFamily: "'Space Grotesk', monospace", fontSize: "0.5rem", letterSpacing: "0.3em", color: "hsl(0 0% 100% / 0.2)", textTransform: "uppercase" }}>
                FUEL
              </span>
              <span style={{ fontFamily: "'Space Grotesk', monospace", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.1em", color: "hsl(168 100% 62% / 0.85)", animation: isVisible ? "counterFlicker 2s ease 2s infinite" : "none" }}>
                {String(counter).padStart(3, "0")}%
              </span>
            </div>

            {/* Segmented bar */}
            <div
              style={{
                display: "flex",
                gap: "3px",
                width: "min(200px, 50vw)",
                height: "10px",
                padding: "1px",
                background: "hsl(0 0% 100% / 0.04)",
                borderRadius: "4px",
                border: "1px solid hsl(150 40% 25% / 0.3)",
                boxShadow: "inset 0 1px 3px hsl(0 0% 0% / 0.5)",
              }}
            >
              {Array.from({ length: segments }).map((_, i) => (
                <FuelSegment key={i} filled={i < filledSegments} delay={i * 0.04} />
              ))}
            </div>

            {/* Odometer counter */}
            <div
              style={{
                fontFamily: "'Space Grotesk', monospace",
                fontSize: "0.48rem",
                letterSpacing: "0.4em",
                color: "hsl(0 0% 100% / 0.13)",
                textTransform: "uppercase",
              }}
            >
              Kolašin · Montenegro
            </div>
          </div>
        </div>

        {/* ── Bottom ground dust line ── */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "3px",
            background:
              "linear-gradient(90deg, transparent 5%, hsl(150 60% 30% / 0.4) 30%, hsl(168 100% 50% / 0.6) 50%, hsl(150 60% 30% / 0.4) 70%, transparent 95%)",
            boxShadow: "0 -4px 20px hsl(150 60% 25% / 0.4)",
            animation: isVisible ? "groundShake 0.4s ease-in-out infinite" : "none",
            opacity: isVisible ? 1 : 0,
            transition: "opacity 1s ease 0.5s",
          }}
        />
      </div>
    </>
  );
};

export default Preloader;
