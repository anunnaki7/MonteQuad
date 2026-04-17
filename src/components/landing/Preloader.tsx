import { useEffect, useState, useRef } from "react";
import logoImage from "@/assets/montequad-logo-transparent.png";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"enter" | "show" | "exit">("enter");
  const [counter, setCounter] = useState(0);
  const counterRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

    const exitTimer = setTimeout(() => setPhase("exit"), 2400);
    const doneTimer = setTimeout(() => onComplete(), 3100);

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
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(ellipse 120% 80% at 50% 48%, hsl(0 0% 10%) 0%, hsl(0 0% 4%) 60%, hsl(0 0% 2%) 100%)",
        opacity: isExit ? 0 : 1,
        transition: isExit ? "opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid texture */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(0deg, hsl(40 30% 15% / 0.04) 1px, transparent 1px), linear-gradient(90deg, hsl(40 30% 15% / 0.03) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        opacity: isVisible ? 0.6 : 0,
        transition: "opacity 1s ease",
      }} />

      {/* Ambient glow */}
      <div style={{
        position: "absolute",
        width: "360px",
        height: "360px",
        borderRadius: "50%",
        background: "radial-gradient(ellipse at center, hsl(190 100% 60% / 0.12) 0%, transparent 65%)",
        filter: "blur(60px)",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 1.2s ease",
      }} />

      {/* Logo */}
      <div style={{
        position: "relative",
        width: "min(260px, 65vw)",
        height: "min(260px, 65vw)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "scale(1)" : "scale(0.85)",
        transition: "opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
        zIndex: 2,
      }}>
        <img
          src={logoImage}
          alt="MonteQuad & Buggy Kolasin"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
            mixBlendMode: "screen",
            filter: "drop-shadow(0 0 30px hsl(40 85% 55% / 0.15)) drop-shadow(0 4px 20px hsl(0 0% 0% / 0.6))",
          }}
        />
      </div>

      {/* Tagline */}
      <span style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: "0.65rem",
        fontWeight: 400,
        letterSpacing: "0.35em",
        textTransform: "uppercase",
        color: "hsl(0 0% 100% / 0.2)",
        marginTop: "1rem",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(12px)",
        transition: "all 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.3s",
      }}>
        Kolašin · Montenegro
      </span>

      {/* Progress bar */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "2px",
        background: "hsl(0 0% 100% / 0.03)",
      }}>
        <div style={{
          height: "100%",
          width: `${counter}%`,
          background: "linear-gradient(90deg, hsl(40 85% 55% / 0.6), hsl(40 85% 55%))",
          boxShadow: "0 0 12px hsl(40 85% 55% / 0.4)",
          transition: "width 0.1s ease",
        }} />
      </div>
    </div>
  );
};

export default Preloader;
