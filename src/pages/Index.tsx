import { useState } from "react";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import About from "@/components/landing/About";
import Pricing from "@/components/landing/Pricing";
import Gallery from "@/components/landing/Gallery";
import Booking from "@/components/landing/Booking";
import MapSection from "@/components/landing/MapSection";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import LanguageNav from "@/components/landing/LanguageNav";
import BackgroundEffects from "@/components/landing/BackgroundEffects";
import Preloader from "@/components/landing/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/landing/ScrollProgress";
import BackToTop from "@/components/landing/BackToTop";

const Index = () => {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <>
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}
      <SmoothScroll>
        <div className="min-h-screen relative overflow-x-hidden">
          <ScrollProgress />
          <BackgroundEffects />
          <LanguageNav />
          <Hero />
          <Features />
          <About />
          <Pricing />
          <Gallery />
          <Booking />
          <MapSection />
          <Contact />
          <Footer />
          <WhatsAppFloat />
          <BackToTop />
        </div>
      </SmoothScroll>
    </>
  );
};

export default Index;
