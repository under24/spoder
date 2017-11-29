'use strict';

let movementCircleReducerInitState = {
  1: null,
  2: null,
  3: null,
  4: null,
  5: null,
  6: null
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