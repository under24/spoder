'use strict';

const five = require('johnny-five');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
// const fs = require('fs');

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});


// fs.readFile('./test.json', 'utf8', function (err,data) {
//   if (err) {
//     return console.log(err);
//   }
//   
//   let result = JSON.parse(data);
//   result.title = '123';
//   result = JSON.stringify(result, '', 2);
//   
// 
//   fs.writeFile('./test.json', result, 'utf8', function (err) {
//      if (err) return console.log(err);
//   });
// });

// var board = new five.Board({
//   port: "/dev/cu.SPODER-SPPDev"
// });
// 
// board.on('ready', function() {
//   console.log('Arduino board is ready.');
//   
//   // board servo
//   var a = new five.Servo(9);
//   var ab = new five.Servo(10);
//   
//   // expansion board
//   var a = new five.Servo({
//     address: 0x40,
//     controller: "PCA9685",
//     pin: 8,
//     invert: true,
//     throttle: true
//   });
//   
//   var b = new five.Servo({
//     address: 0x40,
//     controller: "PCA9685",
//     range: [0, 180],
//     pin: 15,
//     throttle: true
//   });
//   // 
//   var c = new five.Servo({
//     address: 0x40,
//     controller: "PCA9685",
//     range: [0, 180],
//     pin: 5,
//     throttle: true
//   });
//   // 
//   var d = new five.Servo({
//     address: 0x40,
//     controller: "PCA9685",
//     range: [0, 180],
//     pin: 11,
//     throttle: true
//   });
//   
//   var e = new five.Servo({
//     address: 0x40,
//     controller: "PCA9685",
//     range: [0, 180],
//     pin: 12,
//     throttle: true
//   });
//   
//   var f = new five.Servo({
//     address: 0x40,
//     controller: "PCA9685",
//     range: [0, 180],
//     pin: 0,
//     throttle: true
//   });
//   
//   var g = new five.Servo({
//     address: 0x40,
//     controller: "PCA9685",
//     range: [0, 180],
//     pin: 3,
//     throttle: true
//   });
// 
//   io.on('connection', function(client) {
//     client.on('join', function(handshake) {
//       console.log(handshake);
//     });
//         
//     client.on('femur-servo-angle-changed', (data) => {
//       console.log(data.value);
//       a.to(data.value);
//       ab.to(data.value);
//       b.to(data.value);
//       c.to(data.value);
//       d.to(data.value);
//       e.to(data.value);
//       f.to(data.value);
//       g.to(data.value);
//     });
//     
//   });
//   
//   // this.repl.inject({
//   //   
//   // });
// });

const port = process.env.PORT || 3000;
server.listen(port);
console.log(`Server is running at localhost:${port}`);