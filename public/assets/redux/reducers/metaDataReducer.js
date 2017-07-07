'use strict';

let femurLength = 100;
let tibiaLength = 140;
let combinedLegsLength = femurLength + tibiaLength;
let impossibleRange = Math.abs(femurLength - tibiaLength);

let metaDataReducerInitState = {
  coxaLength: 20,
  femurLength,
  tibiaLength,
  combinedLegsLength,
  impossibleRange
};

const metaDataReducer = (state = metaDataReducerInitState, action) => {
  switch (action.type) {
    case "a":
    
  }
  return state;
}