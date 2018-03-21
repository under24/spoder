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
  // flip the sign 10 -> -10
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
        
    var denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
        
    if (denom == 0) return null;
    
    var ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom,
        ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;
    
    return {
        x: x1 + ua * (x2 - x1),
        y: y1 + ua * (y2 - y1),
        // seg1: ua >= 0 && ua <= 1,
        // seg2: ub >= 0 && ub <= 1
    };
  },
  rotateCoords(rotationOrigin, rotatedCoords, rotationAngle) {
    var dx = rotatedCoords.x - rotationOrigin.x,
        dy = rotatedCoords.y - rotationOrigin.y,
        distance = MU.getDistance(dx, dy),
        angle = MU.getAngle(dy, dx) + rotationAngle;      
        
    // return { x, y }
    return MU.getCoordsFromDistanceAndAngle(rotationOrigin.x, rotationOrigin.y, angle, distance);
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
  // interceptOnCircle(p1, p2, c, r) {
  //   // shifted line points
  //   var p3 = { x: p1.x - c.x, y: p1.y - c.y },
  //       p4 = { x: p2.x - c.x, y: p2.y - c.y };
  //   // slope of the line
  //   var m = (p4.y - p3.y) / (p4.x - p3.x);
  //   // y-intercept of line
  //   var b = p3.y - m * p3.x;
  //   // the value under the square root sign
  //   var underRadical = Math.pow(r,2) * Math.pow(m,2) + Math.pow(r,2) - Math.pow(b,2);
  //   
  //   // line completely missed
  //   if (underRadical < 0)
  //     return null;
  //   // line is withit the circle
  //   else {
  //     var t1 = (-m * b + Math.sqrt(underRadical)) / (Math.pow(m,2) + 1), // one of the intercept x's
  //         t2 = (-m * b - Math.sqrt(underRadical)) / (Math.pow(m,2) + 1); // other intercept's x
  //         
  //         
  //     if (p1.x < p2.x)
  //       var result = { x: t2 + c.x, y: m * t2 + b + c.y }; // intercept point 1
  //     else
  //       var result = { x: t1 + c.x, y: m * t1 + b + c.y }; // intercept point 2
  //     
  //     return result;
  //   }
  // }
  lineIntersection(line1, line2) {
    var result = {
      x: null,
      y: null,
      onLine1: false,
      onLine2: false
    };
    
    var denominator = ((line2.endY - line2.startY) * (line1.endX - line1.startX)) - ((line2.endX - line2.startX) * (line1.endY - line1.startY));
    
    // completely missed
    if (denominator == 0) return result;
    
    var a = line1.startY - line2.startY;
    var b = line1.startX - line2.startX;
    
    var numerator1 = ((line2.endX - line2.startX) * a) - ((line2.endY - line2.startY) * b);
    var numerator2 = ((line1.endX - line1.startX) * a) - ((line1.endY - line1.startY) * b);
    
    a = numerator1 / denominator;
    b = numerator2 / denominator;

    // if we cast these lines infinitely in both directions, they intersect here:
    result.x = line1.startX + (a * (line1.endX - line1.startX));
    result.y = line1.startY + (a * (line1.endY - line1.startY));
        /*
        // it is worth noting that this should be the same as:
        x = line2.startX + (b * (line2.endX - line2.startX));
        y = line2.startX + (b * (line2.endY - line2.startY));
        */
    // if line1 is a segment and line2 is infinite, they intersect if:
    if (a > 0 && a < 1) {
        result.onLine1 = true;
    }
    // if line2 is a segment and line1 is infinite, they intersect if:
    if (b > 0 && b < 1) {
        result.onLine2 = true;
    }
    // if line1 and line2 are segments, they intersect if both of the above are true
    return result;
  },
  /* desc Static function. Find point on lines nearest test point
   test point pXy with properties .x and .y
   lines defined by array aXys with nodes having properties .x and .y 
   return is object with .x and .y properties and property i indicating nearest segment in aXys 
   and property fFrom the fractional distance of the returned point from aXy[i-1]
   and property fTo the fractional distance of the returned point from aXy[i]   
   */
  closestPointOnLine(pXy, aXys) {

    var minDist;
    var fTo;
    var fFrom;
    var x;
    var y;
    var i;
    var dist;

    if (aXys.length > 1) {

        for (var n = 1 ; n < aXys.length ; n++) {

            if (aXys[n].x != aXys[n - 1].x) {
                var a = (aXys[n].y - aXys[n - 1].y) / (aXys[n].x - aXys[n - 1].x);
                var b = aXys[n].y - a * aXys[n].x;
                dist = Math.abs(a * pXy.x + b - pXy.y) / Math.sqrt(a * a + 1);
            }
            else
                dist = Math.abs(pXy.x - aXys[n].x)

            // length^2 of line segment 
            var rl2 = Math.pow(aXys[n].y - aXys[n - 1].y, 2) + Math.pow(aXys[n].x - aXys[n - 1].x, 2);

            // distance^2 of pt to end line segment
            var ln2 = Math.pow(aXys[n].y - pXy.y, 2) + Math.pow(aXys[n].x - pXy.x, 2);

            // distance^2 of pt to begin line segment
            var lnm12 = Math.pow(aXys[n - 1].y - pXy.y, 2) + Math.pow(aXys[n - 1].x - pXy.x, 2);

            // minimum distance^2 of pt to infinite line
            var dist2 = Math.pow(dist, 2);

            // calculated length^2 of line segment
            var calcrl2 = ln2 - dist2 + lnm12 - dist2;

            // redefine minimum distance to line segment (not infinite line) if necessary
            if (calcrl2 > rl2)
                dist = Math.sqrt(Math.min(ln2, lnm12));

            if ((minDist == null) || (minDist > dist)) {
                if (calcrl2 > rl2) {
                    if (lnm12 < ln2) {
                        fTo = 0;//nearer to previous point
                        fFrom = 1;
                    }
                    else {
                        fFrom = 0;//nearer to current point
                        fTo = 1;
                    }
                }
                else {
                    // perpendicular from point intersects line segment
                    fTo = ((Math.sqrt(lnm12 - dist2)) / Math.sqrt(rl2));
                    fFrom = ((Math.sqrt(ln2 - dist2)) / Math.sqrt(rl2));
                }
                minDist = dist;
                i = n;
            }
        }

        var dx = aXys[i - 1].x - aXys[i].x;
        var dy = aXys[i - 1].y - aXys[i].y;

        x = aXys[i - 1].x - (dx * fTo);
        y = aXys[i - 1].y - (dy * fTo);

    }

    return { 'x': x, 'y': y, 'i': i, 'fTo': fTo, 'fFrom': fFrom };
  }
};

// node environment export
try { module.exports = MU }
catch(e) {}