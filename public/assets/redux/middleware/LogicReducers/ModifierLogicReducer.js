'use strict';

class ModifierLogicReducer extends LogicReducer {

  constructor(store) {
    super(store);
    
    this.properties = {
      level: 'modifiers.level',
      rotation: 'modifiers.rotation',
      shift: 'modifiers.shift',
      // tilt: 'modifiers.tilt'
    };
    
    this.actions = [
      'processLevelModifier(LEVEL_MODIFIER_CHANGED)',
      'processRotationModifier(ROTATION_MODIFIER_CHANGED)',
      'processShiftModifier(SHIFT_MODIFIER_CHANGED)'
    ];
  }
  
  processAction(action, newState) {
    switch (action.type) {
      case "LEVEL_MODIFIER_CHANGED":
        this.processLevelModifier(action.payload, newState); break;
      case "ROTATION_MODIFIER_CHANGED":
        this.processRotationModifier(action.payload, newState); break;
      case "SHIFT_MODIFIER_CHANGED":
        this.processShiftModifier(action.payload, newState); break;
    }
  }

  processLevelModifier(payload, newState) {
    this.syncProps(['level']);
    
    // validation. check if the payload and state values are the same
    if (this.level.y === payload.y) throw new Error('same level modifier values');
    
    // calc normalized y (joystick value * normalizer)
    let normalizedY = MU.normalize(payload.y, this.level.normalizer);
    
    // create new state branch 'modifiers.level' which is going to be merged with the current state
    newState['modifiers.level'] = Object.assign({}, this.level, payload, { normalizedY });
    
    this.flushProps(['level']);
  }

  processRotationModifier(payload, newState) {
    this.syncProps(['rotation']);
    
    // validation. check if the payload and state values are the same
    if (this.rotation.x === payload.x) throw new Error('same rotation modifier values');
    
    // calc normalized x (joystick value * normalizer)
    let normalizedX = MU.normalize(payload.x, this.rotation.normalizer);
    
    newState['modifiers.rotation'] = Object.assign({}, this.rotation, payload, { normalizedX });
    
    this.flushProps(['rotation']);
  }
  
  processShiftModifier(payload, newState) {
    this.syncProps(['shift']);
    
    // validation. check if the payload and state values are the same
    if (this.shift.x === payload.x &&
        this.shift.y === payload.y) throw new Error('same shift modifier values');
        
    // calc normalized x (joystick x * normalizer)
    let normalizedX = MU.normalize(payload.x, this.shift.normalizer),
        // calc normalized y  (joystick y * normalizer)
        normalizedY = MU.normalize(payload.y, this.shift.normalizer);
    
    newState['modifiers.shift'] = Object.assign({}, this.shift, payload, { normalizedX, normalizedY });
    
    this.flushProps(['shift']);
  }

}
