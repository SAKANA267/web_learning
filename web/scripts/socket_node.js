const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');
const mysql = require('mysql');

// 数据库部分
const db = mysql.createConnection({
    host: 'localhost',
    user: 'auiqu2k8a',
    password: '5g66zc6b',
    database: 'auiqu2k8a'
});

// 连接
db.connect((err) => {
    if (err) {
        console.error('数据库连接失败:', err.stack);
        return;
    }
    console.log('成功连接到数据库');
});

console.log('after database connection');

// 插入数据库的函数
function logToDatabase(sender, message) {
    const query = 'INSERT INTO logs (sender, message) VALUES (?, ?)';
    db.query(query, [sender, message], (err, results) => {
        if (err) {
            console.log('插入日志失败:', err);
        } else {
            console.log('日志插入成功');
        }
    });
}



// 读取SSL证书
const server = https.createServer({
    cert: fs.readFileSync('server.pem'),
    key: fs.readFileSync('server.key')
});

// 创建WebSocket安全服务器
const wss = new WebSocket.Server({ server });

// 存储客户端连接
const clients = new Map();

// 监听连接事件
wss.on('connection', function connection(ws, req) {
    const clientIP = req.connection.remoteAddress;
    clients.set(clientIP, ws);
    console.log('客户端已连接，IP 地址: %s', clientIP);
    logToDatabase('系统',`客户端已连接，IP 地址: ${clientIP}`);

    // 监听消息事件
    ws.on('message', function incoming(message) {
        console.log(`收到消息: ${clientIP}, 内容: ${message}`);
        logToDatabase(clientIP,message);
        // 广播消息给所有客户端
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN && client !== ws) {
                client.send(`${clientIP}: ${message}`);
            }
        });
    });

    // 监听关闭事件
    ws.on('close', function close() {
        clients.delete(clientIP);
        console.log('客户端已断开连接，IP 地址: %s', clientIP);
        logToDatabase('系统',`客户端已断开连接，IP 地址: ${clientIP}`);
    });
});

// 启动HTTPS服务器，它也会启动WebSocket安全服务器
server.listen(9000, function() {
    console.log('WebSocket 安全服务器已启动，监听端口 9000');
});

// 服务器操控

// 打印当前所有连接客户端的函数
function printConnectedClients() {
    const clientIPs = Array.from(clients.keys());
    if (clientIPs.length > 0) {
        console.log('当前所有连接的客户端 IP 地址:');
        clientIPs.forEach(ip => console.log(ip));
    } else {
        console.log('当前没有连接的客户端');
    }
}

// 根据客户端IP地址发送消息的函数
function sendMessageToClient(clientIP, message) {
    const client = clients.get(clientIP);
    if (client && client.readyState === WebSocket.OPEN) {
        client.send(message);
        console.log(`消息已发送到客户端: ${clientIP}, 内容: ${message}`);
    } else {
        console.log(`无法发送消息到客户端: ${clientIP}, 客户端未连接或连接已关闭`);
    }
}
