import { wardrobeItems } from "@/data/wardrobe";
import VaultCard from "./VaultCard";
import { motion } from "framer-motion";
import { Grid3X3 } from "lucide-react";

const DigitalVault = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-3">
            <Grid3X3 className="h-4 w-4 text-sage" />
            <span className="section-label">The Digital Vault</span>
          </div>
          <h2 className="section-heading">Your Uploaded Wardrobe</h2>
          <p className="text-muted-foreground mt-3 max-w-lg leading-relaxed">
            Every garment, analyzed. Tap any item to explore its full environmental profile.
          </p>
        </motion.div>

        {/* Scan overlay container */}
        <div className="relative overflow-hidden rounded-2xl border border-border/30 bg-card p-6">
          {/* Laser scan line */}
          <motion.div
            initial={{ top: "-10%" }}
            animate={{ top: "110%" }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-[2px] bg-sage opacity-70 blur-[1px] z-10 pointer-events-none"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wardrobeItems.map((item, i) => (
              <VaultCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalVault;
