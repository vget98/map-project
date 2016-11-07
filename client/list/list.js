angular.module('cordsList', [])
  .controller('cordsListController', ['$scope', 'data', '$rootScope', function($scope, data, $rootScope) {
    $scope.cordslist;

    // Loads data from pct-data.json into local storage and set variable to it for data binding
    $scope.setlist = () => {
      data.loadData()
        .then((response) => {
          window.localStorage.setItem('listData', response);
          $scope.cordslist = JSON.parse(window.localStorage.getItem('listData'));

          // Broadcast to map controller to update map data
          $rootScope.$broadcast('updateMap');
        })
        .catch((err) => {
          console.log(err);
        })
    };

    // Saves edit to local storage and updates map
    $scope.edit = (cords, index) => {
      // Use this to parse the input strings from the edits
      for (let i = 0; i < 3; i++) {
        cords[i] = JSON.parse(cords[i]);
      }
      window.localStorage.setItem('listData', JSON.stringify($scope.cordslist));
      $rootScope.$broadcast('updateMap');
    };

    // Deletes coordinate from list, updates local stroage and broadcast to map controller tp update
    $scope.delete = (index) => {
      $scope.cordslist.splice(index, 1);
      window.localStorage.setItem('listData', JSON.stringify($scope.cordslist));
      $rootScope.$broadcast('updateMap');
    };

    // Event listener for any updates to local storage
    $rootScope.$on('updateList', () => {
      $scope.cordslist = JSON.parse(window.localStorage.getItem('listData'));
    });

  }])
