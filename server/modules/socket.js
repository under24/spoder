'use strict';

module.exports = (shared, server) => {
  
  // initialize socket.io
  var io = require('socket.io')(server);
  
  // when a new client is connected
  io.on('connection', client => {
    
    // send the current logic state to every new client
    client.emit('sync-state', shared.resolve('store').getState());
    
    // client dispatched an action
    client.on('action', action => {
      shared.resolve('store').dispatch(action);
    });
    
  });
  
  // share socket.io between modules
  shared.register('io', io);
}