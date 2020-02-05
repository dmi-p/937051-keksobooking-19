'use strict';

var NUMBER_OF_ADS = [];
NUMBER_OF_ADS.length = 8;
var TYPE_OF_HOUSING = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_LIST = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var pinTemplateElement = document.querySelector('#pin').content.querySelector('.map__pin');

var getRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var mapPinsElement = map.querySelector('.map__pins');

var renderAds = function (ads) {
  for (var i = 0; i < ads.length; i++) {
    ads[i] = {
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
        type: TYPE_OF_HOUSING[getRandomInteger(0, 4)],
        rooms: getRandomInteger(1, 3),
        guests: getRandomInteger(0, 3),
        checkin: CHECKIN_TIME[getRandomInteger(0, CHECKIN_TIME.length - 1)],
        checkout: CHECKOUT_TIME[getRandomInteger(0, CHECKOUT_TIME.length - 1)],
        features: FEATURES_LIST[getRandomInteger(0, FEATURES_LIST.length - 1)],
        description: 'Это описание',
        photos: PHOTOS_LIST = [getRandomInteger(0, PHOTOS_LIST.length - 1)]
      }
    };
    var renderPin = function (pin) {
      var pinElement = pinTemplateElement.cloneNode(true);
      var renderPointCoordinateX = (pin.location.x - 25);
      var renderPointCoordinateY = (pin.location.y - 65);
      pinElement.style = 'left: ' + renderPointCoordinateX + 'px; ' + 'top: ' + renderPointCoordinateY + 'px;';
      var pinImage = pinElement.querySelector('img');
      pinImage.src = pin.author.avatar;
      pinImage.alt = pin.offer.title;

      return pinElement;
    };

  }
  var fragment = document.createDocumentFragment();
  for (i = 0; i < ads.length; i++) {
    fragment.appendChild(renderPin(ads[i]));
  }
  mapPinsElement.appendChild(fragment);
};

renderAds(NUMBER_OF_ADS);
