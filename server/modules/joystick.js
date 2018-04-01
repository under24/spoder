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
      joystick.on('error', () => startTryingToConnect(initJoystick) );
      
      // meta buttons
      joystick.on('psxButton:press', () => dispatchJoystickOutput('psxButtonPressed') ); // ps button
      joystick.on('start:press', () => dispatchJoystickOutput('startPressed') ); // start button
      joystick.on('select:press', () => dispatchJoystickOutput('selectPressed') ); // select button
      
      // d pad
      joystick.on('dpadLeft:press', () => dispatchJoystickOutput('dpadLeftPressed') ); // left
      joystick.on('dpadUp:press', () => dispatchJoystickOutput('dpadUpPressed') ); // up
      joystick.on('dpadRight:press', () => dispatchJoystickOutput('dpadRightPressed') ); // right
      joystick.on('dpadDown:press', () => dispatchJoystickOutput('dpadDownPressed') ); // down
      
      // 
      joystick.on('circle:press', () => dispatchJoystickOutput('circlePressed') ); // circle
      joystick.on('triangle:press', () => dispatchJoystickOutput('trianglePressed') ); // triangle
      joystick.on('square:press', () => dispatchJoystickOutput('squarePressed') ); // square
      joystick.on('x:press', () => dispatchJoystickOutput('xPressed') ); // cross
      
      // analog sticks
      joystick.on('left:move', data => dispatchJoystickOutput('leftMoved', JU.normalizeLeftStickOutput(data)) ); // left stick
      joystick.on('right:move', data => dispatchJoystickOutput('rightMoved', JU.normalizeRightStickOutput(data)) ); // right stick
      joystick.on('leftAnalogBump:press', () => dispatchJoystickOutput('leftAnalogBumpPressed') ); // left stick bump
      joystick.on('rightAnalogBump:press', () =>  dispatchJoystickOutput('rightAnalogBumpPressed')); // right stick bump
      
      // triggers
      joystick.on('l1:press', () => dispatchJoystickOutput('l1Pressed') ); // left l1 trigger
      joystick.on('l2:press', () => dispatchJoystickOutput('l2Pressed') ); // left l2 trigger
      joystick.on('r1:press', () => dispatchJoystickOutput('r1Pressed') ); // right r1 trigger
      joystick.on('r2:press', () => dispatchJoystickOutput('r2Pressed') ); // right r2 trigger
      
      // joystick battery change
      joystick.on('battery:change', data => dispatchJoystickOutput('batteryChange', data) );
      
      // gyro
      // joystick.on('rightLeft:motion', data => dispatchJoystickOutput('rightLeftMotion', data) ); // right-left movement 
      // joystick.on('forwardBackward:motion', data => dispatchJoystickOutput('forwardBackwardMotion', data) ); // forward-back movement 
      
      clearTimerWhenConnected();
      // joystick connected action
      dispatchJoystickOutput('joystickConnected');
    }
    catch(e) {
      // error timer is in progress
      if (timer) return;
      
      startTryingToConnect(initJoystick);
    }
  })();
  
  function startTryingToConnect(initJoystick) {
    // start trying to connect to the joystick every 30 seconds
    timer = setInterval(initJoystick, 30000);
    
    // joystick disconnected action
    dispatchJoystickOutput('joystickDisconnected');
  }
  
  function clearTimerWhenConnected() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }
  
  function dispatchJoystickOutput(entity, data) {
    shared.resolve('store').dispatch({
      type: "JOYSTICK_OUTPUT",
      payload: { entity, data }
    });
  }
  
}