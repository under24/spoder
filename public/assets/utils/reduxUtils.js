'use strict';

let ReduxUtils = {
  aggregateCoords(payload, state) {
    let coords = {
      tcx: payload.transverseCursorX || state.transverseCursorX,
      tcy: payload.transverseCursorY || state.transverseCursorY,

      tbx: payload.transverseBaseX || state.transverseBaseX,
      tby: payload.transverseBaseY || state.transverseBaseY,

      scx: payload.sagittalCursorX || state.sagittalCursorX,
      scy: payload.sagittalCursorY || state.sagittalCursorY,

      sbx: payload.sagittalBaseX || state.sagittalBaseX,
      sby: payload.sagittalBaseY ||state.sagittalBaseY
    }
    return coords;
  },
  // { tbx, tby, tcx, tcy }
  getTransverseCompensativeCoords(coords) {
    // from center (zero) point to transverse base
    let sagittalBaseX = Utils.getDistance(coords.tbx, coords.tby);
    // from transverse base to transverse cursor
    let sagittalCursorX = sagittalBaseX + Utils.getDistance(coords.tbx - coords.tcx, coords.tby - coords.tcy);
    
    return {
      sagittalBaseX : Utils.roundNumber(sagittalBaseX, 0),
      sagittalCursorX: Utils.roundNumber(sagittalCursorX, 0)
    };
  },
  getSagittalCompensativeCoords(coords) {
    let distance = coords.scx - coords.sbx;
    let angle = Utils.getAngle(coords.tcy - coords.tby, coords.tcx - coords.tbx);
    
    let result = Utils.getCoordsFromDistanceAndAngle(coords.tbx, coords.tby, angle, distance);
    
    return {
      transverseCursorX: result.x,
      transverseCursorY: result.y
    };
  }
}