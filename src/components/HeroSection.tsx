import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Leaf, ArrowDown } from "lucide-react";
import UploadDialog from "./UploadDialog";

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.96]);

  return (
    <section ref={ref} className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-sage-light/30" />

      <motion.div
        style={{ opacity, y, scale }}
        className="relative z-10 max-w-3xl mx-auto text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="inline-flex items-center gap-2 sage-badge mb-8"
        >
          <Leaf className="h-3.5 w-3.5" />
          <span>Powered by Conscious AI</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.08] mb-6"
        >
          Your Wardrobe,{" "}
          <span className="text-sage">Reimagined</span>{" "}
          for the Planet.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto mb-10"
        >
          EcoScan maps the environmental story of every garment you own — 
          and helps you build a wardrobe that's kinder to the world.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="flex items-center justify-center"
        >
          <button className="luxury-btn" onClick={() => setUploadOpen(true)}>
            Scan Your Wardrobe
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

      <UploadDialog open={uploadOpen} onClose={() => setUploadOpen(false)} />
    </section>
  );
};

export default HeroSection;
