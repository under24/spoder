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

var store = createStore(
  rootReducer
  // applyMiddleware(
  //   logicReducers,
  //   cascadeModules
  // )
);

module.exports = store;