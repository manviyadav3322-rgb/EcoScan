export default function handler(req, res) {
    if (req.method === 'GET') {
        return res.status(200).json({
            totalItems: 3,
            totalCarbonSaved: 45.2,
            ecoScore: 88,
            recentActivity: [
                { id: 1, action: 'Added Organic Cotton T-Shirt', date: new Date().toISOString() },
                { id: 2, action: 'Recycled old sneakers', date: new Date(Date.now() - 86400000).toISOString() }
            ]
        });
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
