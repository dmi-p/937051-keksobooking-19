'use strict';

(function () {
  var $adForm = document.querySelector('.ad-form');
  var $roomNumber = $adForm.querySelector('#room_number');
  var $capacity = $adForm.querySelector('#capacity');

  var $onSubmitFormButton = $adForm.querySelector('.ad-form__submit');

  var onSubmitForm = function () {
    $capacity.setCustomValidity('');
    var guests = parseInt($capacity.value, 10);
    var rooms = parseInt($roomNumber.value, 10);
    if (guests > rooms) {
      $capacity.setCustomValidity('Количество гостей не должно превышать количество комнат');
    }
  };

  $onSubmitFormButton.addEventListener('click', onSubmitForm);
})();
