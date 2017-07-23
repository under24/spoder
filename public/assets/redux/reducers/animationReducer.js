'use strict';

let animationReducerInitState = {
  x: 0,
  y: 0
}

const animationReducer = (state = animationReducerInitState, action) => {
  switch (action.type) {
    case "ANIMATION_JOYSTICK_VALUES_CHANGED":
      return Object.assign({}, state, action.payload);
  }
  return state;
}