const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  socket.emit('newMessage', 
    generateMessage('Admin', 'Welcome to the chat room'));

  socket.broadcast.emit('newMessage',
    generateMessage('Admin', 'User has joined the chat room'));

  socket.on('createMessage', (message, cb) => {
    io.emit('newMessage', 
      generateMessage(message.from, message.text));
    cb();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage',
      generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('newMessage',
      generateMessage('Admin', 'User has left the chanel'));
  });
});

server.listen(port, () => {
  console.log(`Server started on ${port}`);
});

module.exports = { app };