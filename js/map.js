'use strict';

(function (mockAdsData) {
  var $mapFiltersForm = document.querySelector('.map__filters');
  var $mapFiltersSelects = $mapFiltersForm.querySelectorAll('select');
  var $mapFiltersFieldset = $mapFiltersForm.querySelector('fieldset');
  var $map = document.querySelector('.map');
  var $mapFiltersContainer = $map.querySelector('.map__filters-container');
  var $mapPinMain = $map.querySelector('.map__pin--main');
  var $mapPins = $map.querySelector('.map__pins');
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';
  var $adForm = document.querySelector('.ad-form');
  var $adFormFieldsets = $adForm.querySelectorAll('fieldset');
  var $adFormAddressField = $adForm.querySelector('#address');
  var openedCard = null;

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
    var fragment = document.createDocumentFragment();
    var card = renderCard(pin);
    var cardCloseButton = card.querySelector('.popup__close');

    var isCardOpen = function (currenttCard) {
      if (currenttCard === null) {
        return false;
      } else {
        return true;
      }
    };

    var closeCurrentCard = function (currentCard) {
      currentCard.removeEventListener('keydown', cardEscPressHandler);
      currentCard.classList.add('hidden');
      openedCard = null;
    };


    var openCard = function () {
      if (isCardOpen(openedCard)) {
        closeCurrentCard(openedCard);
      }
      card.classList.remove('hidden');
      card.addEventListener('keydown', cardEscPressHandler);
      cardCloseButton.focus();
      openedCard = card;
    };

    var closeCard = function () {
      card.removeEventListener('keydown', cardEscPressHandler);
      card.classList.add('hidden');
      openedCard = null;
    };

    var cardEscPressHandler = function (evt) {
      if (evt.key === ESC_KEY) {
        closeCard();
      }
    };
    $pin.addEventListener('click', openCard);
    cardCloseButton.addEventListener('click', closeCard);

    fragment.appendChild(card);
    $map.insertBefore(fragment, $mapFiltersContainer);

    return $pin;
  };

  var renderCard = function (card) {
    var $cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var $card = $cardTemplate.cloneNode(true);

    var $cardTitle = $card.querySelector('.popup__title');
    var $cardAddress = $card.querySelector('.popup__text--address');
    var $cardPrice = $card.querySelector('.popup__text--price');
    var $cardType = $card.querySelector('.popup__type');
    var $cardCapacity = $card.querySelector('.popup__text--capacity');
    var $cardTime = $card.querySelector('.popup__text--time');
    var $cardFeatures = $card.querySelector('.popup__features');
    var $cardDescription = $card.querySelector('.popup__description');
    var $cardPhotos = $card.querySelector('.popup__photos');
    var $cardAvatar = $card.querySelector('.popup__avatar');

    while ($cardFeatures.firstChild) {
      $cardFeatures.removeChild($cardFeatures.lastChild);
    }

    while ($cardPhotos.firstChild) {
      $cardPhotos.removeChild($cardPhotos.lastChild);
    }

    $cardTitle.textContent = card.offer.title;
    $cardAddress.textContent = card.offer.address;
    $cardPrice.textContent = (card.offer.price) + '₽/ночь';
    var offerType = '';
    switch (card.offer.type) {
      case 'flat':
        offerType = 'Квартира';
        break;
      case 'bungalo':
        offerType = 'Бунгало';
        break;
      case 'house':
        offerType = 'Дом';
        break;
      case 'palace':
        offerType = 'Дворец';
        break;
      default:
        break;
    }
    $cardType.textContent = offerType;
    $cardCapacity.textContent = (card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей');
    $cardTime.textContent = ('Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout);

    card.offer.features.forEach(function ($feature) {
      var element = document.createElement('li');
      element.classList.add('popup__feature');
      element.classList.add('popup__feature--' + $feature);

      $cardFeatures.appendChild(element);
    });
    $cardDescription.textContent = card.offer.description;

    card.offer.photos.forEach(function ($photo) {
      var photoTemplate = $cardTemplate.querySelector('.popup__photo');
      var newPhoto = photoTemplate.cloneNode(true);
      newPhoto.src = $photo;
      $cardPhotos.appendChild(newPhoto);
    });

    $cardAvatar.src = card.author.avatar;

    var cardCoordinateX = (card.location.x - 25);
    var cardCoordinateY = (card.location.y - 65);
    $card.style.left = cardCoordinateX + 'px';
    $card.style.top = cardCoordinateY + 'px';

    $card.classList.add('hidden');

    return $card;
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

  var clearCards = function () {
    var $cards = $map.querySelectorAll('.map__card');
    $cards.forEach(function ($card) {
      $card.parentNode.removeChild($card);
    });
  };

  var renderAds = function () { // split into 2 functions??? (pin/card)
    var adsData = mockAdsData();
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

    $adFormFieldsets.forEach(function ($fieldset) {
      $fieldset.setAttribute('disabled', 'disabled');
    });

    $map.classList.add('map--faded');
    $adForm.classList.add('ad-form--disabled');
    clearPins();
    clearCards();
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
      $adFormFieldsets.forEach(function ($fieldset) {
        $fieldset.removeAttribute('disabled');
      });
      renderAds();
      $mapPinMain.removeEventListener('mousedown', activatePage);
      $mapPinMain.removeEventListener('keydown', activatePage);
      setActualAddress(true);
      $adForm.classList.remove('ad-form--disabled');
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
    $adFormAddressField.value = Math.round(mainPinX) + ', ' + Math.round(mainPinY);
  };

  deactivatePage();

  $mapPinMain.addEventListener('mousedown', activatePage);
  $mapPinMain.addEventListener('keydown', activatePage);
  $mapPinMain.addEventListener('mouseup', deactivatePage);
  $mapPinMain.addEventListener('keyup', deactivatePage);


  window.map = {
    renderPin: renderPin,
    renderAds: renderAds,

  };

})(window.data.mockAdsData);
