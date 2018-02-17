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
    
    if (action.type === "LEVEL_MODIFIER_CHANGED" ||
        action.type === "ROTATION_MODIFIER_CHANGED" ||
        action.type === "SHIFT_MODIFIER_CHANGED" ||
        action.type === "TILT_MODIFIER_CHANGED") {
          
      // initialize newState which will hold updated state data
      var newState = {};
      
      // check if the action is an array
      if (Array.isArray(action)) {
        // iterate array of actions
        action.forEach(processAction);
      }
      // action is single (object)
      else
        // reduce action into newState
        processAction(action);
        
      next(newState);
      return;
    }
    
    next(action);
    
    // ----------------------------------------------
    
    function processAction(action) {
      // @handle "LEVEL_MODIFIER_CHANGED"
      // @handle "ROTATION_MODIFIER_CHANGED"
      // @handle "SHIFT_MODIFIER_CHANGED"
      // @handle "TILT_MODIFIER_CHANGED"
      modifierLogicReducer.processAction(action, newState);
    }
  }
  
  let cascadeModules = store => next => newState => {
    // @observe "modifiers.level"
    // @observe "modifiers.rotation"
    // @observe "modifiers.shift"
    // @observe "modifiers.tilt"
    coordsCascadeModule.processState(newState);
    // anglesCascadeModule.processState(newState);
    
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
  // var anglesCascadeModule = new AngleCascadeModule(store);


  var ReduxMixin = PolymerRedux(store);  
}