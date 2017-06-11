'use strict';

const five = require('johnny-five');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
});

// five.Board().on('ready', function() {
//   console.log('Arduino board is ready.');
//   
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
// 
//   var c = new five.Servo({
//     address: 0x40,
//     controller: "PCA9685",
//     range: [0, 180],
//     pin: 5,
//     throttle: true
//   });
//   
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
//   // var proximity = new five.Proximity({
//   //   controller: "HC-SR04",
//   //   pin: 11,
//   // });
//   
//   // proximity.on("data", function() {
//   //   console.log("Proximity: ");
//   //   console.log("  cm  : ", this.cm);
//   //   // console.log("  in  : ", this.in);
//   //   console.log("-----------------");
//   // });
//   
//   // create a servo instance
//   // let servo = new five.Servo({
//   //   pin: 10,
//   //   type: "normal",
//   //   // range: [0,170],
//   //   invert: true
//   // });
//   // servo.center();
//   
//   // setInterval(() => {
//   //   console.log(proximity.cm);
//   // },200)
// 
//   io.on('connection', function(client) {
//     client.on('join', function(handshake) {
//       console.log(handshake);
//     });
//         
//     client.on('femur-servo-angle-changed', (data) => {
//       a.to(data.value);
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
//   //   a: a,
//   //   b: b,
//   //   c: c,
//   // });
// });

const port = process.env.PORT || 3000;
server.listen(port);
console.log(`Server is running at localhost:${port}`);