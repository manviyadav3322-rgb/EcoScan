import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wardrobeItems } from "@/data/wardrobe";
import WardrobeCard from "./WardrobeCard";
import { Scan } from "lucide-react";

const WardrobeGrid = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanned, setScanned] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setScanned(false);
    setTimeout(() => {
      setIsScanning(false);
      setScanned(true);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg neon-text-blue">Scanned Assets</h2>
          <p className="text-xs text-muted-foreground font-mono mt-1">
            {wardrobeItems.length} items indexed • {wardrobeItems.filter(i => i.isHighEmission).length} flagged
          </p>
        </div>
        <button
          onClick={handleScan}
          disabled={isScanning}
          className="holographic-btn flex items-center gap-2 text-xs disabled:opacity-50"
        >
          <Scan className={`h-4 w-4 ${isScanning ? "animate-spin" : ""}`} />
          {isScanning ? "Scanning..." : "Scan Wardrobe"}
        </button>
      </div>

      {/* Grid with scan overlay */}
      <div className="relative">
        <AnimatePresence>
          {isScanning && (
            <motion.div
              initial={{ top: 0, opacity: 0 }}
              animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "linear" }}
              className="absolute left-0 right-0 h-1 z-20 pointer-events-none"
              style={{
                background: "linear-gradient(180deg, transparent, hsl(var(--neon-cyan)), transparent)",
                boxShadow: "0 0 30px 10px hsl(var(--neon-cyan) / 0.4)",
              }}
            />
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {wardrobeItems.map((item, i) => (
            <WardrobeCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WardrobeGrid;
