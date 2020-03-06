'use strict';

(function () {

  var deletePhotos = function () {
    document.querySelectorAll('.picture').forEach(function (it) {
      it.remove();
    });
  };

  var addPhotos = function (photos) {
    var fragment = document.createDocumentFragment();
    photos.forEach(function (it) {
      fragment.appendChild(window.render.photo(it));
    });
    document.querySelector('.pictures').appendChild(fragment);
  };

  var loadOriginGallery = function (photos) {
    window.gallery.origin = photos;
    addPhotos(photos);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  };

  window.gallery = {
    origin: [],
    add: addPhotos,
    clear: deletePhotos
  };

  window.load(loadOriginGallery);
})();
