const http = require('http')
const currentMessages=[]
const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, epic-password')
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }
    if(req.headers['epic-password'] !== "wiscit32") {
        res.writeHead(403, {'Content-Type': 'text/plain'})
        return res.end('No')
    }
    if (req.method === 'POST') {
        let body=''
        req.on('data', chunk => {
            body += chunk.toString()
        })
        req.on('end', () => {
            if(currentMessages.length==4){
                currentMessages.length=0
            }
            currentMessages.push(body)
            console.log(currentMessages)
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('OK');
        })
    }
    if (req.method === 'GET') {
        res.setHeader('Content-Type', 'text/plain')
        res.end(JSON.stringify(currentMessages))
    }
})
server.listen('8000')