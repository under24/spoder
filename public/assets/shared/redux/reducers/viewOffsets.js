'use strict';

{
  let viewOffsetsReducerInitState = {
    1: {
      transverseX: 0,
      transverseY: 0
    },
    2: {
      transverseX: 0,
      transverseY: 0
    },
    3: {
      transverseX: 0,
      transverseY: 0
    },
    4: {
      transverseX: 0,
      transverseY: 0
    },
    5: {
      transverseX: 0,
      transverseY: 0
    },
    6: {
      transverseX: 0,
      transverseY: 0
    }
  };

  var viewOffsetsReducer = (state = viewOffsetsReducerInitState, action) => {
    if ('viewOffsets' in action) {
      var stateChange = action['viewOffsets'];
      
      delete action['viewOffsets'];
      
      return stateChange;
    }
    return state;
  }  
}

// node environment export
try { module.exports = viewOffsetsReducer }
catch(e) {}