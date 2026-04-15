import { useEffect, useRef } from "react";
import { Mountain, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMagnetic } from "@/hooks/useMagnetic";
import heroImage from "@/assets/hero-quad.jpg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SplitText = ({ text, className }: { text: string; className?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const chars = ref.current.querySelectorAll(".split-char");
    gsap.fromTo(
      chars,
      { y: 120, opacity: 0, rotateX: -90 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1,
        stagger: 0.04,
        ease: "power4.out",
        delay: 0.2,
      }
    );
  }, [text]);

  return (
    <span ref={ref} className={className} style={{ display: "inline-block", overflow: "hidden", perspective: "600px" }}>
      {text.split("").map((char, i) => (
        <span
          key={`${char}-${i}`}
          className="split-char"
          style={{
            display: "inline-block",
            willChange: "transform, opacity",
            transformOrigin: "center bottom",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

const Hero = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useMagnetic(0.2);

  useEffect(() => {
    if (!sectionRef.current || !bgRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bgRef.current,
        { scale: 1.15 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      gsap.to(contentRef.current, {
        y: -80,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center",
          end: "bottom top",
          scrub: true,
        },
      });

      const els = contentRef.current?.querySelectorAll(".hero-anim");
      if (els) {
        gsap.fromTo(
          els,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.6 }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen min-h-[100dvh] flex items-center justify-center relative px-4 py-20 overflow-hidden">
      {/* Parallax BG */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-[65%_30%] md:bg-center bg-no-repeat will-change-transform"
        style={{ backgroundImage: `url(${heroImage})`, transformOrigin: "center center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
      </div>

      <div ref={contentRef} className="text-center z-10 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="hero-anim inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-muted-foreground mb-8">
          <Mountain className="w-4 h-4 text-primary" />
          <span>{t("hero.location")}</span>
        </div>

        {/* Title */}
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-6">
          <span className="block overflow-hidden">
            <SplitText text="Monte" />
          </span>
          <span className="block text-gradient overflow-hidden">
            <SplitText text="Quad" />
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-anim text-lg md:text-xl text-muted-foreground mb-10 max-w-md mx-auto leading-relaxed">
          {t("hero.subtitle")}<br />
          <span className="text-foreground font-medium">{t("hero.highlight")}</span>
        </p>

        {/* Buttons */}
        <div ref={ctaRef} className="hero-anim flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="btn-glow cta-shimmer bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow hover:shadow-[0_0_50px_hsl(40_85%_55%_/_0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] rounded-full px-8 py-6 text-base font-semibold"
          >
            <a href="#booking">
              <CalendarCheck className="w-5 h-5 mr-2" />
              {t("hero.cta")}
            </a>
          </Button>

          <Button
            asChild
            size="lg"
            className="hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-300 rounded-full px-8 py-6 text-base font-semibold text-white shadow-glow-secondary hover:shadow-[0_0_50px_hsl(270_91%_65%_/_0.4)]"
            style={{ background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}
          >
            <a href="https://www.instagram.com/montequadtourkolasin/" target="_blank" rel="noopener noreferrer">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              Instagram
            </a>
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="hero-anim flex flex-col items-center gap-3 animate-bounce-gentle mt-12 hidden md:flex">
          <div className="w-6 h-10 border-2 border-border rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-primary rounded-full animate-scroll-wheel" />
          </div>
          <span className="text-xs text-muted-foreground uppercase tracking-widest">{t("hero.scroll")}</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
