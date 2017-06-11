'use strict';

const { combineReducers, createStore} = Redux;

const reducers = combineReducers({
  legs: legReducer,
  metaData: metaDataReducer,
  views: viewsReducer,
  modifiers: modifiersReducer,
  coords: coordsReducer
});

const store = createStore(
  reducers, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const ReduxMixin = PolymerRedux(store);