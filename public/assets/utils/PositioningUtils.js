'use strict';

// PU == PositioningUtils
let PU = {
  getTransverseReachCoords(coords, metaData) {
    let scy = coords.sagittalCursorY,
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
  getMovementCircleDiameter(transverseReachRadius, metaData) {
    return transverseReachRadius - metaData.impossibleRange;
  },
  // getMovementCenterCoords(metaData, coords, transverseReachRadius) {
  //   // distance to the center of the circle + offset from impossible range
  //   let distance = (transverseReachRadius + metaData.impossibleRange) / 2,
  //       finalCoords;
  //   
  //   if (coords.offsetRotation === 0)
  //     finalCoords = {
  //       x: coords.transverseBaseX + distance,
  //       y: coords.transverseBaseY
  //     };
  //   else {
  //     // if side == left => use original offset, if side == right => flip offset number (1 => -1)
  //     let angle;
  //     switch (GU.getSideFromLegId(coords.legId)) {
  //       case 'left':
  //         angle = coords.offsetRotation; break;
  //       case 'right':
  //         angle = MU.flipNumber(coords.offsetRotation); break;
  //     }
  //     finalCoords = MU.getCoordsFromDistanceAndAngle(coords.transverseBaseX, coords.transverseBaseY, angle, distance);
  //   }
  //   return finalCoords;
  // }
}