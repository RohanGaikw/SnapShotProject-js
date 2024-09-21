const http = require('http');
const fs = require('fs');
const db = require('./db');
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading HTML');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.method === 'GET' && req.url === '/style.css') {
        fs.readFile('style.css', (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(data);
        });
    } else if (req.method === 'GET' && req.url === '/script.js') {
        fs.readFile('script.js', (err, data) => {
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.end(data);
        });
    } else if (req.method === 'POST' && req.url === '/save-snapshot') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const snapshot = JSON.parse(body);
            db.saveSnapshot(snapshot.name, snapshot.description, (err) => {
                if (err) {
                    res.writeHead(500);
                    res.end(JSON.stringify({ message: 'Error saving snapshot' }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Snapshot saved successfully' }));
                }
            });
        });
    } else if (req.method === 'GET' && req.url === '/snapshots') {
        db.getSnapshots((err, snapshots) => {
            if (err) {
                res.writeHead(500);
                res.end('Error retrieving snapshots');
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(snapshots));
            }
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(3001, () => {
    console.log('Server listening on port 3001');
});
