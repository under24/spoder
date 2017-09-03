'use strict';

let baseCoxaAttachmentAngleReducerInitState = {
  1: { offsetRotation: -45 },
  2: { offsetRotation: 45 },
  3: { offsetRotation: 0 },
  4: { offsetRotation: 0 },
  5: { offsetRotation: 45 },
  6: { offsetRotation: -45 }
};

const baseCoxaAttachmentAngleReducer = (state = baseCoxaAttachmentAngleReducerInitState, action) => {
  switch (action.type) {
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
  }
  return state;
}