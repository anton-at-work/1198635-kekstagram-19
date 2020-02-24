'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 300; // ms

  window.debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var filters = document.querySelector('.img-filters');
  var filterDefault = document.querySelector('#filter-default');
  var filterRandom = document.querySelector('#filter-random');
  var filterDiscussed = document.querySelector('#filter-discussed');

})();
