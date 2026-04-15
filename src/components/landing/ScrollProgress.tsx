import { useEffect, useState } from "react";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px]">
      <div
        className="h-full bg-primary transition-[width] duration-100 ease-out"
        style={{
          width: `${progress}%`,
          boxShadow: "0 0 10px hsl(var(--primary) / 0.5), 0 0 20px hsl(var(--primary) / 0.2)",
        }}
      />
    </div>
  );
};

export default ScrollProgress;
