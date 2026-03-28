import { useState } from "react";
import { motion } from "framer-motion";
import { WardrobeItem, PatternType } from "@/data/wardrobe";
import { Leaf, AlertTriangle, RotateCcw, Weight, Fingerprint, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface VaultCardProps {
  item: WardrobeItem;
  index: number;
  isScanned: boolean;
  scanDelay: number;
}

const patternSVGs: Record<PatternType, string> = {
  "Animal Print": "url(\"data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='5' fill='%23A855F720'/%3E%3Ccircle cx='30' cy='25' r='7' fill='%23A855F715'/%3E%3Ccircle cx='20' cy='35' r='4' fill='%23A855F710'/%3E%3C/svg%3E\")",
  "Block Print": "url(\"data:image/svg+xml,%3Csvg width='30' height='30' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='2' y='2' width='12' height='12' fill='%2338BDF810' rx='2'/%3E%3Crect x='16' y='16' width='12' height='12' fill='%2338BDF808' rx='2'/%3E%3C/svg%3E\")",
  "Floral": "url(\"data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='3' fill='%23A855F718'/%3E%3Ccircle cx='20' cy='12' r='5' fill='%2322D3EE10'/%3E%3Ccircle cx='26' cy='18' r='5' fill='%2322D3EE08'/%3E%3Ccircle cx='14' cy='18' r='5' fill='%2322D3EE08'/%3E%3C/svg%3E\")",
  "Geometric": "url(\"data:image/svg+xml,%3Csvg width='30' height='30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='15,2 28,28 2,28' fill='none' stroke='%2338BDF812' stroke-width='1'/%3E%3C/svg%3E\")",
  "Vintage Motif": "url(\"data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20 Q10 10 20 20 Q30 30 40 20' fill='none' stroke='%23A855F710' stroke-width='1.5'/%3E%3C/svg%3E\")",
  "Solid": "none",
};

const VaultCard = ({ item, index, isScanned, scanDelay }: VaultCardProps) => {
  const isHigh = item.impactLevel === "high";
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`glass-card group relative ${isHigh ? "flicker-red" : ""} ${isScanned ? "animate-glitch-in" : ""}`}
      style={isScanned ? { animationDelay: `${scanDelay}ms` } : undefined}
    >
      {/* Pattern texture area */}
      <div className="h-36 rounded-lg mb-4 relative overflow-hidden flex items-center justify-center"
        style={{
          background: `hsl(var(--surface))`,
          backgroundImage: patternSVGs[item.pattern],
        }}
      >
        <span className="mono-data text-[10px] text-muted-foreground tracking-[0.3em] uppercase relative z-10">
          {item.category}
        </span>

        {/* Impact badge */}
        <div className="absolute top-2.5 right-2.5 z-10">
          {isHigh ? (
            <span className="cyber-badge-red text-[10px]">
              <AlertTriangle className="h-3 w-3 mr-1" /> HIGH
            </span>
          ) : (
            <span className="cyber-badge-cyan text-[10px]">
              <Leaf className="h-3 w-3 mr-1" />
              {item.impactLevel === "low" ? "ECO" : "MOD"}
            </span>
          )}
        </div>

        {/* Pattern tag */}
        <div className="absolute bottom-2.5 left-2.5 z-10">
          <span className="pattern-tag">{item.pattern}</span>
        </div>

        {/* Hover texture analysis tooltip */}
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-2.5 left-2.5 z-20 px-3 py-2 rounded-lg text-[10px] mono-data"
            style={{
              background: "hsl(var(--background) / 0.9)",
              backdropFilter: "blur(12px)",
              border: "1px solid hsl(var(--neon-purple) / 0.3)",
              color: "hsl(var(--neon-purple))",
            }}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <Fingerprint className="h-3 w-3" />
              <span className="font-semibold">Texture Analysis</span>
            </div>
            <p>Pattern: {item.patternDetail}</p>
            <p>Impact: {item.patternImpact}</p>
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-3.5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground leading-tight">{item.name}</h3>
            <p className="mono-data text-[11px] text-muted-foreground mt-0.5">{item.id} • {item.material}</p>
          </div>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-3.5 w-3.5 text-muted-foreground hover:text-primary transition-colors" />
            </TooltipTrigger>
            <TooltipContent className="mono-data text-[11px]" style={{ background: "hsl(var(--surface-elevated))", border: "1px solid hsl(var(--border))" }}>
              <p>Fabric ID: {item.id}</p>
              <p>Weight: {item.fabricWeight}g</p>
              <p>CO₂ Payload: {item.co2Score} kg</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: Leaf, label: "CO₂", value: `${item.co2Score}`, unit: "kg", color: isHigh ? "text-destructive" : "text-primary" },
            { icon: RotateCcw, label: "Wear", value: `${item.wearCount}`, unit: "×", color: "text-accent" },
            { icon: Weight, label: "Mass", value: `${item.fabricWeight}`, unit: "g", color: "text-neon-purple" },
          ].map((metric) => (
            <div key={metric.label} className="text-center p-2 rounded-lg bg-secondary/50">
              <metric.icon className={`h-3 w-3 mx-auto mb-1 ${metric.color}`} />
              <p className={`mono-data text-xs font-semibold ${metric.color}`}>{metric.value}<span className="text-[9px] text-muted-foreground">{metric.unit}</span></p>
              <p className="text-[9px] text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>

        {/* Sustainability bar */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="mono-data text-[10px] text-muted-foreground">SUSTAINABILITY</span>
            <span className={`mono-data text-[10px] font-semibold ${isHigh ? "text-destructive" : "text-primary"}`}>
              {item.sustainabilityScore}%
            </span>
          </div>
          <div className="h-1 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${item.sustainabilityScore}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.08 + 0.2 }}
              className={`h-full rounded-full ${
                isHigh ? "bg-destructive/70" : "bg-primary"
              }`}
            />
          </div>
        </div>

        {/* Suggestion */}
        {item.suggestion && (
          <div className="p-2.5 rounded-lg" style={{ background: "hsl(var(--neon-purple) / 0.06)", border: "1px solid hsl(var(--neon-purple) / 0.15)" }}>
            <p className="text-[10px] neon-text-purple mono-data leading-relaxed">
              ⚡ {item.suggestion}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default VaultCard;
