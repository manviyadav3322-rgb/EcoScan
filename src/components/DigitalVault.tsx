import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wardrobeItems } from "@/data/wardrobe";
import VaultCard from "./VaultCard";
import { Grid3X3, Scan } from "lucide-react";

const DigitalVault = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanned, setScanned] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setScanned(false);
    setTimeout(() => {
      setIsScanning(false);
      setScanned(true);
    }, 2200);
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Grid3X3 className="h-4 w-4 text-primary" />
              <span className="section-label">The Digital Vault</span>
            </div>
            <h2 className="section-heading">Scanned Assets</h2>
            <p className="text-muted-foreground mt-3 max-w-lg leading-relaxed text-sm">
              {wardrobeItems.length} garments indexed • Hover for texture analysis
            </p>
          </div>
          <button
            onClick={handleScan}
            disabled={isScanning}
            className="cyber-btn text-xs disabled:opacity-50"
          >
            <Scan className={`h-4 w-4 ${isScanning ? "animate-spin" : ""}`} />
            {isScanning ? "Syncing..." : "Scan Wardrobe"}
          </button>
        </motion.div>

        {/* Grid with scan laser */}
        <div className="relative">
          <AnimatePresence>
            {isScanning && (
              <motion.div
                initial={{ top: "0%" }}
                animate={{ top: "100%" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.2, ease: "linear" }}
                className="absolute left-0 right-0 h-[2px] z-20 pointer-events-none"
                style={{
                  background: "hsl(var(--neon-cyan))",
                  boxShadow: "0 0 20px 6px hsl(var(--neon-cyan) / 0.5), 0 0 60px 12px hsl(var(--neon-cyan) / 0.2)",
                }}
              />
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {wardrobeItems.map((item, i) => (
              <VaultCard
                key={item.id}
                item={item}
                index={i}
                isScanned={scanned}
                scanDelay={i * 120}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalVault;
