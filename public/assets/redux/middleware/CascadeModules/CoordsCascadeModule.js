'use strict';

try {
  var CascadeModule = require('../../../spodux/CascadeModule.js');
}
catch(e) {}

class CoordsCascadeModule extends CascadeModule {
  
  constructor(store) {
    super(store);
    
    this.properties = {
      level: 'modifiers.level',
      rotation: 'modifiers.rotation',
      shift: 'modifiers.shift',
      tilt: 'modifiers.tilt',
    };
    
    this.observers = [
      'levelModifierObserver(level)',
      'rotationModifierObserver(rotation)',
      'shiftModifierObserver(shift)',
      'tiltModifierObserver(tilt)'
    ];
    
    this._prepareModule();
  }
  
  levelModifierObserver(newLevel) {
    // get values from the current state
    var oldLevel = this.resolveStatePath(this.properties.level);
    
    // validation
    if (newLevel.normalizedY === oldLevel.normalizedY) {
      console.warn('same level modifier values');  
      return;
    }
    
    var levelModifierDiff = oldLevel.normalizedY - newLevel.normalizedY;
    
    var newCoords = {},
        oldCoords = this.resolveStatePath('coords');
      
    for (let legId = 1; legId <= 6; legId++) {
      let sagittalBaseY = oldCoords[legId].sagittalBaseY + levelModifierDiff;
      
      newCoords[legId] = Object.assign({}, oldCoords[legId], { sagittalBaseY });
    }
    
    return { 'coords': newCoords };
  }
  
  rotationModifierObserver(newRotation) {
    // get values from the current state
    var oldRotation = this.resolveStatePath(this.properties.rotation);
    
    // validation
    if (newRotation.normalizedX === oldRotation.normalizedX) {
      console.warn('same rotation modifier values');
      return;
    }
    
    var rotationModifierDiff = oldRotation.normalizedX - newRotation.normalizedX;
    
    var newCoords = {},
        oldCoords = this.resolveStatePath('coords'),
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
  
  shiftModifierObserver(newShift) {
    // get values from the current state
    var oldShift = this.resolveStatePath(this.properties.shift);
    
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
        oldCoords = this.resolveStatePath('coords');
    
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
  
  tiltModifierObserver(newTilt) {
    var oldTilt = this.resolveStatePath(this.properties.tilt);
    
    // validation
    if (newTilt.normalizedX === oldTilt.normalizedX &&
        newTilt.normalizedY === oldTilt.normalizedY) {
      console.warn('same tilt modifier values');
      return;
    }
    
    var leftTiltModifier = oldTilt.normalizedX - newTilt.normalizedX,
        frontTiltModifier = oldTilt.normalizedY - newTilt.normalizedY,
        rightTiltModifier = MU.flipNumber(leftTiltModifier),
        backTiltModifier = MU.flipNumber(frontTiltModifier);
    
    var newCoords = {},
        oldCoords = this.resolveStatePath('coords'),
        distPct = 0.6666666666666666;
    
    for (let legId = 1; legId <= 6; legId++) {
      let finalValue,
          row = GU.getLegRow(legId);
      
      switch (GU.getLegSide(legId)) {
        case 'right':
          if (row === 'front') {
            finalValue = (leftTiltModifier * distPct) + frontTiltModifier; break;
          }
          else if (row === 'middle') {
            finalValue = leftTiltModifier; break;
          }
          else if (row === 'back') {
            finalValue = (leftTiltModifier * distPct) + backTiltModifier; break;
          }
          break;
        case 'left':
          if (row === 'front') {
            finalValue = (rightTiltModifier * distPct) + frontTiltModifier; break;
          }
          else if (row === 'middle') {
            finalValue = rightTiltModifier; break;
          }
          else if (row === 'back') {
            finalValue = (rightTiltModifier * distPct) + backTiltModifier; break;
          }
      }
      let sagittalBaseY = oldCoords[legId].sagittalBaseY - finalValue;
      
      newCoords[legId] = Object.assign({}, oldCoords[legId], { sagittalBaseY });
    }
      
    return { 'coords': newCoords };
  }
  
}

// node environment export
try { module.exports = CoordsCascadeModule }
catch(e) {}