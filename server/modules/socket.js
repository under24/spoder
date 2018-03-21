'use strict';

module.exports = (shared, server) => {
  // initialize socket.io
  var io = require('socket.io')(server);
  // when a new client is connected
  io.on('connection', function (client) {
    console.log('client connected');
    
    client.on('action', function() {
      console.log('new action received');
    });
  });
  
  // share socket.io between modules
  shared.register('io', io);
};