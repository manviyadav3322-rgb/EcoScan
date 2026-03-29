export default function handler(req, res) {
    if (req.method === 'POST') {
        const { occasion, weather } = req.body || {};

        // Simple AI-like mock logic
        let recommendation = 'A versatile organic cotton tee with recycled denim jeans.';
        if (occasion === 'formal') {
            recommendation = 'A sustainable tailored suit with a vegan silk shirt.';
        } else if (weather === 'cold') {
            recommendation = 'Layer up with an upcycled wool sweater and a vegan leather jacket.';
        }

        return res.status(200).json({
            recommendation,
            confidence: 0.92,
            carbonFootprintEstimate: 7.5,
            items: [
                { id: '1', name: 'Organic Cotton T-Shirt' },
                { id: '2', name: 'Recycled Denim Jeans' }
            ]
        });
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
