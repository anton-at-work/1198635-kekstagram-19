'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var pictures = document.querySelector('.pictures');
  var photoPreview = document.querySelector('.big-picture');
  var previewClose = document.querySelector('#picture-cancel');

  var onPreviewEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
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
    var photoPreviewImg = photoPreview.querySelector('.big-picture__img img');
    var photoPreviewCaption = photoPreview.querySelector('.social__caption');
    var photoPreviewLikes = photoPreview.querySelector('.likes-count');
    var photoPreviewCommentsCount = photoPreview.querySelector('.comments-count');
    var photoPreviewComments = photoPreview.querySelector('.social__comments');
    var photoPreviewSocialCommentCount = photoPreview.querySelector('.social__comment-count');
    var photoPreviewCommentLoader = photoPreview.querySelector('.comments-loader');
    var photos = window.gallery.origin;
    for (var i = 0; i < photos.length; i++) {
      if (currentImg.src.indexOf(photos[i].url) > -1) {
        var currentPhoto = photos[i];
        break;
      }
    }

    photoPreviewImg.src = currentPhoto.url;
    photoPreviewImg.alt = currentPhoto.description;
    photoPreviewLikes.textContent = currentPhoto.likes;
    photoPreviewCommentsCount.textContent = currentPhoto.comments.length;
    var comments = '';
    currentPhoto.comments.forEach(function (it) {
      comments += '<li class="social__comment"><img class="social__picture" src="' +
      it.avatar + '" alt="' +
      it.name + '" width="35" height="35"><p class="social__text">' +
      it.message + '</p></li>';
    });
    photoPreviewComments.innerHTML = comments;
    photoPreviewCaption.textContent = currentPhoto.description;
    photoPreviewSocialCommentCount.classList.add('hidden');
    photoPreviewCommentLoader.classList.add('hidden');
    photoPreview.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onPreviewEscPress);
  };

  var closePreview = function () {
    photoPreview.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onPreviewEscPress);
  };

  pictures.addEventListener('click', showPreview);
  pictures.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      showPreview(evt);
    }
  });
  previewClose.addEventListener('click', closePreview);
  previewClose.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      closePreview();
    }
  });


})();
