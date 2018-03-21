'use strict';

class Shared {

  register(alias, object) {
    this[alias] = object;
  }

  resolve(alias) {
    return this[alias];
  }

}

module.exports = function() {
  return new Shared;
};
