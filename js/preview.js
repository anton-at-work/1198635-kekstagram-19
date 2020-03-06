'use strict';

(function () {

  var pictures = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var btnClose = document.querySelector('#picture-cancel');

  var onPreviewEscPress = function (evt) {
    if (window.util.isEsc(evt)) {
      closePreview();
    }
  };

  var onBtnCloseEnterPress = function (evt) {
    if (window.util.isEnter(evt)) {
      closePreview();
    }
  };

  var showPreview = function (evt) {
    var el = evt.target;
    if (!el.classList.contains('picture')) {
      el = el.closest('.picture');
    }
    if (!el) {
      return;
    }
    var currentImg = el.querySelector('.picture__img');
    var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
    var bigPictureCaption = bigPicture.querySelector('.social__caption');
    var bigPictureLikes = bigPicture.querySelector('.likes-count');
    var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
    var bigPictureComments = bigPicture.querySelector('.social__comments');
    var bigPictureSocialCommentCount = bigPicture.querySelector('.social__comment-count');
    var bigPictureCommentLoader = bigPicture.querySelector('.comments-loader');
    var photos = window.gallery.origin;
    for (var i = 0; i < photos.length; i++) {
      if (currentImg.src.indexOf(photos[i].url) > -1) {
        var currentPhoto = photos[i];
        break;
      }
    }

    bigPictureImg.src = currentPhoto.url;
    bigPictureImg.alt = currentPhoto.description;
    bigPictureLikes.textContent = currentPhoto.likes;
    bigPictureCommentsCount.textContent = currentPhoto.comments.length;

    var fragment = document.createDocumentFragment();
    currentPhoto.comments.forEach(function (it) {
      fragment.appendChild(window.render.comment(it));
    });
    bigPictureComments.appendChild(fragment);

    bigPictureCaption.textContent = currentPhoto.description;
    bigPictureSocialCommentCount.classList.add('hidden');
    bigPictureCommentLoader.classList.add('hidden');
    bigPicture.classList.remove('hidden');
    window.util.hideBodyScroll();
    document.addEventListener('keydown', onPreviewEscPress);
    btnClose.addEventListener('click', closePreview);
    btnClose.addEventListener('keydown', onBtnCloseEnterPress);
  };

  var closePreview = function () {
    bigPicture.classList.add('hidden');
    window.util.showBodyScroll();
    document.removeEventListener('keydown', onPreviewEscPress);
    btnClose.removeEventListener('click', closePreview);
    btnClose.removeEventListener('keydown', onBtnCloseEnterPress);
  };

  pictures.addEventListener('click', showPreview);
  pictures.addEventListener('keydown', function (evt) {
    if (window.util.isEnter(evt)) {
      showPreview(evt);
    }
  });

})();
