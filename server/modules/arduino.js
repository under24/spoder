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
      range: [10, 150]
    });
    var femur1 = new five.Servo({
      pin: 2,
      range: [30, 140],
      // invert: true
    });
    var tibia1 = new five.Servo({
      pin: 31,
      range: [0, 180],
      invert: true
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
      pin: 32,
      range: [20, 160],
      offset: 9
    });
    
    // leg3
    var coxa3 = new five.Servo({
      pin: 37,
      range: [30, 140]
    });
    var femur3 = new five.Servo({
      pin: 8,
      range: [30, 140],
      // invert: true
    });
    var tibia3 = new five.Servo({
      pin: 35,
      range: [0, 180],
      invert: true,
      offset: 7
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
      pin: 33,
      range: [0, 180],
      offset: 6
    });
    
    // leg5
    var coxa5 = new five.Servo({
      pin: 27,
      range: [30, 140]
    });
    var femur5 = new five.Servo({
      pin: 14,
      range: [30, 140],
      // invert: true
    });
    var tibia5 = new five.Servo({
      pin: 36,
      range: [20, 160],
      invert: true,
      offset: 7
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
      pin: 34,
      range: [20, 160],
      offset: 7
    });
    
    this.repl.inject({
      coxa1, femur1, tibia1,
      coxa2, femur2, tibia2,
      coxa3, femur3, tibia3,
      coxa4, femur4, tibia4,
      coxa5, femur5, tibia5,
      coxa6, femur6, tibia6
    });
    
    // share servos between modules
    shared.register('servos', {
      leg1: {
        coxa: coxa1,
        femur: femur1,
        tibia: tibia1
      },
      leg2: {
        coxa: coxa2,
        femur: femur2,
        tibia: tibia2
      },
      leg3: {
        coxa: coxa3,
        femur: femur3,
        tibia: tibia3
      },
      leg4: {
        coxa: coxa4,
        femur: femur4,
        tibia: tibia4
      },
      leg5: {
        coxa: coxa5,
        femur: femur5,
        tibia: tibia5
      },
      leg6: {
        coxa: coxa6,
        femur: femur6,
        tibia: tibia6
      },
    });
  });
}