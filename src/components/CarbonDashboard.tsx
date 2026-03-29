import { motion } from "framer-motion";
import { wardrobeItems, materialComposition } from "@/data/wardrobe";
import { BarChart3, TrendingDown } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const CarbonDashboard = () => {
  const totalCO2 = wardrobeItems.reduce((s, i) => s + i.co2Score, 0);
  const avgScore = Math.round(
    wardrobeItems.reduce((s, i) => s + i.sustainabilityScore, 0) / wardrobeItems.length
  );
  const co2Saved = 12.4; // simulated

  const monthlySavings = [
    { month: "Jan", saved: 1.2 },
    { month: "Feb", saved: 1.8 },
    { month: "Mar", saved: 2.1 },
    { month: "Apr", saved: 1.6 },
    { month: "May", saved: 2.8 },
    { month: "Jun", saved: 2.9 },
  ];

  const maxSaved = Math.max(...monthlySavings.map((m) => m.saved));

  return (
    <section className="py-20 px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="h-4 w-4 text-sage" />
            <span className="section-label">Carbon Impact</span>
          </div>
          <h2 className="section-heading">Your Environmental Footprint</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Stat cards */}
          {[
            { label: "Total CO₂", value: `${totalCO2.toFixed(1)} kg`, sub: "Across all garments" },
            { label: "CO₂ Saved", value: `${co2Saved} kg`, sub: "Through conscious choices", icon: TrendingDown },
            { label: "Avg Score", value: `${avgScore}/100`, sub: "Wardrobe sustainability" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="luxury-card text-center"
            >
              <p className="section-label mb-2">{stat.label}</p>
              <p className="text-3xl font-semibold text-charcoal tracking-tight">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Monthly savings bar chart */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="luxury-card"
          >
            <h3 className="text-sm font-semibold text-charcoal mb-6">CO₂ Saved Monthly</h3>
            <div className="flex items-end justify-between gap-3 h-40">
              {monthlySavings.map((m, i) => (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: `${(m.saved / maxSaved) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    className="w-full bg-sage/20 rounded-lg relative overflow-hidden"
                    style={{ minHeight: 8 }}
                  >
                    <div className="absolute inset-0 bg-sage rounded-lg opacity-60" />
                  </motion.div>
                  <span className="text-[10px] text-muted-foreground">{m.month}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Material composition */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="luxury-card"
          >
            <h3 className="text-sm font-semibold text-charcoal mb-4">Material Composition</h3>
            <div className="flex items-center gap-6">
              <div className="w-36 h-36">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={materialComposition}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={60}
                      strokeWidth={2}
                      stroke="hsl(0, 0%, 100%)"
                    >
                      {materialComposition.map((entry, i) => (
                        <Cell key={i} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid hsl(0 0% 90%)",
                        borderRadius: "12px",
                        fontSize: "12px",
                        padding: "8px 12px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-2">
                {materialComposition.map((mat) => (
                  <div key={mat.name} className="flex items-center gap-2">
                    <div
                      className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: mat.fill }}
                    />
                    <span className="text-xs text-muted-foreground flex-1">{mat.name}</span>
                    <span className="text-xs font-medium text-charcoal">{mat.value}%</span>
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
