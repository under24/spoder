'use strict';

let animationCircleReducerInitState = {
  // 1: {},
  // 2: {},
  // 3: {},
  // 4: {},
  // 5: {},
  // 6: {}
}

const animationCircleReducer = (state = animationCircleReducerInitState, action) => {
  switch (action.type) {
    case "LEG_ANGLE_CHANGED":
      {
        if (!action.payload.animationCircle) return state;
        
        return Object.assign(
          {}, 
          state,
          { [action.legId]: Object.assign({}, state[action.legId], action.payload.animationCircle) }
        );
      }
  }
  return state;
}