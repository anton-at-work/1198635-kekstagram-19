'use strict';

var createTestPhotos = function () {
  var COMMENTS = ['Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var NAMES = ['Пушок', 'Барсик', 'Феликс', 'Мурзик', 'Кекс', 'Том', 'Багира', 'Матроскин', 'Бегемот', 'Миссис Норрис'];
  var MAX_PHOTOS = 25;
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var MAX_COMMENTS = 10;
  var MAX_AVATARS = 6;

  var testPhotos = [];
  for (var i = 1; i <= MAX_PHOTOS; i++) {
    var currentLikes = MIN_LIKES + Math.floor((MAX_LIKES - MIN_LIKES) * Math.random());
    var currentComments = [];
    var numberOfComments = Math.floor(MAX_COMMENTS * Math.random());
    for (var j = 0; j < numberOfComments; j++) {
      currentComments.push(
          {
            avatar: 'img/avatar-' + Math.floor(1 + (MAX_AVATARS - 1) * Math.random()) + '.svg',
            message: COMMENTS[Math.floor((COMMENTS.length - 1) * Math.random())],
            name: NAMES[Math.floor((NAMES.length - 1) * Math.random())]
          });
    }
    testPhotos.push(
        {
          url: 'photos/' + i + '.jpg',
          description: '',
          likes: currentLikes,
          comments: currentComments
        });
  }
  return testPhotos;
};


var list = document.querySelector('.pictures');

var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');


var renderPhoto = function (photo) {
  var photoElement = pictureTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

  return photoElement;
};

var photos = createTestPhotos();

var fragment = document.createDocumentFragment();
for (var i = 0; i < photos.length; i++) {
  fragment.appendChild(renderPhoto(photos[i]));

}
list.appendChild(fragment);
