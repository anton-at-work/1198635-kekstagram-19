'use strict';

(function () {

  window.renderPhoto = function (photo) {
    var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var photoElement = pictureTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

    return photoElement;
  };

})();
