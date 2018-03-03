'use strict';

class MovementDirectionJoystickLogicReducer extends LogicReducer {

  constructor(store) {
    super(store);
    
    this.actionTypes = [
      'processMovementDirectionJoystick(MOVEMENT_DIRECTION_JOYSTICK_VALUES_CHANGED)'
    ];
  }
  
  processMovementDirectionJoystick(payload) {
    var oldMovementDirectionJoystick = this.resolveStatePath('movement.directionJoystick');
    
    // validation. check if the payload and state values are the same
    if (oldMovementDirectionJoystick.x === payload.x &&
        oldMovementDirectionJoystick.y === payload.y) throw new Error('same movement direction jostick values');
    
    var newMovementDirectionJoystick = payload;
    
    return { 'movement.directionJoystick': newMovementDirectionJoystick };
  }

}
