import { motion } from "framer-motion";
import { thriftAlternatives } from "@/data/wardrobe";
import { ArrowRight, Sparkles, Leaf } from "lucide-react";

const SmartRecommendations = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="section-label">Smart Picks</span>
            </div>
            <h2 className="section-heading">Low-Impact Alternatives</h2>
            <p className="text-muted-foreground mt-3 max-w-lg leading-relaxed text-sm">
              AI-curated replacements matched to your style profile.
            </p>
          </div>
          <button className="hidden md:flex cyber-btn-outline items-center gap-2 text-xs">
            View All <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </motion.div>

        <div
          className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {thriftAlternatives.map((alt, i) => (
            <motion.div
              key={alt.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card min-w-[240px] max-w-[240px] flex-shrink-0"
            >
              <div className="h-32 rounded-lg flex items-center justify-center mb-4"
                style={{ background: "hsl(var(--surface))" }}
              >
                <Leaf className="h-6 w-6 text-primary/20" />
              </div>

              <h3 className="text-sm font-semibold text-foreground">{alt.name}</h3>
              <p className="mono-data text-[10px] text-muted-foreground mt-0.5">{alt.material}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="pattern-tag text-[9px]">{alt.pattern}</span>
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                <span className="cyber-badge-cyan text-[10px]">-{alt.co2Saved} kg CO₂</span>
                <span className="mono-data text-sm font-semibold text-foreground">{alt.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SmartRecommendations;
