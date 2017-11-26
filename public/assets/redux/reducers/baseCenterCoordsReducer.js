'use strict';

let baseCenterCoordsReducerInitState = {
  x: null,
  y: null
};

const baseCenterCoordsReducer = (state = baseCenterCoordsReducerInitState, action) => {
  switch (action.type) {
    case "BASE_CENTER_COORDS_CHANGED":
      {
        return Object.assign({}, state, action.payload);
      }
  }
  return state;
}