'use strict';

let baseCoxaAttachmentAngleReducerInitState = {
  1: -45,
  2: 45,
  3: 0,
  4: 0,
  5: 45,
  6: -45
};

const baseCoxaAttachmentAngleReducer = (state = baseCoxaAttachmentAngleReducerInitState, action) => {
  // switch (action.type) {
    // case "COXA_OFFSET_ROTATION_CHANGED":
    //   {
    //     let newState = {};
    //     
    //     for (let legId = 1; legId <= 6; legId++) {
    //       newState[legId] = Object.assign({}, state[legId], { offsetRotation: state[legId].offsetRotation + action.payload });
    //     }
    //   
    //     return newState;
    //   }
  // }
  return state;
}