'use strict';

// webserver
var express = require('express'),
    app = express(),
    server = require('http').createServer(app);
    
// init object for storing shared objects
var shared = require('./server/utils/Shared')();

require('./server/modules/socket')(shared, server);
require('./server/modules/store')(shared);
// require('./server/modules/joystick')(shared);
// require('./server/modules/arduino')(shared);
// require('./server/modules/webrtc')(shared);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

var port = 3000;
server.listen(port);
console.log(`Server is running at localhost:${port}`);