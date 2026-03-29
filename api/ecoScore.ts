import { store } from "../data/store";

export default function handler(req, res) {
  const items = store.items;

  const totalItems = items.length;

  const totalCO2 = items.reduce((sum, i) => sum + i.co2, 0);

  const ecoScore = Math.max(0, 100 - totalCO2 * 5);

  const carbonSaved = totalItems * 1.8;

  const breakdown = {
    cotton: 0,
    recycled: 0,
    polyester: 0,
    other: 0
  };

  items.forEach((i) => {
    if (breakdown[i.material] !== undefined) {
      breakdown[i.material]++;
    } else {
      breakdown.other++;
    }
  });

  res.status(200).json({
    totalItems,
    totalCO2: Number(totalCO2.toFixed(2)),
    ecoScore: Math.round(ecoScore),
    carbonSaved: Number(carbonSaved.toFixed(2)),
    breakdown
  });
}
