'use strict';

window.util = (function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var body = document.querySelector('body');

  return {
    isEsc: function (evt) {
      return evt.keyCode === ESC_KEYCODE;
    },
    isEnter: function (evt) {
      return evt.keyCode === ENTER_KEYCODE;
    },
    hideBodyScroll: function () {
      body.classList.add('modal-open');
    },
    showBodyScroll: function () {
      body.classList.remove('modal-open');
    }
  };
})();
