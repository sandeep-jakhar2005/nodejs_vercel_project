
let cachedToken = null;
let tokenExpiryTime = null;

export async function getToken(req) {
    if (req.method === 'POST') {
        try {
            if (cachedToken && tokenExpiryTime && Date.now() < tokenExpiryTime) {
                console.log("Using cached token");
                isNew = false;  // Token is reused (old)
                return { token: cachedToken, isNew };
            }

            const payload = {
                email_id: "vimit@fitnessforce.com",
                password: "Grip@123",
                company_uuid: "4b802a49-c19d-11ef-96d5-0a25444c3ba5",
            };

            const apiUrl = `https://api.unifiedfitnessplatform.ai/token`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                const { token } = data;

                cachedToken = token;
                tokenExpiryTime = 1746525015 * 1000;

                // res.status(response.status).json({ token: cachedToken, expires_in: expires_in });
                isNew = true;  // This is a new token

                return { token: cachedToken, isNew };
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
    } else {
        res.status(200).json({ message: 'Method not supported' });
    }
}








// export default async function handler(req, res) {
//     if (req.method === 'POST') {
//         try {

//             const apiUrl = `https://api.unifiedfitnessplatform.ai/token`;

//             const response = await fetch(apiUrl, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(req.body),
//             });

//             const contentType = response.headers.get('content-type');

//             if (contentType && contentType.includes('application/json')) {
//                 const data = await response.json();
//                 res.status(response.status).json(data);
//             } else {
//                 const errorText = await response.text();
//                 res.status(response.status).send({
//                     error: 'API did not return JSON',
//                     response: errorText
//                 });
//             }
//         } catch (error) {
//             res.status(500).json({ error: 'Something went wrong', details: error.message });
//         }
//     }else{
//         res.status(200).json({ message: 'Method not supported' });
//     }
// }