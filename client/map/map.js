const api = 'AIzaSyCEGjn8h8Sli-91BleDX6FjQqsSoZmWpws';

angular.module('map', [])
  .controller('mapController', ['$scope', 'NgMap', '$rootScope', function($scope, NgMap, $rootScope) {
    const mc = this;
    mc.positions = [];
    mc.map;

    // Initialize map to mc.map for future use
    const getMap = () => {
      NgMap.getMap('ng-map')
        .then((map) => {
          mc.map = map;
          console.log('center' , map.getCenter());
          console.log('markers', map.markers);
        });
    };

    // On intialization grab cords list from local storage
    mc.$onInit = () => {
      getMap();
      mc.positions = JSON.parse(window.localStorage.getItem('listData'));
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

    // Function to find radius used for finding closest marker
    const rad = (x) => x * Math.PI / 180;

    // Iterate over markers list on mc.map and find closest markers based off distance
    // Haversince formula
    const findClosestMarker = (event) => {
      getMap();
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      const r = 6371;
      let closest = -1;
      let distances = [];
      let closestLat;
      let closestLng;

      for (let i = 0; i < Object.keys(mc.map.markers).length; i++) {
        const mlat = mc.map.markers[i].position.lat();
        const mlng = mc.map.markers[i].position.lng();
        const dLat = rad(mlat - lat);
        const dLong = rad(mlng - lng);

        let a  = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(rad(lat)) * Math.cos(rad(lat)) * Math.sin(dLong/2) * Math.sin(dLong/2);

        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        let d = r * c;

        distances[i] = d;
        if (closest === - 1 || d < distances[closest]) {
          closest = i;
        }
      }

      closestLat = mc.map.markers[closest].position.lat();
      closestLng = mc.map.markers[closest].position.lng();

      return "" + closest + ": " + closestLat + "," + closestLng;
    };

  }]);
