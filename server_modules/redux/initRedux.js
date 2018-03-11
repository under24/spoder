'use strict';

var Redux = require('../../public/assets/js/redux.js');

var baseCenterCoordsReducer = require('../../public/assets/redux/reducers/base/centerCoords.js'),
    baseCoxaAttachmentAnglesReducer = require('../../public/assets/redux/reducers/base/coxaAttachmentAngles.js'),
    baseDirectionReducer = require('../../public/assets/redux/reducers/base/direction.js'),
    
    levelReducer = require('../../public/assets/redux/reducers/modifiers/level.js'),
    rotationReducer = require('../../public/assets/redux/reducers/modifiers/rotation.js'),
    shiftReducer = require('../../public/assets/redux/reducers/modifiers/shift.js'),
    tiltReducer = require('../../public/assets/redux/reducers/modifiers/tilt.js'),
    
    movementIterationBlueprintReducer = require('../../public/assets/redux/reducers/movement/iteration/blueprint.js'),
    movementIterationTransitionReducer = require('../../public/assets/redux/reducers/movement/iteration/transition.js'),
    movementIterationPropertiesReducer = require('../../public/assets/redux/reducers/movement/iteration/properties.js'),
    
    movementCircleReducer = require('../../public/assets/redux/reducers/movement/circles.js'),
    movementDirectionJoystickReducer = require('../../public/assets/redux/reducers/movement/directionJoystick.js'),
    movementPointerReducer = require('../../public/assets/redux/reducers/movement/pointers.js'),
    movementSettingsReducer = require('../../public/assets/redux/reducers/movement/settings.js'),
    movementTurnJoystickReducer = require('../../public/assets/redux/reducers/movement/turnJoystick.js'),
    
    arduinoReducer = require('../../public/assets/redux/reducers/status/arduino.js'),
    joystickReducer = require('../../public/assets/redux/reducers/status/joystick.js'),
    socketReducer = require('../../public/assets/redux/reducers/status/socket.js'),
    privilegeReducer = require('../../public/assets/redux/reducers/status/privileges.js'),
    
    viewSettingsCoronalViewReducer = require('../../public/assets/redux/reducers/viewSettings/coronalView.js'),
    viewSettingsRelativeSagittalViewReducer = require('../../public/assets/redux/reducers/viewSettings/relativeSagittalView.js'),
    viewSettingsTransverseViewReducer = require('../../public/assets/redux/reducers/viewSettings/transverseView.js'),
    viewSettingsRelativeTransverseViewReducer = require('../../public/assets/redux/reducers/viewSettings/relativeTransverseView.js'),
    
    angleReducer = require('../../public/assets/redux/reducers/angles.js'),
    coordsReducer = require('../../public/assets/redux/reducers/coords.js'),
    gaitReducer = require('../../public/assets/redux/reducers/gaits.js'),
    legReducer = require('../../public/assets/redux/reducers/legs.js'),
    metaDataReducer = require('../../public/assets/redux/reducers/metaData.js'),
    miscReducer = require('../../public/assets/redux/reducers/misc.js'),
    viewOffsetsReducer = require('../../public/assets/redux/reducers/viewOffsets.js');
    
var ModifierLogicReducer = require('../../public/assets/redux/middleware/LogicReducers/ModifierLogicReducer.js'),
    CoordsLogicReducer = require('../../public/assets/redux/middleware/LogicReducers/CoordsLogicReducer.js'),
    MovementDirectionJoystickLogicReducer = require('../../public/assets/redux/middleware/LogicReducers/MovementDirectionJoystickLogicReducer.js'),
    MovementTurnJoystickLogicReducer = require('../../public/assets/redux/middleware/LogicReducers/MovementTurnJoystickLogicReducer.js'),
    MovementIterationPropertiesLogicReducer = require('../../public/assets/redux/middleware/LogicReducers/MovementIterationPropertiesLogicReducer.js'),
    MovementSettingsLogicReducer = require('../../public/assets/redux/middleware/LogicReducers/MovementSettingsLogicReducer.js'),
    ViewOffsetsLogicReducer = require('../../public/assets/redux/middleware/LogicReducers/ViewOffsetsLogicReducer.js');
    
var CoordsCascadeModule = require('../../public/assets/redux/middleware/CascadeModules/CoordsCascadeModule.js'),
    BaseCascadeModule = require('../../public/assets/redux/middleware/CascadeModules/BaseCascadeModule.js'),
    AngleCascadeModule = require('../../public/assets/redux/middleware/CascadeModules/AngleCascadeModule.js'),
    MiscCascadeModule = require('../../public/assets/redux/middleware/CascadeModules/MiscCascadeModule.js'),
    MovementCirclesCascadeModule = require('../../public/assets/redux/middleware/CascadeModules/MovementCirclesCascadeModule.js'),
    MovementPointersCascadeModule = require('../../public/assets/redux/middleware/CascadeModules/MovementPointersCascadeModule.js'),
    MovementIterationPropertiesCascadeModule = require('../../public/assets/redux/middleware/CascadeModules/MovementIterationPropertiesCascadeModule.js'),
    MovementIterationTransitionCascadeModule = require('../../public/assets/redux/middleware/CascadeModules/MovementIterationTransitionCascadeModule.js'),
    MovementIterationBlueprintCascadeModule = require('../../public/assets/redux/middleware/CascadeModules/MovementIterationBlueprintCascadeModule.js');

