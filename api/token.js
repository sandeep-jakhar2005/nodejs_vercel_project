
let cachedToken = null;  // Token ko store karne ke liye
let tokenExpiryTime = null;  // Token ki expiry time ko store karne ke liye

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // Step 1: Check if we have a cached token and if it's expired
            if (cachedToken && tokenExpiryTime && Date.now() < tokenExpiryTime) {
                // Token is still valid, use the cached token
                console.log("Using cached token");
                return res.status(200).json({ token: cachedToken, Message: 'Reuse Token'  });  // Or use it in your API request
            }

            // Step 2: If no valid cached token, fetch a new token
            const apiUrl = `https://api.unifiedfitnessplatform.ai/token`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req.body),  // Assuming you are passing body from client
            });

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                const { token, expires_in } = data;  // Assuming the API response contains these keys

                // Step 3: Cache the token and its expiry time
                cachedToken = token;
                tokenExpiryTime = Date.now() + expires_in * 1000;  // Convert expires_in from seconds to milliseconds

                // Send the token response
                res.status(response.status).json({ token5: cachedToken, expires_in: expires_in });
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