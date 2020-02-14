'use strict';

(function () {
  var TYPICAL_COMMENTS = ['Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var NAMES = ['Пушок', 'Барсик', 'Феликс', 'Базилио', 'Кекс', 'Том', 'Багира', 'Матроскин', 'Бегемот', 'Миссис Норрис', 'Зельда'];
  var MAX_PHOTOS = 25;
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var MAX_COMMENTS = 10;
  var MAX_AVATARS = 6;
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var DEFAULT_EFFECT_DEPTH = 20;
  var MAX_HASHTAGS = 5;
  var MIN_HASHTAGS_LENGTH = 2;
  var MAX_HASHTAGS_LENGTH = 20;
  var HASHTAG_PATTERN = '^#[а-яёa-z0-9]+$';

  var getRandomInteger = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  var getRandomElement = function (array) {
    return array[getRandomInteger(0, array.length - 1)];
  };

  var getComments = function () {
    var comments = [];
    var numberOfComments = getRandomInteger(0, MAX_COMMENTS);
    for (var j = 0; j < numberOfComments; j++) {
      comments.push(
          {
            avatar: 'img/avatar-' + getRandomInteger(1, MAX_AVATARS) + '.svg',
            message: getRandomElement(TYPICAL_COMMENTS),
            name: getRandomElement(NAMES)
          });
    }
    return comments;
  };

  var createTestPhotos = function () {
    var testPhotos = [];
    for (var i = 1; i <= MAX_PHOTOS; i++) {
      testPhotos.push(
          {
            url: 'photos/' + i + '.jpg',
            description: '',
            likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
            comments: getComments()
          });
    }
    return testPhotos;
  };

  var renderPhoto = function (photo) {
    var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var photoElement = pictureTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

    return photoElement;
  };

  var addPhotos = function (photos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPhoto(photos[i]));
    }
    document.querySelector('.pictures').appendChild(fragment);
  };

  addPhotos(createTestPhotos());

  var photoDialog = document.querySelector('.img-upload__overlay');
  var photoFile = document.querySelector('#upload-file');
  var photoClose = photoDialog.querySelector('#upload-cancel');
  var photoEffectLine = photoDialog.querySelector('.effect-level__line');
  var photoEffectPin = photoDialog.querySelector('.effect-level__pin');
  var photoEffectDepth = photoDialog.querySelector('.effect-level__depth');
  var effectItems = photoDialog.querySelectorAll('.effects__item');
  var hashtagInput = photoDialog.querySelector('.text__hashtags');
  var photoComment = photoDialog.querySelector('.text__description');

  var onPopupEscPress = function (evt) {
    if (evt.key === ESC_KEY && evt.target !== hashtagInput && evt.target !== photoComment) {
      closePopup();
    }
  };

  var openPopup = function () {
    photoDialog.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    photoDialog.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscPress);
    photoFile.value = '';
  };

  photoFile.addEventListener('change', openPopup);


  photoClose.addEventListener('click', closePopup);

  photoClose.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      closePopup();
    }
  });

  photoEffectLine.addEventListener('mouseup', function (evt) {
    evt.preventDefault();
    var lineCoords = photoEffectLine.getBoundingClientRect();
    var lineWidth = photoEffectLine.offsetWidth;
    var level = Math.round(100 * (evt.clientX - lineCoords.left) / lineWidth);
    photoEffectPin.style.left = level + '%';
    photoEffectDepth.style.width = level + '%';
  });

  for (var i = 0; i < effectItems.length; i++) {
    effectItems[i].addEventListener('click', function () {
      photoEffectPin.style.left = DEFAULT_EFFECT_DEPTH + '%';
      photoEffectDepth.style.width = DEFAULT_EFFECT_DEPTH + '%';
    });
  }

  hashtagInput.addEventListener('change', function () {
    var hashtagValidity = '';

    var hashtags = hashtagInput.value.trim().toLowerCase().split(' ');

    var hasDuplicates = function (array, element) {
      var firstIndex = array.indexOf(element);
      var lastIndex = array.lastIndexOf(element);
      if (firstIndex !== lastIndex) {
        return true;
      }
      return false;
    };

    if (hashtags.length <= MAX_HASHTAGS) {
      for (var l = 0; l < hashtags.length; l++) {
        if (hashtags[l].indexOf('#') !== 0) {
          hashtagValidity = 'Хэш-тег должен начинаться с решётки!';
        } else if (hashtags[l].length < MIN_HASHTAGS_LENGTH) {
          hashtagValidity = 'Хэш-тег слишком короткий!';
        } else if (hashtags[l].length > MAX_HASHTAGS_LENGTH) {
          hashtagValidity = 'Хэш-тег слишком длинный!';
        } else if (!RegExp(HASHTAG_PATTERN).test(hashtags[l])) {
          hashtagValidity = 'Хэш-тег содержит недопустимые символы!';
        } else if (hasDuplicates(hashtags, hashtags[l])) {
          hashtagValidity = 'Хэш-теги не должны повторяться!';
        }
      }
    } else {
      hashtagValidity = 'Слишком много хэш-тегов!';
    }
    hashtagInput.setCustomValidity(hashtagValidity);
  });

})();
