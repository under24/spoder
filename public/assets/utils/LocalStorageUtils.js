'use strict';

// LSU == LocalStorageUtils
var LSU = {
  remove(item) {
    localStorage.removeItem(item);
  },
  get(item) {
    return localStorage.getItem(item);
  },
  save(key, payload) {
    // get settings from storage (if there are any)
    var localSettings = localStorage.getItem(key);
    
    // null (no such values in local storage)
    if (!localSettings) {
      localSettings = payload;
    }
    // something is present in the storage -> parse it
    else {
      // merge payload with storage settings
      localSettings = Object.assign({}, JSON.parse(localSettings), payload);
    }

    // convert settings to json and save back to local storage
    localStorage.setItem(key, JSON.stringify(localSettings));
  }
};