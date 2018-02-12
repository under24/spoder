'use strict';

class CoordsModule extends LogicReducer {
	
	constructor(store) {
		super(store);
		
		this.properties = {
			level: 'modifiers.level',
			rotation: 'modifiers.rotation',
			// shift: 'modifiers.shift',
			// tilt: 'modifiers.tilt',
			// coords: 'coords'
		};
		
		this.observers = [
			'levelModifierHandler(level)',
			'rotationModifierHandler(rotation)'
		];
	}
  
	levelModifierHandler(newLevel) {
		// get values from the old state
		var oldLevel = this.resolvePath('modifiers.level');
		
		// validation
		if (newLevel.normalizedY === oldLevel.normalizedY) {
			console.warn('same level modifier values');	
			return;
		}
		
    var newState = {},
        stateCoords = this.resolvePath('coords'),
        levelModifierDiff = oldLevel.normalizedY - newLevel.normalizedY;
			
		for (let legId = 1; legId <= 6; legId++) {
			newState[legId] = Object.assign({}, stateCoords[legId], { sagittalBaseY: stateCoords[legId].sagittalBaseY + levelModifierDiff });
		}
		
		return { 'coords': newState };
	}
	
	rotationModifierHandler(rotation) {
		
		return {
			'fromRotation': 1
		};
	}
  
}