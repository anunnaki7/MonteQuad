import { useLanguage } from "@/contexts/LanguageContext";
import { Mountain, Instagram, MessageCircle } from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="relative border-t border-border mt-10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="container py-14 md:py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Mountain className="w-5 h-5 text-primary" />
              <h3 className="font-display text-2xl font-bold tracking-tight">
                Monte<span className="text-primary">Quad</span>
              </h3>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Quick links */}
          <div className="md:justify-self-center">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              Menu
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#pricing" className="text-foreground/80 hover:text-primary transition-colors">Units</a></li>
              <li><a href="#galerija" className="text-foreground/80 hover:text-primary transition-colors">Gallery</a></li>
              <li><a href="#lokacija" className="text-foreground/80 hover:text-primary transition-colors">Location</a></li>
              <li><a href="#kontakt" className="text-foreground/80 hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Socials */}
          <div className="md:justify-self-end">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              Connect
            </h4>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/montequadtourkolasin/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 flex items-center justify-center rounded-full glass-card hover:border-primary/50 hover:text-primary transition-all duration-300 hover:-translate-y-0.5"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/38268593203"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 flex items-center justify-center rounded-full glass-card hover:border-primary/50 hover:text-primary transition-all duration-300 hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/60 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; 2026 MonteQuad Kolašin. {t("footer.rights")}.
          </p>
          <p className="text-xs text-muted-foreground">
            Kolašin · Montenegro
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
