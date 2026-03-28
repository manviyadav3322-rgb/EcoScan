export type PatternType = "Animal Print" | "Block Print" | "Floral" | "Geometric" | "Vintage Motif" | "Solid";

export interface WardrobeItem {
  id: string;
  name: string;
  material: string;
  fabricWeight: number;
  co2Score: number;
  wearCount: number;
  category: string;
  impactLevel: "low" | "medium" | "high";
  sustainabilityScore: number;
  suggestion?: string;
  pattern: PatternType;
  patternDetail: string;
  patternImpact: "Low" | "Medium" | "High";
}

export interface ThriftAlternative {
  id: string;
  name: string;
  material: string;
  co2Saved: number;
  price: string;
  pattern: PatternType;
}

export function calculateCarbonScore(fabricWeightGrams: number, materialType: string): number {
  const factors: Record<string, number> = {
    "organic cotton": 0.003, cotton: 0.005, linen: 0.004, hemp: 0.003,
    silk: 0.006, "organic silk": 0.005, wool: 0.007, "recycled denim": 0.004,
    denim: 0.006, polyester: 0.015, nylon: 0.014, acrylic: 0.012,
    "synthetic blend": 0.013, viscose: 0.008, bamboo: 0.004, tencel: 0.003,
  };
  const factor = factors[materialType.toLowerCase()] ?? 0.008;
  return Math.round(fabricWeightGrams * factor * 100) / 100;
}

export const wardrobeItems: WardrobeItem[] = [
  {
    id: "ECO-001", name: "Vintage Denim Jacket", material: "Recycled Denim",
    fabricWeight: 820, co2Score: calculateCarbonScore(820, "recycled denim"),
    wearCount: 67, category: "Outerwear", impactLevel: "low", sustainabilityScore: 92,
    pattern: "Vintage Motif", patternDetail: "Classic 70s wash motif", patternImpact: "Low",
  },
  {
    id: "ECO-002", name: "Synthetic Blouse", material: "Polyester",
    fabricWeight: 280, co2Score: calculateCarbonScore(280, "polyester"),
    wearCount: 11, category: "Tops", impactLevel: "high", sustainabilityScore: 24,
    suggestion: "Consider an Organic Silk alternative — 72% lower carbon footprint.",
    pattern: "Floral", patternDetail: "Digital floral print", patternImpact: "High",
  },
  {
    id: "ECO-003", name: "Linen Summer Dress", material: "Linen",
    fabricWeight: 340, co2Score: calculateCarbonScore(340, "linen"),
    wearCount: 43, category: "Dresses", impactLevel: "low", sustainabilityScore: 88,
    pattern: "Block Print", patternDetail: "Hand-stamped block print", patternImpact: "Low",
  },
  {
    id: "ECO-004", name: "Merino Wool Sweater", material: "Wool",
    fabricWeight: 450, co2Score: calculateCarbonScore(450, "wool"),
    wearCount: 52, category: "Tops", impactLevel: "medium", sustainabilityScore: 71,
    pattern: "Geometric", patternDetail: "Nordic geometric knit", patternImpact: "Low",
  },
  {
    id: "ECO-005", name: "Organic Cotton Tee", material: "Organic Cotton",
    fabricWeight: 200, co2Score: calculateCarbonScore(200, "organic cotton"),
    wearCount: 89, category: "Tops", impactLevel: "low", sustainabilityScore: 95,
    pattern: "Solid", patternDetail: "Solid dye — plant-based", patternImpact: "Low",
  },
  {
    id: "ECO-006", name: "Nylon Puffer Vest", material: "Nylon",
    fabricWeight: 380, co2Score: calculateCarbonScore(380, "nylon"),
    wearCount: 15, category: "Outerwear", impactLevel: "high", sustainabilityScore: 28,
    suggestion: "Try a recycled down vest — saves 4.2 kg CO₂ per garment.",
    pattern: "Solid", patternDetail: "Synthetic solid", patternImpact: "Medium",
  },
  {
    id: "ECO-007", name: "Leopard Silk Scarf", material: "Silk",
    fabricWeight: 80, co2Score: calculateCarbonScore(80, "silk"),
    wearCount: 34, category: "Accessories", impactLevel: "low", sustainabilityScore: 82,
    pattern: "Animal Print", patternDetail: "Leopard print on silk", patternImpact: "Low",
  },
  {
    id: "ECO-008", name: "Geometric Kimono", material: "Bamboo",
    fabricWeight: 320, co2Score: calculateCarbonScore(320, "bamboo"),
    wearCount: 41, category: "Outerwear", impactLevel: "low", sustainabilityScore: 87,
    pattern: "Geometric", patternDetail: "Tessellated geo weave", patternImpact: "Low",
  },
];

export const allPatterns: PatternType[] = [
  "Animal Print", "Block Print", "Floral", "Geometric", "Vintage Motif", "Solid",
];

export const thriftAlternatives: ThriftAlternative[] = [
  { id: "TA-001", name: "Organic Silk Blouse", material: "Organic Silk", co2Saved: 3.1, price: "$28", pattern: "Floral" },
  { id: "TA-002", name: "Hemp Canvas Jacket", material: "Hemp", co2Saved: 4.8, price: "$45", pattern: "Solid" },
  { id: "TA-003", name: "Tencel Wrap Dress", material: "Tencel", co2Saved: 2.6, price: "$32", pattern: "Block Print" },
  { id: "TA-004", name: "Bamboo Knit Cardigan", material: "Bamboo", co2Saved: 3.4, price: "$38", pattern: "Geometric" },
  { id: "TA-005", name: "Recycled Wool Scarf", material: "Recycled Wool", co2Saved: 1.8, price: "$18", pattern: "Animal Print" },
];

export const materialComposition = [
  { name: "Organic Cotton", value: 22, fill: "hsl(199, 89%, 60%)" },
  { name: "Recycled Denim", value: 16, fill: "hsl(187, 82%, 53%)" },
  { name: "Linen", value: 12, fill: "hsl(271, 81%, 56%)" },
  { name: "Wool", value: 14, fill: "hsl(199, 89%, 40%)" },
  { name: "Polyester", value: 18, fill: "hsl(349, 91%, 61%)" },
  { name: "Nylon", value: 10, fill: "hsl(349, 91%, 45%)" },
  { name: "Silk", value: 4, fill: "hsl(271, 81%, 70%)" },
  { name: "Bamboo", value: 4, fill: "hsl(187, 82%, 70%)" },
];
