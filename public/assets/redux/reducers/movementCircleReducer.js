'use strict';

let movementCircleReducerInitState = {
  // 1: {},
  // 2: {},
  // 3: {},
  // 4: {},
  // 5: {},
  // 6: {}
}

const movementCircleReducer = (state = movementCircleReducerInitState, action) => {
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