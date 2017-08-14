'use strict';

// RU == ReduxUtils
let RU = {
  aggregateCoords(state, payload) {
    let coords = Object.assign({}, state, payload);
    
    return {
      tcx: coords.transverseCursorX,
      tcy: coords.transverseCursorY,
      tbx: coords.transverseBaseX,
      tby: coords.transverseBaseY,

      scx: coords.sagittalCursorX,
      scy: coords.sagittalCursorY,
      sbx: coords.sagittalBaseX,
      sby: coords.sagittalBaseY
    };
  },
  // { tbx, tby, tcx, tcy }
  getTransverseBaseXYCompensativeCoords(coords) {
    // from center (zero) point to transverse base
    let sagittalBaseX = MU.getDistance(coords.tbx, coords.tby);
    // from transverse base to transverse cursor
    let sagittalCursorX = sagittalBaseX + MU.getDistance(coords.tbx - coords.tcx, coords.tby - coords.tcy);
    
    return { sagittalBaseX, sagittalCursorX };
  },
  getSagittalCursorXCompensativeCoords(coords) {
    let distance = coords.scx - coords.sbx,
        angle = MU.getAngle(coords.tcy - coords.tby, coords.tcx - coords.tbx),
        newCoords = MU.getCoordsFromDistanceAndAngle(coords.tbx, coords.tby, angle, distance);
    
    return {
      transverseCursorX: newCoords.x,
      transverseCursorY: newCoords.y
    };
  },
  getSagittalBaseXCompensativeCoords(coords) {
    let distance = coords.scx - coords.sbx,
        angle = MU.getAngle(coords.tby - coords.tcy, coords.tbx - coords.tcx),
        newCoords = MU.getCoordsFromDistanceAndAngle(coords.tcx, coords.tcy, angle, distance);
    
    return {
      transverseBaseX: newCoords.x,
      transverseBaseY: newCoords.y
    }
  },
  getBaseCenter(coords) {    
    let x1 = coords[1].transverseBaseX,
        y1 = coords[1].transverseBaseY,
        x2 = MU.flipNumber(coords[6].transverseBaseX),
        y2 = coords[6].transverseBaseY,
        x3 = MU.flipNumber(coords[2].transverseBaseX),
        y3 = coords[2].transverseBaseY,
        x4 = coords[5].transverseBaseX,
        y4 = coords[5].transverseBaseY;
    
﻿    let ua, ub, denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
    if (denom == 0) return null;
    
    ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
    ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;
    
    return {
        x: x1 + ua * (x2 - x1),
        y: y1 + ua * (y2 - y1),
        // seg1: ua >= 0 && ua <= 1,
        // seg2: ub >= 0 && ub <= 1
    }
  },
  getRotatedCoords(baseCoords, rotationAngle, coords) {
    let tbx;
    switch (coords.side) {
      case 'right':
        tbx = MU.flipNumber(coords.transverseBaseX); break;
      case 'left':
        tbx = coords.transverseBaseX; break;
    }
    
    let dx = tbx - baseCoords.x,
        dy = coords.transverseBaseY - baseCoords.y,
        distance = MU.getDistance(dx, dy),
        angle = MU.getAngle(dy, dx),
        rotatedCoords = MU.getCoordsFromDistanceAndAngle(baseCoords.x, baseCoords.y, angle + rotationAngle, distance);

    return {
      x: coords.side === 'right' ? MU.flipNumber(rotatedCoords.x) : rotatedCoords.x,
      y: rotatedCoords.y
    }
  }
}
