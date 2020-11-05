'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var titleInput = adForm.querySelector('#title');
  var addressInput = adForm.querySelector('#address');
  var typeSelect = adForm.querySelector('#type');
  var priceInput = adForm.querySelector('#price');
  var timeinSelect = adForm.querySelector('#timein');
  var timeoutSelect = adForm.querySelector('#timeout');
  var roomNumberSelect = adForm.querySelector('#room_number');
  var capacitySelect = adForm.querySelector('#capacity');
  var featuresFieldset = adForm.querySelector('.features');
  var descriptionTextarea = adForm.querySelector('#description');
  var imagesInput = adForm.querySelector('#images');
  var submitButton = adForm.querySelector('.ad-form__submit');
  var resetButton = adForm.querySelector('.ad-form__reset');

  var invalidInputs = [];

  var priceRange = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
  };

  var onTypeChange = function (evt) {
    priceInput.placeholder = priceRange[evt.target.value];
    priceInput.min = priceRange[evt.target.value];
  };

  var onTimeInChange = function (evt) {
    timeoutSelect.value = evt.target.value;
  };

  var onTimeOutChange = function (evt) {
    timeinSelect.value = evt.target.value;
  };
  //  asd
  typeSelect.addEventListener('change', onTypeChange);
  timeinSelect.addEventListener('change', onTimeInChange);
  timeoutSelect.addEventListener('change', onTimeOutChange);
})();
