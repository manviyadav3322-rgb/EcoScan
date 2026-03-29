import { store } from "../data/store";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { name, material, co2 } = req.body;

  const newItem = {
    id: store.items.length + 1,
    name,
    material,
    co2: Number(co2),
    date: new Date()
  };

  store.items.push(newItem);

  res.status(201).json({
    message: "Item added successfully",
    item: newItem
  });
}
