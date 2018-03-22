'use strict';

var LogicReducer = require('../LogicReducer.js');

class StatusLogicReducer extends LogicReducer {

  constructor(store) {
    super(store);
    
    this.actionObservers = [
      'processArduinoStatus(ARDUINO_STATUS_CHANGED)',
      'processAnalogJoystickStatus(ANALOG_JOYSTICK_STATUS_CHANGED)',
      'processPrivilegesStatus(PRIVILEGES_STATUS_CHANGED)',
      'processSocketStatus(SOCKET_STATUS_CHANGED)'
    ];
    
    this._prepareModule();
  }
  
  processArduinoStatus() {
    var oldStatusArduino = this.resolveStatePath('status.arduino');
    
    return { 'status.arduino': Object.assign({}, oldStatusArduino, payload) };
  }
  
  processAnalogJoystickStatus() {
    var oldStatusJoystick = this.resolveStatePath('status.joystick');
    
    return { 'status.joystick': Object.assign({}, oldStatusJoystick, payload) };
  }
  
  processPrivilegesStatus() {
    var oldStatusPrivileges = this.resolveStatePath('status.privileges');
    
    return { 'status.privileges': Object.assign({}, oldStatusPrivileges, payload) };
  }
  
  processSocketStatus(payload, action) {
    var oldStatusSocket = this.resolveStatePath('status.socket');
    
    return { 'status.socket': Object.assign({}, oldStatusSocket, payload) };
  }

}

module.exports = StatusLogicReducer;