'use strict';

module.exports = (shared) => {
  
  var io = shared.resolve('io');
  
  var { combineReducers, createStore, applyMiddleware } = require('../../public/assets/shared/redux/Redux.js');
      
  var baseReducer = combineReducers({
    centerCoords: require('../../public/assets/shared/redux/reducers/base/centerCoords.js'),
    coxaAttachmentAngles: require('../../public/assets/shared/redux/reducers/base/coxaAttachmentAngles.js'),
    direction: require('../../public/assets/shared/redux/reducers/base/direction.js')
  });

  var modifierReducer = combineReducers({
    level: require('../../public/assets/shared/redux/reducers/modifiers/level.js'),
    rotation: require('../../public/assets/shared/redux/reducers/modifiers/rotation.js'),
    shift: require('../../public/assets/shared/redux/reducers/modifiers/shift.js'),
    tilt: require('../../public/assets/shared/redux/reducers/modifiers/tilt.js')
  });

  var movementInterationReducer = combineReducers({
    blueprint: require('../../public/assets/shared/redux/reducers/movement/iteration/blueprint.js'),
    transition: require('../../public/assets/shared/redux/reducers/movement/iteration/transition.js'),
    properties: require('../../public/assets/shared/redux/reducers/movement/iteration/properties.js')
  });

  var movementReducer = combineReducers({
    circles: require('../../public/assets/shared/redux/reducers/movement/circles.js'),
    directionJoystick: require('../../public/assets/shared/redux/reducers/movement/directionJoystick.js'),
    iteration: movementInterationReducer,
    pointers: require('../../public/assets/shared/redux/reducers/movement/pointers.js'),
    settings: require('../../public/assets/shared/redux/reducers/movement/settings.js'),
    turnJoystick: require('../../public/assets/shared/redux/reducers/movement/turnJoystick.js')
  });

  var statusReducer = combineReducers({
    arduino: require('../../public/assets/shared/redux/reducers/status/arduino.js'),
    joystick: require('../../public/assets/shared/redux/reducers/status/joystick.js'),
    socket: require('../../public/assets/shared/redux/reducers/status/socket.js'),
    privileges: require('../../public/assets/shared/redux/reducers/status/privileges.js')
  });

  var viewSettingsReducer = combineReducers({
    coronalView: require('../../public/assets/shared/redux/reducers/viewSettings/coronalView.js'),
    relativeSagittalView: require('../../public/assets/shared/redux/reducers/viewSettings/relativeSagittalView.js'),
    transverseView: require('../../public/assets/shared/redux/reducers/viewSettings/transverseView.js'),
    relativeTransverseView: require('../../public/assets/shared/redux/reducers/viewSettings/relativeTransverseView.js')
  });

  var rootReducer = combineReducers({
    angles: require('../../public/assets/shared/redux/reducers/angles.js'),
    base: baseReducer,
    coords: require('../../public/assets/shared/redux/reducers/coords.js'),
    gaits: require('../../public/assets/shared/redux/reducers/gaits.js'),
    legs: require('../../public/assets/shared/redux/reducers/legs.js'),
    metaData: require('../../public/assets/shared/redux/reducers/metaData.js'),
    misc: require('../../public/assets/shared/redux/reducers/misc.js'),
    modifiers: modifierReducer,
    movement: movementReducer,
    status: statusReducer,
    viewOffsets: require('../../public/assets/shared/redux/reducers/viewOffsets.js'),
    viewSettings: viewSettingsReducer
  });

  var logicReducers = store => next => action => {
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
    
    
    function processAction(action) {
      // @handle "LEVEL_MODIFIER_CHANGED"                                         -> "modifiers.level"
      // @handle "ROTATION_MODIFIER_CHANGED"                                      -> "modifiers.ratation"
      // @handle "SHIFT_MODIFIER_CHANGED"                                         -> "modifiers.shift"
      // @handle "TILT_MODIFIER_CHANGED"                                          -> "modifiers.tilt"
      modifiersLogicReducer.processAction(action, stateChange);
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

  var cascadeModules = store => next => stateChange => {
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

  var socketDispatcher = store => next => stateChange => {
    // broadcast stateChange to all connected clients
    io.sockets.emit('state-change', stateChange);
    
    next(stateChange);
  }

  var store = createStore(
    rootReducer,
    applyMiddleware(
      logicReducers,
      cascadeModules,
      socketDispatcher
    )
  );
  
  // init logic reducers
  var ModifiersLogicReducer = require('../../public/assets/redux/middleware/LogicReducers/ModifiersLogicReducer.js'),
      CoordsLogicReducer = require('../../public/assets/redux/middleware/LogicReducers/CoordsLogicReducer.js'),
      MovementDirectionJoystickLogicReducer = require('../../public/assets/redux/middleware/LogicReducers/MovementDirectionJoystickLogicReducer.js'),
      MovementTurnJoystickLogicReducer = require('../../public/assets/redux/middleware/LogicReducers/MovementTurnJoystickLogicReducer.js'),
      MovementIterationPropertiesLogicReducer = require('../../public/assets/redux/middleware/LogicReducers/MovementIterationPropertiesLogicReducer.js'),
      MovementSettingsLogicReducer = require('../../public/assets/redux/middleware/LogicReducers/MovementSettingsLogicReducer.js'),
      ViewOffsetsLogicReducer = require('../../public/assets/redux/middleware/LogicReducers/ViewOffsetsLogicReducer.js'),
      StatusLogicReducer = require('../../public/assets/redux/middleware/LogicReducers/StatusLogicReducer.js'),
      ViewSettingsLogicReducer = require('../../public/assets/redux/middleware/LogicReducers/ViewSettingsLogicReducer.js');
  var modifiersLogicReducer = new ModifiersLogicReducer(store),
      coordsLogicReducer = new CoordsLogicReducer(store),
      movementDirectionJoystickLogicReducer = new MovementDirectionJoystickLogicReducer(store),
      movementTurnJoystickLogicReducer = new MovementTurnJoystickLogicReducer(store),
      movementIterationPropertiesLogicReducer = new MovementIterationPropertiesLogicReducer(store),
      movementSettingsLogicReducer = new MovementSettingsLogicReducer(store),
      viewOffsetsLogicReducer = new ViewOffsetsLogicReducer(store),
      statusLogicReducer = new StatusLogicReducer(store),
      viewSettingsLogicReducer = new ViewSettingsLogicReducer(store);
      
  // init cascade modules
  var CoordsCascadeModule = require('../../public/assets/redux/middleware/CascadeModules/CoordsCascadeModule.js'),
      BaseCascadeModule = require('../../public/assets/redux/middleware/CascadeModules/BaseCascadeModule.js'),
      AngleCascadeModule = require('../../public/assets/redux/middleware/CascadeModules/AngleCascadeModule.js'),
      MiscCascadeModule = require('../../public/assets/redux/middleware/CascadeModules/MiscCascadeModule.js'),
      MovementCirclesCascadeModule = require('../../public/assets/redux/middleware/CascadeModules/MovementCirclesCascadeModule.js'),
      MovementPointersCascadeModule = require('../../public/assets/redux/middleware/CascadeModules/MovementPointersCascadeModule.js'),
      MovementIterationPropertiesCascadeModule = require('../../public/assets/redux/middleware/CascadeModules/MovementIterationPropertiesCascadeModule.js'),
      MovementIterationTransitionCascadeModule = require('../../public/assets/redux/middleware/CascadeModules/MovementIterationTransitionCascadeModule.js'),
      MovementIterationBlueprintCascadeModule = require('../../public/assets/redux/middleware/CascadeModules/MovementIterationBlueprintCascadeModule.js');      
  var coordsCascadeModule = new CoordsCascadeModule(store),
      baseCascadeModule = new BaseCascadeModule(store),
      anglesCascadeModule = new AngleCascadeModule(store),
      miscCascadeModule = new MiscCascadeModule(store),
      movementCirclesCascadeModule = new MovementCirclesCascadeModule(store),
      movementPointersCascadeModule = new MovementPointersCascadeModule(store),
      movementIterationPropertiesCascadeModule = new MovementIterationPropertiesCascadeModule(store),
      movementIterationTransitionCascadeModule = new MovementIterationTransitionCascadeModule(store),
      movementIterationBlueprintCascadeModule = new MovementIterationBlueprintCascadeModule(store);

  // init state observers
  var MovementSequencerStateObserver = require('../../public/assets/redux/middleware/StateObservers/MovementSequencerStateObserver.js');
  var movementSequencerStateObserver = new MovementSequencerStateObserver(store);
  
  // init state with coords
  store.dispatch([
    {
      type: "INIT_COORDS",
      payload: {
        1: {
          // sagittalCursorX: 250,
          sagittalCursorY: 0,
          // sagittalBaseX: 100,
          sagittalBaseY: -45,
          transverseCursorX: 125,
          transverseCursorY: -160,
          transverseBaseX: 40,
          transverseBaseY: -75
        },
        2: {
          // sagittalCursorX: 250,
          sagittalCursorY: 0,
          // sagittalBaseX: 100,
          sagittalBaseY: -45,
          transverseCursorX: -125,
          transverseCursorY: -160,
          transverseBaseX: -40,
          transverseBaseY: -75
        },
        3: {
          // sagittalCursorX: 250,
          sagittalCursorY: 0,
          // sagittalBaseX: 100,
          sagittalBaseY: -45,
          transverseCursorX: 185,
          transverseCursorY: 0,
          transverseBaseX: 65,
          transverseBaseY: 0
        },
        4: {
          // sagittalCursorX: 250,
          sagittalCursorY: 0,
          // sagittalBaseX: 100,
          sagittalBaseY: -45,
          transverseCursorX: -185,
          transverseCursorY: 0,
          transverseBaseX: -65,
          transverseBaseY: 0
        },
        5: {
          // sagittalCursorX: 250,
          sagittalCursorY: 0,
          // sagittalBaseX: 100,
          sagittalBaseY: -45,
          transverseCursorX: 125,
          transverseCursorY: 160,
          transverseBaseX: 40,
          transverseBaseY: 75
        },
        6: {
          // sagittalCursorX: 250,
          sagittalCursorY: 0,
          // sagittalBaseX: 100,
          sagittalBaseY: -45,
          transverseCursorX: -125,
          transverseCursorY: 160,
          transverseBaseX: -40,
          transverseBaseY: 75
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
  
  // share store between modules
  shared.register('store', store);
}