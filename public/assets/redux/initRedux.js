'use strict';

const { combineReducers, createStore } = Redux;

const modifierReducer = combineReducers({
  level: levelReducer,
  tilt: tiltReducer,
  shift: shiftReducer,
  rotation: rotationReducer
});

const movementReducer = combineReducers({
  directionJoystick: movementDirectionJoystickReducer,
  turnJoystick: movementTurnJoystickReducer,
  pointers: movementPointerReducer,
  circles: movementCircleReducer,
  // status: movementStatusReducer,
  // sequence: sequenceReducer,
  sequenceProgress: sequenceProgressReducer,
  settings: movementSettingsReducer,
  iteration: movementInterationReducer
});

const baseReducer = combineReducers({
  direction: baseDirectionReducer,
  centerCoords: baseCenterCoordsReducer,
  coxaAttachmentAngle: baseCoxaAttachmentAngleReducer
});

const viewSettingsReducer = combineReducers({
  sagittalView: viewSettingsSagittalReducer,
  transverseView: viewSettingsTransverseReducer
});

const reducers = combineReducers({
  legs: legReducer,
  angles: angleReducer,
  metaData: metaDataReducer,
  viewSettings: viewSettingsReducer,
  modifiers: modifierReducer,
  coords: coordsReducer,
  misc: miscReducer,
  viewOffsets: viewOffsetsReducer,
  movement: movementReducer,
  gaits: gaitReducer,
  base: baseReducer
});

const store = createStore(
  reducers, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const ReduxMixin = PolymerRedux(store);
