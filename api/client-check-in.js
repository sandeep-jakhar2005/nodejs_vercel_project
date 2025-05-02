import { getToken } from './token';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {

        const { method } = req.query;
        
        if (method === 'GetStatus') {

            const { Key, Now } = req.query;

            const responseText = `DATA={ "Key": "${Key}", "Now": "${Now}" }`;

            res.setHeader('Content-Type', 'text/plain');
            res.status(200).end(responseText);

        }else if(method === 'SearchCardAcs'){
            const token = await getToken(req);

            const { type, Serial, ID, Reader, Status, Card, Index } = req.query;
            const tenantId = 1;

            let payload = {};
            if(Reader === '0'){
                 payload = {
                    event_type: "CheckIn",
                    access_status_reason: "",
                    machine_id: "",
                };
            }else if(Reader === '1'){
                 payload = {
                    event_type: "CheckOut",
                    access_status_reason: "",
                    machine_id: "",
                };
            }

            const apiUrl = `https://api.unifiedfitnessplatform.ai/tenants/${tenantId}/clients/${Card}/mark_client_checkedin`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload),
            });


            const data = await response.json();
            const checkinTime = data.checkin_date_time;
            
            const responseText = `{ "Card": "${Card}", "Systime": "${checkinTime}", "Voice": "Voice description", "ActIndex": "${Reader}", "AcsRes": "1", "Time": "5", "Note": "Description"}`;
            // res.setHeader('Content-Type', 'text/plain');
            res.status(200).send(responseText);

            // const contentType = response.headers.get('content-type');

            // if (contentType && contentType.includes('application/json')) {
            //     const data = await response.json();
            //     res.status(response.status).json(data);
            // } else {
            //     const errorText = await response.text();
            //     res.setHeader('Content-Type', 'text/plain');
            //     res.status(200).end(errorText)
            // }
        }else{
            res.status(400).json({ error: 'Invalid method', message: 'The provided method is not supported.' });
        }

            
        } catch (error) {
            res.status(500).json({ error: 'Something went wrong', details: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed', message: 'Only POST requests are supported.' });
    }
}
