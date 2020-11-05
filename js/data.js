'use strict';

(function (getRandomInteger, getNewRandomArray) {
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
          features: getNewRandomArray(featuresList),
          description: 'Это описание',
          // photos: photosList = [getRandomInteger(0, photosList.length - 1)]
          photos: getNewRandomArray(photosList),
        }
      };
      mockArray.push(currentObj);
    }
    return mockArray;
  };
  window.data = {
    mockAdsData: mockAdsData
  };
})(window.utils.getRandomInteger, window.utils.getNewRandomArray);
