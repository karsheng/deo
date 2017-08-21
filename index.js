const app = require('./app');
const http = require('http');

// Server Setup
const port = process.env.PORT || 8081;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
