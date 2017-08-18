'use strict';

let coordsReducerInitState = {
  1: {
    legId: 1,
    // sagittalCursorX: 250,
    sagittalCursorY: 0,
    // sagittalBaseX: 100,
    sagittalBaseY: -30,
    transverseCursorX: 200,
    transverseCursorY: -250,
    transverseBaseX: 100,
    transverseBaseY: -150,
    side: 'left',
    row: 'front',
    offsetRotation: -45,
    logicOffsetRotation: 45
  },
  2: {
    legId: 2,
    // sagittalCursorX: 250,
    sagittalCursorY: 0,
    // sagittalBaseX: 100,
    sagittalBaseY: -30,
    transverseCursorX: 200,
    transverseCursorY: -250,
    transverseBaseX: 100,
    transverseBaseY: -150,
    side: 'right',
    row: 'front',
    offsetRotation: 45,
    logicOffsetRotation: 45
  },
  3: {
    legId: 3,
    // sagittalCursorX: 250,
    sagittalCursorY: 0,
    // sagittalBaseX: 100,
    sagittalBaseY: -30,
    transverseCursorX: 300,
    transverseCursorY: 0,
    transverseBaseX: 150,
    transverseBaseY: 0,
    side: 'left',
    row: 'middle',
    offsetRotation: 0,
    logicOffsetRotation: 0
  },
  4: {
    legId: 4,
    // sagittalCursorX: 250,
    sagittalCursorY: 0,
    // sagittalBaseX: 100,
    sagittalBaseY: -30,
    transverseCursorX: 300,
    transverseCursorY: 0,
    transverseBaseX: 150,
    transverseBaseY: 0,
    side: 'right',
    row: 'middle',
    offsetRotation: 0,
    logicOffsetRotation: 0
  },
  5: {
    legId: 5,
    // sagittalCursorX: 250,
    sagittalCursorY: 0,
    // sagittalBaseX: 100,
    sagittalBaseY: -30,
    transverseCursorX: 200,
    transverseCursorY: 250,
    transverseBaseX: 100,
    transverseBaseY: 150,
    side: 'left',
    row: 'back',
    offsetRotation: 45,
    logicOffsetRotation: -45
  },
  6: {
    legId: 6,
    // sagittalCursorX: 250,
    sagittalCursorY: 0,
    // sagittalBaseX: 100,
    sagittalBaseY: -30,
    transverseCursorX: 200,
    transverseCursorY: 250,
    transverseBaseX: 100,
    transverseBaseY: 150,
    side: 'right',
    row: 'back',
    offsetRotation: -45,
    logicOffsetRotation: -45
  }
};

// compute sagittalBaseX and sagittalCursorX coords
for (let key in coordsReducerInitState) {
  let result = RU.getTransverseBaseXYCompensativeCoords({
    tbx: coordsReducerInitState[key].transverseBaseX,
    tby: coordsReducerInitState[key].transverseBaseY,
    tcx: coordsReducerInitState[key].transverseCursorX,
    tcy: coordsReducerInitState[key].transverseCursorY
  });
  
  Object.assign(coordsReducerInitState[key], result);
}

