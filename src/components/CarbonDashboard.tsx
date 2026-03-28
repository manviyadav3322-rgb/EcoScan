import { motion } from "framer-motion";
import { wardrobeItems, materialComposition } from "@/data/wardrobe";
import { BarChart3, TrendingDown } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const CarbonDashboard = () => {
  const totalCO2 = wardrobeItems.reduce((s, i) => s + i.co2Score, 0);
  const avgScore = Math.round(
    wardrobeItems.reduce((s, i) => s + i.sustainabilityScore, 0) / wardrobeItems.length
  );
  const co2Saved = 12.4;

  const monthlySavings = [
    { month: "Jan", saved: 1.2 }, { month: "Feb", saved: 1.8 },
    { month: "Mar", saved: 2.1 }, { month: "Apr", saved: 1.6 },
    { month: "May", saved: 2.8 }, { month: "Jun", saved: 2.9 },
  ];
  const maxSaved = Math.max(...monthlySavings.map((m) => m.saved));

  return (
    <section className="py-20 px-6" style={{ background: "hsl(var(--surface))" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="h-4 w-4 text-primary" />
            <span className="section-label">Carbon Impact</span>
          </div>
          <h2 className="section-heading">Environmental Payload</h2>
        </motion.div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {[
            { label: "TOTAL CO₂", value: `${totalCO2.toFixed(1)} kg`, sub: "All garments", color: "neon-text" },
            { label: "CO₂ SAVED", value: `${co2Saved} kg`, sub: "Conscious swaps", color: "neon-text-cyan" },
            { label: "AVG SCORE", value: `${avgScore}/100`, sub: "Sustainability index", color: "neon-text-purple" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card-glow text-center"
            >
              <p className="section-label mb-2">{stat.label}</p>
              <p className={`text-3xl font-bold tracking-tight ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Bar chart */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card"
          >
            <h3 className="text-sm font-semibold text-foreground mb-6 flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-accent" />
              <span>CO₂ Saved Monthly</span>
            </h3>
            <div className="flex items-end justify-between gap-3 h-40">
              {monthlySavings.map((m, i) => (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: `${(m.saved / maxSaved) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    className="w-full rounded-md relative overflow-hidden"
                    style={{ minHeight: 6, background: "hsl(var(--neon-cyan) / 0.15)" }}
                  >
                    <div className="absolute inset-0 rounded-md" style={{ background: "hsl(var(--neon-cyan) / 0.4)" }} />
                  </motion.div>
                  <span className="mono-data text-[9px] text-muted-foreground">{m.month}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Pie chart */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card"
          >
            <h3 className="text-sm font-semibold text-foreground mb-4">Material Composition</h3>
            <div className="flex items-center gap-5">
              <div className="w-32 h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={materialComposition}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={55}
                      strokeWidth={1}
                      stroke="hsl(var(--background))"
                    >
                      {materialComposition.map((entry, i) => (
                        <Cell key={i} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(217, 33%, 10%)",
                        border: "1px solid hsl(217, 33%, 20%)",
                        borderRadius: "8px",
                        fontSize: "11px",
                        fontFamily: "JetBrains Mono",
                        color: "hsl(210, 40%, 92%)",
                        padding: "6px 10px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-1.5">
                {materialComposition.map((mat) => (
                  <div key={mat.name} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: mat.fill }} />
                    <span className="mono-data text-[10px] text-muted-foreground flex-1">{mat.name}</span>
                    <span className="mono-data text-[10px] font-semibold text-foreground">{mat.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CarbonDashboard;
