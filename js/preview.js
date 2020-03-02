'use strict';

(function () {

  window.preview = function () {
    var photoPreview = document.querySelector('.big-picture');
    var photoPreviewImg = photoPreview.querySelector('.big-picture__img img');
    var photoPreviewCaption = photoPreview.querySelector('.social__caption');
    var photoPreviewLikes = photoPreview.querySelector('.likes-count');
    var photoPreviewCommentsCount = photoPreview.querySelector('.comments-count');
    var photoPreviewComments = photoPreview.querySelector('.social__comments');
    var photoPreviewSocialCommentCount = photoPreview.querySelector('.social__comment-count');
    var photoPreviewCommentLoader = photoPreview.querySelector('.comments-loader');
    var currentPhoto = window.gallery.origin[0];

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
  };
})();
