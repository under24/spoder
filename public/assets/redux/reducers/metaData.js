'use strict';

{
  let femurLength = 100,
      tibiaLength = 140,
      combinedLegsLength = femurLength + tibiaLength,
      impossibleRange = Math.abs(femurLength - tibiaLength);

  let metaDataReducerInitState = {
    // coxaLength: 20,
    femurLength,
    tibiaLength,
    combinedLegsLength,
    impossibleRange
  };

  var metaDataReducer = (state = metaDataReducerInitState, action) => {
    return state;
  }
}

// node environment export
try { module.exports = metaDataReducer }
catch(e) {}