'use strict';

(function () {

  var MAX_HASHTAGS = 5;
  var MIN_HASHTAGS_LENGTH = 2;
  var MAX_HASHTAGS_LENGTH = 20;
  var HASHTAG_PATTERN = '^#[а-яёa-z0-9]+$';
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
      });
      reader.readAsDataURL(file);
    }
  };

  var closeDialog = function () {
    uploadDialog.classList.add('hidden');
    window.util.showBodyScroll();
    document.removeEventListener('keydown', onDialogEscPress);
    photoFile.value = '';
    photoComment.textContent = '';
    window.setDefaultStyle();
  };

  photoFile.addEventListener('change', openDialog);

  btnClose.addEventListener('click', closeDialog);

  btnClose.addEventListener('keydown', function (evt) {
    if (window.util.isEnter(evt)) {
      closeDialog();
    }
  });

  hashtagInput.addEventListener('change', function () {
    var hashtagValidity = '';

    var hashtags = hashtagInput.value.trim().toLowerCase().split(' ');

    var hasDuplicates = function (array, element) {
      var firstIndex = array.indexOf(element);
      var lastIndex = array.lastIndexOf(element);
      return firstIndex !== lastIndex;
    };

    if (hashtags.length <= MAX_HASHTAGS) {
      hashtags.forEach(function (it) {
        if (it.indexOf('#') !== 0) {
          hashtagValidity = 'Хэш-тег должен начинаться с решётки!';
        } else if (it.length < MIN_HASHTAGS_LENGTH) {
          hashtagValidity = 'Хэш-тег слишком короткий!';
        } else if (it.length > MAX_HASHTAGS_LENGTH) {
          hashtagValidity = 'Хэш-тег слишком длинный!';
        } else if (!RegExp(HASHTAG_PATTERN).test(it)) {
          hashtagValidity = 'Хэш-тег содержит недопустимые символы!';
        } else if (hasDuplicates(hashtags, it)) {
          hashtagValidity = 'Хэш-теги не должны повторяться!';
        }
      });
    } else {
      hashtagValidity = 'Слишком много хэш-тегов!';
    }
    hashtagInput.setCustomValidity(hashtagValidity);
  });

})();
