'use strict';

let femurLength = 100;
let tibiaLength = 140;
let combinedLegsLength = femurLength + tibiaLength;
let impossibleRange = Math.abs(femurLength - tibiaLength);

let metaDataInitState = {
  coxaLength: 20,
  femurLength,
  tibiaLength,
  combinedLegsLength,
  impossibleRange
};

const metaDataReducer = (state = metaDataInitState, action) => {
  switch (action.type) {
    case "a":
    
  }
  return state;
}