export interface WardrobeItem {
  id: string;
  name: string;
  material: string;
  co2Impact: number; // kg CO2
  wearCount: number;
  category: string;
  isHighEmission: boolean;
  sustainabilityScore: number; // 0-100
  imageUrl: string;
}

export const wardrobeItems: WardrobeItem[] = [
  {
    id: "ECO-001",
    name: "Organic Cotton Tee",
    material: "Organic Cotton",
    co2Impact: 2.1,
    wearCount: 47,
    category: "Tops",
    isHighEmission: false,
    sustainabilityScore: 89,
    imageUrl: "",
  },
  {
    id: "ECO-002",
    name: "Recycled Denim Jacket",
    material: "Recycled Denim",
    co2Impact: 5.3,
    wearCount: 32,
    category: "Outerwear",
    isHighEmission: false,
    sustainabilityScore: 76,
    imageUrl: "",
  },
  {
    id: "ECO-003",
    name: "Polyester Bomber",
    material: "Polyester",
    co2Impact: 18.7,
    wearCount: 12,
    category: "Outerwear",
    isHighEmission: true,
    sustainabilityScore: 23,
    imageUrl: "",
  },
  {
    id: "ECO-004",
    name: "Hemp Cargo Pants",
    material: "Hemp Blend",
    co2Impact: 3.2,
    wearCount: 58,
    category: "Bottoms",
    isHighEmission: false,
    sustainabilityScore: 92,
    imageUrl: "",
  },
  {
    id: "ECO-005",
    name: "Fast-Fashion Hoodie",
    material: "Polyester/Acrylic",
    co2Impact: 22.4,
    wearCount: 8,
    category: "Tops",
    isHighEmission: true,
    sustainabilityScore: 15,
    imageUrl: "",
  },
  {
    id: "ECO-006",
    name: "Linen Summer Shirt",
    material: "Linen",
    co2Impact: 1.8,
    wearCount: 41,
    category: "Tops",
    isHighEmission: false,
    sustainabilityScore: 94,
    imageUrl: "",
  },
  {
    id: "ECO-007",
    name: "Nylon Windbreaker",
    material: "Nylon",
    co2Impact: 15.2,
    wearCount: 19,
    category: "Outerwear",
    isHighEmission: true,
    sustainabilityScore: 31,
    imageUrl: "",
  },
  {
    id: "ECO-008",
    name: "Bamboo Fiber Joggers",
    material: "Bamboo Viscose",
    co2Impact: 2.9,
    wearCount: 63,
    category: "Bottoms",
    isHighEmission: false,
    sustainabilityScore: 85,
    imageUrl: "",
  },
];
