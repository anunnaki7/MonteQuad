import { useEffect, useRef } from "react";
import { Calendar, Mountain, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Content block slides in from left
      const content = sectionRef.current!.querySelector(".about-content");
      if (content) {
        gsap.fromTo(content, { x: -80, opacity: 0 }, {
          x: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
        });
      }
      // Stats cascade in
      const stats = sectionRef.current!.querySelectorAll(".about-stat");
      gsap.fromTo(stats, { y: 60, opacity: 0, scale: 0.9 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none none" },
      });
      // Stat icons animate draw
      const icons = sectionRef.current!.querySelectorAll(".about-icon");
      gsap.fromTo(icons, { scale: 0, rotation: -30 }, {
        scale: 1, rotation: 0, duration: 0.6, stagger: 0.2, ease: "back.out(1.7)",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none none" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-20 md:py-32 px-4">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="about-content">
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="about-stat glass-card p-6 text-center">
              <div className="about-icon w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-primary/10 rounded-2xl text-primary">
                <Calendar className="w-7 h-7" />
              </div>
              <div className="font-display text-3xl font-bold text-primary mb-1">2025</div>
              <div className="text-sm text-muted-foreground">{t("about.founded")}</div>
            </div>

            <div className="about-stat glass-card p-6 text-center">
              <div className="about-icon w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-secondary/10 rounded-2xl text-secondary">
                <Mountain className="w-7 h-7" />
              </div>
              <div className="font-display text-3xl font-bold text-secondary mb-1">2</div>
              <div className="text-sm text-muted-foreground">{t("about.mountains")}</div>
            </div>

            <div className="about-stat glass-card p-6 text-center">
              <div className="about-icon w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-primary/10 rounded-2xl text-primary">
                <Sparkles className="w-7 h-7" />
              </div>
              <div className="font-display text-3xl font-bold text-primary mb-1">∞</div>
              <div className="text-sm text-muted-foreground">{t("about.custom")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
