'use strict';

(function () {
  var $mapFiltersForm = document.querySelector('.map__filters');
  var $mapFiltersSelects = $mapFiltersForm.querySelectorAll('select');
  var $mapFiltersFieldset = $mapFiltersForm.querySelector('fieldset');
  var $map = document.querySelector('.map');
  var $mapPinMain = $map.querySelector('.map__pin--main');
  var $mapPins = $map.querySelector('.map__pins');
  var ENTER_KEY = 'Enter';

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

  var clearPins = function () {
    var $pins = $mapPins.querySelectorAll('.map__pin');
    $pins.forEach(function ($pin) {
      var isContainsMainPin = $pin.classList.contains('map__pin--main');
      if (!isContainsMainPin) {
        $pin.parentNode.removeChild($pin);
      }
    });
  };

  var renderAds = function () {
    var adsData = window.data.mocks;
    var fragment = document.createDocumentFragment();
    adsData.forEach(function ($pin) {
      fragment.appendChild(renderPin($pin));
    });
    $mapPins.appendChild(fragment);
  };

  var deactivatePage = function () {
    $mapFiltersFieldset.setAttribute('disabled', 'disabled');

    $mapFiltersSelects.forEach(function ($select) {
      $select.setAttribute('disabled', 'disabled');
    });

    window.form.$fieldsets.forEach(function ($fieldset) {
      $fieldset.setAttribute('disabled', 'disabled');
    });

    $map.classList.add('map--faded');
    window.form.$adForm.classList.add('ad-form--disabled');
    clearPins();
    $mapPinMain.addEventListener('mousedown', activatePage);
    $mapPinMain.addEventListener('keydown', activatePage);
    setActualAddress(false);
  };

  var activatePage = function (evt) {
    if ((evt.button === 0) || (evt.key === ENTER_KEY)) {
      $map.classList.remove('map--faded');
      $mapFiltersFieldset.removeAttribute('disabled');
      $mapFiltersSelects.forEach(function ($select) {
        $select.removeAttribute('disabled');
      });
      window.form.$fieldsets.forEach(function ($fieldset) {
        $fieldset.removeAttribute('disabled');
      });
      renderAds();
      $mapPinMain.removeEventListener('mousedown', activatePage);
      $mapPinMain.removeEventListener('keydown', activatePage);
      setActualAddress(true);
      window.form.$adForm.classList.remove('ad-form--disabled');
    }
  };

  var setActualAddress = function (isActivePage) {
    var mainPinWidth = parseInt($mapPinMain.offsetWidth, 10);
    var mainPinHeight = parseInt($mapPinMain.offsetHeight, 10);
    var leftCoordinate = parseInt($mapPinMain.style.left, 10);
    var topCoordinate = parseInt($mapPinMain.style.top, 10);
    var mainPinX;
    var mainPinY;

    if (isActivePage) {
      mainPinX = leftCoordinate + (mainPinWidth / 2);
      mainPinY = topCoordinate + mainPinHeight + 20;
    } else {
      mainPinX = leftCoordinate + (mainPinWidth / 2);
      mainPinY = topCoordinate + (mainPinHeight / 2);
    }
    window.form.$addressField.value = Math.round(mainPinX) + ', ' + Math.round(mainPinY);
  };

  deactivatePage();

  $mapPinMain.addEventListener('mousedown', activatePage);
  $mapPinMain.addEventListener('keydown', activatePage);
  $mapPinMain.addEventListener('mouseup', deactivatePage);
  $mapPinMain.addEventListener('keyup', deactivatePage);

  window.map = {
    renderPin: renderPin(),
    renderAds: renderAds(),

  };

})();
