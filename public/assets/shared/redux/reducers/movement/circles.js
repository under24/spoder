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
  };

  var movementCircleReducer = (state = movementCircleReducerInitState, action) => {
    if ('movement.circles' in action) {
      var stateChange = action['movement.circles'];
      
      delete action['movement.circles'];
      
      return stateChange;
    }
    return state;
  }  
}

// node environment export
try { module.exports = movementCircleReducer }
catch(e) {}