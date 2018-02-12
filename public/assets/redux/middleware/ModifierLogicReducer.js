'use strict';

class ModifierLogicReducer extends LogicReducer {

  constructor(store) {
    super(store);
    
    this.properties = {
      level: 'modifiers.level',
      // rotation: 'modifiers.rotation',
      // shift: 'modifiers.shift',
      // tilt: 'modifiers.tilt'
    };
  }

  processLevelModifier(action, newState) {
    this.syncProps(['level']);
    
    // validation
    if (this.level.y === action.payload.y) throw new Error('same values');
    
    // calc normalized y (joystick value * normalizer)
    let normalizedY = MU.normalize(action.payload.y, this.level.normalizer);
    
    // create new state branch 'modifiers.level' which is going to be merged with the current state
    newState['modifiers.level'] = Object.assign({}, this.level, action.payload, { normalizedY } );
    
    this.flushProps(['level']);
  }

  processRotationModifier(action) {
    this.syncProps(['rotation']);
    
    // validation
    if (this.rotation.x === action.payload.x) throw new Error('same values');
    
    // calc normalized x (joystick value * normalizer)
    action.payload.normalizedX = MU.normalize(action.payload.x, this.rotation.normalizer);
    action.path = this.getPropPath('rotation');
    
    this.flushProps(['rotation']);
    
    return action;
  }

}