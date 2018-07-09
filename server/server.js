const {
    getAPI
} = require("./MOCK_DATA");


const http = require('http');
const hostname = '127.0.0.1';
const port = 3400;
const server =
    http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin',  "http://localhost:3000");
        res.end(JSON.stringify(getAPI(10, 30)));
    });
server.listen(port, hostname, () => {
    console.log('Server running at http://' +
        hostname + ':' + port + '/');
});