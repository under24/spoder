'use strict';

let miscReducerInitState = {
  1: {
    sagittalDiff: null,
    sagittalDistance: null,
    sagittalAngle: null,
    transverseDiff: null,
    transverseDistance: null,
    transverseReachRadius: null
  },
  2: {
    sagittalDiff: null,
    sagittalDistance: null,
    sagittalAngle: null,
    transverseDiff: null,
    transverseDistance: null,
    transverseReachRadius: null
  },
  3: {
    sagittalDiff: null,
    sagittalDistance: null,
    sagittalAngle: null,
    transverseDiff: null,
    transverseDistance: null,
    transverseReachRadius: null
  },
  4: {
    sagittalDiff: null,
    sagittalDistance: null,
    sagittalAngle: null,
    transverseDiff: null,
    transverseDistance: null,
    transverseReachRadius: null
  },
  5: {
    sagittalDiff: null,
    sagittalDistance: null,
    sagittalAngle: null,
    transverseDiff: null,
    transverseDistance: null,
    transverseReachRadius: null
  },
  6: {
    sagittalDiff: null,
    sagittalDistance: null,
    sagittalAngle: null,
    transverseDiff: null,
    transverseDistance: null,
    transverseReachRadius: null
  }
}

const miscReducer = (state = miscReducerInitState, action) => {
  switch (action.type) {
    case "LEG_ANGLE_CHANGED":
      return Object.assign(
        {}, 
        state,
        { [action.legId]: Object.assign({}, state[action.legId], action.payload.misc) }
      );
  }
  return state;
}