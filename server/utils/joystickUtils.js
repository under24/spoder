'use strict';

function normalizeLeftStickOutput(input) {
  var tempX = adaptCoords(input.x),
      tempY = adaptCoords(input.y);

  var x = tempX / (131 / 100),
      y = tempY / (131 / 100);

  return map(x / 100, y / 100);
  
  function adaptCoords(val) {
    if (val === 130 || val == 131 || val === 132)
      return 0;
    else if (val < 130)
      return 131 - val;
    else if (val > 132)
      return 124 - val;
  }
}

function normalizeRightStickOutput(input) {
  var tempX = adaptCoords(input.x),
      tempY = adaptCoords(input.y);

  var x = tempX / (129 / 100),
      y = tempY / (129 / 100);

  return map(x / 100, y / 100);
  
  function adaptCoords(val) {
    if (val === 128 || val === 129 || val === 130)
      return 0;
    else if (val < 128)
      return 129 - val;
    else if (val > 130)
      return 126 - val;
  }
}

// transforms rectangle (analog stick output) to circle
function map(x, y) {
  return {
    x: +((x * Math.sqrt(1 - y * y / 2)) * 100).toFixed(0),
    y: +((y * Math.sqrt(1 - x * x / 2)) * 100).toFixed(0)
  };
}

// export functiona
module.exports = {
  normalizeLeftStickOutput,
  normalizeRightStickOutput
};