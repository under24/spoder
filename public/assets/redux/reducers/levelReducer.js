'use strict';

let levelInitState = {
  levelModifier: 0,
  appliedTo: 'sagittalBaseY'
}

const levelReducer = (state = levelInitState, action) => {
  switch (action.type) {
    case "BASE_Y_LEVEL_MODIFIER_CHANGED":
      return Object.assign({}, state, action.payload);
  }
  return state;
}
