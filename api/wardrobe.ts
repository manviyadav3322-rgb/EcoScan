export default function handler(req, res) {
  // In-memory mock data
  let mockWardrobe = [
    { id: '1', name: 'Organic Cotton T-Shirt', category: 'top', carbonFootprint: 2.5 },
    { id: '2', name: 'Recycled Denim Jeans', category: 'bottom', carbonFootprint: 5.0 },
    { id: '3', name: 'Vegan Leather Jacket', category: 'outerwear', carbonFootprint: 12.0 },
  ];

  if (req.method === 'GET') {
    return res.status(200).json(mockWardrobe);
  } 
  
  if (req.method === 'POST') {
    const newItem = {
      id: Date.now().toString(),
      name: req.body?.name || 'New Item',
      category: req.body?.category || 'misc',
      carbonFootprint: req.body?.carbonFootprint || Math.random() * 10,
    };
    mockWardrobe.push(newItem);
    return res.status(201).json(newItem);
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
