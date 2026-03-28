import { motion } from "framer-motion";
import { WardrobeItem } from "@/data/wardrobe";
import { AlertTriangle, Leaf, RotateCcw, Zap } from "lucide-react";

interface WardrobeCardProps {
  item: WardrobeItem;
  index: number;
}

const WardrobeCard = ({ item, index }: WardrobeCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className={`glass-panel scanline-overlay relative group cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
        item.isHighEmission ? "flicker-red" : "hover:shadow-[0_0_20px_hsl(var(--neon-blue)/0.2)]"
      }`}
    >
      {/* Item visual placeholder */}
      <div className="h-32 bg-gradient-to-br from-secondary to-muted flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <span className="font-display text-xs tracking-[0.3em] text-muted-foreground relative z-10">
          {item.category}
        </span>
        {item.isHighEmission && (
          <div className="absolute top-2 right-2 z-10">
            <AlertTriangle className="h-4 w-4 text-destructive animate-pulse" />
          </div>
        )}
      </div>

      {/* Metadata overlay */}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground leading-tight">{item.name}</h3>
            <p className="text-xs text-muted-foreground font-mono mt-0.5">{item.id}</p>
          </div>
          <div className={`text-xs font-mono px-2 py-0.5 rounded ${
            item.sustainabilityScore >= 70
              ? "bg-accent/10 text-accent"
              : item.sustainabilityScore >= 40
              ? "bg-primary/10 text-primary"
              : "bg-destructive/10 text-destructive"
          }`}>
            {item.sustainabilityScore}%
          </div>
        </div>

        {/* Data rows */}
        <div className="space-y-1.5 text-xs font-mono">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Zap className="h-3 w-3 text-primary" />
              Material
            </span>
            <span className="text-foreground">{item.material}</span>
          </div>
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Leaf className={`h-3 w-3 ${item.isHighEmission ? "text-destructive" : "text-accent"}`} />
              CO₂ Impact
            </span>
            <span className={item.isHighEmission ? "neon-text-red" : "text-foreground"}>
              {item.co2Impact} kg
            </span>
          </div>
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <RotateCcw className="h-3 w-3 text-primary" />
              Wear Count
            </span>
            <span className="text-foreground">{item.wearCount}×</span>
          </div>
        </div>

        {/* Sustainability bar */}
        <div className="relative h-1 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${item.sustainabilityScore}%` }}
            transition={{ delay: index * 0.08 + 0.3, duration: 0.6 }}
            className={`absolute h-full rounded-full ${
              item.sustainabilityScore >= 70
                ? "bg-accent"
                : item.sustainabilityScore >= 40
                ? "bg-primary"
                : "bg-destructive"
            }`}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default WardrobeCard;
