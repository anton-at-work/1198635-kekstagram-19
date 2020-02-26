'use strict';

(function () {

  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var MAX_HASHTAGS = 5;
  var MIN_HASHTAGS_LENGTH = 2;
  var MAX_HASHTAGS_LENGTH = 20;
  var HASHTAG_PATTERN = '^#[а-яёa-z0-9]+$';
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var photoDialog = document.querySelector('.img-upload__overlay');
  var photoFile = document.querySelector('#upload-file');
  var photoimg = document.querySelector('.img-upload__preview img');
  var photoClose = photoDialog.querySelector('#upload-cancel');
  var hashtagInput = photoDialog.querySelector('.text__hashtags');
  var photoComment = photoDialog.querySelector('.text__description');


  var onPopupEscPress = function (evt) {
    if (evt.key === ESC_KEY && evt.target !== hashtagInput && evt.target !== photoComment) {
      closePopup();
    }
  };

  var openPopup = function () {
    var file = photoFile.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        photoimg.src = reader.result;
        photoDialog.classList.remove('hidden');
        document.querySelector('body').classList.add('modal-open');
        document.addEventListener('keydown', onPopupEscPress);
      });
      reader.readAsDataURL(file);
    }
  };

  var closePopup = function () {
    photoDialog.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscPress);
    photoFile.value = '';
    photoComment.textContent = '';
    window.setDefaultStyle();
  };

  photoFile.addEventListener('change', openPopup);


  photoClose.addEventListener('click', closePopup);

  photoClose.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      closePopup();
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
