const express = require("express")
const http = require('http');
const socketIo = require("socket.io")
require("dotenv").config()

const app = express()

const PORT = process.env.PORT || 8000

const server = http.createServer(app)

const io = socketIo(server, {
  cors: {
    origin: "*",
  }
})

io.on('connection', socket => {
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
  socket.on('message', async message => {
    // WE CAN STORE MESSAGE IN DB HERE ----> TODO
    socket.broadcast.emit('message', message);
  });

});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})