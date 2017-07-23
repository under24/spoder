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
  }
  return state;
}