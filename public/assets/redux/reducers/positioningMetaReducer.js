'use strict';

let positioningMetaReducerInitState = {
  
}

const positioningMetaReducer = (state = positioningMetaReducerInitState, action) => {
  switch (action.type) {
    case "LEG_ANGLE_CHANGED":
      return Object.assign({}, state, action.payload.misc.baseCenterCoords);
  }
  return state;
}
