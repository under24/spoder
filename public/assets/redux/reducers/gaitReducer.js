'use strict';

let gaitReducerInitState = {
  ripple: [ [2,5], [3], [1,6], [4] ],
  rippleReversed: [ [4], [1,6], [3], [2,5] ]
}

const gaitReducer = (state = gaitReducerInitState, action) => {
  switch (action.type) {
    case "a":
      // return Object.assign({}, state, action.payload);
  }
  return state;
}
