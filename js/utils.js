'use strict';

(function () {
  var getRandomInteger = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  var getNewRandomArray = function (arr) {
    var shuffled = arr.sort(function () {
      return (0.5 - Math.random());
    });
    return shuffled.slice(0, getRandomInteger(0, (arr.length - 1)));
  };

  window.utils = {
    getRandomInteger: getRandomInteger,
    getNewRandomArray: getNewRandomArray,
  };
})();

