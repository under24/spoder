'use strict';

let coordsReducerInitState = {
  1: {
    legId: 1,
    // sagittalCursorX: 250,
    sagittalCursorY: 280,
    // sagittalBaseX: 100,
    sagittalBaseY: 250,
    transverseCursorX: 200,
    transverseCursorY: -250,
    transverseBaseX: 100,
    transverseBaseY: -150,
    side: 'left',
    row: 'front',
    transverseViewOffsetY: 400,
    transverseViewOffsetX: 0,
    offsetRotation: -45
  },
  2: {
    legId: 2,
    // sagittalCursorX: 250,
    sagittalCursorY: 280,
    // sagittalBaseX: 100,
    sagittalBaseY: 250,
    transverseCursorX: 200,
    transverseCursorY: -250,
    transverseBaseX: 100,
    transverseBaseY: -150,
    side: 'right',
    row: 'front',
    transverseViewOffsetY: 400,
    transverseViewOffsetX: 0,
    offsetRotation: 45
  },
  3: {
    legId: 3,
    // sagittalCursorX: 250,
    sagittalCursorY: 280,
    // sagittalBaseX: 100,
    sagittalBaseY: 250,
    transverseCursorX: 300,
    transverseCursorY: 0,
    transverseBaseX: 150,
    transverseBaseY: 0,
    side: 'left',
    row: 'middle',
    transverseViewOffsetY: 250,
    transverseViewOffsetX: 0,
    offsetRotation: 0
  },
  4: {
    legId: 4,
    // sagittalCursorX: 250,
    sagittalCursorY: 280,
    // sagittalBaseX: 100,
    sagittalBaseY: 250,
    transverseCursorX: 300,
    transverseCursorY: 0,
    transverseBaseX: 150,
    transverseBaseY: 0,
    side: 'right',
    row: 'middle',
    transverseViewOffsetY: 250,
    transverseViewOffsetX: 0,
    offsetRotation: 0
  },
  5: {
    legId: 5,
    // sagittalCursorX: 250,
    sagittalCursorY: 280,
    // sagittalBaseX: 100,
    sagittalBaseY: 250,
    transverseCursorX: 200,
    transverseCursorY: 250,
    transverseBaseX: 100,
    transverseBaseY: 150,
    side: 'left',
    row: 'back',
    transverseViewOffsetY: 100,
    transverseViewOffsetX: 0,
    offsetRotation: 45
  },
  6: {
    legId: 6,
    // sagittalCursorX: 250,
    sagittalCursorY: 280,
    // sagittalBaseX: 100,
    sagittalBaseY: 250,
    transverseCursorX: 200,
    transverseCursorY: 250,
    transverseBaseX: 100,
    transverseBaseY: 150,
    side: 'right',
    row: 'back',
    transverseViewOffsetY: 100,
    transverseViewOffsetX: 0,
    offsetRotation: -45
  }
};

// compute sagittalBaseX and sagittalCursorX coords
for (let key in coordsReducerInitState) {
  let result = reduxUtils.getCompensativeCoords({
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
        
        // compensative computations
        // transverseCursorX/Y => sagittalBaseX + sagittalCursorX
        if (cursorXY.transverseCursorX || cursorXY.transverseCursorY) {
          let coords = {
            tcx: cursorXY.transverseCursorX || state[action.legId].transverseCursorX,
            tcy: cursorXY.transverseCursorY || state[action.legId].transverseCursorY,

            tbx: state[action.legId].transverseBaseX,
            tby: state[action.legId].transverseBaseY
          }
          let result = reduxUtils.getCompensativeCoords(coords);
          
          if (result.sagittalBaseX !== state[action.legId].sagittalBaseX) cursorXY.sagittalBaseX = result.sagittalBaseX;
          if (result.sagittalCursorX !== state[action.legId].sagittalCursorX) cursorXY.sagittalCursorX = result.sagittalCursorX;
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
        
        // compensative computations
        // transverseBaseX/Y => sagittalBaseX + sagittalCursorX
        if (baseXY.transverseBaseX || baseXY.transverseBaseY) {
          let coords = {
            tbx: baseXY.transverseBaseX || state[action.legId].transverseBaseX,
            tby: baseXY.transverseBaseY || state[action.legId].transverseBaseY,

            tcx: state[action.legId].transverseCursorX,
            tcy: state[action.legId].transverseCursorY
          }
          let result = reduxUtils.getCompensativeCoords(coords);
          
          if (result.sagittalBaseX !== state[action.legId].sagittalBaseX) baseXY.sagittalBaseX = result.sagittalBaseX;
          if (result.sagittalCursorX !== state[action.legId].sagittalCursorX) baseXY.sagittalCursorX = result.sagittalCursorX;
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
        let newState = {};
        for (let i = 1; i <= 6; i++) {
          
          // LEFT SIDE LEGS
          if (state[i].side === 'left') {
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
          
          // RIGHT SIDE LEGS
          if (state[i].side === 'right') {
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