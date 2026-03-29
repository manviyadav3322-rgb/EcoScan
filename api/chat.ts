export default function handler(req, res) {
    if (req.method === 'POST') {
        const { message } = req.body || {};

        const userMsg = (message || '').toLowerCase();
        let reply = "I'm your eco-fashion AI assistant! How can I help you style sustainably today?";

        if (userMsg.includes('hello') || userMsg.includes('hi')) {
            reply = 'Hello! Ready to make your wardrobe more sustainable?';
        } else if (userMsg.includes('carbon') || userMsg.includes('footprint')) {
            reply = 'To lower your carbon footprint, consider buying second-hand, choosing organic materials, and washing clothes in cold water.';
        } else if (userMsg.includes('shoes')) {
            reply = 'For footwear, look for brands that use recycled plastics or innovative plant-based leathers!';
        } else if (userMsg.length > 0) {
            reply = `That's a great point about "${message}". As an AI, I suggest focusing on timeless pieces rather than fast fashion trends to maintain a low-impact wardrobe.`;
        }

        return res.status(200).json({
            reply,
            timestamp: new Date().toISOString()
        });
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
