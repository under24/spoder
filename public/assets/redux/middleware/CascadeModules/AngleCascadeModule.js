'use strict';

class AngleCascadeModule extends CascadeModule {

  constructor(store) {
    super(store);
    
    this.properties = {
      coords: 'coords'
    };
    
    // ['handler(dependency, dependency)', ...]
    this.observers = [
      'processNewAngles(coords)'
    ];
  }
  
  processNewAngles(newCoords) {
    var oldCoords = this.resolveStatePath('coords');

    var newAngles = {},
        oldAngles = this.resolveStatePath('angles');
        
    for (let legId = 1; legId <= 6; legId++) {
      // transverse coords -> coxa angles
      // if no changed coords then referrence the state object
      if (this.sameCoords(newCoords[legId], oldCoords[legId], 'transverse')) {
        var coxaAngles = {
          coxaScreenAngle: oldAngles[legId].coxaScreenAngle,
          coxaServoAngle: oldAngles[legId].coxaServoAngle,
        };
      }
      // some coords have changed. need to calculate angles
      else
        var coxaAngles = this.processNewCoxaAngles(legId);
      
      // sagittal coords -> femur + tibia angles
      // if no changed coords then referrence the state object
      if (this.sameCoords(newCoords[legId], oldCoords[legId], 'sagittal')) {
        var femurAndTibiaAngles = {
          femurScreenAngle: oldAngles[legId].femurScreenAngle,
          femurServoAngle: oldAngles[legId].femurServoAngle,
          tibiaScreenAngle: oldAngles[legId].tibiaScreenAngle,
          tibiaServoAngle: oldAngles[legId].tibiaServoAngle
        };
      }
      // some coords have changed. need to calculate angles
      else
        var femurAndTibiaAngles = this.processNewFemurAndTibiaAngles(legId);
      
      newAngles[legId] = Object.assign(coxaAngles, femurAndTibiaAngles);
    }
    
    debugger;
    return { 'angles': newAngles };
  }
  
  sameCoords(newCoords, oldCoords, view) {
    if (newCoords[`${view}CursorX`] !== oldCoords[`${view}CursorX`] ||
        newCoords[`${view}CursorY`] !== oldCoords[`${view}CursorY`] ||
        newCoords[`${view}BaseX`] !== oldCoords[`${view}BaseX`] ||
        newCoords[`${view}BaseY`] !== oldCoords[`${view}BaseY`])
      // not same coords
      return false;
      
    // same coords
    return true;
  }
  
  processNewCoxaAngles(legId) {
    var coxaAngles = this.getAngleFromDistance(legId, 'transverse');
        
    return {
      coxaScreenAngle: coxaAngles.screen,
      coxaServoAngle: this.applyCoxaAttachmentAngle(legId, coxaAngles.servo)
    };
  }
  
  getAngleFromDistance(legId, view) {
    var screen = MU.getAngle(this.getDY(legId, view), this.getDX(legId, view));
    
    return {
      screen: GU.correctAngle(screen),
      servo: GU.correctAngle(screen + 90)
    };
  }
  
  getDX(legId, view) {
    var coords = this.resolvePath('coords');
    
    return coords[legId][`${view}CursorX`] - coords[legId][`${view}BaseX`];
  }
  
  getDY(legId, view) {
    var coords = this.resolvePath('coords');
    
    return coords[legId][`${view}CursorY`] - coords[legId][`${view}BaseY`];
  }
  
  applyCoxaAttachmentAngle(legId, coxaServoAngle) {
    var coxaAttachmentAngles = this.resolveStatePath('base.coxaAttachmentAngles'),
        baseDirection = this.resolvePath('base.direction');
        
    // correct angle so it is 0 deg
    switch (legId) {
      case 1:
      case 2:
      // 3 is 0 so no need to add it
      case 4:
      case 5:
      case 6:
        coxaServoAngle -= coxaAttachmentAngles[legId]; break;
    }
    
    // coxa angle should be relative to the base direction
    coxaServoAngle = GU.correctAngle(coxaServoAngle - baseDirection);
    
    return +coxaServoAngle.toFixed(0);
  }
  
  processNewFemurAndTibiaAngles(legId) {
    // within reach
    if (this.targetWithinReach(legId, 'sagittal'))
      return this.calcForWithinReachMode(legId, 'sagittal');
    // out of reach
    else
      return this.calcForOutOfReachMode(legId, 'sagittal');
  }
  
  targetWithinReach(legId, view) {
    return this.getReachDistance(legId, view) > 0 ? false : true;
  }
  
  getReachDistance(legId, view) {
    var combinedLegsLength = this.resolveStatePath('metaData.combinedLegsLength');
    
    return this.getDistanceFromBaseToCursor(legId, view) - combinedLegsLength;
  }
  
  getDistanceFromBaseToCursor(legId, view) {
    return MU.getDistance(this.getDX(legId, view), this.getDY(legId, view));
  }
  
  calcForWithinReachMode(legId, view) {
    var femurAngles = this.getFemurAngle(legId, view),
        tibiaAngles = this.getTibiaAngle(legId, view);
    
    return {
      femurScreenAngle: femurAngles.screen,
      femurServoAngle: femurAngles.servo,
      tibiaScreenAngle: tibiaAngles.screen,
      tibiaServoAngle: tibiaAngles.servo
    }
  }
  
  getFemurAngle(legId, view) {
    var femurLength = this.resolveStatePath('metaData.femurLength'),
        tibiaLength = this.resolveStatePath('metaData.tibiaLength');
        
    var D1 = Math.atan2(this.getDY(legId, view), this.getDX(legId, view)),
        D2 = MU.lawOfCos(this.getDistanceFromBaseToCursor(legId, view), femurLength, tibiaLength);

    var A1 = D2 - D1;
    
    var A1Screen = A1 / Math.PI * -180,
        A1Servo = A1Screen + 90;
    
    return {
      // correct angle (-55 -> 305)
      screen: GU.correctAngle(A1Screen),
      // apply decimal precision
      servo: +A1Servo.toFixed(0)
    };
  }
  
  getTibiaAngle(legId, view) {
    var femurLength = this.resolveStatePath('metaData.femurLength'),
        tibiaLength = this.resolveStatePath('metaData.tibiaLength');
    
    var A2 = MU.lawOfCos(femurLength, tibiaLength, this.getDistanceFromBaseToCursor(legId, view));
    
    var A2Screen = 180 - (A2 / Math.PI * 180),
        A2Servo = A2Screen;
    
    return {
      screen: A2Screen,
      servo: +A2Servo.toFixed(0)
    };
  }
  
  calcForOutOfReachMode(legId, view) {
    var femurAngles = this.getAngleFromDistance(legId, view);
    
    return {
      femurScreenAngle: femurAngles.screen,
      femurServoAngle: +femurAngles.servo.toFixed(0),
      tibiaScreenAngle: 0,
      tibiaServoAngle: 0
    }
  }

}