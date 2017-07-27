'use strict';

let animationPointerReducerInitState = {
  1: {},
  2: {},
  3: {},
  4: {},
  5: {},
  6: {}
}

const animationPointerReducer = (state = animationPointerReducerInitState, action) => {
  switch (action.type) {
    case "ANIMATION_POINTER_CHANGED":
      {
        return Object.assign(
          {}, 
          state,
          { [action.legId]: Object.assign({}, state[action.legId], action.payload) }
        );
      }
  }
  return state;
}