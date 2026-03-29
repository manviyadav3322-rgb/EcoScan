export function calculateEcoScore(items: any[]) {
  const totalItems = items.length;
  const totalCO2 = items.reduce((sum, i) => sum + i.co2, 0);
  const ecoScore = Math.max(0, 100 - totalCO2 * 5);
  const carbonSaved = totalItems * 1.8;

  return {
    totalItems,
    totalCO2: Number(totalCO2.toFixed(2)),
    ecoScore: Math.round(ecoScore),
    carbonSaved: Number(carbonSaved.toFixed(2)),
  };
}
