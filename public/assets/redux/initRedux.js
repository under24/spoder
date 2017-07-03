'use strict';

const { combineReducers, createStore} = Redux;

const modifierReducer = combineReducers({
  level: levelReducer,
  tilt: tiltReducer,
  shift: shiftReducer,
  rotation: rotationReducer
});

const reducers = combineReducers({
  legs: legReducer,
  metaData: metaDataReducer,
  views: viewsReducer,
  modifiers: modifierReducer,
  coords: coordsReducer
});

const store = createStore(
  reducers, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const ReduxMixin = PolymerRedux(store);