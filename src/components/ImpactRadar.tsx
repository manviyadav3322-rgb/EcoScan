import { motion } from "framer-motion";
import { wardrobeItems } from "@/data/wardrobe";

const ImpactRadar = () => {
  const totalCO2 = wardrobeItems.reduce((sum, item) => sum + item.co2Impact, 0);
  const avgScore = Math.round(
    wardrobeItems.reduce((sum, item) => sum + item.sustainabilityScore, 0) / wardrobeItems.length
  );

  const categories = [
    { label: "CO₂", value: Math.min(100, (totalCO2 / 100) * 100), angle: 0 },
    { label: "REUSE", value: 78, angle: 60 },
    { label: "MATERIAL", value: avgScore, angle: 120 },
    { label: "DURABILITY", value: 65, angle: 180 },
    { label: "ETHICS", value: 71, angle: 240 },
    { label: "WATER", value: 58, angle: 300 },
  ];

  const cx = 120, cy = 120, maxR = 90;

  const getPoint = (angle: number, r: number) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  const radarPath = categories
    .map((cat, i) => {
      const r = (cat.value / 100) * maxR;
      const { x, y } = getPoint(cat.angle, r);
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ") + "Z";

  const gridLevels = [0.25, 0.5, 0.75, 1];

  return (
    <div className="glass-panel-glow p-4">
      <h3 className="text-xs font-display tracking-wider neon-text-cyan mb-4">Impact Radar</h3>

      <div className="flex justify-center">
        <svg viewBox="0 0 240 240" className="w-full max-w-[240px]">
          {/* Grid circles */}
          {gridLevels.map((level) => (
            <polygon
              key={level}
              points={categories
                .map((cat) => {
                  const { x, y } = getPoint(cat.angle, maxR * level);
                  return `${x},${y}`;
                })
                .join(" ")}
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="0.5"
            />
          ))}

          {/* Axis lines */}
          {categories.map((cat) => {
            const { x, y } = getPoint(cat.angle, maxR);
            return (
              <line
                key={cat.label}
                x1={cx}
                y1={cy}
                x2={x}
                y2={y}
                stroke="hsl(var(--border))"
                strokeWidth="0.5"
              />
            );
          })}

          {/* Data fill */}
          <motion.path
            d={radarPath}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            fill="hsl(var(--neon-blue) / 0.15)"
            stroke="hsl(var(--neon-blue))"
            strokeWidth="1.5"
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />

          {/* Labels */}
          {categories.map((cat) => {
            const { x, y } = getPoint(cat.angle, maxR + 18);
            return (
              <text
                key={cat.label}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-muted-foreground"
                fontSize="7"
                fontFamily="JetBrains Mono"
              >
                {cat.label}
              </text>
            );
          })}

          {/* Center dot */}
          <circle cx={cx} cy={cy} r="2" fill="hsl(var(--neon-cyan))" />
        </svg>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="text-center">
          <p className="text-lg font-display neon-text-blue">{totalCO2.toFixed(1)}</p>
          <p className="text-[10px] text-muted-foreground">Total CO₂ kg</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-display neon-text-cyan">{avgScore}</p>
          <p className="text-[10px] text-muted-foreground">Avg Score</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-display neon-text-red">
            {wardrobeItems.filter((i) => i.isHighEmission).length}
          </p>
          <p className="text-[10px] text-muted-foreground">Alerts</p>
        </div>
      </div>
    </div>
  );
};

export default ImpactRadar;
