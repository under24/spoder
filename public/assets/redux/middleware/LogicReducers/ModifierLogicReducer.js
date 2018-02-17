'use strict';

class ModifierLogicReducer extends LogicReducer {

  constructor(store) {
    super(store);
    
    this.actionTypes = [
      'processLevelModifier(LEVEL_MODIFIER_CHANGED)',
      'processRotationModifier(ROTATION_MODIFIER_CHANGED)',
      'processShiftModifier(SHIFT_MODIFIER_CHANGED)'
    ];
  }

  processLevelModifier(payload) {
    var oldLevel = this.resolvePath('modifiers.level');
    
    // validation. check if the payload and state values are the same
    if (oldLevel.y === payload.y) throw new Error('same level modifier values');
    
    // calc normalized y (joystick value * normalizer)
    var normalizedY = MU.normalize(payload.y, oldLevel.normalizer);
    
    // create new state branch 'modifiers.level' which is going to be merged with the current state
    var newLevel = Object.assign({}, oldLevel, payload, { normalizedY });
      
    return { 'modifiers.level': newLevel };
  }

  processRotationModifier(payload) {
    var oldRotation = this.resolvePath('modifiers.rotation');
    
    // validation. check if the payload and state values are the same
    if (oldRotation.x === payload.x) throw new Error('same rotation modifier values');
    
    // calc normalized x (joystick value * normalizer)
    var normalizedX = MU.normalize(payload.x, oldRotation.normalizer);
    
    // create new state branch 'modifiers.rotation' which is going to be merged with the current state
    var newRotation = Object.assign({}, oldRotation, payload, { normalizedX });
    
    return { 'modifiers.rotation': newRotation };  
  }
  
  processShiftModifier(payload) {
    var oldShift = this.resolvePath('modifiers.shift');
    
    // validation. check if the payload and state values are the same
    if (oldShift.x === payload.x &&
        oldShift.y === payload.y) throw new Error('same shift modifier values');
        
    // calc normalized x (joystick x * normalizer)
    var normalizedX = MU.normalize(payload.x, oldShift.normalizer),
        // calc normalized y  (joystick y * normalizer)
        normalizedY = MU.normalize(payload.y, oldShift.normalizer);
    
    // create new state branch 'modifiers.shift' which is going to be merged with the current state
    var newShift = Object.assign({}, oldShift, payload, { normalizedX, normalizedY });
    
    return { 'modifiers.shift': newShift };
  }

}