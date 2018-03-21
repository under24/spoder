'use strict';

{
  let movementPointerReducerInitState = {
    1: {
      x: null,
      y: null
    },
    2: {
      x: null,
      y: null
    },
    3: {
      x: null,
      y: null
    },
    4: {
      x: null,
      y: null
    },
    5: {
      x: null,
      y: null
    },
    6: {
      x: null,
      y: null
    }
  };

  var movementPointerReducer = (state = movementPointerReducerInitState, action) => {
    if ('movement.pointers' in action) {
      var stateChange = action['movement.pointers'];
      
      delete action['movement.pointers'];
      
      return stateChange;
    }
    return state;
  }  
}

// node environment export
try { module.exports = movementPointerReducer }
catch(e) {}