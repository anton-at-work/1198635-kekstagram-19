'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 500; // ms
  var ACTIVE_FILTER_CLASS = 'img-filters__button--active';

  var debounce = function (cb) {
    var lastTimeout = null;

    var parameters = arguments;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      cb.apply(null, parameters);
    }, DEBOUNCE_INTERVAL);

  };

  var filters = document.querySelector('.img-filters');
  var filterDefault = document.querySelector('#filter-default');
  var filterRandom = document.querySelector('#filter-random');
  var filterDiscussed = document.querySelector('#filter-discussed');

  var changeFilter = function (oldFilter, newFilter) {
    var photos = [];
    switch (oldFilter) {
      case filterDefault:
        photos = window.gallery.origin;
        break;
      case filterRandom:
        photos = [];
        break;
      case filterDiscussed:
        photos = [];
        break;
      default:
        return;
    }
    window.gallery.clear();
    newFilter.classList.remove(ACTIVE_FILTER_CLASS);
    oldFilter.classList.add(ACTIVE_FILTER_CLASS);
    window.gallery.add(photos);
  };

  filters.addEventListener('click', function (evt) {
    var filter = evt.target;
    var activeFilter = document.querySelector('.' + ACTIVE_FILTER_CLASS);
    if (activeFilter !== filter) {
      debounce(function () {
        changeFilter(filter, activeFilter);
      });
    }
  });


})();
