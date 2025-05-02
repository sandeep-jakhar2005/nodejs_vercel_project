export default async function handler(req, res) {
    if (req.method === 'GET') {
      try {
        const { Card, Reader } = req.query;
  
        // Dummy response for testing
        const responseText = `{ "Card": "${Card}", "AcsRes": "1" }`;
  
        return res.status(200).send(responseText);
  
      } catch (error) {
        return res.status(500).json({ error: 'Server error', details: error.message });
      }
    } else {
      return res.status(405).json({ error: 'Only GET requests are allowed' });
    }
  }
  