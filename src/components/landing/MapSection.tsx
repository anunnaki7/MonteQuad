import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MapSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Header
      const header = sectionRef.current!.querySelector(".map-header");
      if (header) {
        gsap.fromTo(header, { y: 50, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none none" },
        });
      }
      // Map shutter reveal
      const mapEl = sectionRef.current!.querySelector(".map-shutter");
      if (mapEl) {
        gsap.fromTo(mapEl,
          { clipPath: "inset(0 50% 0 50%)", opacity: 0 },
          {
            clipPath: "inset(0 0% 0 0%)", opacity: 1,
            duration: 1.2, ease: "power4.out",
            scrollTrigger: { trigger: mapEl, start: "top 80%", toggleActions: "play none none none" },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="lokacija" className="py-20 md:py-32 px-4">
      <div className="container">
        <div className="map-header text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full glass-card text-xs font-medium text-primary uppercase tracking-widest mb-6">
            {t("map.badge")}
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            {t("map.title1")}<br />
            <span className="text-primary">{t("map.title2")}</span>
          </h2>
        </div>

        <div className="map-shutter glass-card p-1 overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2926.270598259984!2d19.541982475251412!3d42.82489750560932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134d7d093162e94d%3A0xe1fcc1ac6fd625c1!2sGolden%20House!5e0!3m2!1sen!2sus!4v1769544425503!5m2!1sen!2sus"
            className="w-full h-80 md:h-[400px] rounded-xl border-0 grayscale-[0.3] contrast-110 hover:grayscale-0 hover:contrast-100 transition-all duration-300"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={t("map.title")}
          />
        </div>
      </div>
    </section>
  );
};

export default MapSection;
