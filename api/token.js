export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {

            const apiUrl = `https://api.unifiedfitnessplatform.ai/token`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const contentType = response.headers.get('content-type');

            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                res.status(response.status).json(data);
            } else {
                const errorText = await response.text();
                res.status(response.status).send({
                    error: 'API did not return JSON',
                    response: errorText
                });
            }
        } catch (error) {
            res.status(500).json({ error: 'Something went wrong', details: error.message });
        }
    }else{
        res.status(200).json({ message: 'Method not supported' });
    }
}