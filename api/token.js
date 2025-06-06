
let cachedToken = null;
let tokenExpiryTime = null;

export async function getToken(req) {
    if (req.method === 'GET') {
        try {
            if (cachedToken && tokenExpiryTime && Date.now() < tokenExpiryTime) {
                console.log("Using cached token");
                return cachedToken;
            }

            const payload = {
                email_id: "access@fitnessforce.com",
                password: "Access@1",
                company_uuid: "4b80b906-c19d-11ef-96d5-0a25444c3ba5",
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

                const expiryDurationInMs = 100 * 60 * 60 * 1000;
                cachedToken = token;
                tokenExpiryTime = Date.now() + expiryDurationInMs;

                // res.status(response.status).json({ token: cachedToken, expires_in: expires_in });
                return cachedToken;
            } else {
                const errorText = await response.text();
                console.error('API did not return JSON:', errorText);
                throw new Error('API did not return JSON: ' + errorText);
            }
        } catch (error) {
            res.status(500).json({ error: 'Something went wrong', details: error.message });
        }
    }
}
