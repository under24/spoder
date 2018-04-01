'use strict';

module.exports = (shared) => {

  // JoystickUtils
  var JU = require('../utils/joystickUtils');
  // playstation joystick lib
  var dualShock = require('dualshock-controller');
  
  var timer;
  
  (function initJoystick() {
    try {
      // init joystick
      var joystick = dualShock({ config: "dualShock3" });
      
      // error handler
      joystick.on('error', () => {
        setTimeout(initJoystick, 30000);
      });
      
      // meta buttons
      // ps button
      joystick.on('psxButton:press', () => { console.log('psxButton press'); });
      // start button
      joystick.on('start:press', () => { console.log('start press'); });
      // select button
      joystick.on('select:press', () => { console.log('select press'); });
      
      // d pad
      // left
      joystick.on('dpadLeft:press', () => { console.log('dpadLeft press'); });
      // up
      joystick.on('dpadUp:press', () => { console.log('dpadUp press'); });
      // right
      joystick.on('dpadRight:press', () => { console.log('dpadRight press'); });
      // down
      joystick.on('dpadDown:press', () => { console.log('dpadDown press'); });
      
      // 
      // circle
      joystick.on('circle:press', () => { console.log('circle press'); });
      // triangle
      joystick.on('triangle:press', () => { console.log('triangle press'); });
      // square
      joystick.on('square:press', () => { console.log('square press'); });
      // cross
      joystick.on('x:press', () => { console.log('x press'); });
      
      // analog sticks
      // left stick
      joystick.on('left:move', data => {
        var result = JU.normalizeLeftStickOutput(data);
        console.log(result);
        // io.emit('left-analog-stick-moved', result);
      });
      // right stick
      joystick.on('right:move', data => {
        var result = JU.normalizeRightStickOutput(data);
        console.log(result);
        // io.emit('right-analog-stick-moved', result);
      });
      // left stick bump
      joystick.on('leftAnalogBump:press', () => { console.log('leftAnalogBump press'); });
      // right stick bump
      joystick.on('rightAnalogBump:press', () => { console.log('rightAnalogBump press'); });
      
      // triggers
      // left triggeres
      joystick.on('l1:press', () => { console.log('l1 press'); });
      joystick.on('l2:press', () => { console.log('l2 press'); });
      // right triggeres
      joystick.on('r1:press', () => { console.log('r1 press'); });
      joystick.on('r2:press', () => { console.log('r2 press'); });
      
      // joystick battery change
      joystick.on('battery:change', data => {
        // shared.resolve('store');
        console.log(data);
      });
      
      // gyro
      // right-left movement 
      // joystick.on('rightLeft:motion', data => console.log(data));
      // forward-back movement 
      // joystick.on('forwardBackward:motion', data => console.log(data));
      
      clearInterval(timer);
      timer = null;
      console.log('joystick connected');
    }
    catch(e) {
      console.log('joystick init error');
      
      // error timer is in progress
      if (timer) return;
      
      // start trying to connect to the joystick every 30 seconds
      timer = setInterval(initJoystick, 30000);
    }
  })();
  
}