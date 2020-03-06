'use strict';

(function () {

  var MAX_HASHTAGS = 5;
  var MIN_HASHTAGS_LENGTH = 2;
  var MAX_HASHTAGS_LENGTH = 20;
  var HASHTAG_PATTERN = '^#[а-яёa-z0-9]+$';

  var hashtagInput = document.querySelector('.text__hashtags');

  var hasDuplicates = function (array, element) {
    var firstIndex = array.indexOf(element);
    var lastIndex = array.lastIndexOf(element);
    return firstIndex !== lastIndex;
  };

  var hashtagInputValidate = function () {
    var hashtagValidity = '';

    var hashtags = hashtagInput.value.trim().toLowerCase().split(' ');

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
  };

  window.hashtag = {
    validate: hashtagInputValidate
  };

})();
