'use strict';

let Utils = {
  lawOfCos(a, b, c) {
  	return Math.acos((a * a + b * b - c * c) / (2 * a * b));
  },
  getDistance(x, y) {
    return Math.sqrt( x * x + y * y );
  },
  getAngle(diffY, diffX) {
    let atan2 = Math.atan2(diffY, diffX);
    return (atan2 > 0 ? atan2 : (2 * Math.PI + atan2)) * 360 / (2 * Math.PI);
  },
  roundNumber(num, scale) {
    if (!(String(num)).includes("e")) {
      return +(Math.round(num + "e+" + scale)  + "e-" + scale);
    } else {
      var arr = (String(num)).split("e");
      var sig = ""
      if (+arr[1] + scale > 0) {
        sig = "+";
      }
      return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
    }
  },
  flipNumber(num) {
    return num * -1;
  },
  getImpossibleRange(len1, len2) {
    return Math.abs(len1 - len2);
  },
  getCoordsFromDistanceAndAngle(x, y, angle, distance) {
    let resultX = Utils.roundNumber(Math.cos(angle * Math.PI / 180) * distance + x, 0);
    let resultY = Utils.roundNumber(Math.sin(angle * Math.PI / 180) * distance + y, 0);
    return {x: resultX, y: resultY};
  }
};
