'use strict';

let Utils = {
  lawOfCos(a, b, c) {
  	return Math.acos((a * a + b * b - c * c) / (2 * a * b));
  },
  getDistance(dx, dy) {
    return Math.sqrt( dx * dx + dy * dy );
  },
  getAngle(dy, dx) {
    let atan2 = Math.atan2(dy, dx);
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
  getCoordsFromDistanceAndAngle(x, y, angle, distance) {
    let resultX = Math.cos(angle * Math.PI / 180) * distance + x;
    let resultY = Math.sin(angle * Math.PI / 180) * distance + y;
    
    return {
      x: Utils.roundNumber(resultX, 0), 
      y: Utils.roundNumber(resultY, 0)
    };
  }
};
