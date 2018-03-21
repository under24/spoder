'use strict';

{
  let femurLength = 85, // 105 ?
      tibiaLength = 125,
      combinedLegsLength = femurLength + tibiaLength,
      impossibleRange = Math.abs(femurLength - tibiaLength);

  let metaDataReducerInitState = {
    // coxaLength: 20,
    femurLength,
    tibiaLength,
    combinedLegsLength,
    impossibleRange,
    centerXToMiddleBaseX: 65,
    centerXToFrontAndBackBaseX: 40,
    centerYToFrontAndBackBaseY: 75
  };

  var metaDataReducer = (state = metaDataReducerInitState, action) => {
    return state;
  }
}

// node environment export
try { module.exports = metaDataReducer }
catch(e) {}