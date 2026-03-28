export interface WardrobeItem {
  id: string;
  name: string;
  material: string;
  fabricWeight: number; // grams
  co2Score: number; // calculated
  wearCount: number;
  category: string;
  impactLevel: "low" | "medium" | "high";
  sustainabilityScore: number;
  suggestion?: string;
  imageGradient: string;
}

export interface ThriftAlternative {
  id: string;
  name: string;
  material: string;
  co2Saved: number;
  price: string;
  imageGradient: string;
}

/**
 * Carbon score calculation:
 * Takes fabric weight (grams) and material type,
 * returns estimated CO2 in kg.
 */
export function calculateCarbonScore(
  fabricWeightGrams: number,
  materialType: string
): number {
  const factors: Record<string, number> = {
    "organic cotton": 0.003,
    cotton: 0.005,
    linen: 0.004,
    hemp: 0.003,
    silk: 0.006,
    "organic silk": 0.005,
    wool: 0.007,
    "recycled denim": 0.004,
    denim: 0.006,
    polyester: 0.015,
    nylon: 0.014,
    acrylic: 0.012,
    "synthetic blend": 0.013,
    viscose: 0.008,
    bamboo: 0.004,
    tencel: 0.003,
  };

  const key = materialType.toLowerCase();
  const factor = factors[key] ?? 0.008;
  return Math.round(fabricWeightGrams * factor * 100) / 100;
}

export const wardrobeItems: WardrobeItem[] = [
  {
    id: "WD-001",
    name: "Vintage Denim Jacket",
    material: "Recycled Denim",
    fabricWeight: 820,
    co2Score: calculateCarbonScore(820, "recycled denim"),
    wearCount: 67,
    category: "Outerwear",
    impactLevel: "low",
    sustainabilityScore: 92,
    imageGradient: "from-blue-100 to-stone-100",
  },
  {
    id: "WD-002",
    name: "Synthetic Blouse",
    material: "Polyester",
    fabricWeight: 280,
    co2Score: calculateCarbonScore(280, "polyester"),
    wearCount: 11,
    category: "Tops",
    impactLevel: "high",
    sustainabilityScore: 24,
    suggestion: "Consider an Organic Silk alternative — 72% lower carbon footprint.",
    imageGradient: "from-rose-50 to-orange-50",
  },
  {
    id: "WD-003",
    name: "Linen Summer Dress",
    material: "Linen",
    fabricWeight: 340,
    co2Score: calculateCarbonScore(340, "linen"),
    wearCount: 43,
    category: "Dresses",
    impactLevel: "low",
    sustainabilityScore: 88,
    imageGradient: "from-amber-50 to-yellow-50",
  },
  {
    id: "WD-004",
    name: "Merino Wool Sweater",
    material: "Wool",
    fabricWeight: 450,
    co2Score: calculateCarbonScore(450, "wool"),
    wearCount: 52,
    category: "Tops",
    impactLevel: "medium",
    sustainabilityScore: 71,
    imageGradient: "from-stone-100 to-neutral-100",
  },
  {
    id: "WD-005",
    name: "Organic Cotton Tee",
    material: "Organic Cotton",
    fabricWeight: 200,
    co2Score: calculateCarbonScore(200, "organic cotton"),
    wearCount: 89,
    category: "Tops",
    impactLevel: "low",
    sustainabilityScore: 95,
    imageGradient: "from-emerald-50 to-teal-50",
  },
  {
    id: "WD-006",
    name: "Nylon Puffer Vest",
    material: "Nylon",
    fabricWeight: 380,
    co2Score: calculateCarbonScore(380, "nylon"),
    wearCount: 15,
    category: "Outerwear",
    impactLevel: "high",
    sustainabilityScore: 28,
    suggestion: "Try a recycled down vest — saves 4.2 kg CO₂ per garment.",
    imageGradient: "from-gray-100 to-slate-100",
  },
];

export const thriftAlternatives: ThriftAlternative[] = [
  {
    id: "TA-001",
    name: "Organic Silk Blouse",
    material: "Organic Silk",
    co2Saved: 3.1,
    price: "$28",
    imageGradient: "from-rose-50 to-pink-50",
  },
  {
    id: "TA-002",
    name: "Hemp Canvas Jacket",
    material: "Hemp",
    co2Saved: 4.8,
    price: "$45",
    imageGradient: "from-green-50 to-emerald-50",
  },
  {
    id: "TA-003",
    name: "Tencel Wrap Dress",
    material: "Tencel",
    co2Saved: 2.6,
    price: "$32",
    imageGradient: "from-sky-50 to-blue-50",
  },
  {
    id: "TA-004",
    name: "Bamboo Knit Cardigan",
    material: "Bamboo",
    co2Saved: 3.4,
    price: "$38",
    imageGradient: "from-lime-50 to-green-50",
  },
  {
    id: "TA-005",
    name: "Recycled Wool Scarf",
    material: "Recycled Wool",
    co2Saved: 1.8,
    price: "$18",
    imageGradient: "from-amber-50 to-orange-50",
  },
];

export const materialComposition = [
  { name: "Organic Cotton", value: 28, fill: "hsl(163, 18%, 58%)" },
  { name: "Recycled Denim", value: 18, fill: "hsl(163, 18%, 70%)" },
  { name: "Linen", value: 14, fill: "hsl(163, 18%, 80%)" },
  { name: "Wool", value: 12, fill: "hsl(40, 6%, 70%)" },
  { name: "Polyester", value: 16, fill: "hsl(0, 0%, 75%)" },
  { name: "Nylon", value: 12, fill: "hsl(0, 0%, 65%)" },
];
