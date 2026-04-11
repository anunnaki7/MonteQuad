import { useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Pricing = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const packages = [
    {
      name: t("pricing.quad.title"),
      price: "€70",
      duration: t("pricing.quad.duration"),
      features: [
        t("pricing.quad.feature1"),
        t("pricing.quad.feature2"),
        t("pricing.quad.feature3"),
        t("pricing.quad.feature4"),
      ],
      popular: false,
    },
    {
      name: t("pricing.buggy.title"),
      price: "€160",
      duration: t("pricing.buggy.duration"),
      features: [
        t("pricing.buggy.feature1"),
        t("pricing.buggy.feature2"),
        t("pricing.buggy.feature3"),
        t("pricing.buggy.feature4"),
      ],
      popular: true,
    },
    {
      name: t("pricing.premium.title"),
      price: "€180",
      duration: t("pricing.premium.duration"),
      features: [
        t("pricing.premium.feature1"),
        t("pricing.premium.feature2"),
        t("pricing.premium.feature3"),
        t("pricing.premium.feature4"),
      ],
      popular: false,
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Header reveal
      const header = sectionRef.current!.querySelector(".pricing-header");
      if (header) {
        gsap.fromTo(header, { y: 50, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none none" },
        });
      }
      // Cards cascade
      const cards = sectionRef.current!.querySelectorAll(".pricing-card");
      gsap.fromTo(cards, { y: 100, opacity: 0, scale: 0.9 }, {
        y: 0, opacity: 1, scale: 1,
        duration: 0.9, stagger: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none none" },
      });
      // Note
      const note = sectionRef.current!.querySelector(".pricing-note");
      if (note) {
        gsap.fromTo(note, { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: note, start: "top 90%", toggleActions: "play none none none" },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="pricing" className="py-20 md:py-32 px-4">
      <div className="container">
        <div className="pricing-header text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full glass-card text-xs font-medium text-primary uppercase tracking-widest mb-6">
            {t("pricing.badge")}
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            {t("pricing.title1")}{" "}
            <span className="text-primary">{t("pricing.title2")}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`pricing-card glass-card p-8 relative overflow-hidden transition-all duration-300 hover:-translate-y-2 ${
                pkg.popular ? "ring-2 ring-primary" : ""
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                  {t("pricing.popular")}
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="font-display text-xl font-semibold mb-2">{pkg.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{pkg.duration}</p>
                <div className="font-display text-4xl font-bold text-primary">
                  {pkg.price}
                  <span className="text-lg text-muted-foreground font-normal">{t("pricing.perPerson")}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <div className="w-5 h-5 flex items-center justify-center bg-primary/10 rounded-full">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className={`w-full rounded-xl py-6 font-semibold transition-all duration-300 ${
                  pkg.popular
                    ? "btn-glow cta-shimmer bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow"
                    : "bg-[hsl(var(--glass-bg-hover))] border border-[hsl(var(--glass-border))] hover:border-primary/50"
                }`}
              >
                <a href="https://wa.me/38268593203" target="_blank" rel="noopener noreferrer">
                  {t("pricing.book")}
                </a>
              </Button>
            </div>
          ))}
        </div>

        <p className="pricing-note text-center text-sm text-muted-foreground mt-8">
          {t("pricing.contact")}
        </p>
      </div>
    </section>
  );
};

export default Pricing;
