import { Route, Shield, Users } from "lucide-react";

const features = [
  {
    icon: Route,
    title: "Jedinstvene Rute",
    description: "Istražite skrivene staze kroz planinske predele",
  },
  {
    icon: Shield,
    title: "Sigurna Oprema",
    description: "Profesionalna oprema i obuka za sve učesnike",
  },
  {
    icon: Users,
    title: "Grupne Ture",
    description: "Idealno za porodice, prijatelje i timove",
  },
];

const Features = () => {
  return (
    <section className="py-20 md:py-32 px-4">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="reveal glass-card p-8 text-center relative overflow-hidden group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-primary/10 rounded-2xl text-primary transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-glow">
                <feature.icon className="w-7 h-7" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-semibold mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;