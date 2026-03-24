import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 9000,
        width: "2.75rem",
        height: "2.75rem",
        borderRadius: "50%",
        border: "1px solid hsl(0 0% 100% / 0.12)",
        background: "hsl(240 20% 6% / 0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.9)",
        transition: "opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1), transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.2s, box-shadow 0.2s",
        pointerEvents: visible ? "auto" : "none",
        boxShadow: "0 4px 24px hsl(0 0% 0% / 0.4)",
        color: "hsl(168 100% 48%)",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = "hsl(168 100% 48% / 0.5)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 24px hsl(0 0% 0% / 0.4), 0 0 16px hsl(168 100% 48% / 0.2)";
        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px) scale(1.08)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = "hsl(0 0% 100% / 0.12)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 24px hsl(0 0% 0% / 0.4)";
        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0) scale(1)";
      }}
    >
      <ArrowUp size={16} strokeWidth={2.5} />
    </button>
  );
};

export default BackToTop;
