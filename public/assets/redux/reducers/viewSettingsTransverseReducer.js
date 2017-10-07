'use strict';

let viewSettingsTransverseReducerInitState = {
  legId: 1
};

const viewSettingsTransverseReducer = (state = viewSettingsTransverseReducerInitState, action) => {
  switch (action.type) {
    case "TRANSVERSE_VIEW_LEG_ID_CHANGED":
      {
        return Object.assign({}, state, action.payload);
      }
  }
  return state;
}