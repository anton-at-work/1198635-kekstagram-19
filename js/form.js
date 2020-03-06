'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var photoFile = document.querySelector('#upload-file');
  var uploadDialog = document.querySelector('.img-upload__overlay');
  var uploadImg = uploadDialog.querySelector('.img-upload__preview img');
  var btnClose = uploadDialog.querySelector('#upload-cancel');
  var hashtagInput = uploadDialog.querySelector('.text__hashtags');
  var photoComment = uploadDialog.querySelector('.text__description');


  var onDialogEscPress = function (evt) {
    if (window.util.isEsc(evt) && evt.target !== hashtagInput && evt.target !== photoComment) {
      closeDialog();
    }
  };

  var onBtnCloseEnterPress = function (evt) {
    if (window.util.isEnter(evt)) {
      closeDialog();
    }
  };

  var openDialog = function () {
    var file = photoFile.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        uploadImg.src = reader.result;
        uploadDialog.classList.remove('hidden');
        window.util.hideBodyScroll();
        document.addEventListener('keydown', onDialogEscPress);
        btnClose.addEventListener('click', closeDialog);
        btnClose.addEventListener('keydown', onBtnCloseEnterPress);
        hashtagInput.addEventListener('change', window.hashtag.validate);
      });
      reader.readAsDataURL(file);
    }
  };

  var closeDialog = function () {
    uploadDialog.classList.add('hidden');
    window.util.showBodyScroll();
    document.removeEventListener('keydown', onDialogEscPress);
    btnClose.removeEventListener('click', closeDialog);
    btnClose.removeEventListener('keydown', onBtnCloseEnterPress);
    hashtagInput.removeEventListener('change', window.hashtag.validate);
    photoFile.value = '';
    photoComment.textContent = '';
    window.setDefaultStyle();
  };

  photoFile.addEventListener('change', openDialog);

})();
