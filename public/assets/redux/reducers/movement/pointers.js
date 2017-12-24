'use strict';

let movementPointerReducerInitState = {
  1: {
    x: null,
    y: null
  },
  2: {
    x: null,
    y: null
  },
  3: {
    x: null,
    y: null
  },
  4: {
    x: null,
    y: null
  },
  5: {
    x: null,
    y: null
  },
  6: {
    x: null,
    y: null
  }
}

const movementPointerReducer = (state = movementPointerReducerInitState, action) => {
  switch (action.type) {
    case "MOVEMENT_POINTERS_CHANGED_BATCHED":
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