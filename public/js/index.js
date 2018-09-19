let socket = io();

socket.on('connect', function () {
  console.log('connected to server');

  // socket.emit('createEmail', {
  //   to: 'amanda@shires.com',
  //   text: 'if we were vampires'
  // });
});

socket.emit('createMessage', {
  from: 'amandashires',
  text: 'if we were vampires'
});

socket.on('disconnect', function () {
  console.log('disconnected from server');
});

socket.on('newMessage', function(message) {
  console.log('message:', message);
});

// socket.on('newEmail', function(email) {
//   console.log('new email', email);
// });