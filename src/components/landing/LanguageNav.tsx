import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mountain } from "lucide-react";

const LanguageNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    let lastY = 0;
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setHidden(y > 300 && y > lastY);
      lastY = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#", label: language === "me" ? "Početna" : "Home" },
    { href: "#pricing", label: language === "me" ? "Paketi" : "Units" },
    { href: "#galerija", label: language === "me" ? "Galerija" : "Gallery" },
    { href: "#lokacija", label: language === "me" ? "Lokacija" : "Location" },
    { href: "#kontakt", label: language === "me" ? "Kontakt" : "Contact" },
  ];

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-500 ${
        scrolled
          ? "bg-background/70 backdrop-blur-2xl border border-border shadow-[0_8px_32px_rgba(0,0,0,0.5)] ring-1 ring-primary/10"
          : "bg-transparent backdrop-blur-md border border-transparent"
      } ${hidden ? "-translate-y-20 opacity-0" : "translate-y-0 opacity-100"}`}
    >
      {/* Logo */}
      <a href="#" className="flex items-center gap-1.5 px-3 py-1.5 text-foreground">
        <Mountain className="w-4 h-4 text-primary" />
        <span className="font-display text-sm font-bold tracking-tight hidden sm:inline">
          Monte<span className="text-primary">Quad</span>
        </span>
      </a>

      <span className="w-px h-5 bg-border mx-1 hidden md:block" />

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-0.5">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-200"
          >
            {link.label}
          </a>
        ))}
      </div>

      <span className="w-px h-5 bg-border mx-1" />

      {/* Language Toggle */}
      <div className="flex items-center gap-0.5">
        <button
          onClick={() => setLanguage("me")}
          className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
            language === "me"
              ? "text-primary-foreground bg-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          ME
        </button>
        <button
          onClick={() => setLanguage("en")}
          className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
            language === "en"
              ? "text-primary-foreground bg-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          EN
        </button>
      </div>
    </nav>
  );
};

export default LanguageNav;
