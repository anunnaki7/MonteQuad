import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useGsapReveal = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Reveal single elements
      gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 20%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Staggered cascade reveals
      gsap.utils.toArray<HTMLElement>(".gsap-cascade").forEach((wrapper) => {
        const items = wrapper.querySelectorAll(".gsap-cascade-item");
        gsap.fromTo(
          items,
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: wrapper,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Sequential icon scale reveals
      gsap.utils.toArray<HTMLElement>(".gsap-icons-seq").forEach((wrapper) => {
        const icons = wrapper.querySelectorAll(".gsap-icon-item");
        gsap.fromTo(
          icons,
          { scale: 0, opacity: 0, rotation: -15 },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: wrapper,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Map shutter reveal
      gsap.utils.toArray<HTMLElement>(".gsap-shutter").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(0 50% 0 50%)", opacity: 0 },
          {
            clipPath: "inset(0 0% 0 0%)",
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return containerRef;
};
