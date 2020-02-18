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
  var DEFAULT_EFFECT_DEPTH = 100;
  var DEFAULT_SCALE_VALUE = 100;
  var MIN_SCALE_VALUE = 25;
  var MAX_SCALE_VALUE = 100;
  var SCALE_STEP = 25;
  var MAX_HASHTAGS = 5;
  var MIN_HASHTAGS_LENGTH = 2;
  var MAX_HASHTAGS_LENGTH = 20;
  var HASHTAG_PATTERN = '^#[а-яёa-z0-9]+$';
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var effectToStyle = {
    'chrome': 'effects__preview--chrome',
    'sepia': 'effects__preview--sepia',
    'marvin': 'effects__preview--marvin',
    'phobos': 'effects__preview--phobos',
    'heat': 'effects__preview--heat'
  };
  var effectToFilter = {
    'chrome': 'grayscale',
    'sepia': 'sepia',
    'marvin': 'invert',
    'phobos': 'blur',
    'heat': 'brightness'
  };
  var effectToUnit = {
    'chrome': '',
    'sepia': '',
    'marvin': '%',
    'phobos': 'px',
    'heat': ''
  };
  var effectToMin = {
    'chrome': 0,
    'sepia': 0,
    'marvin': 0,
    'phobos': 0,
    'heat': 1
  };
  var effectToMax = {
    'chrome': 1,
    'sepia': 1,
    'marvin': 100,
    'phobos': 3,
    'heat': 3
  };

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
    photos.forEach(function (it) {
      fragment.appendChild(renderPhoto(it));
    });
    document.querySelector('.pictures').appendChild(fragment);
  };

  addPhotos(createTestPhotos());

  var photoDialog = document.querySelector('.img-upload__overlay');
  var photoFile = document.querySelector('#upload-file');
  var photoimg = document.querySelector('.img-upload__preview img');
  var photoClose = photoDialog.querySelector('#upload-cancel');
  var photoEffectFieldset = photoDialog.querySelector('.effect-level');
  var photoEffectLine = photoDialog.querySelector('.effect-level__line');
  var photoEffectPin = photoDialog.querySelector('.effect-level__pin');
  var photoEffectDepth = photoDialog.querySelector('.effect-level__depth');
  var photoEffectLevel = photoDialog.querySelector('.effect-level__value');
  var photoEffectNone = photoDialog.querySelector('#effect-none');
  var effectRadios = photoDialog.querySelectorAll('.effects__radio');
  var hashtagInput = photoDialog.querySelector('.text__hashtags');
  var photoComment = photoDialog.querySelector('.text__description');
  var photoScale = photoDialog.querySelector('.scale__control--value');
  var photoScalePlusBtn = photoDialog.querySelector('.scale__control--bigger');
  var photoScaleMinusBtn = photoDialog.querySelector('.scale__control--smaller');
  var scaleStyle = '';
  var effectStyle = '';

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
      });
      reader.readAsDataURL(file);
    }

    photoDialog.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    photoDialog.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscPress);
    photoFile.value = '';
    photoimg.className = '';
    photoEffectNone.checked = true;
    photoEffectFieldset.classList.add('hidden');
    photoComment.textContent = '';
    setScale(DEFAULT_SCALE_VALUE);
    setEffect(DEFAULT_EFFECT_DEPTH, 'none');
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
    setEffect(level, document.querySelector('input[name="effect"]:checked').value);
  });

  var setEffectListner = function (radioButton, effect) {
    radioButton.addEventListener('change', function () {
      if (effect === 'none') {
        photoEffectFieldset.classList.add('hidden');
        photoimg.className = '';
      } else {
        photoEffectFieldset.classList.remove('hidden');
        photoimg.className = effectToStyle[effect];
      }
      setEffect(DEFAULT_EFFECT_DEPTH, effect);
    });
  };

  effectRadios.forEach(function (it) {
    setEffectListner(it, it.value);
  });

  var getScale = function () {
    return parseInt(photoScale.value, 10);
  };

  var setScale = function (value) {
    photoScale.value = value + '%';
    scaleStyle = 'transform: scale(' + value / 100 + '); ';
    updatePhotoStyle();
  };

  var setEffect = function (value, type) {
    photoEffectLevel.value = value;
    photoEffectPin.style.left = value + '%';
    photoEffectDepth.style.width = value + '%';

    effectStyle = '';
    if (type !== 'none') {
      var currentEffectlevel = effectToMin[type] + (effectToMax[type] - effectToMin[type]) * value / 100;
      effectStyle = 'filter: ' + effectToFilter[type] + '(' + currentEffectlevel + effectToUnit[type] + ');';
    }
    updatePhotoStyle();
  };

  var updatePhotoStyle = function () {
    photoimg.style = scaleStyle + effectStyle;
  };

  photoScalePlusBtn.addEventListener('click', function () {
    if (getScale() < MAX_SCALE_VALUE) {
      setScale(getScale() + SCALE_STEP);
    }
  });

  photoScaleMinusBtn.addEventListener('click', function () {
    if (getScale() > MIN_SCALE_VALUE) {
      setScale(getScale() - SCALE_STEP);
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
