export default function handler(req, res) {
    if (req.method === 'GET') {
      // Handle GET request
      res.status(200).json({ message: 'GET: All products listed' });
    } 
    else if (req.method === 'POST') {
      // Handle POST request
      const { name, price } = req.body;
      res.status(201).json({ message: 'POST: Product created', data: { name, price } });
    } 
    else if (req.method === 'PUT') {
      // Handle PUT request
      const { id, name } = req.body;
      res.status(200).json({ message: `PUT: Product ${id} updated`, updatedName: name });
    } 
    else if (req.method === 'DELETE') {
      // Handle DELETE request
      const { id } = req.query;
      res.status(200).json({ message: `DELETE: Product ${id} deleted` });
    } 
    else {
      // Method Not Allowed
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  