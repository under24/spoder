'use strict';

let movementPointerReducerInitState = {
  1: null,
  2: null,
  3: null,
  4: null,
  5: null,
  6: null
}

const movementPointerReducer = (state = movementPointerReducerInitState, action) => {
  switch (action.type) {
    case "MOVEMENT_POINTERS_CHANGED_BATCHED":
      {
        let newState = {};
        
        for (let legId in action.payload) {
          newState[legId] = Object.assign({}, state[legId], action.payload[legId]);
        }
        
        return newState;
      }
  }
  return state;
}