var { combineReducers, createStore, applyMiddleware } = Redux;

var baseReducer = combineReducers({
  centerCoords: baseCenterCoordsReducer,
  coxaAttachmentAngles: baseCoxaAttachmentAnglesReducer,
  direction: baseDirectionReducer
});

var modifierReducer = combineReducers({
  level: levelReducer,
  rotation: rotationReducer,
  shift: shiftReducer,
  tilt: tiltReducer
});

var movementInterationReducer = combineReducers({
  blueprint: movementIterationBlueprintReducer,
  transition: movementIterationTransitionReducer,
  properties: movementIterationPropertiesReducer
});

var movementReducer = combineReducers({
  circles: movementCircleReducer,
  directionJoystick: movementDirectionJoystickReducer,
  iteration: movementInterationReducer,
  pointers: movementPointerReducer,
  settings: movementSettingsReducer,
  turnJoystick: movementTurnJoystickReducer
});

var statusReducer = combineReducers({
  arduino: arduinoReducer,
  joystick: joystickReducer,
  socket: socketReducer,
  privileges: privilegeReducer
});

var viewSettingsReducer = combineReducers({
  coronalView: viewSettingsCoronalViewReducer,
  relativeSagittalView: viewSettingsRelativeSagittalViewReducer,
  transverseView: viewSettingsTransverseViewReducer,
  relativeTransverseView: viewSettingsRelativeTransverseViewReducer
});

var rootReducer = combineReducers({
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
      action.type === "MOVEMENT_SETTINGS_CHANGED") {
        
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
    // @handle "LEVEL_MODIFIER_CHANGED"                                           -> "modifiers.level"
    // @handle "ROTATION_MODIFIER_CHANGED"                                        -> "modifiers.ratation"
    // @handle "SHIFT_MODIFIER_CHANGED"                                           -> "modifiers.shift"
    // @handle "TILT_MODIFIER_CHANGED"                                            -> "modifiers.tilt"
    modifierLogicReducer.processAction(action, stateChange);
    // @handle "CURSOR_XY_SHIFTED"                                                -> "coords"
    // @handle "BASE_XY_SHIFTED"                                                  -> "coords"
    // @handle "SEQUENCE_SHIFTED_XY_BATCHED"                                      -> "coords"
    //                                                                               "movement.iteration.properties"(currentTick, currentTickPct)
    // @handle "INIT_COORDS"                                                      -> "coords"
    coordsLogicReducer.processAction(action, stateChange);
    // @handle "SEQUENCE_SHIFTED_XY_BATCHED"                                      -> "viewOffsets"
    viewOffsetsLogicReducer.processAction(action, stateChange);
    // @handle "MOVEMENT_TURN_JOYSTICK_VALUES_CHANGED"                            -> "movement.turnJoystick"
    movementTurnJoystickLogicReducer.processAction(action, stateChange);
    // @handle "MOVEMENT_DIRECTION_JOYSTICK_VALUES_CHANGED"                       -> "movement.directionJoystick"
    movementDirectionJoystickLogicReducer.processAction(action, stateChange);
    // @handle "MOVEMENT_ITERATION_PROPERTIES_CHANGED"                            -> "movement.iteration.properties"
    movementIterationPropertiesLogicReducer.processAction(action, stateChange);
    // @handle "MOVEMENT_SETTINGS_CHANGED"                                        -> "movement.settings"
    movementSettingsLogicReducer.processAction(action, stateChange);
  }
}
var emitter = function() {
  
};
let cascadeModules = store => next => stateChange => {
  // @observe "modifiers.level"                                                   -> "coords"
  // @observe "modifiers.rotation"                                                -> "coords"
  // @observe "modifiers.shift"                                                   -> "coords"
  // @observe "modifiers.tilt"                                                    -> "coords"
  coordsCascadeModule.processState(stateChange);
  // @observe "coords"                                                            -> "base.centerCoords"
  // @observe "coords"
  //          "base.centerCoords"                                                 -> "base.direction"
  baseCascadeModule.processState(stateChange);
  // @observe "coords"                                                            -> "angles"
  anglesCascadeModule.processState(stateChange);
  // @observe "coords"                                                            -> "misc"
  miscCascadeModule.processState(stateChange);
  // @observe "coords"                                                            -> "movement.circles" 
  // @observe "movement.turnJoystick"                                             -> "movement.circles"
  movementCirclesCascadeModule.processState(stateChange);
  // @observe "movement.circles"
  //          "movement.directionJoystick"                                        -> "movement.pointers"
  movementPointersCascadeModule.processState(stateChange);
  // @observe "movement.settings :tps :duration :gait :sequencerMode"
  //          "movement.iteration.properties :currentTick"                        -> "movement.iteration.properties"
  movementIterationPropertiesCascadeModule.processState(stateChange);
  // @observe "movement.iteration.properties :currentTick"                        -> "movement.iteration.transition"
  // @observe "movement.turnJoystick"
  //          "movement.directionJoystick"                                        -> "movement.iteration.transition"
  movementIterationTransitionCascadeModule.processState(stateChange);
  // @observe "movement.iteration.transition"
  //          "movement.iteration.properties :gait"                               -> "movement.iteration.blueprint"
  movementIterationBlueprintCascadeModule.processState(stateChange);
  
  emitter(stateChange);
  next(stateChange);
}

