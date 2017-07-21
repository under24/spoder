'use strict';

// BASE_Y_LEVEL_MODIFIER_CHANGED

let viewReducerInitState = {
  transverseViewLegId: 1,
  sagittalViewLegId: 1
}

const viewReducer = (state = viewReducerInitState, action) => {
  switch (action.type) {
    case "TRANSVERSE_VIEW_LEG_ID_CHANGED":
      return Object.assign({}, state, { transverseViewLegId: action.payload });
    case "SAGITTAL_VIEW_LEG_ID_CHANGED":
      return Object.assign({}, state, { sagittalViewLegId: action.payload });
  }
  return state;
}