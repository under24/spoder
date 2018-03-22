'use strict';

class AngleConverterStateModule extends StateModule {
  
  processCoordsFromServoAngles(servoAngles) {
    var screenAngles = this._convertServoIntoScreenAngles(servoAngles);
    var coords = this._calcCoordsFromScreenAngles(screenAngles);
    
    return coords;
  }
  
  _convertServoIntoScreenAngles(servoAngles) {
    var coxaAttachmentAngles = this.resolveStatePath('base.coxaAttachmentAngles');
    
    var result = {};
    
    for (let legId = 1; legId <= 6; legId++) {
      result[legId] = {
        coxaScreenAngle: GU.correctAngle(servoAngles[legId].coxaServoAngle - 90 + coxaAttachmentAngles[legId]),
        femurScreenAngle: GU.correctAngle(servoAngles[legId].femurServoAngle - 90),
        tibiaScreenAngle: servoAngles[legId].tibiaServoAngle
      };
    }
    
    return result;
  }
  
  _calcCoordsFromScreenAngles(screenAngles) {
    var coords = this.resolveStatePath('coords'),
        metaData = this.resolveStatePath('metaData');
    
    var result = {};
    
    for (let legId = 1; legId <= 6; legId++) {
      // femur
      let sbx = coords[legId].sagittalBaseX,
          sby = coords[legId].sagittalBaseY,
          femurScreenAngle = screenAngles[legId].femurScreenAngle,
          femurLength = metaData.femurLength,
          femurEnd = MU.getCoordsFromDistanceAndAngle(sbx, sby, femurScreenAngle, femurLength);
      // tibia
      let tibiaScreenAngle = screenAngles[legId].tibiaScreenAngle,
          tibiaLength = metaData.tibiaLength,
          tibiaEnd = MU.getCoordsFromDistanceAndAngle(femurEnd.x, femurEnd.y, tibiaScreenAngle + femurScreenAngle, tibiaLength);
      // coxa
      let tbx = coords[legId].transverseBaseX,
          tby = coords[legId].transverseBaseY,
          coxaScreenAngle = screenAngles[legId].coxaScreenAngle,
          coxaLength = tibiaEnd.x - sbx,
          coxaEnd = MU.getCoordsFromDistanceAndAngle(tbx, tby, coxaScreenAngle, coxaLength);
      
      result[legId] = { femurEnd, tibiaEnd, coxaEnd };
    }
    
    return result;
  }
  
}