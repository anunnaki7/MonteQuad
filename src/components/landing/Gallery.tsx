import { Expand } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import quad1 from "../../assets/quad1.jpg";
import quad2 from "../../assets/quad2.jpg";
import quad3 from "../../assets/quad3.jpg";
import quad4 from "../../assets/quad4.jpg";

const images = [quad1, quad2, quad3, quad4];

const Gallery = () => {
  const { t } = useLanguage();

  return (
    <section id="galerija" className="py-20 md:py-32 px-4">
      <div className="container">
        {/* Header */}
        <div className="reveal text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full glass-card text-xs font-medium text-primary uppercase tracking-widest mb-6">
            {t("gallery.badge")}
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            {t("gallery.title1")}<br />
            <span className="text-primary">{t("gallery.title2")}</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="reveal glass-card aspect-square relative overflow-hidden cursor-pointer group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${image})` }}
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Expand className="w-8 h-8 text-white transform scale-75 group-hover:scale-100 transition-transform duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
