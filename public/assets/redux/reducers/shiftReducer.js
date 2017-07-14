'use strict';

let shiftReducerInitState = {
  leftShiftModifier: 0,
  rightShiftModifier: 0,
  frontShiftModifier: 0,
  backShiftModifier: 0,
  appliedTo: 'sagittalBaseX'
}

const shiftReducer = (state = shiftReducerInitState, action) => {
  switch (action.type) {
    case "BASE_X_SHIFT_MODIFIER_CHANGED":
      return Object.assign({}, state, action.payload);
  }
  return state;
}