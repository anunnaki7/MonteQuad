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
  "about.title1": { me: "Vaša avantura", en: "Your adventure" },
  "about.title2": { me: "počinje ovdje", en: "starts here" },
  "about.p1": { me: "Dobrodošli u MonteQuad Kolašin! Mi smo tim ljubitelja avanture i prirode koji žele da vam prikažu ljepote crnogorskih planina na jedinstven način.", en: "Welcome to MonteQuad Kolašin! We are a team of adventure and nature enthusiasts who want to show you the beauty of Montenegrin mountains in a unique way." },
  "about.p2": { me: "Sa višegodišnjim iskustvom u organizovanju quad i buggy tura, garantujemo vam nezaboravno iskustvo uz maksimalnu sigurnost i profesionalnost.", en: "With years of experience organizing quad and buggy tours, we guarantee you an unforgettable experience with maximum safety and professionalism." },
  "about.p3": { me: "Naše ture vas vode kroz najljepše planinske staze Bjelasice i Komova, gdje ćete uživati u spektakularnim pogledima i čistom planinskom vazduhu.", en: "Our tours take you through the most beautiful mountain trails of Bjelasica and Komovi, where you will enjoy spectacular views and fresh mountain air." },

  // Pricing
  "pricing.badge": { me: "Cijene", en: "Pricing" },
  "pricing.title1": { me: "Naši", en: "Our" },
  "pricing.title2": { me: "paketi", en: "Packages" },
  "pricing.quad.title": { me: "Quad Tura", en: "Quad Tour" },
  "pricing.quad.duration": { me: "2 sata vožnje", en: "2 hours ride" },
  "pricing.quad.feature1": { me: "Profesionalni vodič", en: "Professional guide" },
  "pricing.quad.feature2": { me: "Oprema uključena", en: "Equipment included" },
  "pricing.quad.feature3": { me: "Foto pauze", en: "Photo stops" },
  "pricing.buggy.title": { me: "Buggy Tura", en: "Buggy Tour" },
  "pricing.buggy.duration": { me: "2 sata vožnje", en: "2 hours ride" },
  "pricing.buggy.feature1": { me: "Do 2 osobe", en: "Up to 2 people" },
  "pricing.buggy.feature2": { me: "Oprema uključena", en: "Equipment included" },
  "pricing.buggy.feature3": { me: "Foto pauze", en: "Photo stops" },
  "pricing.premium.title": { me: "Premium Tura", en: "Premium Tour" },
  "pricing.premium.duration": { me: "Pola dana avanture", en: "Half-day adventure" },
  "pricing.premium.feature1": { me: "4+ sata vožnje", en: "4+ hours ride" },
  "pricing.premium.feature2": { me: "Ručak uključen", en: "Lunch included" },
  "pricing.premium.feature3": { me: "Privatni vodič", en: "Private guide" },
  "pricing.book": { me: "Rezerviši", en: "Book Now" },
  "pricing.contact": { me: "Kontaktirajte nas za tačnu cijenu", en: "Contact us for exact price" },

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
