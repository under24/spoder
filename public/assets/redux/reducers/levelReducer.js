'use strict';

let levelReducerInitState = {
  levelModifier: 0,
  appliedTo: 'sagittalBaseY'
}

const levelReducer = (state = levelReducerInitState, action) => {
  switch (action.type) {
    case "LEVEL_MODIFIER_CHANGED":
      return Object.assign({}, state, action.payload);
  }
  return state;
}
