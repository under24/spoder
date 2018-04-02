'use strict';

var LogicReducer = require('../LogicReducer.js');
var MU = require('../../../../public/assets/shared/utils/MathUtils.js');

class MovementTurnJoystickLogicReducer extends LogicReducer {

  constructor(store) {
    super(store);
    
    this.actionObservers = [
      'processMovementTurnJoystick(MOVEMENT_TURN_JOYSTICK_VALUES_CHANGED)'
    ];
    
    this._prepareModule();
  }
  
  processMovementTurnJoystick(payload) {
    var oldMovementTurnJoystick = this.resolveStatePath('movement.turnJoystick');
    
    // validation. check if the payload and state values are the same
    if (oldMovementTurnJoystick.x === payload.x) {
      console.warn('same movement turn joystick values');
      return;
    }
    
    // calc normalized x (joystick value * normalizer)
    var normalizedX = MU.normalize(payload.x, oldMovementTurnJoystick.normalizer);
    
    var newMovementTurnJoystick = Object.assign({}, oldMovementTurnJoystick, payload, { normalizedX });
    
    return { 'movement.turnJoystick': newMovementTurnJoystick };
  }

}

module.exports = (store) => new MovementTurnJoystickLogicReducer(store);