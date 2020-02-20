'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var StatusCode = {
    OK: 200
  };

  window.load = function (onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      }
    });

    xhr.open('GET', URL);
    xhr.send();
  };
})();
