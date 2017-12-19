'use strict';

// MU == MathUtils
let MU = {
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
    return {
      x: Math.cos(angle * Math.PI / 180) * distance + x, 
      y: Math.sin(angle * Math.PI / 180) * distance + y
    };
  },
  // returns true if the value is close to 0
  empty(num) {
    return -0.01 < num && num < 0.01;
  },
  // return true if the value is not close to 0
  notEmpty(num) {
    return !this.empty(num);
  }
  // interceptOnCircleOrig(p1, p2, c, r) {
  //   //p1 is the first line point
  //   //p2 is the second line point
  //   //c is the circle's center
  //   //r is the circle's radius
  // 
  //   var p3 = {x:p1.x - c.x, y:p1.y - c.y}; //shifted line points
  //   var p4 = {x:p2.x - c.x, y:p2.y - c.y};
  // 
  //   var m = (p4.y - p3.y) / (p4.x - p3.x); //slope of the line
  //   var b = p3.y - m * p3.x; //y-intercept of line
  // 
  //   var underRadical = Math.pow(r,2)*Math.pow(m,2) + Math.pow(r,2) - Math.pow(b,2); //the value under the square root sign
  // 
  //   if (underRadical < 0) {
  //       //line completely missed
  //       return false;
  //   } else {
  //       var t1 = (-m*b + Math.sqrt(underRadical))/(Math.pow(m,2) + 1); //one of the intercept x's
  //       var t2 = (-m*b - Math.sqrt(underRadical))/(Math.pow(m,2) + 1); //other intercept's x
  //       var i1 = {x:t1+c.x, y:m*t1+b+c.y}; //intercept point 1
  //       var i2 = {x:t2+c.x, y:m*t2+b+c.y}; //intercept point 2
  //       return [i1, i2];
  //   }
  // },
  // interceptOnCircle(p1, p2, c, r) {
  //   //p1 is the first line point
  //   //p2 is the second line point
  //   //c is the circle's center
  //   //r is the circle's radius
  // 
  //   var p3 = {x:p1.x - c.x, y:p1.y - c.y}; //shifted line points
  //   var p4 = {x:p2.x - c.x, y:p2.y - c.y};
  // 
  //   var m = (p4.y - p3.y) / (p4.x - p3.x); //slope of the line
  //   debugger;
  //   var b = p3.y - m * p3.x; //y-intercept of line
  // 
  //   var underRadical = Math.pow(r,2)*Math.pow(m,2) + Math.pow(r,2) - Math.pow(b,2); //the value under the square root sign
  // 
  //   if (underRadical < 0) {
  //       //line completely missed
  //       return false;
  //   } else {
  //       var t1 = (-m*b + Math.sqrt(underRadical))/(Math.pow(m,2) + 1); //one of the intercept x's
  //       var t2 = (-m*b - Math.sqrt(underRadical))/(Math.pow(m,2) + 1); //other intercept's x
  //       // var i1 = {x:t1+c.x, y:m*t1+b+c.y}; //intercept point 1
  //       var i2 = {x:t2+c.x, y:m*t2+b+c.y}; //intercept point 2
  //       return i2;
  //   }
  // }
};
