'use strict';

let ReduxUtils = {
  aggregateCoords(payload, state) {
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
    let sagittalBaseX = Utils.getDistance(coords.tbx, coords.tby);
    // from transverse base to transverse cursor
    let sagittalCursorX = sagittalBaseX + Utils.getDistance(coords.tbx - coords.tcx, coords.tby - coords.tcy);
    
    return {
      sagittalBaseX : Utils.roundNumber(sagittalBaseX, 0),
      sagittalCursorX: Utils.roundNumber(sagittalCursorX, 0)
    };
  },
  getSagittalCursorXCompensativeCoords(coords) {
    let distance = coords.scx - coords.sbx,
        angle = Utils.getAngle(coords.tcy - coords.tby, coords.tcx - coords.tbx),
        newCoords = Utils.getCoordsFromDistanceAndAngle(coords.tbx, coords.tby, angle, distance);
    
    return {
      transverseCursorX: newCoords.x,
      transverseCursorY: newCoords.y
    };
  },
  getSagittalBaseXCompensativeCoords(coords) {
    let distance = coords.scx - coords.sbx,
        angle = Utils.getAngle(coords.tby - coords.tcy, coords.tbx - coords.tcx),
        newCoords = Utils.getCoordsFromDistanceAndAngle(coords.tcx, coords.tcy, angle, distance);
    
    return {
      transverseBaseX: newCoords.x,
      transverseBaseY: newCoords.y
    }
  },
  getBaseCenter(coords) {    
    let x1 = coords[1].transverseBaseX,
        y1 = coords[1].transverseBaseY,
        x2 = Utils.flipNumber(coords[6].transverseBaseX),
        y2 = coords[6].transverseBaseY,
        x3 = Utils.flipNumber(coords[2].transverseBaseX),
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
  getRotatedCoords(baseCoords, rotation, coords) {
    let tbx;
    switch (coords.side) {
      case 'right':
        tbx = Utils.flipNumber(coords.transverseBaseX); break;
      case 'left':
        tbx = coords.transverseBaseX; break;
    }
    
    let dx = tbx - baseCoords.x,
        dy = coords.transverseBaseY - baseCoords.y,
        distance = Utils.getDistance(dx, dy),
        angle = Utils.getAngle(dy, dx),
        rotatedCoords = Utils.getCoordsFromDistanceAndAngle(baseCoords.x, baseCoords.y, angle + rotation, distance);

    return {
      x: coords.side === 'right' ? Utils.flipNumber(rotatedCoords.x) : rotatedCoords.x,
      y: rotatedCoords.y
    }
  }
}
