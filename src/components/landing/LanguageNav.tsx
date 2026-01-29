import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-4 right-4 md:top-6 md:right-6 z-50 flex items-center gap-2 px-3 py-2 rounded-full glass-card transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-[40px]" : ""
      }`}
    >
      <button 
        onClick={() => setLanguage("me")}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
          language === "me" 
            ? "text-primary bg-primary/10" 
            : "text-muted-foreground hover:text-primary hover:bg-primary/10"
        }`}
      >
        ME
      </button>
      <span className="w-px h-4 bg-border" />
      <button 
        onClick={() => setLanguage("en")}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
          language === "en" 
            ? "text-primary bg-primary/10" 
            : "text-muted-foreground hover:text-primary hover:bg-primary/10"
        }`}
      >
        EN
      </button>
    </nav>
  );
};

export default LanguageNav;
