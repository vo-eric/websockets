// const moment = require('moment');
let socket = io();

socket.on('connect', function () {
  console.log('connected to server');
});

socket.on('disconnect', function () {
  console.log('disconnected from server');
});

socket.on('newMessage', function(message) {
  let formattedTime = moment(message.createdAt).format('h:mm a');
  let li = jQuery('<li></li>');
  li.text(`${message.from} (${formattedTime}): ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
  let formattedTime = moment(message.createdAt).format('h:mm a');
  let li = jQuery('<li></li>');
  let a = jQuery('<a target="_blank">Current Location</a>');
  
  li.text(`${message.from} (${formattedTime}): `);
  a.attr('href', message.url);
  li.append(a);

  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  let messageBox = jQuery('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageBox.val()
  }, function() {
    messageBox.val('');
  });
});

let locationButton = jQuery('#send-location');

locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Getting location...');
  
  navigator.geolocation.getCurrentPosition(function(position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude
    });
  }, function() {
    alert('Unable to fetch location');
    locationButton.removeAttr('disabled').text('Send location');
  });
});