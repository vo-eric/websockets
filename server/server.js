const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { Users } = require('./utils/users');
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  socket.on('join', (params, cb) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return cb('Name and room name are required');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    socket.emit('newMessage', generateMessage('Admin', `Welcome to ${params.room}`));

    socket
      .broadcast
      .to(params.room)
      .emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
    cb();
  });

  socket.on('createMessage', (message, cb) => {
    let user = users.getUser(socket.id);

    if(user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }
    cb();
  });

  socket.on('createLocationMessage', (coords) => {
    let user = users.getUser(socket.id);

    if(user) {
      io
        .emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
        .to(user.room);
    }
  });

  socket.on('disconnect', () => {
    let user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`));
    }
  });
});

server.listen(port, () => {
  console.log(`Server started on ${port}`);
});

module.exports = { app };