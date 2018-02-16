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
  
  let logicReducers = store => next => action => {
    // initialize newState which will hold updated state data
    var newState = {};
    
    // check if the action is an array
    if (Array.isArray(action)) {
      // iterate array of actions
      action.forEach(action => processAction(action));
    }
    // action is single (object)
    else
      // reduce action into newState
      processAction(action);
      
      
    if (action.type === "LEVEL_MODIFIER_CHANGED") {
      next(newState);
      return;
    }
    
    next(action);
    
    // ----------------------------------------------
    
    function processAction(action) {
      switch (action.type) {
        case "LEVEL_MODIFIER_CHANGED":
          modifierModule.processLevelModifier(action, newState); break;
        // case "ROTATION_MODIFIER_CHANGED":
        //   modifierModule.processRotationModifier(action, newState); break;
      }
    }
  }
  
  let cascadeModules = store => next => newState => {
    coordsModule.process(newState);
    // anglesModule.input(newState);
    
    next(newState);
  }

  var store = createStore(
    reducers,
    applyMiddleware(
      logicReducers,
      cascadeModules
    )
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  
  // init logic reducers
  let modifierLogicReducer = new ModifierLogicReducer(store);
  
  // init cascade modules
  let coordsCascadeModule = new CoordsCascadeModule(store);
  // var anglesModule = new AngleCascadeModule(store);


  var ReduxMixin = PolymerRedux(store);  
}