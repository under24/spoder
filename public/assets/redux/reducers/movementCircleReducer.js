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
        if (!action.payload.movementCircle) return state;
        
        return Object.assign(
          {}, 
          state,
          { [action.legId]: Object.assign({}, state[action.legId], action.payload.movementCircle) }
        );
      }
    case "ANGLES_CHANGED_BATCHED":
      {
        if (!action.payload.movementCircle) {
          console.warn('movement circle data passed to movement circle reducer');
          return state;
        } 
        
        let newState = {};
        
        for (let legId in action.payload.movementCircle) {
          newState[legId] = Object.assign({}, state[legId], action.payload.movementCircle[legId]);
        }
        
        return Object.assign({}, state, newState);
      }
  }
  return state;
}