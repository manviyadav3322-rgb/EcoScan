import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Cpu, ArrowDown, Activity } from "lucide-react";

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.96]);

  return (
    <section ref={ref} className="relative min-h-[85vh] flex items-center justify-center overflow-hidden scanline-overlay">
      {/* Grid background */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(hsl(var(--neon-blue) / 0.03) 1px, transparent 1px),
          linear-gradient(90deg, hsl(var(--neon-blue) / 0.03) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }} />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />

      <motion.div style={{ opacity, y, scale }} className="relative z-10 max-w-3xl mx-auto text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="cyber-badge mb-8"
        >
          <Activity className="h-3 w-3 mr-1" />
          <span>System Online — Neural Engine Active</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6"
        >
          Your Wardrobe,{" "}
          <span className="neon-text">Decoded</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto mb-10"
        >
          EcoScan analyzes every fiber, pattern, and emission signature in your wardrobe — 
          mapping the full environmental payload of your style.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="flex items-center justify-center gap-4"
        >
          <button className="cyber-btn">
            <Cpu className="h-4 w-4" />
            Scan Wardrobe
          </button>
          <button className="cyber-btn-outline">
            View Protocol
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-16"
        >
          <ArrowDown className="h-5 w-5 mx-auto text-muted-foreground animate-bounce" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
