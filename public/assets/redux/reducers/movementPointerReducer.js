'use strict';

let movementPointerReducerInitState = {
  1: {},
  2: {},
  3: {},
  4: {},
  5: {},
  6: {}
}

const movementPointerReducer = (state = movementPointerReducerInitState, action) => {
  switch (action.type) {
    // case "ANIMATION_POINTER_CHANGED":
    //   {
    //     return Object.assign(
    //       {}, 
    //       state,
    //       { [action.legId]: Object.assign({}, state[action.legId], action.payload) }
    //     );
    //   }
    case "ANIMATION_POINTERS_CHANGED_BATCHED":
      {
        let newState = {};
        
        for (let key in action.payload) {
          newState[key] = Object.assign({}, state[key], action.payload[key]);
        }
        
        // for (let i = 1; i <= 6; i++) {
        //   newState[i] = Object.assign({}, state[i], action.payload[i]);
        // }
        
        return newState;
      }
  }
  return state;
}