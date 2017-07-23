'use strict';

let animationViewPointerReducerInitState = {
  
}

const animationViewPointerReducer = (state = animationViewPointerReducerInitState, action) => {
  switch (action.type) {
    case "a":
      {
        return Object.assign({}, state, action.payload);
      }
  }
  return state;
}