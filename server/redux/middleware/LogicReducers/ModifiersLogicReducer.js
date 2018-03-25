'use strict';

var LogicReducer = require('../LogicReducer.js');
var MU = require('../../../../public/assets/shared/utils/MathUtils.js');

class ModifiersLogicReducer extends LogicReducer {

  constructor(store) {
    super(store);
    
    this.actionObservers = [
      'processLevelModifier(LEVEL_MODIFIER_CHANGED)',
      'processRotationModifier(ROTATION_MODIFIER_CHANGED)',
      'processShiftModifier(SHIFT_MODIFIER_CHANGED)',
      'processTiltModifier(TILT_MODIFIER_CHANGED)'
    ];
    
    this._prepareModule();
  }

  processLevelModifier(payload) {
    var oldLevel = this.resolveStatePath('modifiers.level');
    
    // validation. check if the payload and state values are the same
    if (oldLevel.y === payload.y) {
      console.warn('same level modifier values');
      return;
    }
    
    // check if we are within possible range
    if (payload.y < oldLevel.range.lower) return;
    
    // calc normalized y (joystick y * normalizer)
    var normalizedY = MU.normalize(payload.y, oldLevel.normalizer);
    
    // create new state branch 'modifiers.level' which is going to be merged with the current state
    var newLevel = Object.assign({}, oldLevel, payload, { normalizedY });
      
    return { 'modifiers.level': newLevel };
  }

  processRotationModifier(payload) {
    var oldRotation = this.resolveStatePath('modifiers.rotation');
    
    // validation. check if the payload and state values are the same
    if (oldRotation.x === payload.x) {
      console.warn('same rotation modifier values');
      return;
    }
    
    // calc normalized x (joystick x * normalizer)
    var normalizedX = MU.normalize(payload.x, oldRotation.normalizer);
    
    // create new state branch 'modifiers.rotation' which is going to be merged with the current state
    var newRotation = Object.assign({}, oldRotation, payload, { normalizedX });
    
    return { 'modifiers.rotation': newRotation };  
  }
  
  processShiftModifier(payload) {
    var oldShift = this.resolveStatePath('modifiers.shift');
    
    // validation. check if the payload and state values are the same
    if (oldShift.x === payload.x && oldShift.y === payload.y) {
      console.warn('same shift modifier values');
      return;
    }
    
    // calc normalized x (joystick x * normalizer)
    var normalizedX = MU.normalize(payload.x, oldShift.normalizer),
        // calc normalized y (joystick y * normalizer)
        normalizedY = MU.normalize(payload.y, oldShift.normalizer);
        
    // create new state branch 'modifiers.shift' which is going to be merged with the current state
    var newShift = Object.assign({}, oldShift, payload, { normalizedX, normalizedY });
    
    return { 'modifiers.shift': newShift };
  }
  
  processTiltModifier(payload) {
    var oldTilt = this.resolveStatePath('modifiers.tilt');
    
    // validation. check if the payload and state values are the same
    if (oldTilt.x === payload.x && oldTilt.y === payload.y) {
      console.warn('same tilt modifier values');
      return;
    }
    
    // calc normalized x (joystick x * normalizer)
    var normalizedX = MU.normalize(payload.x, oldTilt.normalizer),
        // calc normalized y (joystick y * normalizer)
        normalizedY = MU.normalize(payload.y, oldTilt.normalizer);
        
    // create new state branch 'modifiers.tilt' which is going to be merged with the current state
    var newTilt = Object.assign({}, oldTilt, payload, { normalizedX, normalizedY });
    
    return { 'modifiers.tilt': newTilt };
  }

}

module.exports = ModifiersLogicReducer;