const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('user connected');

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Hello, welcome to the chatroom',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'User joined the channel.',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (message) => {
    console.log('createdMessage', message);
    
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  // socket.broadcast.emit('newMessage', {
  //   from: message.from,
  //   text: message.text,
  //   createdAt: new Date().getTime()
  // });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server started on ${port}`);
});

module.exports = { app };


//create two events:
  //newMessage(from, text, createdAt)
    //from server to client
    //console.log it
  //createMessage(from ,text)
    //from client to server
    //console.log it

