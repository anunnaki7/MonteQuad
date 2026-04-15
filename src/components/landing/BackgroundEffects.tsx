const BackgroundEffects = () => {
  return (
    <>
      {/* Subtle warm gradient background */}
      <div
        className="fixed inset-0 -z-20 animate-gradient-shift"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, hsl(40 85% 55% / 0.06), transparent),
            radial-gradient(ellipse 60% 40% at 80% 80%, hsl(30 80% 50% / 0.04), transparent),
            radial-gradient(ellipse 50% 30% at 20% 60%, hsl(40 85% 55% / 0.03), transparent),
            hsl(0 0% 7%)
          `,
        }}
      />

      {/* Noise Texture */}
      <div className="fixed inset-0 -z-10 noise-overlay" />

      {/* Subtle floating orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-[120px] opacity-15 animate-float"
          style={{
            background: "hsl(40 85% 55%)",
            top: "10%",
            left: "-10%",
          }}
        />
        <div
          className="absolute w-[300px] h-[300px] rounded-full blur-[120px] opacity-10 animate-float"
          style={{
            background: "hsl(30 80% 50%)",
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
