import { createContext, useContext, useState, ReactNode } from "react";

type Language = "me" | "en";

interface Translations {
  [key: string]: {
    me: string;
    en: string;
  };
}

const translations: Translations = {
  // Hero
  "hero.location": { me: "Kolašin, Crna Gora", en: "Kolašin, Montenegro" },
  "hero.subtitle": { me: "Doživite avanturu uz organizovane", en: "Experience adventure with organized" },
  "hero.highlight": { me: "quad i buggy ture", en: "quad and buggy tours" },
  "hero.cta": { me: "Rezerviši turu", en: "Book a Tour" },
  "hero.scroll": { me: "Skroluj dole", en: "Scroll down" },

  // Features
  "features.route.title": { me: "Jedinstvene Rute", en: "Unique Routes" },
  "features.route.desc": { me: "Istražite skrivene staze kroz planinske predele", en: "Explore hidden trails through mountain landscapes" },
  "features.safety.title": { me: "Sigurna Oprema", en: "Safe Equipment" },
  "features.safety.desc": { me: "Profesionalna oprema i obuka za sve učesnike", en: "Professional gear and training for all participants" },
  "features.group.title": { me: "Grupne Ture", en: "Group Tours" },
  "features.group.desc": { me: "Idealno za porodice, prijatelje i timove", en: "Perfect for families, friends and teams" },

  // About
  "about.badge": { me: "O Nama", en: "About Us" },
  "about.title1": { me: "Upoznajte", en: "Meet" },
  "about.title2": { me: "MonteQuad & Buggy", en: "MonteQuad & Buggy" },
  "about.p1": { me: "Dobrodošli u MonteQuad & Buggy Kolasin! Iza ovog projekta stoji Pavle Bulatović, osnivač od 2025. godine. Sa strašću prema prirodi i adrenalinu, nudimo vam jedinstveno iskustvo vožnje quad i buggy vozilima kroz crnogorske planine.", en: "Welcome to MonteQuad & Buggy Kolasin! Behind this project is Pavle Bulatović, founder since 2025. With a passion for nature and adrenaline, we offer you a unique experience of quad and buggy rides through Montenegrin mountains." },
  "about.p2": { me: "Naše ture vas vode kroz spektakularne predele planina Goleš i Bjelasica. Možemo organizovati ture po vašoj želji - prilagođavamo rute i trajanje prema vašim potrebama.", en: "Our tours take you through spectacular landscapes of Goleš and Bjelasica mountains. We can organize custom tours - adapting routes and duration to your needs." },
  "about.p3": { me: "Posebna ponuda: iznajmite apartman i dobijte popust na quad ture! Kombinujte smještaj i avanturu za kompletno planinsko iskustvo po povoljnijim cijenama.", en: "Special offer: rent an apartment and get a discount on quad tours! Combine accommodation and adventure for a complete mountain experience at better prices." },

  // About extra
  "about.founded": { me: "Osnovano", en: "Founded" },
  "about.mountains": { me: "Planine", en: "Mountains" },
  "about.custom": { me: "Ture po želji", en: "Custom Tours" },

  // Pricing
  "pricing.badge": { me: "Cijene", en: "Pricing" },
  "pricing.title1": { me: "Naši", en: "Our" },
  "pricing.title2": { me: "paketi", en: "Packages" },
  "pricing.quad.title": { me: "Quad Tura", en: "Quad Tour" },
  "pricing.quad.duration": { me: "1 sat vožnje", en: "1 hour ride" },
  "pricing.quad.feature1": { me: "Za dvoje osoba", en: "For 2 people" },
  "pricing.quad.feature2": { me: "Uz pratnju vodiča", en: "With guide escort" },
  "pricing.quad.feature3": { me: "Oprema uključena", en: "Equipment included" },
  "pricing.quad.feature4": { me: "Profesionalno fotografisanje", en: "Professional photography" },
  "pricing.buggy.title": { me: "Buggy Tura", en: "Buggy Tour" },
  "pricing.buggy.duration": { me: "1 sat vožnje", en: "1 hour ride" },
  "pricing.buggy.feature1": { me: "Za dvoje osoba", en: "For 2 people" },
  "pricing.buggy.feature2": { me: "Uz pratnju vodiča", en: "With guide escort" },
  "pricing.buggy.feature3": { me: "Oprema uključena", en: "Equipment included" },
  "pricing.buggy.feature4": { me: "Profesionalno fotografisanje", en: "Professional photography" },
  "pricing.premium.title": { me: "Premium Tura", en: "Premium Tour" },
  "pricing.premium.duration": { me: "Grupna avantura", en: "Group adventure" },
  "pricing.premium.feature1": { me: "Za 4 osobe", en: "For 4 people" },
  "pricing.premium.feature2": { me: "Uz pratnju vodiča", en: "With guide escort" },
  "pricing.premium.feature3": { me: "Oprema uključena", en: "Equipment included" },
  "pricing.premium.feature4": { me: "Profesionalno fotografisanje", en: "Professional photography" },
  "pricing.book": { me: "Rezerviši", en: "Book Now" },
  "pricing.contact": { me: "Kontaktirajte nas za tačnu cijenu", en: "Contact us for exact price" },
  "pricing.popular": { me: "Popularno", en: "Popular" },
  "pricing.perPerson": { me: "/os", en: "/pp" },

  // Gallery
  "gallery.badge": { me: "Galerija", en: "Gallery" },
  "gallery.title1": { me: "Avanture naših", en: "Adventures of our" },
  "gallery.title2": { me: "gostiju", en: "guests" },

  // Booking
  "booking.badge": { me: "Rezervacija", en: "Booking" },
  "booking.title1": { me: "Rezerviši svoju", en: "Book your" },
  "booking.title2": { me: "avanturu", en: "adventure" },
  "booking.desc": { me: "Odaberite željeni datum i pošaljite nam poruku putem WhatsApp-a", en: "Choose your preferred date and send us a message via WhatsApp" },
  "booking.send": { me: "Pošalji rezervaciju", en: "Send Booking" },

  // Contact
  "contact.badge": { me: "Kontakt", en: "Contact" },
  "contact.title1": { me: "Javite nam", en: "Get in" },
  "contact.title2": { me: "se", en: "touch" },
  "contact.phone": { me: "Telefon", en: "Phone" },
  "contact.whatsapp": { me: "Pišite nam direktno", en: "Message us directly" },

  // Footer
  "footer.tagline": { me: "Avantura počinje ovdje", en: "Adventure starts here" },
  "footer.rights": { me: "Sva prava zadržana", en: "All rights reserved" },
  "footer.menu": { me: "Meni", en: "Menu" },
  "footer.connect": { me: "Povežite se", en: "Connect" },
  "footer.units": { me: "Paketi", en: "Units" },
  "footer.gallery": { me: "Galerija", en: "Gallery" },
  "footer.location": { me: "Lokacija", en: "Location" },
  "footer.contact": { me: "Kontakt", en: "Contact" },

  // Map
  "map.badge": { me: "Lokacija", en: "Location" },
  "map.title1": { me: "Pronađite", en: "Find" },
  "map.title2": { me: "nas", en: "us" },
  "map.title": { me: "MonteQuad Kolašin lokacija", en: "MonteQuad Kolašin location" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("me");

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) return key;
    return translation[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
