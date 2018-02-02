'use strict';

{
  let movementCircleReducerInitState = {
    1: {    
      fluentTransverseBaseX: null,
      fluentTransverseBaseY: null,
      fluentX: null,
      fluentY: null,
      fluentDiameter: null,
      fluentRadius: null,
      solidX: null,
      solidY: null,
      solidDiameter: null,
      solidRadius: null
    },
    2: {
      fluentTransverseBaseX: null,
      fluentTransverseBaseY: null,
      fluentX: null,
      fluentY: null,
      fluentDiameter: null,
      fluentRadius: null,
      solidX: null,
      solidY: null,
      solidDiameter: null,
      solidRadius: null
    },
    3: {
      fluentTransverseBaseX: null,
      fluentTransverseBaseY: null,
      fluentX: null,
      fluentY: null,
      fluentDiameter: null,
      fluentRadius: null,
      solidX: null,
      solidY: null,
      solidDiameter: null,
      solidRadius: null
    },
    4: {
      fluentTransverseBaseX: null,
      fluentTransverseBaseY: null,
      fluentX: null,
      fluentY: null,
      fluentDiameter: null,
      fluentRadius: null,
      solidX: null,
      solidY: null,
      solidDiameter: null,
      solidRadius: null
    },
    5: {
      fluentTransverseBaseX: null,
      fluentTransverseBaseY: null,
      fluentX: null,
      fluentY: null,
      fluentDiameter: null,
      fluentRadius: null,
      solidX: null,
      solidY: null,
      solidDiameter: null,
      solidRadius: null
    },
    6: {
      fluentTransverseBaseX: null,
      fluentTransverseBaseY: null,
      fluentX: null,
      fluentY: null,
      fluentDiameter: null,
      fluentRadius: null,
      solidX: null,
      solidY: null,
      solidDiameter: null,
      solidRadius: null
    }
  }

  var movementCircleReducer = (state = movementCircleReducerInitState, action) => {
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
}