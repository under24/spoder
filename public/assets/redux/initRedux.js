'use strict';

{
  let { combineReducers, createStore, applyMiddleware } = Redux;

  let baseReducer = combineReducers({
    centerCoords: baseCenterCoordsReducer,
    coxaAttachmentAngles: baseCoxaAttachmentAnglesReducer,
    direction: baseDirectionReducer
  });

  let modifierReducer = combineReducers({
    level: levelReducer,
    rotation: rotationReducer,
    shift: shiftReducer,
    tilt: tiltReducer
  });

  let movementReducer = combineReducers({
    circles: movementCircleReducer,
    directionJoystick: movementDirectionJoystickReducer,
    iteration: movementInterationReducer,
    pointers: movementPointerReducer,
    settings: movementSettingsReducer,
    turnJoystick: movementTurnJoystickReducer
  });

  let statusReducer = combineReducers({
    arduino: arduinoReducer,
    joystick: joystickReducer,
    socket: socketReducer
  });

  let viewSettingsReducer = combineReducers({
    coronalView: viewSettingsCoronalViewReducer,
    relativeSagittalView: viewSettingsRelativeSagittalViewReducer,
    transverseView: viewSettingsTransverseViewReducer,
    relativeTransverseView: viewSettingsRelativeTransverseViewReducer
  });

  let reducers = combineReducers({
    angles: angleReducer,
    base: baseReducer,
    coords: coordsReducer,
    gaits: gaitReducer,
    legs: legReducer,
    metaData: metaDataReducer,
    misc: miscReducer,
    modifiers: modifierReducer,
    movement: movementReducer,
    status: statusReducer,
    viewOffsets: viewOffsetsReducer,
    viewSettings: viewSettingsReducer
  });

  // const logger = store => next => action => {
  //   console.group(action.type);
  //   console.info('dispatching', action);
  //   let result = next(action);
  //   console.log('next state', store.getState());
  //   console.groupEnd(action.type);
  //   return result;
  // 
  //   return action;
  // }
  
  var logicReducers = store => next => action => {
    
    // catch action -> generate new branch for the state
    
    switch (action.type) {
      case "LEVEL_MODIFIER_CHANGED":
        action = modifierModule.processLevelModifier(action); break;
      case "ROTATION_MODIFIER_CHANGED":
        action = modifierModule.processRotationModifier(action); break;
    }
    
    next(action);
  }
  
  var cascade = store => next => action => {
    
    // observe new state branches and react to the changes
    // by generating new branches
    // and propagate further
    
    debugger;
    
    coordsModule.input(action);
    anglesModule.input(action);
  
    next(action);
  }

  var store = createStore(
    reducers,
    // applyMiddleware(
    //   // logger,
    //   logicReducers,
    //   cascade
    // )
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  
  var modifierModule = new ModifierLogicReducer(store);
  
  var coordsModule = new CoordsCascadeModule(store);
  var anglesModule = new AngleCascadeModule(store);


  var ReduxMixin = PolymerRedux(store);  
}