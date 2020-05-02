'use strict';

module.exports = (shared) => {
  
  // arduino lib
  var five = require('johnny-five');
  
  // init arduino controller object  
  new five.Board().on('ready', function() {
    console.log('Arduino board is ready.');
    
    // leg 1
    var coxa1 = new five.Servo({
      pin: 42,
      range: [10, 150]
    });
    var femur1 = new five.Servo({
      pin: 39,
      offset: 1
    });
    var tibia1 = new five.Servo({
      pin: 45,
      invert: true
    });
    
    // leg2
    var coxa2 = new five.Servo({
      pin: 21,
      range: [10, 150],
      invert: true,
    });
    var femur2 = new five.Servo({
      pin: 19,
      invert: true
    });
    var tibia2 = new five.Servo({
      pin: 17,
      offset: 9
    });
    
    // leg3
    var coxa3 = new five.Servo({
      pin: 33,
      range: [30, 140]
    });
    var femur3 = new five.Servo({
      pin: 30,
      offset: -3
    });
    var tibia3 = new five.Servo({
      pin: 35,
      invert: true,
      offset: 7
    });
    
    // leg4
    var coxa4 = new five.Servo({
      pin: 2,
      range: [30, 140],
      invert: true
    });
    var femur4 = new five.Servo({
      pin: 4,
      invert: true,
      offset: -1
    });
    var tibia4 = new five.Servo({
      pin: 7,
      offset: 6
    });
    
    // leg5
    var coxa5 = new five.Servo({
      pin: 50,
      range: [30, 140]
    });
    var femur5 = new five.Servo({
      pin: 53,
      offset: 3
    });
    var tibia5 = new five.Servo({
      pin: 46,
      invert: true,
      offset: 7
    });
    
    // leg6
    var coxa6 = new five.Servo({
      pin: 8,
      range: [30, 140],
      invert: true
    });
    var femur6 = new five.Servo({
      pin: 10,
      invert: true,
      offset: 7
    });
    var tibia6 = new five.Servo({
      pin: 13,
      offset: 7
    });
    
    // function stop() {
    //   coxa1.stop();
    //   femur1.stop();
    //   tibia1.stop();
    //   coxa2.stop();
    //   femur2.stop();
    //   tibia2.stop();
    //   coxa3.stop();
    //   femur3.stop();
    //   tibia3.stop();
    //   coxa4.stop();
    //   femur4.stop();
    //   tibia4.stop();
    //   coxa5.stop();
    //   femur5.stop();
    //   tibia5.stop();
    //   coxa6.stop();
    //   femur6.stop();
    //   tibia6.stop();
    // }
    // stop();
    
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