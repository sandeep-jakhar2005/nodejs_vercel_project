// import http from 'http';
// import handler from './client-check-in.js';

// const server = http.createServer(async (req, res) => {
//     const url = new URL(req.url, `http://${req.headers.host}`);
//     const pathname = url.pathname;
//     console.log('req.query:', req);

//     if (pathname.startsWith('/api/client-check-in')) {
//         handler(req, res);
//     }else {
//         res.statusCode = 404;
//         res.setHeader('Content-Type', 'application/json');
//         res.end(JSON.stringify({ error: 'Not Found', message: 'The requested endpoint is not available.' }));
//     }
// });

// server.listen(5000, () => {
//     console.log('Server is running on http://localhost:5000');
// });
