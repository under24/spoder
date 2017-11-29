'use strict';

const { combineReducers, createStore } = Redux;

const baseReducer = combineReducers({
  centerCoords: baseCenterCoordsReducer,
  coxaAttachmentAngle: baseCoxaAttachmentAngleReducer,
  direction: baseDirectionReducer
});

const modifierReducer = combineReducers({
  level: levelReducer,
  rotation: rotationReducer,
  shift: shiftReducer,
  tilt: tiltReducer
});

const movementReducer = combineReducers({
  circles: movementCircleReducer,
  directionJoystick: movementDirectionJoystickReducer,
  iteration: movementInterationReducer,
  pointers: movementPointerReducer,
  settings: movementSettingsReducer,
  turnJoystick: movementTurnJoystickReducer
});

const viewSettingsReducer = combineReducers({
  transverseView: viewSettingsTransverseReducer,
  sagittalView: viewSettingsSagittalReducer
});

const reducers = combineReducers({
  angles: angleReducer,
  base: baseReducer,
  coords: coordsReducer,
  gaits: gaitReducer,
  legs: legReducer,
  metaData: metaDataReducer,
  misc: miscReducer,
  modifiers: modifierReducer,
  movement: movementReducer,
  viewOffsets: viewOffsetsReducer,
  viewSettings: viewSettingsReducer
});

const store = createStore(
  reducers, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const ReduxMixin = PolymerRedux(store);