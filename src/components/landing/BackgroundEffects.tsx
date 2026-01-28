const BackgroundEffects = () => {
  return (
    <>
      {/* Animated Gradient Background */}
      <div 
        className="fixed inset-0 -z-20 animate-gradient-shift"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, hsl(168 100% 48% / 0.15), transparent),
            radial-gradient(ellipse 60% 40% at 80% 80%, hsl(270 91% 65% / 0.1), transparent),
            radial-gradient(ellipse 50% 30% at 20% 60%, hsl(168 100% 48% / 0.08), transparent),
            hsl(240 20% 2%)
          `
        }}
      />
      
      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 -z-10 noise-overlay" />
      
      {/* Floating Shapes */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-[400px] h-[400px] rounded-full blur-[80px] opacity-30 animate-float"
          style={{ 
            background: "hsl(168 100% 48%)",
            top: "10%",
            left: "-10%",
          }}
        />
        <div 
          className="absolute w-[300px] h-[300px] rounded-full blur-[80px] opacity-30 animate-float"
          style={{ 
            background: "hsl(270 91% 65%)",
            top: "60%",
            right: "-5%",
            animationDelay: "-5s"
          }}
        />
        <div 
          className="absolute w-[200px] h-[200px] rounded-full blur-[80px] opacity-30 animate-float"
          style={{ 
            background: "hsl(168 100% 48%)",
            bottom: "20%",
            left: "30%",
            animationDelay: "-10s"
          }}
        />
      </div>
    </>
  );
};

export default BackgroundEffects;