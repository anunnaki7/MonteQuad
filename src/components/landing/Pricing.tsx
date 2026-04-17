import { useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import quad1 from "../../assets/quad1.jpg";
import quad2 from "../../assets/quad2.jpg";
import quad3 from "../../assets/quad3.jpg";

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
      image: quad1,
      specs: ["400CC", t("pricing.quad.feature3").includes("Oprema") ? "OPREMA" : "GEAR", "GUIDED"],
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
      image: quad2,
      specs: ["AUTOMATIC", "4X4", "2 SEATS"],
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
      image: quad3,
      specs: ["PREMIUM", "4 SEATS", "PRO PHOTO"],
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const header = sectionRef.current!.querySelector(".pricing-header");
      if (header) {
        gsap.fromTo(header, { y: 50, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none none" },
        });
      }

      // Bento cards cascade
      const cards = sectionRef.current!.querySelectorAll(".bento-card");
      gsap.fromTo(cards, { y: 100, opacity: 0, scale: 0.92 }, {
        y: 0, opacity: 1, scale: 1,
        duration: 0.9, stagger: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none none" },
      });

      // Sequential spec reveals
      sectionRef.current!.querySelectorAll(".spec-group").forEach((group) => {
        const specItems = group.querySelectorAll(".spec-item");
        gsap.fromTo(specItems, { scale: 0, opacity: 0, rotation: -15 }, {
          scale: 1, opacity: 1, rotation: 0,
          duration: 0.5, stagger: 0.15, ease: "back.out(1.7)",
          scrollTrigger: { trigger: group, start: "top 85%", toggleActions: "play none none none" },
        });
      });

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

  // Magnetic hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.04;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.04;
    gsap.to(el, { x, y, duration: 0.4, ease: "power2.out" });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
  };

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

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-7 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`bento-card glass-card relative overflow-hidden group transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_70px_-20px_hsl(var(--primary)/0.35)] ${
                pkg.popular ? "md:col-span-3 md:row-span-2 ring-1 ring-primary/40" : "md:col-span-3"
              }`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Image area */}
              <div className="relative h-48 md:h-56 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${pkg.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

                {pkg.popular && (
                  <div className="absolute top-3 right-3 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                    {t("pricing.popular")}
                  </div>
                )}

                {/* Unit label */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-background/60 backdrop-blur-md border border-border text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  UNIT TYPE-{String.fromCharCode(65 + index)}
                </div>

                {/* Spec badges */}
                <div className="spec-group absolute bottom-3 left-3 flex gap-2">
                  {pkg.specs.map((spec, si) => (
                    <div
                      key={si}
                      className="spec-item px-2 py-1 rounded-md bg-background/70 backdrop-blur-sm border border-border text-[10px] font-bold text-foreground tracking-wider"
                    >
                      {spec}
                    </div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-display text-lg font-bold">{pkg.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{pkg.duration}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-2xl font-bold text-primary">{pkg.price}</div>
                    <span className="text-[10px] text-muted-foreground">{t("pricing.perPerson")}</span>
                  </div>
                </div>

                <ul className="space-y-2 mb-5">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-xs">
                      <div className="w-4 h-4 flex items-center justify-center bg-primary/10 rounded-full shrink-0">
                        <Check className="w-2.5 h-2.5 text-primary" />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className={`w-full rounded-xl py-5 font-semibold transition-all duration-300 ${
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

              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: "inset 0 0 40px hsl(var(--primary) / 0.06), 0 0 30px hsl(var(--primary) / 0.04)" }}
              />
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
