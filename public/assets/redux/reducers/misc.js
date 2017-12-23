'use strict';

let miscReducerInitState = {
  1: null,
  2: null,
  3: null,
  4: null,
  5: null,
  6: null
}

const miscReducer = (state = miscReducerInitState, action) => {
  switch (action.type) {
    case "MISC_CHANGED_BATCHED":
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