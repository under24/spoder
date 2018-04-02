'use strict';

var CascadeModule = require('../CascadeModule.js');
var MU = require('../../../../public/assets/shared/utils/MathUtils.js');
var GU = require('../../../../public/assets/shared/utils/GenericUtils.js');


class BaseCascadeModule extends CascadeModule {

  constructor(store) {
    super(store);
    
    this.settings = {
      disableConsoleLogging: true
    };
    
    this.properties = {
      coords: 'coords',
      baseCenterCoords: 'base.centerCoords'
    };
    
    this.observers = [
      'processNewBaseCenterCoords(coords)',
      'processNewBaseDirection(coords, baseCenterCoords)'
    ];
    
    this._prepareModule();
  }
  
  processNewBaseCenterCoords(coords) {
    var newBaseCenterCoords = MU.getBaseCenter(coords);
    
    // validation. check if the newly generated values differ from the ones we have in the state
    var oldBaseCenterCoords = this.resolveStatePath('base.centerCoords');
    if (oldBaseCenterCoords.x === newBaseCenterCoords.x &&
        oldBaseCenterCoords.y === newBaseCenterCoords.y) return;
    
    return { 'base.centerCoords': newBaseCenterCoords };
  }
  
  processNewBaseDirection(coords, baseCenterCoords) {
    var directionAngle = MU.getAngle(coords[3].transverseBaseY - baseCenterCoords.y, coords[3].transverseBaseX - baseCenterCoords.x);
    
    var newBaseDirection = GU.correctAngle(directionAngle);
    
    // validation. check if the newly generated values differ from the ones we have in the state
    var oldBaseDirection = this.resolveStatePath('base.direction');
    if (oldBaseDirection === newBaseDirection) return;
    
    return { 'base.direction': newBaseDirection };
  }

}

module.exports = (store) => new BaseCascadeModule(store);