export default defineEventHandler((event) => {
  event.res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000');
  event.res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  event.res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  event.res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Responder a preflight OPTIONS
  if (event.req.method === 'OPTIONS') {
    event.res.statusCode = 204;
    event.res.end();
  }
});
