'use strict';

let Utils = {
  lawOfCos(a, b, c) {
  	return Math.acos((a * a + b * b - c * c) / (2 * a * b));
  },
  getDistance(x, y) {
    return Math.sqrt( x * x + y * y );
  },
  getDegrees(y, x) {
    let atan2 = Math.atan2(y, x);
    return (atan2 > 0 ? atan2 : (2 * Math.PI + atan2)) * 360 / (2 * Math.PI);
  },
  flipNumber(n) {
    return n * -1;
  }
};

