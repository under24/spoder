'use strict';

let movementCircleReducerInitState = {
  1: {
    diameter: null,
    fluentDiameter: null,
    fluentRadius: null,
    fluentTransverseBaseX: null,
    fluentTransverseBaseY: null,
    radius: null,
    solidX: null,
    solidY: null,
    x: null,
    y: null
  },
  2: {
    diameter: null,
    fluentDiameter: null,
    fluentRadius: null,
    fluentTransverseBaseX: null,
    fluentTransverseBaseY: null,
    radius: null,
    solidX: null,
    solidY: null,
    x: null,
    y: null
  },
  3: {
    diameter: null,
    fluentDiameter: null,
    fluentRadius: null,
    fluentTransverseBaseX: null,
    fluentTransverseBaseY: null,
    radius: null,
    solidX: null,
    solidY: null,
    x: null,
    y: null
  },
  4: {
    diameter: null,
    fluentDiameter: null,
    fluentRadius: null,
    fluentTransverseBaseX: null,
    fluentTransverseBaseY: null,
    radius: null,
    solidX: null,
    solidY: null,
    x: null,
    y: null
  },
  5: {
    diameter: null,
    fluentDiameter: null,
    fluentRadius: null,
    fluentTransverseBaseX: null,
    fluentTransverseBaseY: null,
    radius: null,
    solidX: null,
    solidY: null,
    x: null,
    y: null
  },
  6: {
    diameter: null,
    fluentDiameter: null,
    fluentRadius: null,
    fluentTransverseBaseX: null,
    fluentTransverseBaseY: null,
    radius: null,
    solidX: null,
    solidY: null,
    x: null,
    y: null
  }
}

const movementCircleReducer = (state = movementCircleReducerInitState, action) => {
  switch (action.type) {
    case "MOVEMENT_CIRCLES_CHANGED_BATCHED":
      {
        let newState = {};
        
        for (let legId in action.payload) {
          newState[legId] = Object.assign({}, state[legId], action.payload[legId]);
        }
        
        return Object.assign({}, state, newState);
      }
  }
  return state;
}