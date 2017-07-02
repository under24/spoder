'use strict';

let coordsInitState = {
  1: {
    legId: 1,
    sagittalCursorX: 250,
    sagittalCursorY: 280,
    sagittalBaseX: 100,
    sagittalBaseY: 250,
    transverseCursorX: 250,
    transverseCursorY: 280,
    transverseBaseX: 100,
    transverseBaseY: -150,
    side: 'left',
    screenSide: 'right',
    row: 'front'
  },
  2: {
    legId: 2,
    sagittalCursorX: 250,
    sagittalCursorY: 280,
    sagittalBaseX: 100,
    sagittalBaseY: 250,
    transverseCursorX: 350,
    transverseCursorY: 150,
    transverseBaseX: 100,
    transverseBaseY: -150,
    side: 'right',
    screenSide: 'left',
    row: 'front'
  },
  3: {
    legId: 3,
    sagittalCursorX: 250,
    sagittalCursorY: 280,
    sagittalBaseX: 100,
    sagittalBaseY: 250,
    transverseCursorX: 350,
    transverseCursorY: 150,
    transverseBaseX: 150,
    transverseBaseY: 0,
    side: 'left',
    screenSide: 'right',
    row: 'middle'
  },
  4: {
    legId: 4,
    sagittalCursorX: 250,
    sagittalCursorY: 280,
    sagittalBaseX: 100,
    sagittalBaseY: 250,
    transverseCursorX: 350,
    transverseCursorY: 150,
    transverseBaseX: 150,
    transverseBaseY: 0,
    side: 'right',
    screenSide: 'left',
    row: 'middle'
  },
  5: {
    legId: 5,
    sagittalCursorX: 250,
    sagittalCursorY: 280,
    sagittalBaseX: 100,
    sagittalBaseY: 250,
    transverseCursorX: 350,
    transverseCursorY: 150,
    transverseBaseX: 100,
    transverseBaseY: 150,
    side: 'left',
    screenSide: 'right',
    row: 'back'
  },
  6: {
    legId: 6,
    sagittalCursorX: 250,
    sagittalCursorY: 280,
    sagittalBaseX: 100,
    sagittalBaseY: 250,
    transverseCursorX: 350,
    transverseCursorY: 150,
    transverseBaseX: 100,
    transverseBaseY: 150,
    side: 'right',
    screenSide: 'left',
    row: 'back'
  },
};

const coordsReducer = (state = coordsInitState, action) => {
  switch (action.type) {
    case "CURSOR_XY_CHANGED":
      return Object.assign(
        {}, 
        state,
        { [action.legId]: Object.assign({}, state[action.legId], action.payload) }
      );
    case "CURSOR_XY_SHIFTED":
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
      
      return Object.assign(
        {},
        state,
        { [action.legId]: Object.assign({}, state[action.legId], cursorXY)}
      );
    case 'BASE_XY_CHANGED':
      return Object.assign(
        {},
        state,
        { [action.legId]: Object.assign({}, state[action.legId], action.payload) }
      );
    case 'BASE_XY_SHIFTED':
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

      return Object.assign(
        {},
        state,
        { [action.legId]: Object.assign({}, state[action.legId], baseXY)}
      );
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