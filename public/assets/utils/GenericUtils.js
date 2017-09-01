'use strict';

// GU == GenericUtils
let GU = {
  getSideFromLegId(legId) {
    switch (legId) {
      case 1:
      case 3:
      case 5:
        return "left";
      case 2:
      case 4:
      case 6:
        return "right";
    }
  }
}