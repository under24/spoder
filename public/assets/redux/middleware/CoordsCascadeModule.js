'use strict';

class CoordsCascadeModule extends LogicReducer {
	
	constructor(store) {
		super(store);
		
		this.properties = {
			level: 'modifiers.level',
			rotation: 'modifiers.rotation',
			shift: 'modifiers.shift',
			tilt: 'modifiers.tilt',
      coords: 'coords'
		};
	}
  
  input(action) {
    debugger;
    
    switch (action.path) {
      case "modifiers.level":
        this.processLevelModifier(action); break;
      case "modifiers.rotation":
        this.processRotationModifier(action); break;
    }
    
  }
  
  processLevelModifier(action) {
    debugger;
    
    this.syncProps(['level', 'coords']);
    
    // validation
    if (this.level.normalizedY === action.payload.normalizedY) throw new Error('same values');
    
    var coords = { type: "APPLY_LEVEL_MODIFIER_TO_COORDS", payload: {}, path: 'coords' };
        
    for (let legId = 1; legId <= 6; legId++) {
      coords.payload[legId] = {
        sagittalBaseY: this.coords[legId].sagittalBaseY + action.payload.normalizedY
      };
    }
    
    debugger;
    
    
    
    
    this.flushProps(['level', 'coords']);
    
    
  }
	
	processRotationModifier(action) {
		
	}
  
}