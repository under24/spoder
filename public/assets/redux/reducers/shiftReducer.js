'use strict';

let shiftReducerInitState = {
  x: 0,
  y: 0,
  appliedTo: 'transverseBaseXY'
}

const shiftReducer = (state = shiftReducerInitState, action) => {
  switch (action.type) {
    case "SHIFT_MODIFIER_CHANGED":
      return Object.assign({}, state, action.payload);
  }
  return state;
}