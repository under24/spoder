'use strict';

class CoordsModule extends LogicReducer {
	
	constructor(store) {
		super(store);
		
		this.properties = {
			level: 'modifiers.level',
			rotation: 'modifiers.rotation',
			// shift: 'modifiers.shift',
			// tilt: 'modifiers.tilt',
			coords: 'coords'
		};
		
		this.observers = [
			'processLevelModifier(level, coords)',
			'processRotationModifier(rotation, coords)'
		];
	}
  
  processLevelModifier(level, coords) {
    debugger;
		// this.syncProps(['coords']);
		
		// do some calcs here
		
		return {
			'fromLevel': {
				// path data here
			}
		};
		
		// this.flushProps(['coords']);
		
		
		
		
		
    
    // this.syncProps(['level', 'coords']);
    // 
    // // validation
    // if (this.level.normalizedY === action.payload.normalizedY) throw new Error('same values');
    // 
    // var coords = { type: "APPLY_LEVEL_MODIFIER_TO_COORDS", payload: {}, path: 'coords' };
    // 
    // for (let legId = 1; legId <= 6; legId++) {
    //   coords.payload[legId] = {
    //     sagittalBaseY: this.coords[legId].sagittalBaseY + action.payload.normalizedY
    //   };
    // }
    // 
    // debugger;
    // 
    // 
    // 
    // 
    // this.flushProps(['level', 'coords']);
    
    
  }
	
	processRotationModifier(level, rotation, coords) {
		debugger;
		
		return {
			'fromRotation': 1
		};
	}
  
}