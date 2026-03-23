import { useEffect, useState } from "react";
import logoImage from "@/assets/montequad-logo.jpg";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"show" | "fade">("show");

  useEffect(() => {
    // After 1.6s show → start fade
    const fadeTimer = setTimeout(() => setPhase("fade"), 1600);
    // After fade (600ms) → complete
    const doneTimer = setTimeout(() => onComplete(), 2200);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      className="preloader-overlay"
      style={{
        opacity: phase === "fade" ? 0 : 1,
        transition: "opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <div
        className="preloader-logo-wrap"
        style={{
          transform: phase === "fade" ? "scale(1.08)" : "scale(1)",
          opacity: phase === "fade" ? 0 : 1,
          transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <img
          src={logoImage}
          alt="MonteQuad & Buggy Kolasin"
          className="preloader-logo"
        />
        <div className="preloader-shimmer" />
      </div>

      {/* Subtle tagline */}
      <p
        className="preloader-tagline"
        style={{
          opacity: phase === "fade" ? 0 : 1,
          transform: phase === "fade" ? "translateY(8px)" : "translateY(0)",
          transition: "opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s",
        }}
      >
        Kolašin, Montenegro
      </p>
    </div>
  );
};

export default Preloader;
