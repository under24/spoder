'use strict';

let miscReducerInitState = {
  1: {
    transverseDiff: null,
    transverseDistance: null
  },
  2: {
    transverseDiff: null,
    transverseDistance: null
  },
  3: {
    transverseDiff: null,
    transverseDistance: null
  },
  4: {
    transverseDiff: null,
    transverseDistance: null
  },
  5: {
    transverseDiff: null,
    transverseDistance: null
  },
  6: {
    transverseDiff: null,
    transverseDistance: null
  }
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