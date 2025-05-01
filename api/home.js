export default function handler(req, res) {
    console.log(req.method);
    if (req.method === 'GET') {
      // Handle GET request
        res.status(200).json({ message: 'GET: All products listed' });
    } 
    else if (req.method === 'POST') {
      // Handle POST request
        res.status(201).json({ message: 'POST: Product created' });
    } 
    else if (req.method === 'PUT') {
      // Handle PUT request
        res.status(200).json({ message: `PUT: Product  updated`});
    } 
    else if (req.method === 'DELETE') {
      // Handle DELETE request
        res.status(200).json({ message: `DELETE: Product  deleted` });
    } 
    else {
      // Method Not Allowed
        res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  