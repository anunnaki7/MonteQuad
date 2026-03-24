import { useEffect, useState, useRef } from "react";
import logoImage from "@/assets/montequad-logo-transparent.png";

// Floating particle component
const Particle = ({
  x, y, size, duration, delay, color
}: {
  x: number; y: number; size: number; duration: number; delay: number; color: string;
}) => (
  <div
    style={{
      position: "absolute",
      left: `${x}%`,
      top: `${y}%`,
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: "50%",
      background: color,
      animation: `particleFloat ${duration}s ease-in-out ${delay}s infinite`,
      opacity: 0,
    }}
  />
);

const PARTICLES = [
  { x: 12, y: 20, size: 2, duration: 4.2, delay: 0.0, color: "hsl(150 80% 55% / 0.7)" },
  { x: 25, y: 75, size: 1.5, duration: 5.1, delay: 0.6, color: "hsl(168 100% 48% / 0.5)" },
  { x: 38, y: 15, size: 2.5, duration: 3.8, delay: 1.1, color: "hsl(150 60% 50% / 0.6)" },
  { x: 62, y: 82, size: 1.8, duration: 4.7, delay: 0.3, color: "hsl(168 100% 55% / 0.5)" },
  { x: 78, y: 22, size: 2.2, duration: 5.5, delay: 0.9, color: "hsl(150 70% 45% / 0.7)" },
  { x: 88, y: 65, size: 1.5, duration: 4.0, delay: 1.5, color: "hsl(168 90% 50% / 0.6)" },
  { x: 5,  y: 50, size: 1.2, duration: 6.0, delay: 0.4, color: "hsl(150 60% 60% / 0.4)" },
  { x: 92, y: 40, size: 2.0, duration: 4.5, delay: 1.8, color: "hsl(150 80% 50% / 0.5)" },
  { x: 50, y: 90, size: 1.5, duration: 5.3, delay: 0.7, color: "hsl(168 100% 45% / 0.6)" },
  { x: 20, y: 45, size: 1.0, duration: 3.5, delay: 2.0, color: "hsl(150 70% 55% / 0.4)" },
  { x: 70, y: 10, size: 2.8, duration: 4.9, delay: 0.2, color: "hsl(168 90% 50% / 0.5)" },
  { x: 45, y: 5,  size: 1.5, duration: 5.8, delay: 1.3, color: "hsl(150 60% 45% / 0.6)" },
];

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"enter" | "show" | "exit">("enter");
  const [counter, setCounter] = useState(0);
  const counterRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Start showing after mount
    const enterTimer = setTimeout(() => setPhase("show"), 80);

    // Counter animation: 0 → 100 over ~1600ms
    counterRef.current = setInterval(() => {
      setCounter(prev => {
        if (prev >= 100) {
          if (counterRef.current) clearInterval(counterRef.current);
          return 100;
        }
        // Ease: faster at start, slows near end
        const remaining = 100 - prev;
        const step = Math.max(1, Math.floor(remaining * 0.07));
        return Math.min(100, prev + step);
      });
    }, 55);

    const exitTimer = setTimeout(() => setPhase("exit"), 2000);
    const doneTimer = setTimeout(() => onComplete(), 2750);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      if (counterRef.current) clearInterval(counterRef.current);
    };
  }, [onComplete]);

  const isVisible = phase === "show";
  const isExit = phase === "exit";

  return (
    <>
      <style>{`
        @keyframes particleFloat {
          0%   { opacity: 0; transform: translateY(0px) scale(0.8); }
          20%  { opacity: 1; }
          80%  { opacity: 0.6; }
          100% { opacity: 0; transform: translateY(-60px) scale(1.2); }
        }

        @keyframes ringRotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes ringRotateReverse {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }

        @keyframes ringPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50%       { opacity: 0.7; transform: scale(1.03); }
        }

        @keyframes scanLine {
          0%   { top: 0%; opacity: 0.6; }
          100% { top: 100%; opacity: 0; }
        }

        @keyframes cornerPulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 1; }
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.4; transform: scale(0.95); }
          50%       { opacity: 0.85; transform: scale(1.05); }
        }

        @keyframes shimmer {
          0%   { left: -100%; }
          100% { left: 200%; }
        }

        @keyframes textReveal {
          from { opacity: 0; letter-spacing: 0.5em; transform: translateY(8px); }
          to   { opacity: 1; letter-spacing: 0.35em; transform: translateY(0); }
        }

        @keyframes lineExpand {
          from { width: 0; opacity: 0; }
          to   { width: 40px; opacity: 1; }
        }

        @keyframes logoReveal {
          from { opacity: 0; transform: scale(0.88) translateY(20px); filter: blur(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); filter: blur(0px); }
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes progressFill {
          from { width: 0%; }
          to   { width: 100%; }
        }

        @keyframes countUp {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes hexSpin {
          0%   { transform: rotate(0deg) scale(1); opacity: 0.12; }
          50%  { transform: rotate(180deg) scale(1.06); opacity: 0.22; }
          100% { transform: rotate(360deg) scale(1); opacity: 0.12; }
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
          background: "radial-gradient(ellipse 100% 80% at 50% 45%, hsl(150 35% 5%) 0%, hsl(220 25% 3%) 55%, hsl(220 20% 1%) 100%)",
          opacity: isExit ? 0 : 1,
          transition: isExit ? "opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
          overflow: "hidden",
        }}
      >
        {/* Floating particles */}
        {PARTICLES.map((p, i) => (
          <Particle key={i} {...p} />
        ))}

        {/* Large background hex glow */}
        <div
          style={{
            position: "absolute",
            width: "min(700px, 140vw)",
            height: "min(700px, 140vw)",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, hsl(150 60% 18% / 0.22) 0%, hsl(150 40% 10% / 0.08) 50%, transparent 70%)",
            filter: "blur(60px)",
            animation: isVisible ? "glowPulse 3.5s ease-in-out infinite" : "none",
            opacity: isVisible ? 1 : 0,
            transition: "opacity 1.4s ease",
          }}
        />

        {/* Rotating outer ring - dashed */}
        <div
          style={{
            position: "absolute",
            width: "min(360px, 85vw)",
            height: "min(360px, 85vw)",
            borderRadius: "50%",
            border: "1px dashed hsl(150 60% 45% / 0.22)",
            animation: isVisible ? "ringRotate 18s linear infinite" : "none",
            opacity: isVisible ? 1 : 0,
            transition: "opacity 1.2s ease 0.3s",
          }}
        />

        {/* Rotating middle ring - with glow dots */}
        <div
          style={{
            position: "absolute",
            width: "min(305px, 73vw)",
            height: "min(305px, 73vw)",
            borderRadius: "50%",
            border: "1px solid hsl(150 70% 40% / 0.15)",
            borderTopColor: "hsl(168 100% 55% / 0.6)",
            borderRightColor: "hsl(150 70% 45% / 0.3)",
            animation: isVisible ? "ringRotateReverse 8s linear infinite" : "none",
            opacity: isVisible ? 1 : 0,
            transition: "opacity 1s ease 0.5s",
          }}
        />

        {/* Inner glow ring */}
        <div
          style={{
            position: "absolute",
            width: "min(258px, 62vw)",
            height: "min(258px, 62vw)",
            borderRadius: "50%",
            border: "1px solid hsl(150 80% 50% / 0.12)",
            borderBottomColor: "hsl(168 100% 48% / 0.45)",
            animation: isVisible ? "ringRotate 5s linear infinite" : "none",
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.8s ease 0.7s",
          }}
        />

        {/* Pulsing ring */}
        <div
          style={{
            position: "absolute",
            width: "min(230px, 56vw)",
            height: "min(230px, 56vw)",
            borderRadius: "50%",
            border: "1px solid hsl(150 60% 40% / 0.18)",
            animation: isVisible ? "ringPulse 2.8s ease-in-out infinite" : "none",
            opacity: isVisible ? 0.3 : 0,
            transition: "opacity 0.8s ease 0.9s",
          }}
        />

        {/* Corner brackets - top left */}
        <div style={{ position: "absolute", top: "calc(50% - min(135px, 32vw))", left: "calc(50% - min(135px, 32vw))", width: "18px", height: "18px", borderTop: "2px solid hsl(168 100% 55% / 0.7)", borderLeft: "2px solid hsl(168 100% 55% / 0.7)", animation: isVisible ? "cornerPulse 2s ease-in-out infinite" : "none", opacity: isVisible ? 1 : 0, transition: "opacity 0.8s ease 1s" }} />
        {/* Corner brackets - top right */}
        <div style={{ position: "absolute", top: "calc(50% - min(135px, 32vw))", right: "calc(50% - min(135px, 32vw))", width: "18px", height: "18px", borderTop: "2px solid hsl(168 100% 55% / 0.7)", borderRight: "2px solid hsl(168 100% 55% / 0.7)", animation: isVisible ? "cornerPulse 2s ease-in-out 0.5s infinite" : "none", opacity: isVisible ? 1 : 0, transition: "opacity 0.8s ease 1s" }} />
        {/* Corner brackets - bottom left */}
        <div style={{ position: "absolute", bottom: "calc(50% - min(135px, 32vw))", left: "calc(50% - min(135px, 32vw))", width: "18px", height: "18px", borderBottom: "2px solid hsl(168 100% 55% / 0.7)", borderLeft: "2px solid hsl(168 100% 55% / 0.7)", animation: isVisible ? "cornerPulse 2s ease-in-out 1s infinite" : "none", opacity: isVisible ? 1 : 0, transition: "opacity 0.8s ease 1s" }} />
        {/* Corner brackets - bottom right */}
        <div style={{ position: "absolute", bottom: "calc(50% - min(135px, 32vw))", right: "calc(50% - min(135px, 32vw))", width: "18px", height: "18px", borderBottom: "2px solid hsl(168 100% 55% / 0.7)", borderRight: "2px solid hsl(168 100% 55% / 0.7)", animation: isVisible ? "cornerPulse 2s ease-in-out 1.5s infinite" : "none", opacity: isVisible ? 1 : 0, transition: "opacity 0.8s ease 1s" }} />

        {/* LOGO - no background, just mix-blend-mode */}
        <div
          style={{
            position: "relative",
            width: "min(210px, 52vw)",
            height: "min(210px, 52vw)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: isVisible && !isExit ? "logoReveal 1s cubic-bezier(0.22, 1, 0.36, 1) forwards" : "none",
            opacity: isVisible ? undefined : 0,
            zIndex: 2,
          }}
        >
          {/* Scan line effect over logo */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              overflow: "hidden",
              borderRadius: "16px",
              zIndex: 3,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                height: "2px",
                background: "linear-gradient(90deg, transparent, hsl(168 100% 60% / 0.4), transparent)",
                animation: isVisible ? "scanLine 2.5s ease-in-out 0.5s infinite" : "none",
              }}
            />
          </div>

          {/* Shimmer overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "16px",
              overflow: "hidden",
              zIndex: 4,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                width: "40%",
                background: "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.06), transparent)",
                animation: isVisible ? "shimmer 3s ease-in-out 1.2s infinite" : "none",
              }}
            />
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
              position: "relative",
              zIndex: 2,
              filter: "drop-shadow(0 0 24px hsl(150 70% 30% / 0.8)) drop-shadow(0 4px 16px hsl(0 0% 0% / 0.9))",
            } as React.CSSProperties}
          />
        </div>

        {/* Brand name */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.4rem",
            zIndex: 2,
            marginTop: "0.5rem",
          }}
        >
          {/* Decorative line left + text + line right */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              opacity: isVisible ? 1 : 0,
              animation: isVisible ? "fadeSlideUp 0.8s ease 0.7s both" : "none",
            }}
          >
            <div
              style={{
                height: "1px",
                background: "linear-gradient(90deg, transparent, hsl(168 100% 55% / 0.6))",
                animation: isVisible ? "lineExpand 0.6s ease 0.9s both" : "none",
                width: isVisible ? "40px" : "0px",
              }}
            />
            <p
              style={{
                fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                fontSize: "0.6rem",
                fontWeight: 500,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "hsl(168 100% 70% / 0.75)",
                margin: 0,
                whiteSpace: "nowrap",
              }}
            >
              Monte Quad &amp; Buggy Tour
            </p>
            <div
              style={{
                height: "1px",
                background: "linear-gradient(90deg, hsl(168 100% 55% / 0.6), transparent)",
                animation: isVisible ? "lineExpand 0.6s ease 0.9s both" : "none",
                width: isVisible ? "40px" : "0px",
              }}
            />
          </div>

          <p
            style={{
              fontFamily: "'Space Grotesk', 'Inter', sans-serif",
              fontSize: "0.55rem",
              fontWeight: 400,
              letterSpacing: "0.45em",
              textTransform: "uppercase",
              color: "hsl(0 0% 100% / 0.22)",
              margin: 0,
              opacity: isVisible ? 1 : 0,
              animation: isVisible ? "fadeSlideUp 0.8s ease 1s both" : "none",
            }}
          >
            Kolašin · Montenegro
          </p>
        </div>

        {/* Bottom progress section */}
        <div
          style={{
            position: "absolute",
            bottom: "min(3rem, 6vh)",
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.6rem",
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.8s ease 0.5s",
            zIndex: 2,
          }}
        >
          {/* Counter */}
          <div
            style={{
              fontFamily: "'Space Grotesk', monospace",
              fontSize: "0.65rem",
              fontWeight: 300,
              letterSpacing: "0.15em",
              color: "hsl(168 100% 60% / 0.5)",
            }}
          >
            {String(counter).padStart(3, "0")}
          </div>

          {/* Progress bar container */}
          <div
            style={{
              width: "min(160px, 40vw)",
              height: "1px",
              background: "hsl(0 0% 100% / 0.06)",
              borderRadius: "1px",
              overflow: "visible",
              position: "relative",
            }}
          >
            {/* Fill based on counter */}
            <div
              style={{
                height: "100%",
                background: "linear-gradient(90deg, hsl(168 100% 48% / 0.4), hsl(150 80% 55% / 0.9), hsl(168 100% 65% / 0.6))",
                borderRadius: "1px",
                width: `${counter}%`,
                transition: "width 0.3s ease",
                position: "relative",
              }}
            >
              {/* Glowing tip */}
              <div
                style={{
                  position: "absolute",
                  right: "-1px",
                  top: "-2px",
                  width: "3px",
                  height: "5px",
                  borderRadius: "2px",
                  background: "hsl(168 100% 75%)",
                  boxShadow: "0 0 8px hsl(168 100% 60%), 0 0 16px hsl(168 100% 50% / 0.6)",
                }}
              />
            </div>
          </div>

          {/* Status text */}
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.5rem",
              fontWeight: 400,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "hsl(0 0% 100% / 0.15)",
            }}
          >
            {counter < 40 ? "Initializing" : counter < 80 ? "Loading Assets" : "Ready"}
          </div>
        </div>
      </div>
    </>
  );
};

export default Preloader;
