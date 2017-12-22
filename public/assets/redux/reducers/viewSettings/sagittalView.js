'use strict';

let viewSettingsSagittalReducerInitState = {
  legId: 1,
  scaling: null
};

const viewSettingsSagittalReducer = (state = viewSettingsSagittalReducerInitState, action) => {
  switch (action.type) {
    case "SAGITTAL_VIEW_SETTINGS_CHANGED":
      {
        return Object.assign({}, state, action.payload);
      }
  }
  return state;
}