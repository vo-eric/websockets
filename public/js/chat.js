let socket = io();

function scroll() {
  let messages = jQuery('#messages'),
      newMessage = messages.children('li:last-child'),
      clientHeight = messages.prop('clientHeight'),
      scrollTop = messages.prop('scrollTop'),
      scrollHeight = messages.prop('scrollHeight'),
      newMessageHeight = newMessage.innerHeight(),
      lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function () {
  let params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function(err) {
    if (err) {
      alert(err);
      //replace with error in form
      window.location.href = '/';
    }
    console.log('yay');
  });
});

socket.on('updateUserList', function(users) {
  let ol = jQuery('<ol></ol>');

  users.forEach(function(user) {
    ol.append(jQuery('<li></li>').text(user));
  });

  jQuery('#users').html(ol);
});

socket.on('disconnect', function () {
  console.log('disconnected from server');
});

socket.on('newMessage', function(message) {
  let template = jQuery('#message-template').html(),
      formattedTime = moment(message.createdAt).format('h:mm a'),
      html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scroll();
});

socket.on('newLocationMessage', function(message) {
  let template = jQuery('#location-message-template').html(),
      formattedTime = moment(message.createdAt).format('h:mm a'),
      html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scroll();
});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();
  let messageBox = jQuery('[name=message]');

  socket.emit('createMessage', {
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