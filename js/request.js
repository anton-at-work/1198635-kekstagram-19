'use strict';

(function () {

  window.request = function (type, url, data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    if (type === 'GET') {
      xhr.responseType = 'json';
    }
    xhr.addEventListener('load', function () {
      if (window.util.isStatusOK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    window.util.setTimeout(xhr);
    xhr.open(type, url);
    xhr.send(data);
  };
})();
