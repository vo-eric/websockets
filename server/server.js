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
    from: 'jasonisbell',
    text: 'tupelo',
    createdAt: 123
  });

  socket.on('createMessage', (newMessage) => {
    console.log('createdMessage', newMessage);
  })

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

