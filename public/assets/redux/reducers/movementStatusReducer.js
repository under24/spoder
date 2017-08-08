'use strict';

// stance,
// swing,
// parked
let movementStatusReducerInitState = {
  1: {
    sagittalBase: null,
    sagittalCursor: null,
    transverseBase: null,
    transverseCursor: null
  },
  2: {
    sagittalBase: null,
    sagittalCursor: null,
    transverseBase: null,
    transverseCursor: null
  },
  3: {
    sagittalBase: null,
    sagittalCursor: null,
    transverseBase: null,
    transverseCursor: null
  },
  4: {
    sagittalBase: null,
    sagittalCursor: null,
    transverseBase: null,
    transverseCursor: null
  },
  5: {
    sagittalBase: null,
    sagittalCursor: null,
    transverseBase: null,
    transverseCursor: null
  },
  6: {
    sagittalBase: null,
    sagittalCursor: null,
    transverseBase: null,
    transverseCursor: null
  }
}

const movementStatusReducer = (state = movementStatusReducerInitState, action) => {
  switch (action.type) {
    case "a":
      // {
      //   return Object.assign({}, state, action.payload);
      // }
  }
  return state;
}