'use strict';

let animationViewPointerReducerInitState = {
  1: {
    
  },
  2: {
    
  },
  3: {
    
  },
  4: {
    
  },
  5: {
    
  },
  6: {
    
  }
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