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
  }
}