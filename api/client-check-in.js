import { getToken } from './token';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const { method } = req.query;

            if (method === 'GetStatus') {
                const { Key, Now } = req.query;
                const responseText = `DATA={ "Key": "${Key}", "Now": "${Now}" }`;
                return res.status(200).send(responseText);
            }

            else if (method === 'SearchCardAcs') {
                const token = await getToken(req);
                const { type, Serial, ID, Reader, Status, Card, Index, Now } = req.query;
                const tenantId = 1;

                let payload = {};
                if (Reader === '0') {
                    payload = {
                        event_type: "CheckIn",
                        access_status_reason: "",
                        machine_id: "",
                    };
                } else if (Reader === '1') {
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
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload),
                });

                let checkinTime = "";
                let AcsRes = "0";

                if (response.ok) {
                    const data = await response.json();
                    checkinTime = data.checkin_date_time || "";
                    AcsRes = "1";
                }

                const responseText = `{ "Card": "${Card}", "Systime": "${Now}", "Voice": "Voice description", "ActIndex": "${Reader}", "AcsRes": "${AcsRes}", "Time": "${checkinTime}", "Note": "Description"}`;
                res.setHeader('Content-Type', 'text/plain');
                return res.status(200).send(responseText);
            }

            else {
                return res.status(400).json({ error: 'Invalid method', message: 'The provided method is not supported.' });
            }

        } catch (error) {
            return res.status(500).json({ error: 'Something went wrong', details: error.message });
        }
    } else {
        return res.status(405).json({ error: 'Method Not Allowed', message: 'Only GET requests are supported.' });
    }
}
