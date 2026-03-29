import { store } from "../data/store";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { name, material, co2 } = req.body;

  if (!name || !material || !co2) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const newItem = {
    id: Date.now(),
    name,
    material,
    co2: Number(co2),
    date: new Date().toISOString()
  };

  store.items.push(newItem);

  return res.status(200).json({
    message: "Wardrobe item added successfully",
    item: newItem,
    totalItems: store.items.length
  });
}
