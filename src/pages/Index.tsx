import { useEffect, useRef } from "react";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Gallery from "@/components/landing/Gallery";
import Booking from "@/components/landing/Booking";
import MapSection from "@/components/landing/MapSection";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import LanguageNav from "@/components/landing/LanguageNav";
import BackgroundEffects from "@/components/landing/BackgroundEffects";

const Index = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <BackgroundEffects />
      <LanguageNav />
      <Hero />
      <Features />
      <Gallery />
      <Booking />
      <MapSection />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Index;