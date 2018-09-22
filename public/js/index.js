let socket = io();

socket.on('connect', function () {
  console.log('connected to server');
});

socket.on('disconnect', function () {
  console.log('disconnected from server');
});

socket.on('newMessage', function(message) {
  console.log('message:', message);
  let li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

socket.emit('createMessage', {
  from: 'Dave',
  text: 'bro'
}, function(data) {
  console.log('got it chief', data);
});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function() {
  });
});