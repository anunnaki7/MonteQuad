const BackgroundEffects = () => {
  return (
    <>
      {/* Futuristic deep-space gradient */}
      <div
        className="fixed inset-0 -z-20 animate-gradient-shift"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, hsl(190 100% 60% / 0.08), transparent),
            radial-gradient(ellipse 60% 40% at 80% 80%, hsl(250 80% 65% / 0.06), transparent),
            radial-gradient(ellipse 50% 30% at 20% 60%, hsl(220 90% 65% / 0.04), transparent),
            hsl(220 25% 5%)
          `,
        }}
      />

      {/* Noise Texture */}
      <div className="fixed inset-0 -z-10 noise-overlay" />

      {/* Subtle floating orbs - cyan & violet */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-[120px] opacity-20 animate-float"
          style={{
            background: "hsl(190 100% 60%)",
            top: "10%",
            left: "-10%",
          }}
        />
        <div
          className="absolute w-[300px] h-[300px] rounded-full blur-[120px] opacity-15 animate-float"
          style={{
            background: "hsl(250 80% 65%)",
            top: "60%",
            right: "-5%",
            animationDelay: "-5s",
          }}
        />
      </div>
    </>
  );
};

export default BackgroundEffects;
