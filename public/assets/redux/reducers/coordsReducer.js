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
    transverseViewOffsetY: 400,
    transverseViewOffsetX: 0,
    sagittalViewOffsetY: 280,
    sagittalViewOffsetX: 0,
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
    transverseViewOffsetY: 400,
    transverseViewOffsetX: 0,
    sagittalViewOffsetY: 280,
    sagittalViewOffsetX: 0,
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
    transverseViewOffsetY: 250,
    transverseViewOffsetX: 0,
    sagittalViewOffsetY: 280,
    sagittalViewOffsetX: 0,
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
    transverseViewOffsetY: 250,
    transverseViewOffsetX: 0,
    sagittalViewOffsetY: 280,
    sagittalViewOffsetX: 0,
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
    transverseViewOffsetY: 100,
    transverseViewOffsetX: 0,
    sagittalViewOffsetY: 280,
    sagittalViewOffsetX: 0,
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
    transverseViewOffsetY: 100,
    transverseViewOffsetX: 0,
    sagittalViewOffsetY: 280,
    sagittalViewOffsetX: 0,
    offsetRotation: -45,
    logicOffsetRotation: -45
  }
};

// compute sagittalBaseX and sagittalCursorX coords
for (let key in coordsReducerInitState) {
  let result = ReduxUtils.getTransverseBaseXYCompensativeCoords({
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
      return Object.assign(
        {}, 
        state,
        { [action.legId]: Object.assign({}, state[action.legId], action.payload) }
      );
    case "CURSOR_XY_SHIFTED":
      {
        // calc shifted coords
        let cursorXY = {};
        if (action.payload.sagittalCursorX) {
          cursorXY.sagittalCursorX = state[action.legId].sagittalCursorX - action.payload.sagittalCursorX;
        }
        if (action.payload.sagittalCursorY) {
          cursorXY.sagittalCursorY = state[action.legId].sagittalCursorY - action.payload.sagittalCursorY;
        }
        if (action.payload.transverseCursorX) {
          cursorXY.transverseCursorX = state[action.legId].transverseCursorX - action.payload.transverseCursorX;
        }
        if (action.payload.transverseCursorY) {
          cursorXY.transverseCursorY = state[action.legId].transverseCursorY - action.payload.transverseCursorY;
        }
        
        // gather up latest coords for further computations
        let coords = ReduxUtils.aggregateCoords(cursorXY, state[action.legId]);
        
        // compensative computations from transverse coords
        // transverseCursorX/Y => sagittalCursorX
        if (cursorXY.transverseCursorX || cursorXY.transverseCursorY) {
          let result = ReduxUtils.getTransverseBaseXYCompensativeCoords(coords);
          // compare with the existing coords
          if (result.sagittalCursorX !== state[action.legId].sagittalCursorX) cursorXY.sagittalCursorX = result.sagittalCursorX;
        }
        // compensative computations from sagittal coords
        // sagittalCursorX => transverseCursorX + transverseCursorY
        else if (cursorXY.sagittalCursorX) {
          let result = ReduxUtils.getSagittalCursorXCompensativeCoords(coords);
          // compare with the existing coords
          if (result.transverseCursorX !== state[action.legId].transverseCursorX) cursorXY.transverseCursorX = result.transverseCursorX;
          if (result.transverseCursorY !== state[action.legId].transverseCursorY) cursorXY.transverseCursorY = result.transverseCursorY;
        }
        
        return Object.assign(
          {},
          state,
          { [action.legId]: Object.assign({}, state[action.legId], cursorXY)}
        );
      }
    case 'BASE_XY_CHANGED':
      return Object.assign(
        {},
        state,
        { [action.legId]: Object.assign({}, state[action.legId], action.payload) }
      );
    case 'BASE_XY_SHIFTED':
      {
        let baseXY = {};
        if (action.payload.sagittalBaseX) {
          baseXY.sagittalBaseX = state[action.legId].sagittalBaseX - action.payload.sagittalBaseX;
        }
        if (action.payload.sagittalBaseY) {
          baseXY.sagittalBaseY = state[action.legId].sagittalBaseY - action.payload.sagittalBaseY;
        }
        if (action.payload.transverseBaseX) {
          baseXY.transverseBaseX = state[action.legId].transverseBaseX - action.payload.transverseBaseX;
        }
        if (action.payload.transverseBaseY) {
          baseXY.transverseBaseY = state[action.legId].transverseBaseY - action.payload.transverseBaseY;
        }
        
        // gather up latest coords for further computations
        let coords = ReduxUtils.aggregateCoords(baseXY, state[action.legId]);
        
        // compensative computations
        // transverseBaseX/Y => sagittalBaseX + sagittalCursorX
        if (baseXY.transverseBaseX || baseXY.transverseBaseY) {
          let result = ReduxUtils.getTransverseBaseXYCompensativeCoords(coords);
          // compare with the existing coords
          if (result.sagittalBaseX !== state[action.legId].sagittalBaseX) baseXY.sagittalBaseX = result.sagittalBaseX;
          if (result.sagittalCursorX !== state[action.legId].sagittalCursorX) baseXY.sagittalCursorX = result.sagittalCursorX;
        }
        // compensative computations
        // sagittalBaseX => transverseBaseX + transverseBaseY
        else if (baseXY.sagittalBaseX) {
          let result = ReduxUtils.getSagittalBaseXCompensativeCoords(coords);
          // compare with the existing coords
          if (result.transverseBaseX !== state[action.legId].transverseBaseX) baseXY.transverseBaseX = result.transverseBaseX;
          if (result.transverseBaseY !== state[action.legId].transverseBaseY) baseXY.transverseBaseY = result.transverseBaseY;
        }
          
        return Object.assign(
          {},
          state,
          { [action.legId]: Object.assign({}, state[action.legId], baseXY)}
        );
      }
    case 'BASE_Y_LEVEL_MODIFIER_CHANGE_RECALC_BASE_Y':
      {
        let newState = {};
        for (let i = 1; i <= 6; i++) {
          newState[i] = Object.assign({}, state[i], {sagittalBaseY: state[i].sagittalBaseY + action.payload});
        }
      
        return newState;
      }
    case "BASE_Y_TILT_MODIFIER_CHANGE_RECALC_BASE_Y":
      {
        if (action.payload.leftTiltModifier !== 0 || action.payload.rightTiltModifier !== 0) {
          ReduxUtils.getTemp(action.payload, state);
        }
        
        let newState = {};
        for (let i = 1; i <= 6; i++) {
          
          // RIGHT SIDE LEGS
          if (state[i].side === 'right') {
            let finalModifierValue = action.payload.leftTiltModifier;
            // FRONT LEGS
            if (state[i].row === 'front') {
              finalModifierValue += action.payload.frontTiltModifier;
            }
            // BACK LEGS
            if (state[i].row === 'back') {
              finalModifierValue += action.payload.backTiltModifier;
            }
            newState[i] = Object.assign({}, state[i], {sagittalBaseY: state[i].sagittalBaseY - finalModifierValue});
          }
          
          // LEFT SIDE LEGS
          if (state[i].side === 'left') {
            let finalModifierValue = action.payload.rightTiltModifier;
            // FRONT LEGS
            if (state[i].row === 'front') {
              finalModifierValue += action.payload.frontTiltModifier;
            }
            // BACK LEGS
            if (state[i].row === 'back') {
              finalModifierValue += action.payload.backTiltModifier;
            }
            newState[i] = Object.assign({}, state[i], {sagittalBaseY: state[i].sagittalBaseY - finalModifierValue});
          }
          
        }        
        return newState;
      }
  }
  return state;
}