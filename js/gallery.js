'use strict';

(function () {

  var addPhotos = function (photos) {
    var fragment = document.createDocumentFragment();
    photos.forEach(function (it) {
      fragment.appendChild(window.renderPhoto(it));
    });
    document.querySelector('.pictures').appendChild(fragment);
  };

  window.load(addPhotos);

})();
