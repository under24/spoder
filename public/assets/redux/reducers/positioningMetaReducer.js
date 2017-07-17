'use strict';

let positioningMetaReducerInitState = {
  a: 1
}

const positioningMetaReducer = (state = positioningMetaReducerInitState, action) => {
  switch (action.type) {
    case "LEG_ANGLE_CHANGED":
      return Object.assign({}, state, action.payload.misc.baseCenterCoords);
  }
  return state;
}
