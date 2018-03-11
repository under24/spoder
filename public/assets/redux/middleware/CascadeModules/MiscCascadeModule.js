'use strict';

try {
  var CascadeModule = require('../../../spodux/CascadeModule.js');
  var MU = require('../../../utils/MathUtils.js');
}
catch(e) {}

class MiscCascadeModule extends CascadeModule {

  constructor(store) {
    super(store);
    
    this.properties = {
      coords: 'coords'
    };
    
    this.observers = [
      'processNewMisc(coords)'
    ];
    
    this._prepareModule();
  }
  
  processNewMisc(newCoords) {
    var oldCoords = this.resolveStatePath('coords');
    
    var newMisc = {},
        oldMisc = this.resolveStatePath('misc');
        
    var newDataGenerated = false;
    
    for (let legId = 1; legId <= 6; legId++) {
      // if no changed coords then referrence the state object
      if (this.sameCoords(newCoords[legId], oldCoords[legId]))
        newMisc[legId] = oldMisc[legId];
      // some coords have changed. need to calculate misc
      else {
        newMisc[legId] = this.generateMiscData(legId);
        // some new values have been generated. set the flag to send them to store
        newDataGenerated = true;
      }
    }
    
    if (newDataGenerated)
      return { 'misc': newMisc };
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
  
  generateMiscData(legId) {
    var metaData = this.resolveStatePath('metaData'),
        newCoords = this.resolvePath('coords');
    
    // leg in sagittal view is in its range
    var sagittalWithinReach = this.targetWithinReach(legId, 'sagittal');
    
    // sagittal diff x/y
    var dx = this.getDX(legId, 'sagittal'),
        dy = this.getDY(legId, 'sagittal');
        
    // sagittal straight angle from base to cursor
    var angle = MU.getAngle(dy, dx),
        sbx = newCoords[legId].sagittalBaseX,
        sby = newCoords[legId].sagittalBaseY;
        
    // sagittal boundary ball xy
    var sagittalBoundaryBallCoords = MU.getCoordsFromDistanceAndAngle(sbx, sby, angle, metaData.combinedLegsLength);
    
    if (!sagittalWithinReach)
      var transverseReachCoords = this.getTransverseReachCoords(newCoords[legId], metaData, sagittalBoundaryBallCoords.y);
    else
      var transverseReachCoords = this.getTransverseReachCoords(newCoords[legId], metaData);

    return {
      sagittalDiff: { dx, dy },
      // sagittal distance from sagittal cursor x/y to sagittal base x/y
      sagittalDistance: MU.getDistance(dx, dy),
      sagittalAngle: angle,
      sagittalBoundaryBallCoords,
      transverseReachCoords,
      transverseReachRadius: this.getTransverseReachRadius(transverseReachCoords),
      transverseLegLength: this.getTransverseLegLength(sagittalWithinReach, dx, sbx, sagittalBoundaryBallCoords)
    };
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
  
  getDX(legId, view) {
    var coords = this.resolvePath('coords');
    
    return coords[legId][`${view}CursorX`] - coords[legId][`${view}BaseX`];
  }
  
  getDY(legId, view) {
    var coords = this.resolvePath('coords');
    
    return coords[legId][`${view}CursorY`] - coords[legId][`${view}BaseY`];
  }
  
  getTransverseReachCoords(coords, metaData, customScy) {
    var scy = customScy || coords.sagittalCursorY,
        radius = metaData.combinedLegsLength,
        sbx = coords.sagittalBaseX,
        sby = coords.sagittalBaseY,
        endX = sbx + Math.sqrt(radius * radius - (scy - sby) * (scy - sby));
    
    return {
      endX: endX,
      endY: scy,
      beginningX: coords.sagittalBaseX,
      beginningY: scy,
      possibleX: coords.sagittalBaseX + metaData.impossibleRange,
      possibleY: scy
    };
  }
  
  getTransverseReachRadius(transverseReachCoords) {
    return transverseReachCoords.endX - transverseReachCoords.beginningX;
  }
  
  getTransverseLegLength(withinReach, dx, sbx, boundaryCoords) {
    if (withinReach)
      return dx;
    else
      return boundaryCoords.x - sbx;
  }

}

// node environment export
try { module.exports = MiscCascadeModule }
catch(e) {}