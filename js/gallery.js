'use strict';

(function () {

  var addPhotos = function (photos) {
    var fragment = document.createDocumentFragment();
    photos.forEach(function (it) {
      fragment.appendChild(window.renderPhoto(it));
    });
    document.querySelector('.pictures').appendChild(fragment);
  };

  var loadOriginGallery = function (photos) {
    window.gallery = photos;
    addPhotos(photos);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  };

  window.load(loadOriginGallery);

})();
