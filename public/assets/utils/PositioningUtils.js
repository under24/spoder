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
  getBaseCenter(leg1, leg6, leg2, leg5) {
    if (leg1 === undefined || leg6 === undefined || leg2 === undefined || leg5 === undefined) throw new Error();
    
    let x1 = leg1.transverseBaseX,
        y1 = leg1.transverseBaseY,
        x2 = Utils.flipNumber(leg6.transverseBaseX),
        y2 = leg6.transverseBaseY,
        x3 = Utils.flipNumber(leg2.transverseBaseX),
        y3 = leg2.transverseBaseY,
        x4 = leg5.transverseBaseX,
        y4 = leg5.transverseBaseY;
    
﻿    let ua, ub, denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
    if (denom == 0) return null;
    
    ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
    ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;
    
    return {
        x: x1 + ua * (x2 - x1),
        y: y1 + ua * (y2 - y1),
        seg1: ua >= 0 && ua <= 1,
        seg2: ub >= 0 && ub <= 1
    }
  },
  getRotatedCoords(baseCoords, rotation, angle, distance) {
    
  }
}
