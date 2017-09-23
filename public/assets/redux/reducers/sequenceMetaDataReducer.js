'use strict';

let sequenceMetaDataReducerInitState = {
  loop: true,
  applyDirectionAndTurnAngles: true
}

const sequenceMetaDataReducer = (state = sequenceMetaDataReducerInitState, action) => {
  switch (action.type) {
    case "MOVEMENT_META_DATA_CHANGED":
      {
        return Object.assign({}, state, action.payload);
      }
  }
  return state;
}