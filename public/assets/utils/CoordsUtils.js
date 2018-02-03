'use strict';

// CU == CoordsUtils
var CU = {
  aggregateCoords(state, payload, additional) {
    var coords = Object.assign({}, state, payload, additional);
    
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
  // compensative computations from transverse coords for sagittal
  // input : transverseCursorX + transverseCursorY (+ tbx, tby)
  // output : sagittalCursorX + sagittalBaseX
  getTransverseBaseXYCompensativeCoords(coords) {
    // from center (zero) point to transverse base
    var sagittalBaseX = MU.getDistance(coords.tbx, coords.tby),
        // from transverse base to transverse cursor
        sagittalCursorX = sagittalBaseX + MU.getDistance(coords.tbx - coords.tcx, coords.tby - coords.tcy);
    
    return { sagittalBaseX, sagittalCursorX };
  },
  // compensative computations from sagittal coords for transverse
  // input: sagittalCursorX
  // output : transverseCursorX + transverseCursorY
  getSagittalCursorXCompensativeCoords(coords) {
    var distance = coords.scx - coords.sbx,
        angle = MU.getAngle(coords.tcy - coords.tby, coords.tcx - coords.tbx),
        newCoords = MU.getCoordsFromDistanceAndAngle(coords.tbx, coords.tby, angle, distance);
    
    return {
      transverseCursorX: newCoords.x,
      transverseCursorY: newCoords.y
    };
  },
  // compensative computations from sagittal coords for transverse
  // input: sagittalBaseX
  // output : transverseBaseX + transverseBaseY
  getSagittalBaseXCompensativeCoords(coords) {
    var distance = coords.scx - coords.sbx,
        angle = MU.getAngle(coords.tby - coords.tcy, coords.tbx - coords.tcx),
        newCoords = MU.getCoordsFromDistanceAndAngle(coords.tcx, coords.tcy, angle, distance);
    
    return {
      transverseBaseX: newCoords.x,
      transverseBaseY: newCoords.y
    };
  }
}