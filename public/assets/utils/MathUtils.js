'use strict';

// MU == MathUtils
var MU = {
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
  },
  // used for scaling view output data
  scaleUpOutput(pct, num) {
    return num * 100 / pct;
  },
  // used for scaling view input data
  scaleDownInput(pct, num) {
    return num / 100 * pct;
  },
  // used for mapping joystick values
  normalize(value, normalizer) {
    return this.roundNumber(value * normalizer, 2);
  },
  getBaseCenter(coords) {
    var x1 = coords[1].transverseBaseX,
        y1 = coords[1].transverseBaseY,
        x2 = coords[6].transverseBaseX,
        y2 = coords[6].transverseBaseY,
        x3 = coords[2].transverseBaseX,
        y3 = coords[2].transverseBaseY,
        x4 = coords[5].transverseBaseX,
        y4 = coords[5].transverseBaseY;
    
﻿    var ua,
        ub,
        denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

    if (denom == 0) return null;
    
    ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
    ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;
    
    return {
        x: x1 + ua * (x2 - x1),
        y: y1 + ua * (y2 - y1),
        // seg1: ua >= 0 && ua <= 1,
        // seg2: ub >= 0 && ub <= 1
    };
  },
  getRotatedCoords(baseCenterCoords, rotationAngle, coords) {
    var dx = coords.transverseBaseX - baseCenterCoords.x,
        dy = coords.transverseBaseY - baseCenterCoords.y,
        distance = MU.getDistance(dx, dy),
        angle = MU.getAngle(dy, dx);
        
    var rotatedCoords = MU.getCoordsFromDistanceAndAngle(baseCenterCoords.x, baseCenterCoords.y, angle + rotationAngle, distance);

    return {
      x: rotatedCoords.x,
      y: rotatedCoords.y
    };
  },
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
  // p1 is the first line point
  // p2 is the second line point
  // c is the circle's center
  // r is the circle's radius
  interceptOnCircle(p1, p2, c, r) {
    // shifted line points
    var p3 = { x: p1.x - c.x, y: p1.y - c.y },
        p4 = { x: p2.x - c.x, y: p2.y - c.y };
  
    // slope of the line
    var m = (p4.y - p3.y) / (p4.x - p3.x);
    // y-intercept of line
    var b = p3.y - m * p3.x;
  
    var underRadical = Math.pow(r,2) * Math.pow(m,2) + Math.pow(r,2) - Math.pow(b,2); // the value under the square root sign
  
    // line completely missed
    if (underRadical < 0) 
      return null;
    // line is withit the circle
    else {
      var t1 = (-m * b + Math.sqrt(underRadical)) / (Math.pow(m,2) + 1), // one of the intercept x's
          t2 = (-m * b - Math.sqrt(underRadical)) / (Math.pow(m,2) + 1); // other intercept's x
          
          
      if (p1.x < p2.x)
        var result = { x: t1 + c.x, y: m * t1 + b + c.y }; // intercept point 1
      else
        var result = { x: t2 + c.x, y: m * t2 + b + c.y }; // intercept point 2
      
      return result;
    }
  }
};
