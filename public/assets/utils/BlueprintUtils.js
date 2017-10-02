'use strict';

// BU == BlueprintUtils
let BU = {
  getStartAndEndPctBasedOnLegId(legId, gaits, type) {
    let gaitIndex = this.getGaitIndexFromLegId(legId, gaits, type),
        pctgs = this.mapGaitIndexToStartAndEndPct(gaitIndex);
    
    return pctgs;
  },
  getGaitIndexFromLegId(legId, gaits, type) {
    for (let i = 0; i < gaits[type].strokes.length; i++) {
      let result = gaits[type].strokes[i].indexOf(legId);
      if (result !== -1) 
        return i;
    }
  },
  mapGaitIndexToStartAndEndPct(index) {
    switch (index) {
      case 0:
        return { startPct: 0, endPct: 25 };
      case 1:
        return { startPct: 25, endPct: 50 };
      case 2:
        return { startPct: 50, endPct: 75 };
      case 3:
        return { startPct: 75, endPct: 100 };
    }
  }
}