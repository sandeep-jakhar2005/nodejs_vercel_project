// export default function handler(req, res) {
//     res.status(200).send("Hello World!");
// }

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const tenantId = req.body.tenant_id;

            const apiUrl = `https://demo.staff.unifiedfitnessplatform.ai/tenants/${tenantId}/clients?tenant_id=${tenantId}`;

            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Add Authorization if needed
                },
            });

            const contentType = response.headers.get('content-type');

            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                res.status(response.status).json(data);
            } else {
                // HTML or plain text error returned
                const errorText = await response.text();
                res.status(response.status).send({
                    error: 'API did not return JSON',
                    response: errorText
                });
            }
        } catch (error) {
            res.status(500).json({ error: 'Something went wrong', details: error.message });
        }
    } else if (req.method === 'GET') {
        res.status(200).json({ message: 'GET: All products listed' });
    } else if (req.method === 'PUT') {
        res.status(200).json({ message: 'PUT: Product updated' });
    } else if (req.method === 'DELETE') {
        res.status(200).json({ message: 'DELETE: Product deleted' });
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
