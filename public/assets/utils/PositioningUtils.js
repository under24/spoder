'use strict';

let PositioningUtils = {
  getTransverseReachCoords(coords, metaData) {
    let scy = coords.sagittalCursorY;
    let radius = metaData.combinedLegsLength;
    let sbx = coords.sagittalBaseX;
    let sby = coords.sagittalBaseY
    let endX = sbx + Math.sqrt(radius * radius - (scy - sby) * (scy - sby));
    
    return {
      endX: endX,
      endY: scy,
      beginningX: coords.sagittalBaseX,
      beginningY: scy,
      possibleX: coords.sagittalBaseX + metaData.impossibleRange,
      possibleY: scy
    }
  },
  getTransverseLegLength(withinReach, dx, sbx, boundaryCoords) {
    if (withinReach) 
      return dx;
    else 
      return boundaryCoords.x - sbx;
  },
  getTransverseReachRadius(transverseReachCoords) {
    return transverseReachCoords.endX - transverseReachCoords.beginningX;
  },
  getTransverseAnimationCircleDiameter(transverseReachRadius, metaData) {
    return transverseReachRadius - metaData.impossibleRange;
  },
  getAnimationCenterCoords(metaData, coords, transverseReachRadius) {
    // distance to the center of the circle + offset from impossible range
    let distance = (transverseReachRadius + metaData.impossibleRange) / 2,
        finalCoords;
    
    if (coords.offsetRotation === 0)
      finalCoords = {
        x: coords.transverseBaseX + distance,
        y: coords.transverseBaseY
      };
    else {
      // if side == left => use original offset, if side == right => flip offset number (1 => -1)
      let angle;
      switch (coords.side) {
        case 'left':
          angle = coords.offsetRotation; break;
        case 'right':
          angle = Utils.flipNumber(coords.offsetRotation); break;
      }
      finalCoords = Utils.getCoordsFromDistanceAndAngle(coords.transverseBaseX, coords.transverseBaseY, angle, distance);
    }
    return finalCoords;
  }
}
