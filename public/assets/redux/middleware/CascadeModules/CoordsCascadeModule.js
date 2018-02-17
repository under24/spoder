'use strict';

class CoordsCascadeModule extends CascadeModule {
  
  constructor(store) {
    super(store);
    
    this.properties = {
      level: 'modifiers.level',
      rotation: 'modifiers.rotation',
      shift: 'modifiers.shift',
      // tilt: 'modifiers.tilt',
    };
    
    // ['handler(dependency, dependency)', ...]
    this.observers = [
      'levelModifierHandler(level)',
      'rotationModifierHandler(rotation)',
      'shiftModifierHandler(shift)'
    ];
  }
  
  levelModifierHandler(newLevel) {
    // get values from the current state
    var oldLevel = this.resolvePath(this.properties.level);
    
    // validation
    if (newLevel.normalizedY === oldLevel.normalizedY) {
      console.warn('same level modifier values');  
      return;
    }
    
    var levelModifierDiff = oldLevel.normalizedY - newLevel.normalizedY;
    
    var newCoords = {},
        oldCoords = this.resolvePath('coords');
      
    for (let legId = 1; legId <= 6; legId++) {
      let sagittalBaseY = oldCoords[legId].sagittalBaseY + levelModifierDiff;
      
      newCoords[legId] = Object.assign({}, oldCoords[legId], { sagittalBaseY });
    }
    
    return { 'coords': newCoords };
  }
  
  rotationModifierHandler(newRotation) {
    // get values from the current state
    var oldRotation = this.resolvePath(this.properties.rotation);
    
    // validation
    if (newRotation.normalizedX === oldRotation.normalizedX) {
      console.warn('same rotation modifier values');
      return;
    }
    
    var rotationModifierDiff = oldRotation.normalizedX - newRotation.normalizedX;
    
    var newCoords = {},
        oldCoords = this.resolvePath('coords'),
        baseCenterCoords = MU.getBaseCenter(oldCoords);
    
    for (let legId = 1; legId <= 6; legId++) {
      let rotatedCoords = { x: oldCoords[legId].transverseBaseX, y: oldCoords[legId].transverseBaseY };
      rotatedCoords = MU.rotateCoords(baseCenterCoords, rotatedCoords, rotationModifierDiff);
      
      let finalCoords = {
        transverseBaseX: rotatedCoords.x,
        transverseBaseY: rotatedCoords.y
      };
      
      // gather up latest coords for further computations
      let coords = CU.aggregateCoords(oldCoords[legId], finalCoords),
          compensativeCoords = CU.getTransverseBaseXYCompensativeCoords(coords);
      // compare with the existing coords
      if (compensativeCoords.sagittalBaseX !== oldCoords[legId].sagittalBaseX) finalCoords.sagittalBaseX = compensativeCoords.sagittalBaseX;
      if (compensativeCoords.sagittalCursorX !== oldCoords[legId].sagittalCursorX) finalCoords.sagittalCursorX = compensativeCoords.sagittalCursorX;
      
      newCoords[legId] = Object.assign({}, oldCoords[legId], finalCoords);
    }
    
    return { 'coords': newCoords };
  }
  
  shiftModifierHandler(newShift) {
    // get values from the current state
    var oldShift = this.resolvePath(this.properties.shift);
    
    // validation
    if (newShift.normalizedX === oldShift.normalizedX &&
        newShift.normalizedY === oldShift.normalizedY) {
      console.warn('same shift modifier values');
      return;
    }
    
    var shiftModifierDiff = {
      x: oldShift.normalizedX - newShift.normalizedX,
      y: oldShift.normalizedY - newShift.normalizedY
    };
    
    var newCoords = {},
        oldCoords = this.resolvePath('coords');
    
    for (let legId = 1; legId <= 6; legId++) {
      let shiftedCoords = {
        transverseBaseX: oldCoords[legId].transverseBaseX + shiftModifierDiff.x,
        transverseBaseY: oldCoords[legId].transverseBaseY + shiftModifierDiff.y
      };
      
      // compensative computation
      let coords = CU.aggregateCoords(oldCoords[legId], shiftedCoords),
          compensativeCoords = CU.getTransverseBaseXYCompensativeCoords(coords);
      
      if (compensativeCoords.sagittalBaseX !== oldCoords[legId].sagittalBaseX) shiftedCoords.sagittalBaseX = compensativeCoords.sagittalBaseX;
      if (compensativeCoords.sagittalCursorX !== oldCoords[legId].sagittalCursorX) shiftedCoords.sagittalCursorX = compensativeCoords.sagittalCursorX;
      
      newCoords[legId] = Object.assign({}, oldCoords[legId], shiftedCoords);
    }
    
    return { 'coords': newCoords};
  }
  
}