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
  },
  roundNumber(num, scale) {
    if (!(String(num)).includes("e")) {
      return +(Math.round(num + "e+" + scale)  + "e-" + scale);
    } else {
      var arr = (String(num)).split("e");
      var sig = ""
      if(+arr[1] + scale > 0) {
        sig = "+";
      }
      return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
    }
  },
  // closestNumber(num, arr) {
  //   let currentNumber = arr[0];
  //   let diff = Math.abs(num - currentNumber);
  //   for (let i = 0; i < arr.length; i++) {
  //       let newdiff = Math.abs(num - arr[i]);
  //       if (newdiff < diff) {
  //           diff = newdiff;
  //           currentNumber = arr[i];
  //       }
  //   }
  //   return currentNumber;
  // },
  runTicking(tps, amountOfTicks) {
    let n = 0;
    
    // debug timer
    let initTime = +new Date();
    let interval = setInterval(() => {
      n++;
      
      console.log('At', n, 'tick');
      console.log('----------------------');
      
      if (n >= amountOfTicks) {
        clearInterval(interval);
        
        // debug info
        console.log('Done ticking at', n);
        console.log('Time passed:',+new Date() - initTime);
      }
    }, 1000 / tps);
    
  }
};
