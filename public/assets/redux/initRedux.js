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
        // @modifierLogicReducer
    if (action.type === "LEVEL_MODIFIER_CHANGED" ||
        action.type === "ROTATION_MODIFIER_CHANGED" ||
        action.type === "SHIFT_MODIFIER_CHANGED" ||
        action.type === "TILT_MODIFIER_CHANGED" ||
        // @coordsLogicReducer
        action.type === "CURSOR_XY_SHIFTED" ||
        action.type === "BASE_XY_SHIFTED" ||
        action.type === "SEQUENCE_SHIFTED_XY_BATCHED") {
          
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
      // @handle "LEVEL_MODIFIER_CHANGED" -> "modifiers.level"
      // @handle "ROTATION_MODIFIER_CHANGED" -> "modifiers.ratation"
      // @handle "SHIFT_MODIFIER_CHANGED" -> "modifiers.shift"
      // @handle "TILT_MODIFIER_CHANGED" -> "modifiers.tilt"
      modifierLogicReducer.processAction(action, newState);
      // @handle "CURSOR_XY_SHIFTED" -> "coords"
      // @handle "BASE_XY_SHIFTED" -> "coords"
      // @handle "SEQUENCE_SHIFTED_XY_BATCHED" -> "coords", "movement.iteration":(currentTick, currentTickPct), "viewOffsets"
      coordsLogicReducer.processAction(action, newState);
    }
  }
  
  let cascadeModules = store => next => newState => {
    // @observe "modifiers.level" -> "coords"
    // @observe "modifiers.rotation" -> "coords"
    // @observe "modifiers.shift" -> "coords"
    // @observe "modifiers.tilt" -> "coords"
    coordsCascadeModule.processState(newState);
    // anglesCascadeModule.processState(newState);
    // @observe "coords" -> "base.centerCoords"
    // @observe "coords" + "base.centerCoords" -> "base.direction"
    baseCascadeModule.processState(newState);
    
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
  let coordsLogicReducer = new CoordsLogicReducer(store);
  
  // init cascade modules
  let coordsCascadeModule = new CoordsCascadeModule(store);
  // var anglesCascadeModule = new AngleCascadeModule(store);
  let baseCascadeModule = new BaseCascadeModule(store);


  var ReduxMixin = PolymerRedux(store);  
}