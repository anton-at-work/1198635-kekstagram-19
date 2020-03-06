'use strict';

(function () {

  var renderPhoto = function (photo) {
    var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var photoElement = pictureTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

    return photoElement;
  };

  var renderComment = function (comment) {
    var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
    var commenElement = commentTemplate.cloneNode(true);

    commenElement.querySelector('.social__picture').src = comment.avatar;
    commenElement.querySelector('.social__picture').alt = comment.name;
    commenElement.querySelector('.social__text').textContent = comment.message;

    return commenElement;
  };

  window.render = {
    photo: renderPhoto,
    comment: renderComment
  };
})();
