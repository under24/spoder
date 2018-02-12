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
			'processLevelModifier(level)',
			'processRotationModifier(rotation)'
		];
	}
  
	levelModifierHandler(newLevel) {
		// get values from the old state
		var stateLevel = this.getPropStateValue('level'),
				stateCoords = this.getPropStateValue('coords');
		
		// validation
		if (level.normalizedY === stateLevel.normalizedY) {
			console.warn('same level modifier values');
			return;
		}
		
		var newState = {};
		
		var levelModifierDiff = stateLevel.normalizedY - level.normalizedY;
		
		for (let legId = 1; legId <= 6; legId++) {
			newState[legId] = Object.assign({}, stateCoords[legId], { sagittalBaseY: stateCoords[legId].sagittalBaseY + levelModifierDiff });
		}
		
		return { 'coords': newState };
	}
	
	processRotationModifier(rotation) {
		
		return {
			'fromRotation': 1
		};
	}
  
}