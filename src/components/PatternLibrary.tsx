import { useState } from "react";
import { motion } from "framer-motion";
import { wardrobeItems, allPatterns, PatternType } from "@/data/wardrobe";
import { Layers, Fingerprint } from "lucide-react";

const PatternLibrary = () => {
  const [activeFilter, setActiveFilter] = useState<PatternType | "All">("All");

  const filtered = activeFilter === "All"
    ? wardrobeItems
    : wardrobeItems.filter((i) => i.pattern === activeFilter);

  const patternCounts = allPatterns.map((p) => ({
    pattern: p,
    count: wardrobeItems.filter((i) => i.pattern === p).length,
  }));

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-3">
            <Layers className="h-4 w-4 text-neon-purple" />
            <span className="section-label">Pattern Library</span>
          </div>
          <h2 className="section-heading">Filter by Print Type</h2>
        </motion.div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveFilter("All")}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-all border ${
              activeFilter === "All"
                ? "border-primary/50 text-primary bg-primary/10"
                : "border-border text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            All ({wardrobeItems.length})
          </button>
          {patternCounts.map(({ pattern, count }) => (
            <button
              key={pattern}
              onClick={() => setActiveFilter(pattern)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all border mono-data ${
                activeFilter === pattern
                  ? "border-neon-purple/50 text-neon-purple bg-neon-purple/10"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-border"
              }`}
            >
              {pattern} ({count})
            </button>
          ))}
        </div>

        {/* Filtered results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="glass-card p-4"
            >
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "hsl(var(--neon-purple) / 0.1)", border: "1px solid hsl(var(--neon-purple) / 0.2)" }}>
                  <Fingerprint className="h-5 w-5 text-neon-purple" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-foreground truncate">{item.name}</h4>
                  <p className="mono-data text-[10px] text-muted-foreground">{item.id} • {item.material}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="pattern-tag">{item.pattern}</span>
                    <span className="mono-data text-[9px] text-muted-foreground">{item.patternDetail}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">
            No items match this pattern filter.
          </div>
        )}
      </div>
    </section>
  );
};

export default PatternLibrary;
