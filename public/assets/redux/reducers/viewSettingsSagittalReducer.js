'use strict';

let viewSettingsSagittalReducerInitState = {
  legId: 1
};

const viewSettingsSagittalReducer = (state = viewSettingsSagittalReducerInitState, action) => {
  switch (action.type) {
    case "SAGITTAL_VIEW_LEG_ID_CHANGED":
      {
        return Object.assign({}, state, action.payload);
      }
  }
  return state;
}