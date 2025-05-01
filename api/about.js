// export default function handler(req, res) {
//     res.status(200).send("Hello World!");
// }

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const tenantId = req.body.tenant_id;
            const apiUrl = `https://demo.staff.unifiedfitnessplatform.ai/${tenantId}/clients`;

            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req.body),
            });

            const data = await response.json();

            res.status(response.status).json(data);
        } catch (error) {
            res.status(500).json({ error: 'Something went wrong', details: error.message });
        }
    } else if (req.method === 'POST') {
        res.status(200).json({ message: 'GET: All products listed' });
    } else if (req.method === 'PUT') {
        res.status(200).json({ message: 'PUT: Product updated' });
    } else if (req.method === 'DELETE') {
        res.status(200).json({ message: 'DELETE: Product deleted' });
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
