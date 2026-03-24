import { useEffect, useState } from "react";
import logoImage from "@/assets/montequad-logo-transparent.png";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"enter" | "show" | "fade">("enter");

  useEffect(() => {
    const enterTimer = setTimeout(() => setPhase("show"), 50);
    const fadeTimer = setTimeout(() => setPhase("fade"), 1700);
    const doneTimer = setTimeout(() => onComplete(), 2400);
    return () => {
      clearTimeout(enterTimer);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

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
        gap: "1.75rem",
        background: "radial-gradient(ellipse 80% 60% at 50% 50%, hsl(150 30% 6%) 0%, hsl(240 20% 2%) 70%, hsl(240 20% 1%) 100%)",
        opacity: phase === "fade" ? 0 : 1,
        transition: phase === "fade" ? "opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
      }}
    >
      {/* Ambient glow behind logo */}
      <div
        style={{
          position: "absolute",
          width: "min(420px, 90vw)",
          height: "min(420px, 90vw)",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, hsl(150 60% 25% / 0.18) 0%, transparent 70%)",
          filter: "blur(40px)",
          opacity: phase === "show" ? 1 : 0,
          transition: "opacity 1.2s ease",
        }}
      />

      {/* Logo */}
      <div
        style={{
          position: "relative",
          width: "min(280px, 72vw)",
          height: "min(280px, 72vw)",
          opacity: phase === "enter" ? 0 : phase === "fade" ? 0 : 1,
          transform: phase === "enter"
            ? "scale(0.82) translateY(16px)"
            : phase === "fade"
            ? "scale(1.07) translateY(-6px)"
            : "scale(1) translateY(0)",
          transition: phase === "enter"
            ? "none"
            : phase === "fade"
            ? "opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)"
            : "opacity 1s cubic-bezier(0.22, 1, 0.36, 1), transform 1s cubic-bezier(0.22, 1, 0.36, 1)",
          /* Isolation omogućava da mix-blend-mode radi samo unutar ovog elementa */
          isolation: "isolate",
          borderRadius: "18px",
          overflow: "hidden",
          /* Tamna pozadina iste boje kao background preloadera — 
             pokriva bijele uglove PNG-a bez da utječe na logo */
          background: "hsl(240 20% 2%)",
          boxShadow: "0 8px 40px hsl(150 60% 20% / 0.5), 0 2px 12px hsl(0 0% 0% / 0.8)",
        }}
      >
        <img
          src={logoImage}
          alt="MonteQuad & Buggy Kolasin"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
            /* screen blend mode: bijela pozadina slike + tamni bg diva = 
               bijeli pikseli se "spajaju" i nestaju, logo ostaje čist */
            mixBlendMode: "screen",
            imageRendering: "auto",
          } as React.CSSProperties}
        />
      </div>

      {/* Tagline */}
      <p
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "0.7rem",
          fontWeight: 400,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: "hsl(0 0% 100% / 0.28)",
          margin: 0,
          opacity: phase === "enter" ? 0 : phase === "fade" ? 0 : 1,
          transform: phase === "enter" ? "translateY(10px)" : "translateY(0)",
          transition: "opacity 0.9s ease 0.4s, transform 0.9s ease 0.4s",
        }}
      >
        Kolašin, Montenegro
      </p>

      {/* Thin progress line */}
      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80px",
          height: "1px",
          background: "hsl(0 0% 100% / 0.08)",
          borderRadius: "1px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            background: "linear-gradient(90deg, hsl(168 100% 48% / 0.6), hsl(150 80% 50% / 0.4))",
            borderRadius: "1px",
            width: phase === "enter" ? "0%" : phase === "fade" ? "100%" : "85%",
            transition: phase === "enter" ? "none" : phase === "fade" ? "width 0.3s ease" : "width 1.6s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </div>
    </div>
  );
};

export default Preloader;
