'use strict';

// PU == PositioningUtils
let PU = {
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
  //     switch (GU.getLegSide(coords.legId)) {
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