angular.module('map', [])
  .controller('mapController', ['$scope', 'NgMap', '$rootScope', function($scope, NgMap, $rootScope) {
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

    // On click on map add markers to map and update local storage, also find closest marker
    mc.addMarker = (event) => {
      let closestMarker = findClosestMarker(event);
      let ll = event.latLng;
      mc.positions.push(['Add', ll.lat(), ll.lng(), closestMarker]);
      window.localStorage.setItem('listData', JSON.stringify(mc.positions));
      // Broadcast to lost controller to pull new updated data from local storage
      $rootScope.$broadcast('updateList');
    };

    // Event listener when list data gets updated to also update map
    $rootScope.$on('updateMap', () => {
      mc.positions = JSON.parse(window.localStorage.getItem('listData'));
    });
  }])