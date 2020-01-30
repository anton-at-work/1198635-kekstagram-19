'use strict';

var fillWithTestData = function () {
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

  var getRandomInteger = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  var getRandomElement = function (array) {
    return array[getRandomInteger(0, array.length)];
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
};

fillWithTestData();
