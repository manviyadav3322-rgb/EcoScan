import { motion } from "framer-motion";
import { thriftAlternatives } from "@/data/wardrobe";
import { ArrowRight, Sparkles, Leaf } from "lucide-react";
import { useRef } from "react";

const SmartRecommendations = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

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
              <Sparkles className="h-4 w-4 text-sage" />
              <span className="section-label">Smart Picks</span>
            </div>
            <h2 className="section-heading">Thrift Alternatives</h2>
            <p className="text-muted-foreground mt-3 max-w-lg leading-relaxed">
              AI-curated low-impact replacements matched to your style profile.
            </p>
          </div>
          <button className="hidden md:flex luxury-btn-outline items-center gap-2 text-sm">
            View All <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>

        {/* Horizontal scroller */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {thriftAlternatives.map((alt, i) => (
            <motion.div
              key={alt.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="luxury-card min-w-[260px] max-w-[260px] flex-shrink-0"
            >
              <div className={`h-36 rounded-xl bg-gradient-to-br ${alt.imageGradient} flex items-center justify-center mb-4`}>
                <Leaf className="h-8 w-8 text-sage/30" />
              </div>

              <h3 className="text-sm font-semibold text-charcoal">{alt.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{alt.material}</p>

              <div className="flex items-center justify-between mt-4">
                <span className="sage-badge text-[11px]">Saves {alt.co2Saved} kg CO₂</span>
                <span className="text-sm font-semibold text-charcoal">{alt.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SmartRecommendations;
