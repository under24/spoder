'use strict';

var LogicReducer = require('../LogicReducer.js');
var MU = require('../../../../public/assets/shared/utils/MathUtils.js');

class AnalogJoystickLogicReducer extends LogicReducer {

  constructor(store) {
    super(store);
    
    this.settings = {
      disableConsoleLogging: true
    };
    
    this.actionObservers = [
      'processJoystickOutput(JOYSTICK_OUTPUT)'
    ];
    
    this._prepareModule();
  }
  
  processJoystickOutput(payload) {
    switch (payload.entity) {
      case 'joystickConnected':
        {
          let oldStatusJoystick = this.resolveStatePath('status.joystick');
          
          // no change in status is needed
          if (oldStatusJoystick.connected === true) return;
          
          return { 'status.joystick': Object.assign({}, oldStatusJoystick, { connected: true }) };
        }
      case 'joystickDisconnected':
        {
          let oldStatusJoystick = this.resolveStatePath('status.joystick');
          
          // no change in status is needed
          if (oldStatusJoystick.connected === false) return;
          
          return { 'status.joystick': Object.assign({}, oldStatusJoystick, { connected: false, charge: null }) };
        }
      case 'psxButtonPressed':
        {
          console.log('psxButtonPressed');
          break;
        }
      case 'startPressed': // flip sequencerEnabled
        {
          let oldMovementSettings = this.resolveStatePath('movement.settings');
          
          let newMovementSettings = Object.assign({}, oldMovementSettings, { sequencerEnabled: !oldMovementSettings.sequencerEnabled });
          
          return { 'movement.settings': newMovementSettings };
        }
      case 'selectPressed':
        {
          console.log('selectPressed');
          break;
        }
      case 'dpadLeftPressed':
        {
          console.log('dpadLeftPressed');
          break;
        }
      case 'dpadUpPressed':
        {
          console.log('dpadUpPressed');
          break;
        }
      case 'dpadRightPressed':
        {
          console.log('dpadRightPressed');
          break;
        }
      case 'dpadDownPressed':
        {
          console.log('dpadDownPressed');
          break;
        }
      case 'circlePressed':
        {
          console.log('circlePressed');
          break;
        }
      case 'trianglePressed':
        {
          console.log('trianglePressed');
          break;
        }
      case 'squarePressed':
        {
          console.log('squarePressed');
          break;
        }
      case 'xPressed':
        {
          console.log('xPressed');
          break;
        }
      case 'leftMoved':
        {
          let oldMovementDirectionJoystick = this.resolveStatePath('movement.directionJoystick');
          
          // validation. check if the payload and state values are the same
          if (oldMovementDirectionJoystick.x === payload.data.x && oldMovementDirectionJoystick.y === payload.data.y) return;
          
          let newMovementDirectionJoystick = payload.data;
          
          return { 'movement.directionJoystick': newMovementDirectionJoystick };
        }
      case 'rightMoved':
        {
          let oldMovementTurnJoystick = this.resolveStatePath('movement.turnJoystick');
          
          // validation. check if the payload and state values are the same
          if (oldMovementTurnJoystick.x === payload.data.x) return;
          
          // calc normalized x (joystick value * normalizer)
          let normalizedX = MU.normalize(payload.data.x, oldMovementTurnJoystick.normalizer);
          
          let newMovementTurnJoystick = Object.assign({}, oldMovementTurnJoystick, { x: payload.data.x, normalizedX });
          
          return { 'movement.turnJoystick': newMovementTurnJoystick };
        }
      case 'leftAnalogBumpPressed':
        {
          console.log('leftAnalogBumpPressed');
          break;
        }
      case 'rightAnalogBumpPressed':
        {
          console.log('rightAnalogBumpPressed');
          break;
        }
      case 'l1Pressed':
        {
          console.log('l1Pressed');
          break;
        }
      case 'l2Pressed':
        {
          console.log('l2Pressed');
          break;
        }
      case 'r1Pressed':
        {
          console.log('r1Pressed');
          break;
        }
      case 'r2Pressed':
        {
          console.log('r2Pressed');
          break;
        }
      case 'batteryChange':
        {
          let oldStatusJoystick = this.resolveStatePath('status.joystick');

          return { 'status.joystick': Object.assign({}, oldStatusJoystick, {charge: payload.data}) };
        }
      case 'rightLeftMotion':
        {
          console.log('rightLeftMotion', payload.data);
          break;
        }
      case 'forwardBackwardMotion':
        {
          console.log('forwardBackwardMotion', payload.data);
          break;
        }
    }
  }

}

module.exports = (store) => new AnalogJoystickLogicReducer(store);