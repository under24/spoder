'use strict';

const { combineReducers, createStore } = Redux;

const modifierReducer = combineReducers({
  level: levelReducer,
  tilt: tiltReducer,
  shift: shiftReducer,
  rotation: rotationReducer
});

const movementReducer = combineReducers({
  direction: movementDirectionReducer,
  pointers: movementPointerReducer,
  circles: movementCircleReducer,
  status: movementStatusReducer,
  sequence: sequenceReducer,
  sequenceProgress: sequenceProgressReducer,
  sequenceMetaData: sequenceMetaDataReducer,
  turn: movementTurnReducer
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
  movement: movementReducer,
  gaits: gaitReducer,
  baseDirection: baseDirectionReducer,
  baseCoxaPosition: baseCoxaPositionReducer
});

const store = createStore(
  reducers, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const ReduxMixin = PolymerRedux(store);
