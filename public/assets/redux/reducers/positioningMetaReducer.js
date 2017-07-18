'use strict';

let positioningMetaReducerInitState = {
  
}

const positioningMetaReducer = (state = positioningMetaReducerInitState, action) => {
  switch (action.type) {
    case "LEG_ANGLE_CHANGED":
      if (!action.payload.misc.baseCenterCoords) break;
      return Object.assign({}, state, { baseCenterCoords: action.payload.misc.baseCenterCoords });
  }
  return state;
}
