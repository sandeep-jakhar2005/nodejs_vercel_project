import { getToken } from './token.js';
import fs from 'fs';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            
            const { method } = req.query;

            if (method === 'GetStatus') {

                const { Key, Now } = req.query;
                // const responseText = `DATA={ "Key": "${Key}", "Now": "${Now}" }`;
                const responseText = `{ "Key": "543210", "Now": "201611261517376" }`;
                
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                return res.end(responseText);

            }else if (method === 'SearchCardAcs') {

                const token = await getToken(req);
                const { type, Serial, ID, Reader, Status, Card, Index, Now } = req.query;
                const tenantId = 1;

                

                let payload = {};
                payload = {
                    event_type: "CheckIn",
                    access_status_reason: "",
                    machine_id: "",
                };

                // if (Reader === '0') {
                //     payload = {
                //         event_type: "CheckIn",
                //         access_status_reason: "",
                //         machine_id: "",
                //     };
                // } else if (Reader === '1') {
                //     payload = {
                //         event_type: "CheckOut",
                //         access_status_reason: "",
                //         machine_id: "",
                //     };
                // }



                // const apiUrl = `https://api.unifiedfitnessplatform.ai/tenants/${tenantId}/clients/${Card}/mark_client_checkedin`;
                const apiUrl = `https://api.unifiedfitnessplatform.ai/tenants/1/clients/31131/mark_client_checkedin`;

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

                const data = await response.json();

                if (response.ok) {
                    checkinTime = data.checkin_date_time || "";
                    AcsRes = "1";
                }

                const responseText = `{ "Card": "31131", "Systime": "2025-05-06T10:59:12.283209Z", "Voice": "Voice description", "ActIndex": "0", "AcsRes": "${AcsRes}", "Time": "5", "Note": "Description"}`;
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                return res.end(responseText);

                // const responseText = `{ "Card": "${Card}", "Systime": "${checkinTime}", "Voice": "Voice description", "ActIndex": "${Reader}", "AcsRes": "${AcsRes}", "Time": "5", "Note": "Description"}`;
                // res.writeHead(200, { 'Content-Type': 'text/plain' });
                // return res.end(responseText);
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


