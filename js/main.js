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
  var $pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var $pin = $pinTemplate.cloneNode(true);

  var pointCoordinateX = (pin.location.x - 25);
  var pointCoordinateY = (pin.location.y - 65);
  $pin.style.left = pointCoordinateX + 'px';
  $pin.style.top = pointCoordinateY + 'px';
  var $pinImage = $pin.querySelector('img');
  $pinImage.src = pin.author.avatar;
  $pinImage.alt = pin.offer.title;

  return $pin;
};

var renderAds = function () {
  var $mapPins = $map.querySelector('.map__pins');
  var adsData = mockAdsData();
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adsData.length; i++) {
    fragment.appendChild(renderPin(adsData[i]));
  }
  $mapPins.appendChild(fragment);
};

var $map = document.querySelector('.map');

var $mapFiltersForm = document.querySelector('.map__filters');
var $mapFiltersSelects = $mapFiltersForm.querySelectorAll('select');
var $mapFiltersFieldset = $mapFiltersForm.querySelector('fieldset');
var $adForm = document.querySelector('.ad-form');
var $adFormFieldsets = $adForm.querySelectorAll('fieldset');
var $mapPinMain = $map.querySelector('.map__pin--main');
var $roomNumber = $adForm.querySelector('#room_number');
var $capacity = $adForm.querySelector('#capacity');

var ENTER_KEY = 'Enter';

var disableForms = function () {
  $mapFiltersFieldset.setAttribute('disabled', 'disabled');
  for (var i = 0; i < $mapFiltersSelects.length; i++) {
    $mapFiltersSelects[i].setAttribute('disabled', 'disabled');
  }

  // for (i = 0; i < $adFormFieldsets.length; i++) {
  //   $adFormFieldsets[i].setAttribute('disabled', 'disabled');
  // }
  $map.classList.add('map--faded');
};

var $adFormAddressField = $adForm.querySelector('#address');

var mainPinWidth = 30;
var mainPinHeight = 75;
var DEFAULT_MAIN_PIN_COORDINATE_X = 570 - mainPinWidth;
var DEFAULT_MAIN_PIN_COORDINATE_Y = 375 - mainPinHeight;

var addCoordinates = function () {
  var leftCoorinate = DEFAULT_MAIN_PIN_COORDINATE_X;
  var topCoordinate = DEFAULT_MAIN_PIN_COORDINATE_Y;

  $adFormAddressField.value = leftCoorinate + ', ' + topCoordinate;
};

var ableForms = function (evt) {
  if ((evt.button === 0) || (evt.key === ENTER_KEY)) {
    $map.classList.remove('map--faded');
    $mapFiltersFieldset.removeAttribute('disabled');
    for (var i = 0; i < $mapFiltersSelects.length; i++) {
      $mapFiltersSelects[i].removeAttribute('disabled');
    }
    for (i = 0; i < $adFormFieldsets.length; i++) {
      $adFormFieldsets[i].removeAttribute('disabled');
    }
    // clearAds();
    renderAds();
    // $mapPinMain.removeEventListener('mousedown', ableForms);
    addCoordinates();
    $adForm.classList.remove('ad-form--disabled');
  }
};

addCoordinates();
// disableForms();

$mapPinMain.addEventListener('mousedown', ableForms);
$mapPinMain.addEventListener('keydown', ableForms);
$mapPinMain.addEventListener('mouseup', disableForms);


var submitForm = function (evt) {
  var guests = parseInt($capacity.value, 10);
  var rooms = parseInt($roomNumber.value, 10);
  // if (evt.target && evt.target.matches('#capacity').content('option')) {
  //   var guests = evt.target.value;
  //   // var rooms = evt.target.value;
  // }
  // if (evt.target && evt.target.matches('#room_number').content('option')) {
  //   var rooms = evt.target.value;
  // }
  if (guests > rooms) {
    $capacity.setCustomValidity('Количество гостей не должно превышать количество комнат');
    evt.preventDefault();
  } else {
    return true;
  }
};

$adForm.addEventListener('submit', submitForm);

