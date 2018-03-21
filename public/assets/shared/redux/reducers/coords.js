'use strict';

{
  let coordsReducerInitState = {
    1: {
      sagittalCursorX: null,
      sagittalCursorY: null,
      sagittalBaseX: null,
      sagittalBaseY: null,
      transverseCursorX: null,
      transverseCursorY: null,
      transverseBaseX: null,
      transverseBaseY: null
    },
    2: {
      sagittalCursorX: null,
      sagittalCursorY: null,
      sagittalBaseX: null,
      sagittalBaseY: null,
      transverseCursorX: null,
      transverseCursorY: null,
      transverseBaseX: null,
      transverseBaseY: null
    },
    3: {
      sagittalCursorX: null,
      sagittalCursorY: null,
      sagittalBaseX: null,
      sagittalBaseY: null,
      transverseCursorX: null,
      transverseCursorY: null,
      transverseBaseX: null,
      transverseBaseY: null
    },
    4: {
      sagittalCursorX: null,
      sagittalCursorY: null,
      sagittalBaseX: null,
      sagittalBaseY: null,
      transverseCursorX: null,
      transverseCursorY: null,
      transverseBaseX: null,
      transverseBaseY: null
    },
    5: {
      sagittalCursorX: null,
      sagittalCursorY: null,
      sagittalBaseX: null,
      sagittalBaseY: null,
      transverseCursorX: null,
      transverseCursorY: null,
      transverseBaseX: null,
      transverseBaseY: null
    },
    6: {
      sagittalCursorX: null,
      sagittalCursorY: null,
      sagittalBaseX: null,
      sagittalBaseY: null,
      transverseCursorX: null,
      transverseCursorY: null,
      transverseBaseX: null,
      transverseBaseY: null
    }
  };

  // // compute sagittalBaseX and sagittalCursorX coords
  // for (let key in coordsReducerInitState) {
  //   let result = CU.getTransverseBaseXYCompensativeCoords({
  //     tbx: coordsReducerInitState[key].transverseBaseX,
  //     tby: coordsReducerInitState[key].transverseBaseY,
  //     tcx: coordsReducerInitState[key].transverseCursorX,
  //     tcy: coordsReducerInitState[key].transverseCursorY
  //   });
  // 
  //   Object.assign(coordsReducerInitState[key], result);
  // }

  var coordsReducer = (state = coordsReducerInitState, action) => {
    switch (action.type) {
      case "CURSOR_XY_CHANGED":
        {
          return Object.assign(
            {}, 
            state,
            { [action.legId]: Object.assign({}, state[action.legId], action.payload) }
          );
        }
      // case "CURSOR_XY_SHIFTED":
      //   {
      //     // calc shifted coords
      //     let cursorXY = {};
      //     if (action.payload.sagittalCursorX)
      //       cursorXY.sagittalCursorX = state[action.legId].sagittalCursorX - action.payload.sagittalCursorX;
      //       
      //     if (action.payload.sagittalCursorY)
      //       cursorXY.sagittalCursorY = state[action.legId].sagittalCursorY - action.payload.sagittalCursorY;
      //       
      //     if (action.payload.transverseCursorX)
      //       cursorXY.transverseCursorX = state[action.legId].transverseCursorX - action.payload.transverseCursorX;
      //       
      //     if (action.payload.transverseCursorY)
      //       cursorXY.transverseCursorY = state[action.legId].transverseCursorY - action.payload.transverseCursorY;
      //     
      //     // gather up latest coords for further computations
      //     let coords = CU.aggregateCoords(state[action.legId], cursorXY);
      //     
      //     // compensative computations from transverse coords for sagittal
      //     // transverseCursorX/Y => sagittalCursorX
      //     if (cursorXY.transverseCursorX || cursorXY.transverseCursorY) {
      //       let result = CU.getTransverseBaseXYCompensativeCoords(coords);
      //       // compare with the existing coords
      //       if (result.sagittalCursorX !== state[action.legId].sagittalCursorX) cursorXY.sagittalCursorX = result.sagittalCursorX;
      //     }
      //     // compensative computations from sagittal coords for transverse
      //     // sagittalCursorX => transverseCursorX + transverseCursorY
      //     else if (cursorXY.sagittalCursorX) {
      //       let result = CU.getSagittalCursorXCompensativeCoords(coords);
      //       // compare with the existing coords
      //       if (result.transverseCursorX !== state[action.legId].transverseCursorX) cursorXY.transverseCursorX = result.transverseCursorX;
      //       if (result.transverseCursorY !== state[action.legId].transverseCursorY) cursorXY.transverseCursorY = result.transverseCursorY;
      //     }
      //     
      //     return Object.assign(
      //       {},
      //       state,
      //       { [action.legId]: Object.assign({}, state[action.legId], cursorXY) }
      //     );
      //   }
      case "BASE_XY_CHANGED":
        {
          return Object.assign(
            {},
            state,
            { [action.legId]: Object.assign({}, state[action.legId], action.payload) }
          );
        }
      // case "BASE_XY_SHIFTED":
      //   {
      //     let baseXY = {};
      //     if (action.payload.sagittalBaseX)
      //       baseXY.sagittalBaseX = state[action.legId].sagittalBaseX - action.payload.sagittalBaseX;
      //       
      //     if (action.payload.sagittalBaseY)
      //       baseXY.sagittalBaseY = state[action.legId].sagittalBaseY - action.payload.sagittalBaseY;
      //       
      //     if (action.payload.transverseBaseX)
      //       baseXY.transverseBaseX = state[action.legId].transverseBaseX - action.payload.transverseBaseX;
      //       
      //     if (action.payload.transverseBaseY)
      //       baseXY.transverseBaseY = state[action.legId].transverseBaseY - action.payload.transverseBaseY;
      //     
      //     // gather up latest coords for further computations
      //     let coords = CU.aggregateCoords(state[action.legId], baseXY);
      //     
      //     // compensative computations from transverse coords for sagittal
      //     // transverseBaseX/Y => sagittalBaseX + sagittalCursorX
      //     if (baseXY.transverseBaseX || baseXY.transverseBaseY) {
      //       let result = CU.getTransverseBaseXYCompensativeCoords(coords);
      //       // compare with the existing coords
      //       if (result.sagittalBaseX !== state[action.legId].sagittalBaseX) baseXY.sagittalBaseX = result.sagittalBaseX;
      //       if (result.sagittalCursorX !== state[action.legId].sagittalCursorX) baseXY.sagittalCursorX = result.sagittalCursorX;
      //     }
      //     // compensative computations from sagittal coords for transverse
      //     // sagittalBaseX => transverseBaseX + transverseBaseY
      //     else if (baseXY.sagittalBaseX) {
      //       let result = CU.getSagittalBaseXCompensativeCoords(coords);
      //       // compare with the existing coords
      //       if (result.transverseBaseX !== state[action.legId].transverseBaseX) baseXY.transverseBaseX = result.transverseBaseX;
      //       if (result.transverseBaseY !== state[action.legId].transverseBaseY) baseXY.transverseBaseY = result.transverseBaseY;
      //     }
      //       
      //     return Object.assign(
      //       {},
      //       state,
      //       { [action.legId]: Object.assign({}, state[action.legId], baseXY) }
      //     );
      //   }
      // case "SEQUENCE_SHIFTED_XY_BATCHED":
      //   {
      //     let newState = {};
      //     
      //     for (let legId in action.payload) {
      //       
      //       // cursorXY coords
      //       let cursorXY = {};
      //       if (action.payload[legId].sagittalCursorX)
      //         cursorXY.sagittalCursorX = state[legId].sagittalCursorX - action.payload[legId].sagittalCursorX;
      //         
      //       if (action.payload[legId].sagittalCursorY)
      //         cursorXY.sagittalCursorY = state[legId].sagittalCursorY - action.payload[legId].sagittalCursorY;
      //         
      //       if (action.payload[legId].transverseCursorX)
      //         cursorXY.transverseCursorX = state[legId].transverseCursorX - action.payload[legId].transverseCursorX;
      //         
      //       if (action.payload[legId].transverseCursorY)
      //         cursorXY.transverseCursorY = state[legId].transverseCursorY - action.payload[legId].transverseCursorY;
      //         
      //       // gather up latest coords for further computations
      //       let cursorCoords = CU.aggregateCoords(state[legId], cursorXY);
      //       
      //       // compensative computations from transverse coords for sagittal
      //       // transverseCursorX/Y => sagittalCursorX
      //       if (cursorXY.transverseCursorX || cursorXY.transverseCursorY) {
      //         let result = CU.getTransverseBaseXYCompensativeCoords(cursorCoords);
      //         // compare with the existing coords
      //         if (result.sagittalCursorX !== state[legId].sagittalCursorX) cursorXY.sagittalCursorX = result.sagittalCursorX;
      //       }
      //       // compensative computations from sagittal coords for transverse
      //       // sagittalCursorX => transverseCursorX + transverseCursorY
      //       else if (cursorXY.sagittalCursorX) {
      //         let result = CU.getSagittalCursorXCompensativeCoords(cursorCoords);
      //         // compare with the existing coords
      //         if (result.transverseCursorX !== state[legId].transverseCursorX) cursorXY.transverseCursorX = result.transverseCursorX;
      //         if (result.transverseCursorY !== state[legId].transverseCursorY) cursorXY.transverseCursorY = result.transverseCursorY;
      //       }
      //       
      //       
      //       // baseXY coords
      //       let baseXY = {};
      //       if (action.payload[legId].sagittalBaseX)
      //         baseXY.sagittalBaseX = state[legId].sagittalBaseX - action.payload[legId].sagittalBaseX;
      //         
      //       if (action.payload[legId].sagittalBaseY)
      //         baseXY.sagittalBaseY = state[legId].sagittalBaseY - action.payload[legId].sagittalBaseY;
      //         
      //       if (action.payload[legId].transverseBaseX)
      //         baseXY.transverseBaseX = state[legId].transverseBaseX - action.payload[legId].transverseBaseX;
      //         
      //       if (action.payload[legId].transverseBaseY)
      //         baseXY.transverseBaseY = state[legId].transverseBaseY - action.payload[legId].transverseBaseY;
      //         
      //       // gather up latest coords for further computations
      //       let baseCoords = CU.aggregateCoords(state[legId], baseXY, cursorXY);
      //       
      //       // compensative computations from transverse coords for sagittal
      //       // transverseBaseX/Y => sagittalBaseX + sagittalCursorX
      //       if (baseXY.transverseBaseX || baseXY.transverseBaseY) {
      //         let result = CU.getTransverseBaseXYCompensativeCoords(baseCoords);
      //         // compare with the existing coords
      //         if (result.sagittalBaseX !== state[legId].sagittalBaseX) baseXY.sagittalBaseX = result.sagittalBaseX;
      //         if (result.sagittalCursorX !== state[legId].sagittalCursorX) baseXY.sagittalCursorX = result.sagittalCursorX;
      //       }
      //       // compensative computations from sagittal coords for transverse
      //       // sagittalBaseX => transverseBaseX + transverseBaseY
      //       else if (baseXY.sagittalBaseX) {
      //         let result = CU.getSagittalBaseXCompensativeCoords(baseCoords);
      //         // compare with the existing coords
      //         if (result.transverseBaseX !== state[legId].transverseBaseX) baseXY.transverseBaseX = result.transverseBaseX;
      //         if (result.transverseBaseY !== state[legId].transverseBaseY) baseXY.transverseBaseY = result.transverseBaseY;
      //       }
      //       
      //       newState[legId] = Object.assign({}, state[legId], cursorXY, baseXY);
      //     }
      //     
      //     return Object.assign({}, state, newState);
      //   }   
    }
    if ('coords' in action) {
      var stateChange = action['coords'];
      
      delete action['coords'];
      
      return stateChange;
    }
    return state;
  }  
}

// node environment export
try { module.exports = coordsReducer }
catch(e) {}