'use strict';

class MovementCirclesCascadeModule extends CascadeModule {

  constructor(store) {
    super(store);
    
    this.properties = {
      coords: 'coords',
      turnJoystick: 'movement.turnJoystick'
    };
    
    // ['handler(dependency, dependency)', ...]
    this.observers = [
      'handleCoordsChanged(coords)',
      'handleTurnJoystickChanged(turnJoystick)'
    ];
    
    this._prepareModule();
  }
  
  // need to generate new circles for the leg that has changed coords
  handleCoordsChanged(newCoords) {
    var oldCoords = this.resolveStatePath('coords'),
        oldCircles = this.resolveStatePath('movement.circles');
        
    var newCircles = {};
    
    var newDataGenerated = false;
    
    for (let legId = 1; legId <= 6; legId++) {
      // if no changed coords then referrence the state object
      if (this.sameCoords(newCoords[legId], oldCoords[legId]))
        newCircles[legId] = oldCircles[legId];
      // some coords have changed. need to calculate misc
      else {
        newCircles[legId] = this.processNewCircle(legId);
        // some new values have been generated. set the flag to send them to store
        newDataGenerated = true;
      }
    }
    
    if (newDataGenerated)
      return { 'movement.circles': newCircles };
  }
  
  // no need to check for the same circle values because we are going to generate new ones anyway
  handleTurnJoystickChanged() {
    var newCircles = {};
    
    for (let legId = 1; legId <= 6; legId++) {
      newCircles[legId] = this.processNewCircle(legId);
    }
    
    return { 'movement.circles': newCircles };
  }
  
  sameCoords(newCoords, oldCoords) {
    if (newCoords.sagittalCursorX !== oldCoords.sagittalCursorX ||
        newCoords.sagittalCursorY !== oldCoords.sagittalCursorY ||
        newCoords.sagittalBaseX !== oldCoords.sagittalBaseX ||
        newCoords.sagittalBaseY !== oldCoords.sagittalBaseY ||
        newCoords.transverseCursorX !== oldCoords.transverseCursorX ||
        newCoords.transverseCursorY !== oldCoords.transverseCursorY ||
        newCoords.transverseBaseX !== oldCoords.transverseBaseX ||
        newCoords.transverseBaseY !== oldCoords.transverseBaseY)
      // not same coords
      return false;
      
    // same coords
    return true;
  }
  
  processNewCircle(legId) {
    var misc = this.resolvePath('misc')[legId],
        metaData = this.resolveStatePath('metaData'),
        turnJoystick = this.resolvePath('movement.turnJoystick'),
        coords = this.resolvePath('coords')[legId],
        baseCenterCoords = this.resolvePath('base.centerCoords'),
        baseDirection = this.resolvePath('base.direction'),
        coxaAttachmentAngles = this.resolveStatePath('base.coxaAttachmentAngles')[legId];
        
    // circle fluent diameter and radius
    var fluentDiameter = misc.transverseReachRadius - metaData.impossibleRange,
        fluentRadius = fluentDiameter / 2;
        
    // circle solid diameter and radius
    var solidDiameter = 160,
        solidRadius = 80;
        
    // turn joystick is centered (neutral)
    if (!turnJoystick.normalizedX) {
      var fluentBaseX = coords.transverseBaseX,
          fluentBaseY = coords.transverseBaseY;
    }
    // turn joystick is not centered (active)
    else {
      let rotatedCoords = { x: coords.transverseBaseX, y: coords.transverseBaseY },
          rotationAngle = MU.flipNumber(turnJoystick.normalizedX);
          
      var { x: fluentBaseX, y: fluentBaseY } = MU.rotateCoords(baseCenterCoords, rotatedCoords, rotationAngle);
    }
    
    // calc fluent x/y
    {
      let fluentAngle = this.calcFluentAngle(coxaAttachmentAngles, baseDirection, turnJoystick),
          solidDistance = this.calcSolidDistance(metaData, solidRadius);
          
      var { x: fluentX, y: fluentY } = MU.getCoordsFromDistanceAndAngle(fluentBaseX, fluentBaseY, fluentAngle, solidDistance);
    }
    // calc solid x/y
    {
      let solidAngle = this.calcSolidAngle(coxaAttachmentAngles, baseDirection),
          fluentDistance = this.calcFluentDistance(metaData, misc.transverseReachRadius);
          
      var { x: solidX, y: solidY } = MU.getCoordsFromDistanceAndAngle(coords.transverseBaseX, coords.transverseBaseY, solidAngle, fluentDistance);
    }
    
    return {
      fluentTransverseBaseX: fluentBaseX,
      fluentTransverseBaseY: fluentBaseY,
      fluentX,
      fluentY,
      fluentDiameter,
      fluentRadius,
      solidX,
      solidY,
      solidDiameter,
      solidRadius
    };
  }
  
  calcFluentAngle(coxaAttachmentAngle, baseDirection, turnJoystick) {
    return coxaAttachmentAngle + baseDirection - turnJoystick.normalizedX;
  }
  
  // for when the leg is raised. the circle should have solid position so it does not move when the leg is raised
  calcSolidDistance(metaData, solidRadius) {
    return metaData.impossibleRange + solidRadius;
  }
  
  calcSolidAngle(coxaAttachmentAngle, baseDirection) {
    return coxaAttachmentAngle + baseDirection;
  }
  
  // distance to the center of the circle + offset from impossible range
  calcFluentDistance(metaData, transverseReachRadius) {
    return (metaData.impossibleRange + transverseReachRadius) / 2;
  }

}