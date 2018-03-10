'use strict';

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
    if (oldMovementTurnJoystick.x === payload.x) throw new Error('same movement turn joystick values');
    
    // calc normalized x (joystick value * normalizer)
    var normalizedX = MU.normalize(payload.x, oldMovementTurnJoystick.normalizer);
    
    var newMovementTurnJoystick = Object.assign({}, oldMovementTurnJoystick, payload, { normalizedX });
    
    return { 'movement.turnJoystick': newMovementTurnJoystick };
  }

}
