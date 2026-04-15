import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
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
      className={`fixed z-[8500] w-10 h-10 rounded-full flex items-center justify-center border border-border bg-background/80 backdrop-blur-lg text-muted-foreground hover:text-primary hover:border-primary/50 hover:shadow-glow transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      style={{ bottom: "5.5rem", right: "1.6rem" }}
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
};

export default BackToTop;
