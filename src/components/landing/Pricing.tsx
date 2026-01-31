import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Pricing = () => {
  const { t } = useLanguage();

  const packages = [
    {
      name: t("pricing.quad.title"),
      price: "€70",
      duration: t("pricing.quad.duration"),
      features: [
        t("pricing.quad.feature1"),
        t("pricing.quad.feature2"),
        t("pricing.quad.feature3"),
      ],
      popular: false,
    },
    {
      name: t("pricing.buggy.title"),
      price: "€160",
      duration: t("pricing.buggy.duration"),
      features: [
        t("pricing.buggy.feature1"),
        t("pricing.buggy.feature2"),
        t("pricing.buggy.feature3"),
      ],
      popular: true,
    },
    {
      name: t("pricing.premium.title"),
      price: "€180",
      duration: t("pricing.premium.duration"),
      features: [
        t("pricing.premium.feature1"),
        t("pricing.premium.feature2"),
        t("pricing.premium.feature3"),
      ],
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 md:py-32 px-4">
      <div className="container">
        {/* Header */}
        <div className="reveal text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full glass-card text-xs font-medium text-primary uppercase tracking-widest mb-6">
            {t("pricing.badge")}
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            {t("pricing.title1")}{" "}
            <span className="text-primary">{t("pricing.title2")}</span>
          </h2>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {packages.map((pkg, index) => (
            <div
              key={pkg.name}
              className={`reveal glass-card p-8 relative overflow-hidden transition-all duration-300 hover:-translate-y-2 ${
                pkg.popular ? "ring-2 ring-primary" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                  Popular
                </div>
              )}

              {/* Package Info */}
              <div className="text-center mb-6">
                <h3 className="font-display text-xl font-semibold mb-2">{pkg.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{pkg.duration}</p>
                <div className="font-display text-4xl font-bold text-primary">
                  {pkg.price}
                  <span className="text-lg text-muted-foreground font-normal">/os</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <div className="w-5 h-5 flex items-center justify-center bg-primary/10 rounded-full">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                asChild
                className={`w-full rounded-xl py-6 font-semibold transition-all duration-300 ${
                  pkg.popular
                    ? "btn-glow bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow"
                    : "bg-[hsl(var(--glass-bg-hover))] border border-[hsl(var(--glass-border))] hover:border-primary/50"
                }`}
              >
                <a href="https://wa.me/38268593203" target="_blank" rel="noopener noreferrer">
                  {t("pricing.book")}
                </a>
              </Button>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="reveal text-center text-sm text-muted-foreground mt-8" style={{ animationDelay: "0.4s" }}>
          {t("pricing.contact")}
        </p>
      </div>
    </section>
  );
};

export default Pricing;
