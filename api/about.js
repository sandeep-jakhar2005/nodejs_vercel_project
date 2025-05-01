// export default function handler(req, res) {
//     res.status(200).send("Hello World!");
// }

export default async function handler(req, res) {
    export default async function handler(req, res) {
        if (req.method === 'POST') {
            try {
                const tenantId = req.body.tenant_id;
                if (!tenantId) {
                    return res.status(400).json({ error: 'tenant_id is required' });
                }
    
                const apiUrl = `https://demo.staff.unifiedfitnessplatform.ai/tenants/${tenantId}/clients`;
    
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': 'Bearer YOUR_TOKEN' // If needed
                    },
                });
    
                // Check if the response is actually JSON
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    const text = await response.text(); // For debugging
                    return res.status(500).json({
                        error: 'Unexpected response from API',
                        body: text
                    });
                }
    
                const data = await response.json();
                res.status(response.status).json(data);
            } catch (error) {
                res.status(500).json({ error: 'Something went wrong', details: error.message });
            }
        } else {
            res.status(405).json({ error: 'Method Not Allowed' });
        }
    }
     else if (req.method === 'GET') {
        res.status(200).json({ message: 'GET: All products listed' });
    } else if (req.method === 'PUT') {
        res.status(200).json({ message: 'PUT: Product updated' });
    } else if (req.method === 'DELETE') {
        res.status(200).json({ message: 'DELETE: Product deleted' });
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
