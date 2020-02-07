'use strict';

var getRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var mockAdsData = function () {
  var mockLength = 8;
  var mockArray = [];

  var typeOfHousing = ['palace', 'flat', 'house', 'bungalo'];
  var checkinTime = ['12:00', '13:00', '14:00'];
  var checkoutTime = ['12:00', '13:00', '14:00'];
  var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photosList = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  for (var i = 0; i < mockLength; i++) {
    var currentObj = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png',
      },
      location: {
        x: getRandomInteger(1, 1000),
        y: getRandomInteger(130, 630)
      },
      offer: {
        title: 'Заголовок предложения',
        address: '600, 350',
        price: (getRandomInteger(0, 100) * 100),
        type: typeOfHousing[getRandomInteger(0, 4)],
        rooms: getRandomInteger(1, 3),
        guests: getRandomInteger(0, 3),
        checkin: checkinTime[getRandomInteger(0, checkinTime.length - 1)],
        checkout: checkoutTime[getRandomInteger(0, checkoutTime.length - 1)],
        features: featuresList[getRandomInteger(0, featuresList.length - 1)],
        description: 'Это описание',
        photos: photosList = [getRandomInteger(0, photosList.length - 1)]
      }
    };
    mockArray.push(currentObj);
  }
  return mockArray;
};

var renderPin = function (pin) {
  var pinTemplateElement = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinElement = pinTemplateElement.cloneNode(true);

  var pointCoordinateX = (pin.location.x - 25);
  var pointCoordinateY = (pin.location.y - 65);
  pinElement.style.left = pointCoordinateX + 'px';
  pinElement.style.top = pointCoordinateY + 'px';
  var pinImage = pinElement.querySelector('img');
  pinImage.src = pin.author.avatar;
  pinImage.alt = pin.offer.title;

  return pinElement;
};

var renderAds = function () {
  var mapPinsElement = map.querySelector('.map__pins');
  var adsData = mockAdsData();
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adsData.length; i++) {
    fragment.appendChild(renderPin(adsData[i]));
  }
  mapPinsElement.appendChild(fragment);
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

renderAds();
