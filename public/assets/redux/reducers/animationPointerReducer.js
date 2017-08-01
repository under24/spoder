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
    case "ANIMATION_POINTERS_CHANGED_BATCHED":
      {
        let newState = {};
        
        for (let i = 1; i <= 6; i++) {
          newState[i] = Object.assign({}, state[i], action.payload[i]);
        }
        
        return newState;
      }
  }
  return state;
}