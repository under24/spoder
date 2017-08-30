'use strict';

let baseCoxaPositionReducerInitState = {
  1: { offsetRotation: -45 },
  2: { offsetRotation: 45 },
  3: { offsetRotation: 0 },
  4: { offsetRotation: 0 },
  5: { offsetRotation: 45 },
  6: { offsetRotation: -45 }
};

const baseCoxaPositionReducer = (state = baseCoxaPositionReducerInitState, action) => {
  switch (action.type) {
    // case "BASE_DIRECTION_CHANGED":
    //   {
    //     return action.payload;
    //   }
  }
  return state;
}