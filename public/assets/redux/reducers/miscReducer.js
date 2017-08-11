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
    case "LEG_ANGLE_CHANGED":
      {
        return Object.assign(
          {}, 
          state,
          { [action.legId]: Object.assign({}, state[action.legId], action.payload.misc) }
        );
      }
    case "ANGLES_CHANGED_BATCHED":
      {
        if (!action.payload.misc) {
          console.warn('mics data passed to misc reducer');
          return state;
        } 
        
        let newState = {};
        
        for (let legId in action.payload.misc) {
          newState[legId] = Object.assign({}, state[legId], action.payload.misc[legId]);
        }
        
        return Object.assign({}, state, newState);
      }
  }
  return state;
}