var store = createStore(
  rootReducer,
  applyMiddleware(
    logicReducers,
    cascadeModules
  )
);

store.emitter = function(cb) {
  emitter = cb;
};


// init logic reducers
var modifierLogicReducer = new ModifierLogicReducer(store),
    coordsLogicReducer = new CoordsLogicReducer(store),
    movementDirectionJoystickLogicReducer = new MovementDirectionJoystickLogicReducer(store),
    movementTurnJoystickLogicReducer = new MovementTurnJoystickLogicReducer(store),
    movementIterationPropertiesLogicReducer = new MovementIterationPropertiesLogicReducer(store),
    movementSettingsLogicReducer = new MovementSettingsLogicReducer(store),
    viewOffsetsLogicReducer = new ViewOffsetsLogicReducer(store);
    
// init cascade modules
var coordsCascadeModule = new CoordsCascadeModule(store),
    baseCascadeModule = new BaseCascadeModule(store),
    anglesCascadeModule = new AngleCascadeModule(store),
    miscCascadeModule = new MiscCascadeModule(store),
    movementCirclesCascadeModule = new MovementCirclesCascadeModule(store),
    movementPointersCascadeModule = new MovementPointersCascadeModule(store),
    movementIterationPropertiesCascadeModule = new MovementIterationPropertiesCascadeModule(store),
    movementIterationTransitionCascadeModule = new MovementIterationTransitionCascadeModule(store),
    movementIterationBlueprintCascadeModule = new MovementIterationBlueprintCascadeModule(store);
    
// init state with coords
// store.dispatch([
//   {
//     type: "INIT_COORDS",
//     payload: {
//       1: {
//         // sagittalCursorX: 250,
//         sagittalCursorY: 0,
//         // sagittalBaseX: 100,
//         sagittalBaseY: -30,
//         transverseCursorX: 200,
//         transverseCursorY: -250,
//         transverseBaseX: 100,
//         transverseBaseY: -150
//       },
//       2: {
//         // sagittalCursorX: 250,
//         sagittalCursorY: 0,
//         // sagittalBaseX: 100,
//         sagittalBaseY: -30,
//         transverseCursorX: -200,
//         transverseCursorY: -250,
//         transverseBaseX: -100,
//         transverseBaseY: -150
//       },
//       3: {
//         // sagittalCursorX: 250,
//         sagittalCursorY: 0,
//         // sagittalBaseX: 100,
//         sagittalBaseY: -30,
//         transverseCursorX: 300,
//         transverseCursorY: 0,
//         transverseBaseX: 150,
//         transverseBaseY: 0
//       },
//       4: {
//         // sagittalCursorX: 250,
//         sagittalCursorY: 0,
//         // sagittalBaseX: 100,
//         sagittalBaseY: -30,
//         transverseCursorX: -300,
//         transverseCursorY: 0,
//         transverseBaseX: -150,
//         transverseBaseY: 0
//       },
//       5: {
//         // sagittalCursorX: 250,
//         sagittalCursorY: 0,
//         // sagittalBaseX: 100,
//         sagittalBaseY: -30,
//         transverseCursorX: 200,
//         transverseCursorY: 250,
//         transverseBaseX: 100,
//         transverseBaseY: 150
//       },
//       6: {
//         // sagittalCursorX: 250,
//         sagittalCursorY: 0,
//         // sagittalBaseX: 100,
//         sagittalBaseY: -30,
//         transverseCursorX: -200,
//         transverseCursorY: 250,
//         transverseBaseX: -100,
//         transverseBaseY: 150
//       }
//     }
//   },
//   {
//     type: "MOVEMENT_SETTINGS_CHANGED", 
//     payload: {
//       loop: true,
//       sequencerEnabled: false,
//       gait: 'ripple',
//       tps: 60,
//       duration: 750,
//       sequencerMode: 'movement', // possible values: 'movement', 'custom'
//       customBlueprint: null
//     }
//   },
//   {
//     type: "MOVEMENT_ITERATION_PROPERTIES_CHANGED",
//     payload: {
//       currentTick: 0,
//       currentTickPct: 0
//     }
//   }
// ]);

module.exports = store;