import { Mountain, Heart, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 md:py-32 px-4">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="reveal">
            <span className="inline-block px-4 py-2 rounded-full glass-card text-xs font-medium text-primary uppercase tracking-widest mb-6">
              {t("about.badge")}
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-8">
              {t("about.title1")}<br />
              <span className="text-primary">{t("about.title2")}</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
              <p>{t("about.p3")}</p>
            </div>
          </div>

          {/* Stats/Icons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="reveal glass-card p-6 text-center" style={{ animationDelay: "0.1s" }}>
              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-primary/10 rounded-2xl text-primary">
                <Mountain className="w-7 h-7" />
              </div>
              <div className="font-display text-3xl font-bold text-primary mb-1">5+</div>
              <div className="text-sm text-muted-foreground">
                {t("features.route.title")}
              </div>
            </div>

            <div className="reveal glass-card p-6 text-center" style={{ animationDelay: "0.2s" }}>
              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-secondary/10 rounded-2xl text-secondary">
                <Heart className="w-7 h-7" />
              </div>
              <div className="font-display text-3xl font-bold text-secondary mb-1">500+</div>
              <div className="text-sm text-muted-foreground">
                {t("gallery.title2")}
              </div>
            </div>

            <div className="reveal glass-card p-6 text-center" style={{ animationDelay: "0.3s" }}>
              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-primary/10 rounded-2xl text-primary">
                <Award className="w-7 h-7" />
              </div>
              <div className="font-display text-3xl font-bold text-primary mb-1">5★</div>
              <div className="text-sm text-muted-foreground">
                Rating
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
