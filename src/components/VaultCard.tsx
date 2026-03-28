import { motion } from "framer-motion";
import { WardrobeItem } from "@/data/wardrobe";
import { Leaf, AlertCircle, RotateCcw, Weight } from "lucide-react";

interface VaultCardProps {
  item: WardrobeItem;
  index: number;
}

const VaultCard = ({ item, index }: VaultCardProps) => {
  const isHigh = item.impactLevel === "high";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="luxury-card group"
    >
      {/* Image area */}
      <div className={`h-40 rounded-xl bg-gradient-to-br ${item.imageGradient} flex items-center justify-center mb-5 overflow-hidden relative`}>
        <span className="text-sm font-medium text-charcoal/30 tracking-widest uppercase">
          {item.category}
        </span>

        {/* Impact badge */}
        <div className="absolute top-3 right-3">
          {isHigh ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-destructive/10 text-destructive">
              <AlertCircle className="h-3 w-3" />
              High Impact
            </span>
          ) : (
            <span className="sage-badge text-[11px]">
              <Leaf className="h-3 w-3 mr-1" />
              {item.impactLevel === "low" ? "Eco" : "Moderate"}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <div>
          <h3 className="text-base font-semibold tracking-tight text-charcoal">{item.name}</h3>
          <p className="text-sm text-muted-foreground mt-0.5">{item.material}</p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-2.5 rounded-lg bg-secondary">
            <Leaf className={`h-3.5 w-3.5 mx-auto mb-1 ${isHigh ? "text-red-400" : "text-sage"}`} />
            <p className={`text-sm font-semibold ${isHigh ? "text-red-500" : "text-charcoal"}`}>
              {item.co2Score}
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">kg CO₂</p>
          </div>
          <div className="text-center p-2.5 rounded-lg bg-secondary">
            <RotateCcw className="h-3.5 w-3.5 mx-auto mb-1 text-sage" />
            <p className="text-sm font-semibold text-charcoal">{item.wearCount}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Wears</p>
          </div>
          <div className="text-center p-2.5 rounded-lg bg-secondary">
            <Weight className="h-3.5 w-3.5 mx-auto mb-1 text-sage" />
            <p className="text-sm font-semibold text-charcoal">{item.fabricWeight}g</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Weight</p>
          </div>
        </div>

        {/* Sustainability bar */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[11px] text-muted-foreground">Sustainability</span>
            <span className={`text-[11px] font-semibold ${isHigh ? "text-red-500" : "text-sage"}`}>
              {item.sustainabilityScore}%
            </span>
          </div>
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${item.sustainabilityScore}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.08 + 0.2 }}
              className={`h-full rounded-full ${
                isHigh ? "bg-destructive/70" : item.sustainabilityScore >= 80 ? "bg-sage" : "bg-sage-mid"
              }`}
            />
          </div>
        </div>

        {/* Suggestion */}
        {item.suggestion && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="p-3 rounded-lg bg-amber-50/60 border border-amber-100"
          >
            <p className="text-[11px] text-amber-700 leading-relaxed">
              💡 {item.suggestion}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default VaultCard;
