import { store } from "../data/store";

export default function handler(req, res) {
  const items = store.items;

  const totalItems = items.length;

  const totalCO2 = items.reduce((sum, i) => sum + i.co2, 0);

  const ecoScore = Math.max(0, 100 - totalCO2 * 5);

  res.status(200).json({
    totalItems,
    totalCO2,
    ecoScore: Math.round(ecoScore),
    recentActivity: items.slice(-5).reverse()
  });
}
