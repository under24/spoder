'use strict';

module.exports = (shared, server) => {
  // socket
  var io = require('socket.io')(server);
  
  
  io.on('connection', function (client) {
    console.log('client connected');
    
    client.on('action', function() {
      console.log('new action received');
    });
  });
  
  return io;
};