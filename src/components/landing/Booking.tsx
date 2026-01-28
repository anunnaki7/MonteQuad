import { useState } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const Booking = () => {
  const [date, setDate] = useState("");

  return (
    <section id="booking" className="py-20 md:py-32 px-4">
      <div className="container">
        <div className="reveal glass-card p-8 md:p-12 lg:p-16">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Content */}
            <div className="text-center md:text-left">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-xs font-medium text-primary uppercase tracking-widest mb-6">
                Rezervacija
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Rezerviši svoju<br />
                <span className="text-primary">avanturu</span>
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto md:mx-0">
                Odaberite željeni datum i pošaljite nam poruku putem WhatsApp-a
              </p>
            </div>

            {/* Form */}
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-[hsl(var(--glass-bg))] border border-[hsl(var(--glass-border))] rounded-xl text-foreground font-body focus:outline-none focus:border-primary focus:shadow-glow transition-all duration-300 [color-scheme:dark]"
                />
              </div>

              <Button 
                asChild 
                size="lg"
                className="btn-glow bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow hover:shadow-[0_0_50px_hsl(168_100%_48%_/_0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] rounded-xl py-6 text-base font-semibold"
              >
                <a href="https://wa.me/38268593203" target="_blank" rel="noopener noreferrer">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Pošalji rezervaciju
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;