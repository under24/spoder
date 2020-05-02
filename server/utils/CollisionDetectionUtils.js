'use strict';

var MU = require('../../public/assets/shared/utils/MathUtils.js');

// CDU === CollisionDetectionUtils
var CDU = {
  collisionPreventionRange: 10,
  collisionDetected(activeLegCoords, coords, legId) {    
    // determine closest to leg
    var closestLeg = this.determineClosestLeg(activeLegCoords, coords, legId);
    // console.log('closest:', closestLeg);
    
    var linesCross = CDU.linesCross(activeLegCoords, coords[closestLeg]);
    
    var collisionDistance = CDU.calcCollisionDistance(activeLegCoords, coords[closestLeg]);
    // console.log('collision distance:', collisionDistance);
    
    if (collisionDistance < this.collisionPreventionRange || linesCross)
      // collision detected
      return true;
    else
      // collision not detected
      return false;
  },
  // return [ leftAdjacentLeg, rightAdjacentLeg ]
  getAdjacentLegs(legId) {
    switch (legId) {
      case 1:
        return [2,3];
      case 2:
        return [4,1];
      case 3:
        return [1,5];
      case 4:
        return [6,2];
      case 5:
        return [3,6];
      case 6:
        return [5,4];
    }
  },
  linesCross(activeLegCoords, closestLegCoords) {
    return MU.linesCross(
      {
        startX: activeLegCoords.transverseBaseX,
        startY: activeLegCoords.transverseBaseY,
        endX: activeLegCoords.transverseCursorX,
        endY: activeLegCoords.transverseCursorY
      },
      {
        startX: closestLegCoords.transverseBaseX,
        startY: closestLegCoords.transverseBaseY,
        endX: closestLegCoords.transverseCursorX,
        endY: closestLegCoords.transverseCursorY
      }
    );
  },
  determineClosestLeg(activeLegCoords, coords, legId) {
    // get adjacent legs relative to the active one
    var adjacentLegs = CDU.getAdjacentLegs(legId),
        // active leg screen angle
        activeLegAngle = MU.getAngle(activeLegCoords.transverseBaseY - activeLegCoords.transverseCursorY, activeLegCoords.transverseBaseX - activeLegCoords.transverseCursorX);
        
    var leftLegDX = activeLegCoords.transverseBaseX - coords[adjacentLegs[0]].transverseCursorX,
        leftLegDY = activeLegCoords.transverseBaseY - coords[adjacentLegs[0]].transverseCursorY;
    var leftAdjacentLegAngle = MU.getAngle(leftLegDY, leftLegDX),
        leftAdjacentLegAngleDiff = Math.abs(leftAdjacentLegAngle - activeLegAngle);
        
    var rightLegDX = activeLegCoords.transverseBaseX - coords[adjacentLegs[1]].transverseCursorX,
        rightLegDY = activeLegCoords.transverseBaseY - coords[adjacentLegs[1]].transverseCursorY;
    var rightAdjacentLegAngle = MU.getAngle(rightLegDY, rightLegDX),
        rightAdjacentLegAngleDiff = Math.abs(rightAdjacentLegAngle - activeLegAngle);
        
    if (leftAdjacentLegAngleDiff < rightAdjacentLegAngleDiff)
      return adjacentLegs[0];
    else
      return adjacentLegs[1];
  },
  calcCollisionDistance(activeLegCoords, closestLegCoords) {
    var activeToClosestLeg = MU.closestPointOnLine(
      { x: activeLegCoords.transverseCursorX, y: activeLegCoords.transverseCursorY },
      [
        { x: closestLegCoords.transverseBaseX, y: closestLegCoords.transverseBaseY },
        { x: closestLegCoords.transverseCursorX, y: closestLegCoords.transverseCursorY }
      ]
    );
    var activeToClosestLegDistance = MU.getDistance(activeToClosestLeg.x - activeLegCoords.transverseCursorX, activeToClosestLeg.y - activeLegCoords.transverseCursorY);
    
    
    var closestToActiveLeg = MU.closestPointOnLine(
      { x: closestLegCoords.transverseCursorX, y: closestLegCoords.transverseCursorY },
      [
        { x: activeLegCoords.transverseBaseX, y: activeLegCoords.transverseBaseY },
        { x: activeLegCoords.transverseCursorX, y: activeLegCoords.transverseCursorY }
      ]
    );
    var closestToActiveLegDistance = MU.getDistance(closestToActiveLeg.x - closestLegCoords.transverseCursorX, closestToActiveLeg.y - closestLegCoords.transverseCursorY);
    
    if (activeToClosestLegDistance < closestToActiveLegDistance)
      return activeToClosestLegDistance;
    else
      return closestToActiveLegDistance;
  }
};

module.exports = CDU;