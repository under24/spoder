'use strict';

// RU == ReduxUtils
let RU = {
  getBaseCenter(coords) {
    let x1 = coords[1].transverseBaseX,
        y1 = coords[1].transverseBaseY,
        x2 = MU.flipNumber(coords[6].transverseBaseX),
        y2 = coords[6].transverseBaseY,
        x3 = MU.flipNumber(coords[2].transverseBaseX),
        y3 = coords[2].transverseBaseY,
        x4 = coords[5].transverseBaseX,
        y4 = coords[5].transverseBaseY;
    
﻿    let ua, 
        ub, 
        denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

    if (denom == 0) return null;
    
    ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
    ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;
    
    return {
        x: x1 + ua * (x2 - x1),
        y: y1 + ua * (y2 - y1),
        // seg1: ua >= 0 && ua <= 1,
        // seg2: ub >= 0 && ub <= 1
    };
  },
  getRotatedCoords(baseCenterCoords, rotationAngle, coords, side) {    
    // use flipped values for the right side
    let tbx = side === 'right' ? MU.flipNumber(coords.transverseBaseX) : coords.transverseBaseX;
    
    let dx = tbx - baseCenterCoords.x,
        dy = coords.transverseBaseY - baseCenterCoords.y,
        distance = MU.getDistance(dx, dy),
        angle = MU.getAngle(dy, dx),
        rotatedCoords = MU.getCoordsFromDistanceAndAngle(baseCenterCoords.x, baseCenterCoords.y, angle + rotationAngle, distance);

    return {
      x: side === 'right' ? MU.flipNumber(rotatedCoords.x) : rotatedCoords.x,
      y: rotatedCoords.y
    };
  }
}
