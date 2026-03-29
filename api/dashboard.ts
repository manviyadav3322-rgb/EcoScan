import { store } from "../data/store";
import { calculateEcoScore } from "../utils/calculator";

export default function handler(req, res) {
  const stats = calculateEcoScore(store.items);

  res.status(200).json({
    ...stats,
    recentActivity: store.items.slice(-5)
  });
}
