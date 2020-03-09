'use strict';

(function () {
  var LOADED_COMMENTS_COUNT = 5;

  var currentPhoto;
  var currentCommentIndex;

  var pictures = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var btnClose = document.querySelector('#picture-cancel');
  var bigPictureComments = bigPicture.querySelector('.social__comments');
  var bigPictureCommentLoader = bigPicture.querySelector('.comments-loader');

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

  var loadComments = function () {
    var bigPictureCurrentCommentsCount = bigPicture.querySelector('.current-comments-count');
    var fragment = document.createDocumentFragment();
    var finalCount = Math.min(currentCommentIndex + LOADED_COMMENTS_COUNT, currentPhoto.comments.length);
    for (var i = currentCommentIndex; i < finalCount; i++) {
      fragment.appendChild(window.render.comment(currentPhoto.comments[i]));
    }
    currentCommentIndex = i;
    if (currentCommentIndex >= currentPhoto.comments.length) {
      bigPictureCommentLoader.classList.add('hidden');
    }
    bigPictureCurrentCommentsCount.textContent = currentCommentIndex;
    bigPictureComments.appendChild(fragment);
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

    var photos = window.gallery.origin;
    for (var i = 0; i < photos.length; i++) {
      if (currentImg.src.indexOf(photos[i].url) > -1) {
        currentPhoto = photos[i];
        break;
      }
    }

    bigPictureImg.src = currentPhoto.url;
    bigPictureImg.alt = currentPhoto.description;
    bigPictureLikes.textContent = currentPhoto.likes;
    bigPictureCommentsCount.textContent = currentPhoto.comments.length;

    bigPictureCommentLoader.classList.remove('hidden');
    bigPictureComments.textContent = '';
    currentCommentIndex = 0;
    loadComments();

    bigPictureCaption.textContent = currentPhoto.description;
    // bigPictureSocialCommentCount.classList.add('hidden');

    bigPicture.classList.remove('hidden');
    window.util.hideBodyScroll();
    document.addEventListener('keydown', onPreviewEscPress);
    btnClose.addEventListener('click', closePreview);
    btnClose.addEventListener('keydown', onBtnCloseEnterPress);
    bigPictureCommentLoader.addEventListener('click', loadComments);
  };

  var closePreview = function () {
    bigPicture.classList.add('hidden');
    window.util.showBodyScroll();
    document.removeEventListener('keydown', onPreviewEscPress);
    btnClose.removeEventListener('click', closePreview);
    btnClose.removeEventListener('keydown', onBtnCloseEnterPress);
    bigPictureCommentLoader.removeEventListener('click', loadComments);
  };

  pictures.addEventListener('click', showPreview);
  pictures.addEventListener('keydown', function (evt) {
    if (window.util.isEnter(evt)) {
      showPreview(evt);
    }
  });

})();
