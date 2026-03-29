import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Loader2 } from "lucide-react";
import { useWardrobe } from "@/context/WardrobeContext";

interface UploadDialogProps {
  open: boolean;
  onClose: () => void;
}

const materials = [
  "Organic Cotton", "Cotton", "Linen", "Hemp", "Silk", "Organic Silk",
  "Wool", "Recycled Denim", "Denim", "Polyester", "Nylon", "Acrylic",
  "Viscose", "Bamboo", "Tencel",
];

const categories = ["Tops", "Outerwear", "Dresses", "Bottoms", "Accessories"];

const UploadDialog = ({ open, onClose }: UploadDialogProps) => {
  const { addItem, isUploading } = useWardrobe();
  const [name, setName] = useState("");
  const [material, setMaterial] = useState(materials[0]);
  const [category, setCategory] = useState(categories[0]);
  const [fabricWeight, setFabricWeight] = useState("300");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    await addItem({
      name: name.trim(),
      material,
      fabricWeight: Number(fabricWeight),
      category,
    });

    setName("");
    setFabricWeight("300");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-charcoal/30 backdrop-blur-sm" onClick={onClose} />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            className="relative w-full max-w-md mx-4 bg-card rounded-2xl border border-border shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div>
                <h2 className="text-base font-semibold text-charcoal">Scan Garment</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Add a new item to your vault</p>
              </div>
              <button
                onClick={onClose}
                className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="text-xs font-medium text-charcoal mb-1.5 block">Garment Name</label>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Vintage Silk Blouse"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-charcoal placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-charcoal mb-1.5 block">Material</label>
                  <select
                    value={material}
                    onChange={e => setMaterial(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-charcoal outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-all"
                  >
                    {materials.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-charcoal mb-1.5 block">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-charcoal outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-all"
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-charcoal mb-1.5 block">Fabric Weight (grams)</label>
                <input
                  type="number"
                  value={fabricWeight}
                  onChange={e => setFabricWeight(e.target.value)}
                  min="50"
                  max="2000"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-charcoal outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isUploading || !name.trim()}
                className="w-full luxury-btn flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    Add to Vault
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UploadDialog;
