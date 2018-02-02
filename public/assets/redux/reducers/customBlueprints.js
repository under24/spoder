'use strict';

{
  let customBlueprintReducerInitState = {
    raiseOneLeg: {
      1: [{
        coordType: 'sagittalCursorX',
        startPct: 0,
        endPct: 50,
        pxlsToMove: 50
      },
      {
        coordType: 'sagittalCursorX',
        startPct: 50,
        endPct: 100,
        pxlsToMove: -50
      }]
    },
    engage: {
      
    },
    disengage: {
      
    },
    park: {
      
    }
  }

  var customBlueprintReducer = (state = customBlueprintReducerInitState, action) => {
    return state;
  }
}