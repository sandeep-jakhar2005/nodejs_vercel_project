import { getToken } from './token.js';
import fs from 'fs';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {

            const trackingInfo = {
                timestamp: new Date().toISOString(),
                url: req.url,
                query: req.query,
            };

            fs.appendFile('request-log.txt', JSON.stringify(trackingInfo) + '\n', (err) => {
                if (err) console.error('Log file write error:', err);
            });

            console.log('req.query:', req.query);

            const { method } = req.query;

            if (method === 'GetStatus') {
                const { Key, Now } = req.query;
                const responseText = `DATA={ "Key": "${Key}", "Now": "${Now}" }`;
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                return res.end(responseText);
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

                const responseText = `{ "Card": "${Card}", "Systime": "${checkinTime}", "Voice": "Voice description", "ActIndex": "${Reader}", "AcsRes": "${AcsRes}", "Time": "5", "Note": "Description"}`;
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                return res.end(responseText);
            }
            else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Invalid method', message: 'The provided method is not supported.' }));
            }

        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Something went wrong', details: error.message }));
        }
    } else {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Method Not Allowed', message: 'Only GET requests are supported.' }));
    }
}
