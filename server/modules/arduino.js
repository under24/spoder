'use strict';

module.exports = (shared) => {
  
  // arduino lib
  var five = require('johnny-five');
  
  // init arduino controller object  
  new five.Board().on('ready', function() {
    console.log('Arduino board is ready.');
    
    // leg 1
    var coxa1 = new five.Servo({
      pin: 45,
      range: [10, 150],
      // invert: true
    });
    var femur1 = new five.Servo({
      pin: 2,
      range: [30, 140],
      // invert: true
    });
    var tibia1 = new five.Servo({
      pin: 3,
      range: [30, 140],
      // invert: true
    });
    
    // leg2
    var coxa2 = new five.Servo({
      pin: 16,
      range: [10, 150],
      invert: true,
    });
    var femur2 = new five.Servo({
      pin: 5,
      range: [30, 140],
      // invert: true
    });
    var tibia2 = new five.Servo({
      pin: 6,
      range: [30, 140],
      // invert: true
    });
    
    // leg3
    var coxa3 = new five.Servo({
      pin: 37,
      range: [30, 140],
      // invert: true
    });
    var femur3 = new five.Servo({
      pin: 8,
      range: [30, 140],
      // invert: true
    });
    var tibia3 = new five.Servo({
      pin: 9,
      range: [30, 140],
      // invert: true
    });
    
    // leg4
    var coxa4 = new five.Servo({
      pin: 7,
      range: [30, 140],
      invert: true
    });
    var femur4 = new five.Servo({
      pin: 11,
      range: [30, 140],
      // invert: true
    });
    var tibia4 = new five.Servo({
      pin: 12,
      range: [30, 140],
      // invert: true
    });
    
    // leg5
    var coxa5 = new five.Servo({
      pin: 27,
      range: [30, 140],
      // invert: true
    });
    var femur5 = new five.Servo({
      pin: 14,
      range: [30, 140],
      // invert: true
    });
    var tibia5 = new five.Servo({
      pin: 15,
      range: [30, 140],
      // invert: true
    });
    
    // leg6
    var coxa6 = new five.Servo({
      pin: 13,
      range: [30, 140],
      invert: true
    });
    var femur6 = new five.Servo({
      pin: 17,
      range: [30, 140],
      // invert: true
    });
    var tibia6 = new five.Servo({
      pin: 18,
      range: [30, 140],
      // invert: true
    });
    
    this.repl.inject({
      coxa1, femur1, tibia1,
      coxa2, femur2, tibia2,
      coxa3, femur3, tibia3,
      coxa4, femur4, tibia4,
      coxa5, femur5, tibia5,
      coxa6, femur6, tibia6
    });
  });
  
  // share servos between modules
  shared.register('servos', {
    coxa1, femur1, tibia1,
    coxa2, femur2, tibia2,
    coxa3, femur3, tibia3,
    coxa4, femur4, tibia4,
    coxa5, femur5, tibia5,
    coxa6, femur6, tibia6
  });
}