'use strict';

(function () {
  var getRandomInteger = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };
  window.utils = {
    getRandomInteger: getRandomInteger
  };
})();

