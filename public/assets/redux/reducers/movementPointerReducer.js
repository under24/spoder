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
        
        for (let key in action.payload) {
          newState[key] = Object.assign({}, state[key], action.payload[key]);
        }
        
        // for (let i = 1; i <= 6; i++) {
        //   newState[i] = Object.assign({}, state[i], action.payload[i]);
        // }
        
        return newState;
      }
  }
  return state;
}