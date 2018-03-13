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
        action.type === "INIT_COORDS" ||
        // @movementTurnJoystickLogicReducer
        action.type === "MOVEMENT_TURN_JOYSTICK_VALUES_CHANGED" ||
        // @movementDirectionJoystickLogicReducer
        action.type === "MOVEMENT_DIRECTION_JOYSTICK_VALUES_CHANGED" ||
        // @movementIterationPropertiesLogicReducer
        action.type === "MOVEMENT_ITERATION_PROPERTIES_CHANGED" ||
        // @movementSettingsLogicReducer
        action.type === "MOVEMENT_SETTINGS_CHANGED" ||
        // @statusLogicReducer
        action.type === "ARDUINO_STATUS_CHANGED" ||
        action.type === "ANALOG_JOYSTICK_STATUS_CHANGED" ||
        action.type === "PRIVILEGES_STATUS_CHANGED" ||
        action.type === "SOCKET_STATUS_CHANGED" ||
        // @viewSettingsLogicReducer
        action.type === "CORONAL_VIEW_SETTINGS_CHANGED" ||
        action.type === "CORONAL_VIEW_SETTINGS_RESET" ||
        action.type === "RELATIVE_SAGITTAL_VIEW_SETTINGS_CHANGED" ||
        action.type === "RELATIVE_SAGITTAL_VIEW_SETTINGS_RESET" ||
        action.type === "RELATIVE_TRANSVERSE_VIEW_SETTINGS_CHANGED" ||
        action.type === "RELATIVE_TRANSVERSE_VIEW_SETTINGS_RESET" ||
        action.type === "TRANSVERSE_VIEW_SETTINGS_CHANGED" ||
        action.type === "TRANSVERSE_VIEW_SETTINGS_RESET") {
          
      // initialize stateChange which will hold updated state data
      var stateChange = {};
      
      // check if the action is an array
      if (Array.isArray(action))
        // iterate array of actions
        action.forEach(processAction);
      // action is single (object)
      else
        // reduce action into stateChange
        processAction(action);
        
      next(stateChange);
      return;
    }
    
    next(action);
    
    // ----------------------------------------------
    
    function processAction(action) {
      // @handle "LEVEL_MODIFIER_CHANGED"                                         -> "modifiers.level"
      // @handle "ROTATION_MODIFIER_CHANGED"                                      -> "modifiers.ratation"
      // @handle "SHIFT_MODIFIER_CHANGED"                                         -> "modifiers.shift"
      // @handle "TILT_MODIFIER_CHANGED"                                          -> "modifiers.tilt"
      modifierLogicReducer.processAction(action, stateChange);
      // @handle "CURSOR_XY_SHIFTED"                                              -> "coords"
      // @handle "BASE_XY_SHIFTED"                                                -> "coords"
      // @handle "SEQUENCE_SHIFTED_XY_BATCHED"                                    -> "coords"
      // @handle "INIT_COORDS"                                                    -> "coords"
      coordsLogicReducer.processAction(action, stateChange);
      // @handle "SEQUENCE_SHIFTED_XY_BATCHED"                                    -> "viewOffsets"
      viewOffsetsLogicReducer.processAction(action, stateChange);
      // @handle "MOVEMENT_TURN_JOYSTICK_VALUES_CHANGED"                          -> "movement.turnJoystick"
      movementTurnJoystickLogicReducer.processAction(action, stateChange);
      // @handle "MOVEMENT_DIRECTION_JOYSTICK_VALUES_CHANGED"                     -> "movement.directionJoystick"
      movementDirectionJoystickLogicReducer.processAction(action, stateChange);
      // @handle "MOVEMENT_ITERATION_PROPERTIES_CHANGED"                          -> "movement.iteration.properties"
      movementIterationPropertiesLogicReducer.processAction(action, stateChange);
      // @handle "MOVEMENT_SETTINGS_CHANGED"                                      -> "movement.settings"
      movementSettingsLogicReducer.processAction(action, stateChange);
      
      // @handle "ARDUINO_STATUS_CHANGED"                                         -> "status.arduino"
      // @handle "ANALOG_JOYSTICK_STATUS_CHANGED"                                 -> "status.joystick"
      // @handle "PRIVILEGES_STATUS_CHANGED"                                      -> "status.privileges"
      // @handle "SOCKET_STATUS_CHANGED"                                          -> "status.socket"
      statusLogicReducer.processAction(action, stateChange);
      // @handle "CORONAL_VIEW_SETTINGS_CHANGED"                                  -> "viewSettings.coronalView"
      // @handle "CORONAL_VIEW_SETTINGS_RESET"                                    -> "viewSettings.coronalView"
      // @handle "RELATIVE_SAGITTAL_VIEW_SETTINGS_CHANGED"                        -> "viewSettings.relativeSagittalView"
      // @handle "RELATIVE_SAGITTAL_VIEW_SETTINGS_RESET"                          -> "viewSettings.relativeSagittalView"
      // @handle "RELATIVE_TRANSVERSE_VIEW_SETTINGS_CHANGED"                      -> "viewSettings.relativeTransverseView"
      // @handle "RELATIVE_TRANSVERSE_VIEW_SETTINGS_RESET"                        -> "viewSettings.relativeTransverseView"
      // @handle "TRANSVERSE_VIEW_SETTINGS_CHANGED"                               -> "viewSettings.transverseView"
      // @handle "TRANSVERSE_VIEW_SETTINGS_RESET"                                 -> "viewSettings.transverseView"
      viewSettingsLogicReducer.processAction(action, stateChange);
    }
  }
  
  let cascadeModules = store => next => stateChange => {
    // @observe "modifiers.level"                                                 -> "coords"
    // @observe "modifiers.rotation"                                              -> "coords"
    // @observe "modifiers.shift"                                                 -> "coords"
    // @observe "modifiers.tilt"                                                  -> "coords"
    coordsCascadeModule.processState(stateChange);
    // @observe "coords"                                                          -> "base.centerCoords"
    // @observe "coords"
    //          "base.centerCoords"                                               -> "base.direction"
    baseCascadeModule.processState(stateChange);
    // @observe "coords"                                                          -> "angles"
    anglesCascadeModule.processState(stateChange);
    // @observe "coords"                                                          -> "misc"
    miscCascadeModule.processState(stateChange);
    // @observe "coords"                                                          -> "movement.circles" 
    // @observe "movement.turnJoystick"                                           -> "movement.circles"
    movementCirclesCascadeModule.processState(stateChange);
    // @observe "movement.circles"
    //          "movement.directionJoystick"                                      -> "movement.pointers"
    movementPointersCascadeModule.processState(stateChange);
    // @observe "movement.settings :tps :duration :gait :sequencerMode"
    //          "movement.iteration.properties :currentTick"                      -> "movement.iteration.properties"
    movementIterationPropertiesCascadeModule.processState(stateChange);
    // @observe "movement.iteration.properties :currentTick"                      -> "movement.iteration.transition"
    // @observe "movement.turnJoystick"
    //          "movement.directionJoystick"                                      -> "movement.iteration.transition"
    movementIterationTransitionCascadeModule.processState(stateChange);
    // @observe "movement.iteration.transition"
    //          "movement.iteration.properties :gait"                             -> "movement.iteration.blueprint"
    movementIterationBlueprintCascadeModule.processState(stateChange);
    
    next(stateChange);
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
      movementSettingsLogicReducer = new MovementSettingsLogicReducer(store),
      viewOffsetsLogicReducer = new ViewOffsetsLogicReducer(store),
      statusLogicReducer = new StatusLogicReducer(store),
      viewSettingsLogicReducer = new ViewSettingsLogicReducer(store);
      
  // init cascade modules
  let coordsCascadeModule = new CoordsCascadeModule(store),
      baseCascadeModule = new BaseCascadeModule(store),
      anglesCascadeModule = new AngleCascadeModule(store),
      miscCascadeModule = new MiscCascadeModule(store),
      movementCirclesCascadeModule = new MovementCirclesCascadeModule(store),
      movementPointersCascadeModule = new MovementPointersCascadeModule(store),
      movementIterationPropertiesCascadeModule = new MovementIterationPropertiesCascadeModule(store),
      movementIterationTransitionCascadeModule = new MovementIterationTransitionCascadeModule(store),
      movementIterationBlueprintCascadeModule = new MovementIterationBlueprintCascadeModule(store);
      
  // init state observers
  var movementSequencerObserver = new MovementSequencerObserver(store);
      
  // init state with coords
  store.dispatch([
    {
      type: "INIT_COORDS",
      payload: {
        1: {
          // sagittalCursorX: 250,
          sagittalCursorY: 0,
          // sagittalBaseX: 100,
          sagittalBaseY: -37,
          transverseCursorX: 200,
          transverseCursorY: -250,
          transverseBaseX: 100,
          transverseBaseY: -150
        },
        2: {
          // sagittalCursorX: 250,
          sagittalCursorY: 0,
          // sagittalBaseX: 100,
          sagittalBaseY: -37,
          transverseCursorX: -200,
          transverseCursorY: -250,
          transverseBaseX: -100,
          transverseBaseY: -150
        },
        3: {
          // sagittalCursorX: 250,
          sagittalCursorY: 0,
          // sagittalBaseX: 100,
          sagittalBaseY: -37,
          transverseCursorX: 300,
          transverseCursorY: 0,
          transverseBaseX: 150,
          transverseBaseY: 0
        },
        4: {
          // sagittalCursorX: 250,
          sagittalCursorY: 0,
          // sagittalBaseX: 100,
          sagittalBaseY: -37,
          transverseCursorX: -300,
          transverseCursorY: 0,
          transverseBaseX: -150,
          transverseBaseY: 0
        },
        5: {
          // sagittalCursorX: 250,
          sagittalCursorY: 0,
          // sagittalBaseX: 100,
          sagittalBaseY: -37,
          transverseCursorX: 200,
          transverseCursorY: 250,
          transverseBaseX: 100,
          transverseBaseY: 150
        },
        6: {
          // sagittalCursorX: 250,
          sagittalCursorY: 0,
          // sagittalBaseX: 100,
          sagittalBaseY: -37,
          transverseCursorX: -200,
          transverseCursorY: 250,
          transverseBaseX: -100,
          transverseBaseY: 150
        }
      }
    },
    {
      type: "MOVEMENT_SETTINGS_CHANGED", 
      payload: {
        loop: true,
        sequencerEnabled: false,
        gait: 'ripple',
        tps: 60,
        duration: 750,
        sequencerMode: 'movement', // possible values: 'movement', 'custom'
        customBlueprint: null
      }
    },
    {
      type: "MOVEMENT_ITERATION_PROPERTIES_CHANGED",
      payload: {
        currentTick: 0,
        currentTickPct: 0
      }
    }
  ]);

  var ReduxMixin = PolymerRedux(store);  
}