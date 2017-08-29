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
    case "MOVEMENT_CIRCLES_CHANGED_BATCHED":
      {
        let newState = {};
        
        for (let legId in action.payload) {
          newState[legId] = Object.assign({}, state[legId], action.payload[legId]);
        }
        
        return Object.assign({}, state, newState);
      }
  }
  return state;
}