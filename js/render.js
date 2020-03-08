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
    var commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;

    return commentElement;
  };

  var renderPopUp = function (template, message) {
    var popUpTemplate = document.querySelector('#' + template).content.querySelector('.' + template);
    var popUpElement = popUpTemplate.cloneNode(true);

    popUpElement.querySelector('.' + template + '__title').textContent = message;

    return popUpElement;
  };

  window.render = {
    photo: renderPhoto,
    comment: renderComment,
    popUp: renderPopUp
  };
})();
