'use strict';

let rotationReducerInitState = {
  rotationModifier: 0,
  appliedTo: 'transverseBaseXY'
}

const rotationReducer = (state = rotationReducerInitState, action) => {
  switch (action.type) {
    case "ROTATION_MODIFIER_CHANGED":
      return Object.assign({}, state, action.payload);
  }
  return state;
}