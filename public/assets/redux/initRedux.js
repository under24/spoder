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
  
  let movementInterationReducer = combineReducers({
    blueprint: movementIterationBlueprintReducer,
    transition: movementIterationTransitionReducer,
    properties: movementIterationPropertiesReducer
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
    socket: socketReducer,
    privileges: privilegeReducer
  });

  let viewSettingsReducer = combineReducers({
    coronalView: viewSettingsCoronalViewReducer,
    relativeSagittalView: viewSettingsRelativeSagittalViewReducer,
    transverseView: viewSettingsTransverseViewReducer,
    relativeTransverseView: viewSettingsRelativeTransverseViewReducer
  });

  let rootReducer = combineReducers({
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
    if (Array.isArray(action) === true ||
        // @modifierLogicReducer
        action.type === "LEVEL_MODIFIER_CHANGED" ||
        action.type === "ROTATION_MODIFIER_CHANGED" ||
        action.type === "SHIFT_MODIFIER_CHANGED" ||
        action.type === "TILT_MODIFIER_CHANGED" ||
        // @coordsLogicReducer
        action.type === "CURSOR_XY_SHIFTED" ||
        action.type === "BASE_XY_SHIFTED" ||
        action.type === "SEQUENCE_SHIFTED_XY_BATCHED" ||
        action.type === "INIT_STATE_DATA" ||
        // @movementTurnJoystickLogicReducer
        action.type === "MOVEMENT_TURN_JOYSTICK_VALUES_CHANGED" ||
        // @movementDirectionJoystickLogicReducer
        action.type === "MOVEMENT_DIRECTION_JOYSTICK_VALUES_CHANGED" ||
        // @movementIterationPropertiesLogicReducer
        action.type === "MOVEMENT_ITERATION_PROPERTIES_CHANGED" ||
        // @movementSettingsLogicReducer
        action.type === "MOVEMENT_SETTINGS_CHANGED") {
          
      // initialize newState which will hold updated state data
      var newState = {};
      
      // check if the action is an array
      if (Array.isArray(action))
        // iterate array of actions
        action.forEach(processAction);
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
      // @handle "LEVEL_MODIFIER_CHANGED"                                         -> "modifiers.level"
      // @handle "ROTATION_MODIFIER_CHANGED"                                      -> "modifiers.ratation"
      // @handle "SHIFT_MODIFIER_CHANGED"                                         -> "modifiers.shift"
      // @handle "TILT_MODIFIER_CHANGED"                                          -> "modifiers.tilt"
      modifierLogicReducer.processAction(action, newState);
      // @handle "CURSOR_XY_SHIFTED"                                              -> "coords"
      // @handle "BASE_XY_SHIFTED"                                                -> "coords"
      // @handle "SEQUENCE_SHIFTED_XY_BATCHED"                                    -> "coords"
      //                                                                             "movement.iteration.properties"(currentTick, currentTickPct)
      //                                                                             "viewOffsets"
      // @handle "INIT_STATE_DATA"                                                -> "coords"
      coordsLogicReducer.processAction(action, newState);
      // @handle "MOVEMENT_TURN_JOYSTICK_VALUES_CHANGED"                          -> "movement.turnJoystick"
      movementTurnJoystickLogicReducer.processAction(action, newState);
      // @handle "MOVEMENT_DIRECTION_JOYSTICK_VALUES_CHANGED"                     -> "movement.directionJoystick"
      movementDirectionJoystickLogicReducer.processAction(action, newState);
      // @handle "MOVEMENT_ITERATION_PROPERTIES_CHANGED"                          -> "movement.iteration.properties"
      movementIterationPropertiesLogicReducer.processAction(action, newState);
      // @handle "MOVEMENT_SETTINGS_CHANGED"                                      -> "movement.settings"
      movementSettingsLogicReducer.processAction(action, newState);
    }
  }
  
  let cascadeModules = store => next => newState => {
    // @observe "modifiers.level"                                                 -> "coords"
    // @observe "modifiers.rotation"                                              -> "coords"
    // @observe "modifiers.shift"                                                 -> "coords"
    // @observe "modifiers.tilt"                                                  -> "coords"
    coordsCascadeModule.processState(newState);
    // @observe "coords"                                                          -> "base.centerCoords"
    // @observe "coords"
    //          "base.centerCoords"                                               -> "base.direction"
    baseCascadeModule.processState(newState);
    // @observe "coords"                                                          -> "angles"
    anglesCascadeModule.processState(newState);
    // @observe "coords"                                                          -> "misc"
    miscCascadeModule.processState(newState);
    // @observe "coords"                                                          -> "movement.circles" 
    // @observe "movement.turnJoystick"                                           -> "movement.circles"
    movementCirclesCascadeModule.processState(newState);
    // @observe "movement.circles"
    //          "movement.directionJoystick"                                      -> "movement.pointers"
    movementPointersCascadeModule.processState(newState);
    // @observe "movement.settings :tps :duration :gait :sequencerMode"
    //          "movement.iteration.properties :currentTick"                      -> "movement.iteration.properties"
    movementIterationPropertiesCascadeModule.processState(newState);
    // @observe "movement.iteration.properties :currentTick"                      -> "movement.iteration.transition"
    // @observe "movement.turnJoystick"
    //          "movement.directionJoystick"                                      -> "movement.iteration.transition"
    movementIterationTransitionCascadeModule.processState(newState);
    next(newState);
  }
  
  var store = createStore(
    rootReducer,
    applyMiddleware(
      logicReducers,
      cascadeModules
    )
  );
  
  // init logic reducers
  let modifierLogicReducer = new ModifierLogicReducer(store),
      coordsLogicReducer = new CoordsLogicReducer(store),
      movementDirectionJoystickLogicReducer = new MovementDirectionJoystickLogicReducer(store),
      movementTurnJoystickLogicReducer = new MovementTurnJoystickLogicReducer(store),
      movementIterationPropertiesLogicReducer = new MovementIterationPropertiesLogicReducer(store),
      movementSettingsLogicReducer = new MovementSettingsLogicReducer(store);
      
  // init cascade modules
  let coordsCascadeModule = new CoordsCascadeModule(store),
      baseCascadeModule = new BaseCascadeModule(store),
      anglesCascadeModule = new AngleCascadeModule(store),
      miscCascadeModule = new MiscCascadeModule(store),
      movementCirclesCascadeModule = new MovementCirclesCascadeModule(store),
      movementPointersCascadeModule = new MovementPointersCascadeModule(store),
      movementIterationPropertiesCascadeModule = new MovementIterationPropertiesCascadeModule(store),
      movementIterationTransitionCascadeModule = new MovementIterationTransitionCascadeModule(store);
      
  // init state with coords
  store.dispatch({
    type: "INIT_STATE_DATA",
    payload: {
      1: {
        // sagittalCursorX: 250,
        sagittalCursorY: 0,
        // sagittalBaseX: 100,
        sagittalBaseY: -30,
        transverseCursorX: 200,
        transverseCursorY: -250,
        transverseBaseX: 100,
        transverseBaseY: -150
      },
      2: {
        // sagittalCursorX: 250,
        sagittalCursorY: 0,
        // sagittalBaseX: 100,
        sagittalBaseY: -30,
        transverseCursorX: -200,
        transverseCursorY: -250,
        transverseBaseX: -100,
        transverseBaseY: -150
      },
      3: {
        // sagittalCursorX: 250,
        sagittalCursorY: 0,
        // sagittalBaseX: 100,
        sagittalBaseY: -30,
        transverseCursorX: 300,
        transverseCursorY: 0,
        transverseBaseX: 150,
        transverseBaseY: 0
      },
      4: {
        // sagittalCursorX: 250,
        sagittalCursorY: 0,
        // sagittalBaseX: 100,
        sagittalBaseY: -30,
        transverseCursorX: -300,
        transverseCursorY: 0,
        transverseBaseX: -150,
        transverseBaseY: 0
      },
      5: {
        // sagittalCursorX: 250,
        sagittalCursorY: 0,
        // sagittalBaseX: 100,
        sagittalBaseY: -30,
        transverseCursorX: 200,
        transverseCursorY: 250,
        transverseBaseX: 100,
        transverseBaseY: 150
      },
      6: {
        // sagittalCursorX: 250,
        sagittalCursorY: 0,
        // sagittalBaseX: 100,
        sagittalBaseY: -30,
        transverseCursorX: -200,
        transverseCursorY: 250,
        transverseBaseX: -100,
        transverseBaseY: 150
      }
    }
  });

  var ReduxMixin = PolymerRedux(store);  
}