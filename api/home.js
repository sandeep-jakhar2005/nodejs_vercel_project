export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json({ message: 'GET: All products listed' });
    } 
    else if (req.method === 'POST') {
        res.status(201).json({ message: 'POST: Product created' });
    } 
    else if (req.method === 'PUT') {
        res.status(200).json({ message: `PUT: Product  updated`});
    } 
    else if (req.method === 'DELETE') {
        res.status(200).json({ message: `DELETE: Product  deleted` });
    } 
    else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
