import { getToken } from './token';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {

        const { method, Key, Now } = req.query;
        
        if (method === 'GetStatus') {

            const responseText = `DATA={ "Key": "${Key}", "Now": "${Now}" }`;

            res.setHeader('Content-Type', 'text/plain');
            res.status(200).end(responseText);

        }else if(method === 'SearchCardAcs'){
            const token = await getToken(req);

            const tenantId = req.body.tenant_id;
            const clientId = req.body.client_id;

            const apiUrl = `https://api.unifiedfitnessplatform.ai/tenants/${tenantId}/clients/${clientId}/mark_client_checkedin`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(req.body),
            });

            const contentType = response.headers.get('content-type');

            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                res.status(response.status).json(data);
            } else {
                const errorText = await response.text();
                res.setHeader('Content-Type', 'text/plain');
                res.status(200).end(errorText)
            }
        }

            
        } catch (error) {
            res.status(500).json({ error: 'Something went wrong', details: error.message });
        }
    } else {
        res.status(200).json({ message: 'Method not supported' });
    }
}
