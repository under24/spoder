'use strict';

// BU == BlueprintUtils
let BU = {
  getStartAndEndPctBasedOnLegId(legId) {
    switch (legId) {
      case 1:
      case 6:
        return { startPct: 50, endPct: 75 };
      case 2:
      case 5:
        return { startPct: 0, endPct: 25 };
      case 3:
        return { startPct: 25, endPct: 50 };
      case 4:
        return { startPct: 75, endPct: 100 };
    }
  }
}