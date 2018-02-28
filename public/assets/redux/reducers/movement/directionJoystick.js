'use strict';

{
  let movementDirectionJoystickReducerInitState = {
    x: 0,
    y: 0
  };

  var movementDirectionJoystickReducer = (state = movementDirectionJoystickReducerInitState, action) => {
    switch (action.type) {
      case "MOVEMENT_DIRECTION_JOYSTICK_VALUES_CHANGED":
        {
          return Object.assign({}, state, action.payload);
        }
    }
    return state;
  }
}