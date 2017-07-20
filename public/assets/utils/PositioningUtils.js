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
    if (withinReach) return dx;
    else return boundaryCoords.x - sbx;
  },
  getTransverseReachRadius(transverseReachCoords) {
    return transverseReachCoords.endX - transverseReachCoords.beginningX;
  },
  getTransverseAnimationCircleDiameter(transverseReachRadius, metaData) {
    return transverseReachRadius - metaData.impossibleRange;
  }
}
