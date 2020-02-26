'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 500; // ms
  var MAX_RANDOM_PHOTOS = 10;
  var ACTIVE_FILTER_CLASS = 'img-filters__button--active';

  var getRandomInteger = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  var getRandomElement = function (array) {
    return array[getRandomInteger(0, array.length - 1)];
  };

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
    var photos = window.gallery.origin.slice();
    switch (oldFilter) {
      case filterDefault:
        break;
      case filterRandom:
        var randomPhotos = [];
        while (randomPhotos.length < MAX_RANDOM_PHOTOS) {
          var el = getRandomElement(photos);
          if (randomPhotos.indexOf(el) === -1) {
            randomPhotos.push(el);
          }
        }
        photos = randomPhotos;
        break;
      case filterDiscussed:
        photos.sort(function (left, right) {
          return right.comments.length - left.comments.length;
        });
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
