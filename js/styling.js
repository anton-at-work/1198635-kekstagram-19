'use strict';

(function () {

  var DEFAULT_EFFECT_DEPTH = 100;
  var DEFAULT_SCALE_VALUE = 100;
  var MIN_SCALE_VALUE = 25;
  var MAX_SCALE_VALUE = 100;
  var SCALE_STEP = 25;

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

  var photoimg = document.querySelector('.img-upload__preview img');
  var photoEffectFieldset = document.querySelector('.effect-level');
  var photoEffectLine = document.querySelector('.effect-level__line');
  var photoEffectPin = document.querySelector('.effect-level__pin');
  var photoEffectDepth = document.querySelector('.effect-level__depth');
  var photoEffectLevel = document.querySelector('.effect-level__value');
  var photoEffectNone = document.querySelector('#effect-none');
  var effectRadios = document.querySelectorAll('.effects__radio');
  var photoScale = document.querySelector('.scale__control--value');
  var photoScalePlusBtn = document.querySelector('.scale__control--bigger');
  var photoScaleMinusBtn = document.querySelector('.scale__control--smaller');
  var scaleStyle = '';
  var effectStyle = '';

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

  window.setDefaultStyle = function () {
    setScale(DEFAULT_SCALE_VALUE);
    setEffect(DEFAULT_EFFECT_DEPTH, 'none');
    photoimg.className = '';
    photoEffectNone.checked = true;
    photoEffectFieldset.classList.add('hidden');
  };

})();
