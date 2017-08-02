'use strict';

const { combineReducers, createStore } = Redux;

const modifierReducer = combineReducers({
  level: levelReducer,
  tilt: tiltReducer,
  shift: shiftReducer,
  rotation: rotationReducer
});

const animationReducer = combineReducers({
  joystick: animationJoystickReducer,
  pointers: animationPointerReducer,
  circles: animationCircleReducer
});

const reducers = combineReducers({
  legs: legReducer,
  angles: angleReducer,
  metaData: metaDataReducer,
  views: viewReducer,
  modifiers: modifierReducer,
  coords: coordsReducer,
  misc: miscReducer,
  viewOffsets: viewOffsetsReducer,
  animation: animationReducer
});

const store = createStore(
  reducers, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const ReduxMixin = PolymerRedux(store);
