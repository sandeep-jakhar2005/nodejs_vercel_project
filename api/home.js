export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).send("GET: Contact page accessed");
    } else if (req.method === 'POST') {
        const { name, email } = req.body;
        res.status(200).json({
            message: "POST: Contact data received",
            data: { name, email }
        });
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
}
