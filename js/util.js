'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var body = document.querySelector('body');
  var main = document.querySelector('main');
  var isEsc = function (evt) {
    return evt.keyCode === ESC_KEYCODE;
  };
  var isEnter = function (evt) {
    return evt.keyCode === ENTER_KEYCODE;
  };

  var showPopUp = function (type, message) {
    var popUp = window.render.popUp(type, message);
    var btnOk = popUp.querySelector('button');
    var closePopUp = function () {
      main.removeChild(popUp);
      document.removeEventListener('keydown', onEscPress);
    };
    var onEscPress = function (evt) {
      if (isEsc(evt)) {
        closePopUp();
      }
    };
    main.appendChild(popUp);
    btnOk.focus();
    document.addEventListener('keydown', onEscPress);
    popUp.addEventListener('click', closePopUp);
    btnOk.addEventListener('keydown', function (evt) {
      if (isEnter(evt)) {
        closePopUp();
      }
    });
  };

  window.util = {
    isEsc: isEsc,
    isEnter: isEnter,
    hideBodyScroll: function () {
      body.classList.add('modal-open');
    },
    showBodyScroll: function () {
      body.classList.remove('modal-open');
    },
    onError: function (message) {
      showPopUp('error', message);
    },
    onSuccess: function (message) {
      showPopUp('success', message);
    },
  };
})();
