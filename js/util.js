'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  var body = document.querySelector('body');
  var main = document.querySelector('main');

  window.util = {
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
    },
    onError: function (message) {
      main.appendChild(window.render.popUp('error', message));
    },
    onSuccess: function (message) {
      main.appendChild(window.render.popUp('success', message));
    },
    isStatusOK: function (xhr) {
      return xhr.status === StatusCode.OK;
    },
    setTimeout: function (xhr) {
      xhr.timeout = TIMEOUT_IN_MS;
    }
  };
})();
