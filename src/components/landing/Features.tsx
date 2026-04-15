import { useEffect, useRef } from "react";
import { Route, Shield, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const features = [
    { icon: Route, title: t("features.route.title"), description: t("features.route.desc") },
    { icon: Shield, title: t("features.safety.title"), description: t("features.safety.desc") },
    { icon: Users, title: t("features.group.title"), description: t("features.group.desc") },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const cards = sectionRef.current!.querySelectorAll(".feature-card");
      gsap.fromTo(cards, { y: 80, opacity: 0, scale: 0.92 }, {
        y: 0, opacity: 1, scale: 1,
        duration: 0.9, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
      });
      const icons = sectionRef.current!.querySelectorAll(".feature-icon");
      gsap.fromTo(icons, { scale: 0, opacity: 0, rotation: -20 }, {
        scale: 1, opacity: 1, rotation: 0,
        duration: 0.6, stagger: 0.2, ease: "back.out(1.7)",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none none" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-4">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="feature-card glass-card p-8 text-center relative overflow-hidden group">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="feature-icon w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-primary/10 rounded-2xl text-primary transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-glow">
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
