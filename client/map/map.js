angular.module('map', [])
  .controller('mapController', ['$scope', 'NgMap', function($scope, NgMap) {
    const mc = this;
    mc.postitions = [];
    mc.map;

    // Initialize map to mc.map for future use
    const getMap = () => {
      NgMap.getMap('ng-map')
        .then((map) => {
          mc.map = map;
          console.log('center' , map.getCenter());
          console.log('markers', map.markers);
        })
    };

    // On intialization grab cords list from local storage
    mc.$onInit = () => {
      getMap();
      mc.postitions = JSON.parse(window.localStorage.getItem('listData'));
    };

  }])