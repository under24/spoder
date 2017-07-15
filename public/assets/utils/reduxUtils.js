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
    let distance = coords.scx - coords.sbx;
    let angle = Utils.getAngle(coords.tcy - coords.tby, coords.tcx - coords.tbx);
    
    let result = Utils.getCoordsFromDistanceAndAngle(coords.tbx, coords.tby, angle, distance);
    
    return {
      transverseCursorX: result.x,
      transverseCursorY: result.y
    };
  },
  getSagittalBaseXCompensativeCoords(coords) {
    let distance = coords.scx - coords.sbx;
    let angle = Utils.getAngle(coords.tby - coords.tcy, coords.tbx - coords.tcx);
    
    let result = Utils.getCoordsFromDistanceAndAngle(coords.tcx, coords.tcy, angle, distance);
    
    return {
      transverseBaseX: result.x,
      transverseBaseY: result.y
    }
  },
  getLeftRightTilt(payload, state) {
    
    let furthestLeftLeg = state[3].sagittalBaseY - payload.rightTiltModifier;
    let furthestRightLeft = state[4].sagittalBaseY - payload.leftTiltModifier;
    
    let x1 = furthestLeftLeg;
    let x2 = furthestRightLeft;
    
    let y1 = -state[3].sagittalBaseX;
    let y2 = state[4].sagittalBaseX;
    
    let d = ((x1 - x2) / 2) / 150 * 100 + ((x1 + x2) / 2);
    let c = ((x2 - x1) / 2) / -150 * -100 + ((x1 + x2) / 2);
    
    
    console.log(d, c);
    
    return {
      
    }
  },
  getFrontBackTilt(payload, state) {
    
  }
}
