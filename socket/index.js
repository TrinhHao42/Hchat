const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const PORT = 3000;

const server = http.createServer(app);

const io = new Server(server);

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('message', (data) => {
        console.log('Message received:', data);
        io.emit('message', { id: socket.id, message: data });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
}); 

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
