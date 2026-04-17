import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mountain, Menu, X } from "lucide-react";

const LanguageNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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
    { href: "#pricing", label: language === "me" ? "Paketi" : "Units" },
    { href: "#galerija", label: language === "me" ? "Galerija" : "Gallery" },
    { href: "#lokacija", label: language === "me" ? "Lokacija" : "Location" },
    { href: "#kontakt", label: language === "me" ? "Kontakt" : "Contact" },
  ];

  return (
    <>
      {/* Premium gradient border wrapper */}
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          hidden ? "-translate-y-20 opacity-0" : "translate-y-0 opacity-100"
        }`}
        style={{
          padding: "1px",
          borderRadius: "9999px",
          background: scrolled
            ? "linear-gradient(135deg, hsl(190 100% 60% / 0.4), hsl(220 90% 65% / 0.15) 30%, transparent 60%, hsl(250 80% 65% / 0.3))"
            : "linear-gradient(135deg, hsl(190 100% 60% / 0.15), transparent 50%, hsl(250 80% 65% / 0.1))",
        }}
      >
        <div
          className={`flex items-center gap-1 px-2 py-1.5 rounded-full transition-all duration-500 ${
            scrolled
              ? "bg-background/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_24px_hsl(190_100%_60%_/_0.08)]"
              : "bg-background/30 backdrop-blur-xl"
          }`}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 px-3 py-1.5 group">
            <div className="relative">
              <Mountain className="w-4 h-4 text-primary transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-primary/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="font-display text-sm font-bold tracking-tight hidden sm:inline text-foreground">
              Monte<span className="text-gradient">Quad</span>
            </span>
          </a>

          <span className="w-px h-5 bg-gradient-to-b from-transparent via-border to-transparent mx-1 hidden md:block" />

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground transition-all duration-300 group"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            ))}
          </div>

          <span className="w-px h-5 bg-gradient-to-b from-transparent via-border to-transparent mx-1" />

          {/* Language Toggle - premium pill */}
          <div className="relative flex items-center bg-background/40 rounded-full p-0.5 border border-border/50">
            <span
              className={`absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full transition-transform duration-300 ease-out`}
              style={{
                background: "linear-gradient(135deg, hsl(190 100% 60%), hsl(220 90% 65%))",
                boxShadow: "0 0 12px hsl(190 100% 60% / 0.4), inset 0 1px 0 hsl(0 0% 100% / 0.2)",
                transform: language === "me" ? "translateX(0)" : "translateX(100%)",
              }}
            />
            <button
              onClick={() => setLanguage("me")}
              className={`relative z-10 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider transition-colors duration-300 ${
                language === "me" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              ME
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`relative z-10 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider transition-colors duration-300 ${
                language === "en" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              EN
            </button>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="md:hidden ml-1 w-8 h-8 flex items-center justify-center rounded-full text-foreground/80 hover:text-primary hover:bg-primary/10 transition-colors"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <div
        className={`fixed inset-0 z-[60] md:hidden transition-all duration-500 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-background/90 backdrop-blur-2xl"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`relative h-full flex flex-col items-center justify-center gap-8 transition-transform duration-500 ${
            mobileOpen ? "translate-y-0" : "-translate-y-8"
          }`}
        >
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full glass-card text-foreground hover:text-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-4">
            <Mountain className="w-6 h-6 text-primary" />
            <span className="font-display text-2xl font-bold">
              Monte<span className="text-gradient">Quad</span>
            </span>
          </div>

          <nav className="flex flex-col items-center gap-2">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-display text-3xl font-semibold text-foreground/80 hover:text-primary transition-colors duration-300"
                style={{
                  animation: mobileOpen ? `heroEntrance 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.07}s both` : "none",
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default LanguageNav;
