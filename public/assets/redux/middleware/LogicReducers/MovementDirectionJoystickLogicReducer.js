'use strict';

// try {
//   var LogicReducer = require('../../../spodux/LogicReducer.js');
// }
// catch(e) {}

class MovementDirectionJoystickLogicReducer extends LogicReducer {

  constructor(store) {
    super(store);
    
    this.actionObservers = [
      'processMovementDirectionJoystick(MOVEMENT_DIRECTION_JOYSTICK_VALUES_CHANGED)'
    ];
    
    this._prepareModule();
  }
  
  processMovementDirectionJoystick(payload) {
    var oldMovementDirectionJoystick = this.resolveStatePath('movement.directionJoystick');
    
    // validation. check if the payload and state values are the same
    if (oldMovementDirectionJoystick.x === payload.x && oldMovementDirectionJoystick.y === payload.y) {
      console.warn('same movement direction jostick values');
      return;
    }
    
    var newMovementDirectionJoystick = payload;
    
    return { 'movement.directionJoystick': newMovementDirectionJoystick };
  }

}

// node environment export
try { module.exports = MovementDirectionJoystickLogicReducer }
catch(e) {}