const coordsReducer = (state = coordsReducerInitState, action) => {
  switch (action.type) {
    case "CURSOR_XY_CHANGED":
      {
        return Object.assign(
          {}, 
          state,
          { [action.legId]: Object.assign({}, state[action.legId], action.payload) }
        );
      }
    case "CURSOR_XY_SHIFTED":
      {
        // calc shifted coords
        let cursorXY = {};
        if (action.payload.sagittalCursorX)
          cursorXY.sagittalCursorX = state[action.legId].sagittalCursorX - action.payload.sagittalCursorX;
          
        if (action.payload.sagittalCursorY)
          cursorXY.sagittalCursorY = state[action.legId].sagittalCursorY - action.payload.sagittalCursorY;
          
        if (action.payload.transverseCursorX)
          cursorXY.transverseCursorX = state[action.legId].transverseCursorX - action.payload.transverseCursorX;
          
        if (action.payload.transverseCursorY)
          cursorXY.transverseCursorY = state[action.legId].transverseCursorY - action.payload.transverseCursorY;
        
        // gather up latest coords for further computations
        let coords = RU.aggregateCoords(state[action.legId], cursorXY);
        
        // compensative computations from transverse coords for sagittal
        // transverseCursorX/Y => sagittalCursorX
        if (cursorXY.transverseCursorX || cursorXY.transverseCursorY) {
          let result = RU.getTransverseBaseXYCompensativeCoords(coords);
          // compare with the existing coords
          if (result.sagittalCursorX !== state[action.legId].sagittalCursorX) cursorXY.sagittalCursorX = result.sagittalCursorX;
        }
        // compensative computations from sagittal coords for transverse
        // sagittalCursorX => transverseCursorX + transverseCursorY
        else if (cursorXY.sagittalCursorX) {
          let result = RU.getSagittalCursorXCompensativeCoords(coords);
          // compare with the existing coords
          if (result.transverseCursorX !== state[action.legId].transverseCursorX) cursorXY.transverseCursorX = result.transverseCursorX;
          if (result.transverseCursorY !== state[action.legId].transverseCursorY) cursorXY.transverseCursorY = result.transverseCursorY;
        }
        
        return Object.assign(
          {},
          state,
          { [action.legId]: Object.assign({}, state[action.legId], cursorXY) }
        );
      }
    case "BASE_XY_CHANGED":
      {
        return Object.assign(
          {},
          state,
          { [action.legId]: Object.assign({}, state[action.legId], action.payload) }
        );
      }
    case "BASE_XY_SHIFTED":
      {
        let baseXY = {};
        if (action.payload.sagittalBaseX)
          baseXY.sagittalBaseX = state[action.legId].sagittalBaseX - action.payload.sagittalBaseX;
          
        if (action.payload.sagittalBaseY)
          baseXY.sagittalBaseY = state[action.legId].sagittalBaseY - action.payload.sagittalBaseY;
          
        if (action.payload.transverseBaseX)
          baseXY.transverseBaseX = state[action.legId].transverseBaseX - action.payload.transverseBaseX;
          
        if (action.payload.transverseBaseY)
          baseXY.transverseBaseY = state[action.legId].transverseBaseY - action.payload.transverseBaseY;
        
        // gather up latest coords for further computations
        let coords = RU.aggregateCoords(state[action.legId], baseXY);
        
        // compensative computations from transverse coords for sagittal
        // transverseBaseX/Y => sagittalBaseX + sagittalCursorX
        if (baseXY.transverseBaseX || baseXY.transverseBaseY) {
          let result = RU.getTransverseBaseXYCompensativeCoords(coords);
          // compare with the existing coords
          if (result.sagittalBaseX !== state[action.legId].sagittalBaseX) baseXY.sagittalBaseX = result.sagittalBaseX;
          if (result.sagittalCursorX !== state[action.legId].sagittalCursorX) baseXY.sagittalCursorX = result.sagittalCursorX;
        }
        // compensative computations from sagittal coords for transverse
        // sagittalBaseX => transverseBaseX + transverseBaseY
        else if (baseXY.sagittalBaseX) {
          let result = RU.getSagittalBaseXCompensativeCoords(coords);
          // compare with the existing coords
          if (result.transverseBaseX !== state[action.legId].transverseBaseX) baseXY.transverseBaseX = result.transverseBaseX;
          if (result.transverseBaseY !== state[action.legId].transverseBaseY) baseXY.transverseBaseY = result.transverseBaseY;
        }
          
        return Object.assign(
          {},
          state,
          { [action.legId]: Object.assign({}, state[action.legId], baseXY) }
        );
      }
    case "SEQUENCE_SHIFTED_XY_BATCHED":
      {
        let newState = {};
        
        for (let legId in action.payload) {
          
          // cursorXY coords
          let cursorXY = {};
          if (action.payload[legId].sagittalCursorX)
            cursorXY.sagittalCursorX = state[legId].sagittalCursorX - action.payload[legId].sagittalCursorX;
            
          if (action.payload[legId].sagittalCursorY)
            cursorXY.sagittalCursorY = state[legId].sagittalCursorY - action.payload[legId].sagittalCursorY;
            
          if (action.payload[legId].transverseCursorX)
            cursorXY.transverseCursorX = state[legId].transverseCursorX - action.payload[legId].transverseCursorX;
            
          if (action.payload[legId].transverseCursorY)
            cursorXY.transverseCursorY = state[legId].transverseCursorY - action.payload[legId].transverseCursorY;
            
          // gather up latest coords for further computations
          let cursorCoords = RU.aggregateCoords(state[legId], cursorXY);
          
          // compensative computations from transverse coords for sagittal
          // transverseCursorX/Y => sagittalCursorX
          if (cursorXY.transverseCursorX || cursorXY.transverseCursorY) {
            let result = RU.getTransverseBaseXYCompensativeCoords(cursorCoords);
            // compare with the existing coords
            if (result.sagittalCursorX !== state[legId].sagittalCursorX) cursorXY.sagittalCursorX = result.sagittalCursorX;
          }
          // compensative computations from sagittal coords for transverse
          // sagittalCursorX => transverseCursorX + transverseCursorY
          else if (cursorXY.sagittalCursorX) {
            let result = RU.getSagittalCursorXCompensativeCoords(cursorCoords);
            // compare with the existing coords
            if (result.transverseCursorX !== state[legId].transverseCursorX) cursorXY.transverseCursorX = result.transverseCursorX;
            if (result.transverseCursorY !== state[legId].transverseCursorY) cursorXY.transverseCursorY = result.transverseCursorY;
          }
          
          
          // baseXY coords
          let baseXY = {};
          if (action.payload[legId].sagittalBaseX)
            baseXY.sagittalBaseX = state[legId].sagittalBaseX - action.payload[legId].sagittalBaseX;
            
          if (action.payload[legId].sagittalBaseY)
            baseXY.sagittalBaseY = state[legId].sagittalBaseY - action.payload[legId].sagittalBaseY;
            
          if (action.payload[legId].transverseBaseX)
            baseXY.transverseBaseX = state[legId].transverseBaseX - action.payload[legId].transverseBaseX;
            
          if (action.payload[legId].transverseBaseY)
            baseXY.transverseBaseY = state[legId].transverseBaseY - action.payload[legId].transverseBaseY;
            
          // gather up latest coords for further computations
          let baseCoords = RU.aggregateCoords(state[legId], baseXY, cursorXY);
          
          // compensative computations from transverse coords for sagittal
          // transverseBaseX/Y => sagittalBaseX + sagittalCursorX
          if (baseXY.transverseBaseX || baseXY.transverseBaseY) {
            let result = RU.getTransverseBaseXYCompensativeCoords(baseCoords);
            // compare with the existing coords
            if (result.sagittalBaseX !== state[legId].sagittalBaseX) baseXY.sagittalBaseX = result.sagittalBaseX;
            if (result.sagittalCursorX !== state[legId].sagittalCursorX) baseXY.sagittalCursorX = result.sagittalCursorX;
          }
          // compensative computations from sagittal coords for transverse
          // sagittalBaseX => transverseBaseX + transverseBaseY
          else if (baseXY.sagittalBaseX) {
            let result = RU.getSagittalBaseXCompensativeCoords(baseCoords);
            // compare with the existing coords
            if (result.transverseBaseX !== state[legId].transverseBaseX) baseXY.transverseBaseX = result.transverseBaseX;
            if (result.transverseBaseY !== state[legId].transverseBaseY) baseXY.transverseBaseY = result.transverseBaseY;
          }
          
          newState[legId] = Object.assign({}, state[legId], cursorXY, baseXY);
        }
        
        return Object.assign({}, state, newState);
      }
    case "APPLY_LEVEL_MODIFIER_TO_COORDS":
      {
        let newState = {};
        
        for (let i = 1; i <= 6; i++) {
          newState[i] = Object.assign({}, state[i], { sagittalBaseY: state[i].sagittalBaseY + action.payload });
        }
      
        return newState;
      }
    case "APPLY_SHIFT_MODIFIER_TO_COORDS":
      {
        let newState = {};
        
        for (let i = 1; i <= 6; i++) {
          
          let transverseBaseX;
          switch (state[i].side) {
            case 'left':
              transverseBaseX = state[i].transverseBaseX + action.payload.x; break;
            case 'right':
              transverseBaseX = state[i].transverseBaseX - action.payload.x; break;
          }
          
          let shiftedCoords = {
            transverseBaseX: transverseBaseX,
            transverseBaseY: state[i].transverseBaseY + action.payload.y
          };
          
          // compensative computation
          let coords = RU.aggregateCoords(state[i], shiftedCoords);
          let compensativeCoords = RU.getTransverseBaseXYCompensativeCoords(coords);
          
          if (compensativeCoords.sagittalBaseX !== state[i].sagittalBaseX) shiftedCoords.sagittalBaseX = compensativeCoords.sagittalBaseX;
          if (compensativeCoords.sagittalCursorX !== state[i].sagittalCursorX) shiftedCoords.sagittalCursorX = compensativeCoords.sagittalCursorX;
          
          newState[i] = Object.assign({}, state[i], shiftedCoords);
        }
        
        return newState;
      }
    case "APPLY_TILT_MODIFIER_TO_COORDS":
      {
        let distPct = 0.6666666666666666;
        
        let newState = {};
        
        for (let i = 1; i <= 6; i++) {
          let finalValue,
              side = state[i].side,
              row = state[i].row;
          
          switch(side) {
            case 'right':
              if (row === 'front') finalValue = action.payload.leftTiltModifier * distPct + action.payload.frontTiltModifier;
              if (row === 'middle') finalValue = action.payload.leftTiltModifier;
              if (row === 'back') finalValue = action.payload.leftTiltModifier * distPct + action.payload.backTiltModifier;
              break;
            case 'left':
              if (row === 'front') finalValue = action.payload.rightTiltModifier * distPct + action.payload.frontTiltModifier;
              if (row === 'middle') finalValue = action.payload.rightTiltModifier;
              if (row === 'back') finalValue = action.payload.rightTiltModifier * distPct + action.payload.backTiltModifier;
              break;
          }
          newState[i] = Object.assign({}, state[i], { sagittalBaseY: state[i].sagittalBaseY - finalValue });
        }        
        return newState;
      }
    case "APPLY_ROTATION_MODIFIER_TO_COORDS":
      {
        let baseCenterCoords = RU.getBaseCenter(state);
        
        let newState = {};
        
        for (let i = 1; i <= 6; i++) {
          let rotatedCoords = RU.getRotatedCoords(baseCenterCoords, action.payload.rotation, state[i]);
          
          let finalCoords = {
            transverseBaseX: rotatedCoords.x,
            transverseBaseY: rotatedCoords.y
          }
          
          // gather up latest coords for further computations
          let coords = RU.aggregateCoords(state[i], finalCoords);
          let compensativeCoords = RU.getTransverseBaseXYCompensativeCoords(coords);
          // compare with the existing coords
          if (compensativeCoords.sagittalBaseX !== state[i].sagittalBaseX) finalCoords.sagittalBaseX = compensativeCoords.sagittalBaseX;
          if (compensativeCoords.sagittalCursorX !== state[i].sagittalCursorX) finalCoords.sagittalCursorX = compensativeCoords.sagittalCursorX;
          
          newState[i] = Object.assign({}, state[i], finalCoords);
        }
        
        return newState;
      }    
  }
  return state;
}