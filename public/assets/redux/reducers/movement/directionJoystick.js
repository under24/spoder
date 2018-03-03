'use strict';

{
  let movementDirectionJoystickReducerInitState = {
    x: 0,
    y: 0
  };

  var movementDirectionJoystickReducer = (state = movementDirectionJoystickReducerInitState, action) => {
    // switch (action.type) {
    //   case "MOVEMENT_DIRECTION_JOYSTICK_VALUES_CHANGED":
    //     {
    //       return Object.assign({}, state, action.payload);
    //     }
    // }
    if ('movement.directionJoystick' in action) {
      var newState = action['movement.directionJoystick'];
      
      delete action['movement.directionJoystick'];
      
      return newState;
    }
    return state;
  }
}