import { useEffect, useState } from "react";

const LanguageNav = () => {
  const [scrolled, setScrolled] = useState(false);

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
      <a 
        href="#" 
        className="text-primary bg-primary/10 px-3 py-1 rounded-full text-sm font-medium transition-all hover:bg-primary/20"
      >
        ME
      </a>
      <span className="w-px h-4 bg-border" />
      <a 
        href="#" 
        className="text-muted-foreground hover:text-primary px-3 py-1 rounded-full text-sm font-medium transition-all hover:bg-primary/10"
      >
        EN
      </a>
    </nav>
  );
};

export default LanguageNav;