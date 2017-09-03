'use strict';

// GU == GenericUtils
let GU = {
  getSideFromLegId(legId) {
    switch (legId) {
      case 1:
      case '1':
      case 3:
      case '3':
      case 5:
      case '5':
        return "left";
      case 2:
      case '2':
      case 4:
      case '4':
      case 6:
      case '6':
        return "right";
    }
  },
  getRowFromLegId(legId) {
    switch (legId) {
      case 1:
      case '1':
      case 2:
      case '2':
        return "front";
      case 3:
      case '3':
      case 4:
      case '4':
        return "middle";
      case 5:
      case '5':
      case 6:
      case '6':
        return "back";
    }
  }
}