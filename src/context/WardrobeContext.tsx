import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { wardrobeItems as initialItems, WardrobeItem, calculateCarbonScore } from "@/data/wardrobe";
import { toast } from "@/hooks/use-toast";

interface DashboardData {
  totalCO2: number;
  ecoScore: number;
  carbonSaved: number;
  totalItems: number;
}

interface WardrobeContextType {
  items: WardrobeItem[];
  dashboard: DashboardData;
  isUploading: boolean;
  addItem: (data: { name: string; material: string; fabricWeight: number; category: string }) => Promise<void>;
  refreshDashboard: () => void;
}

const WardrobeContext = createContext<WardrobeContextType | null>(null);

export function useWardrobe() {
  const ctx = useContext(WardrobeContext);
  if (!ctx) throw new Error("useWardrobe must be used within WardrobeProvider");
  return ctx;
}

function computeDashboard(items: WardrobeItem[]): DashboardData {
  const totalCO2 = items.reduce((s, i) => s + i.co2Score, 0);
  const totalItems = items.length;
  const ecoScore = Math.round(Math.max(0, 100 - totalCO2 * 5));
  const carbonSaved = Number((totalItems * 1.8).toFixed(2));
  return { totalCO2: Number(totalCO2.toFixed(1)), ecoScore, carbonSaved, totalItems };
}

function getImpactLevel(co2: number): "low" | "medium" | "high" {
  if (co2 <= 2) return "low";
  if (co2 <= 4) return "medium";
  return "high";
}

const gradients = [
  "from-blue-100 to-stone-100",
  "from-rose-50 to-orange-50",
  "from-amber-50 to-yellow-50",
  "from-stone-100 to-neutral-100",
  "from-emerald-50 to-teal-50",
  "from-gray-100 to-slate-100",
  "from-purple-50 to-pink-50",
  "from-sky-50 to-blue-50",
];

export function WardrobeProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WardrobeItem[]>(initialItems);
  const [isUploading, setIsUploading] = useState(false);

  const dashboard = computeDashboard(items);

  const refreshDashboard = useCallback(() => {
    // Dashboard is computed from items state — this is a no-op trigger if needed
  }, []);

  const addItem = useCallback(async (data: { name: string; material: string; fabricWeight: number; category: string }) => {
    setIsUploading(true);
    try {
      const co2Score = calculateCarbonScore(data.fabricWeight, data.material);
      const impactLevel = getImpactLevel(co2Score);
      const sustainabilityScore = impactLevel === "low" ? 85 + Math.floor(Math.random() * 10) :
        impactLevel === "medium" ? 55 + Math.floor(Math.random() * 20) :
        20 + Math.floor(Math.random() * 20);

      const newItem: WardrobeItem = {
        id: `WD-${String(items.length + 1).padStart(3, "0")}`,
        name: data.name,
        material: data.material,
        fabricWeight: data.fabricWeight,
        co2Score,
        wearCount: 0,
        category: data.category,
        impactLevel,
        sustainabilityScore,
        suggestion: impactLevel === "high" ? "Consider a more sustainable alternative" : undefined,
        imageGradient: gradients[items.length % gradients.length],
      };

      // Also call backend API
      try {
        await fetch("/api/addItem", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: data.name, material: data.material, co2: co2Score }),
        });
      } catch {
        // Backend may not be available — still update UI
      }

      setItems(prev => [...prev, newItem]);

      toast({
        title: "Garment Added",
        description: `${data.name} has been scanned and added to your vault.`,
      });
    } catch (err) {
      toast({
        title: "Upload Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      throw err;
    } finally {
      setIsUploading(false);
    }
  }, [items.length]);

  return (
    <WardrobeContext.Provider value={{ items, dashboard, isUploading, addItem, refreshDashboard }}>
      {children}
    </WardrobeContext.Provider>
  );
}
