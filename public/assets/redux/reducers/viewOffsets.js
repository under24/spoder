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
    // switch (action.type) {
    //   case "SEQUENCE_SHIFTED_XY_BATCHED":
    //     {
    //       let newState = {};
    //       
    //       for (let legId in action.payload) {
    //         
    //         let payload = {};
    //         
    //         if (action.payload[legId].transverseBaseX)
    //           payload.transverseX = state[legId].transverseX + action.payload[legId].transverseBaseX;
    //         
    //         if (action.payload[legId].transverseBaseY)
    //           payload.transverseY = state[legId].transverseY + action.payload[legId].transverseBaseY;
    //         
    //         newState[legId] = Object.assign({}, state[legId], payload);
    //       }
    //       return Object.assign({}, state, newState);
    //     }
    // }
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