const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const { Server } = require("socket.io")


const server = http.createServer(app);
const io = new Server(server);//to handle the sockets

//socket.io 
io.on('connection', (socket) => { //socket is clients
    console.log('A new user has connected', socket.id); //every socket/client has uniquie socket id
    socket.on("user-message", (message) => {
        console.log("A new user message", message);
        io.emit('message', message);
    })
})

app.use(express.static(path.resolve('./public')));

app.get('/', (req, res) => {
    return res.sendFile('/public/index.html')
})

server.listen(3000, () => {
    console.log(`Server started at port 3000`);
})

//npm install socket.io