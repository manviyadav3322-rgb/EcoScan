import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { wardrobeItems } from "@/data/wardrobe";

const CarbonAlertBanner = () => {
  const flagged = wardrobeItems.filter((i) => i.isHighEmission);
  if (flagged.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      className="neon-border-red rounded-lg p-3 bg-destructive/5"
    >
      <div className="flex items-start gap-2">
        <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-display tracking-wider text-destructive">
            Carbon Alert — {flagged.length} items flagged
          </p>
          <p className="text-[10px] text-muted-foreground font-mono mt-1">
            {flagged.map((f) => f.id).join(", ")} exceed emission thresholds. Total excess: {" "}
            {flagged.reduce((s, f) => s + f.co2Impact, 0).toFixed(1)} kg CO₂.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CarbonAlertBanner;
