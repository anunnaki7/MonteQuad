import { useEffect, useRef } from "react";
import { Expand } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import quad1 from "../../assets/quad1.jpg";
import quad2 from "../../assets/quad2.jpg";
import quad3 from "../../assets/quad3.jpg";
import quad4 from "../../assets/quad4.jpg";

gsap.registerPlugin(ScrollTrigger);

const images = [quad1, quad2, quad3, quad4];

const Gallery = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const header = sectionRef.current!.querySelector(".gallery-header");
      if (header) {
        gsap.fromTo(header, { y: 50, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none none" },
        });
      }
      const items = sectionRef.current!.querySelectorAll(".gallery-item");
      gsap.fromTo(items, { y: 100, opacity: 0, scale: 0.88 }, {
        y: 0, opacity: 1, scale: 1,
        duration: 0.9, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none none" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.06;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.06;
    gsap.to(el, { x, y, duration: 0.4, ease: "power2.out" });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
  };

  return (
    <section ref={sectionRef} id="galerija" className="py-20 md:py-32 px-4">
      <div className="container">
        <div className="gallery-header text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full glass-card text-xs font-medium text-primary uppercase tracking-widest mb-6">
            {t("gallery.badge")}
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            {t("gallery.title1")}<br />
            <span className="text-primary">{t("gallery.title2")}</span>
          </h2>
        </div>

        {/* Asymmetric Bento Gallery */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className={`gallery-item glass-card relative overflow-hidden cursor-pointer group ${
                index === 0 ? "col-span-2 row-span-2 aspect-square" :
                index === 1 ? "aspect-[4/3]" :
                index === 2 ? "aspect-[4/3]" :
                "col-span-2 lg:col-span-2 aspect-[21/9]"
              }`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${image})` }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Expand className="w-8 h-8 text-white transform scale-75 group-hover:scale-100 transition-transform duration-500" />
              </div>
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: "inset 0 0 30px hsl(var(--primary) / 0.1), 0 0 20px hsl(var(--primary) / 0.06)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
