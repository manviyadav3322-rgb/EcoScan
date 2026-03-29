import { store } from "../data/store";

export default function handler(req, res) {
  const recentActivity = store.items
    .slice()
    .reverse()
    .slice(0, 10)
    .map((item) => ({
      id: item.id,
      action: `Added ${item.name}`,
      date: item.date
    }));

  res.status(200).json({
    recentActivity
  });
}
