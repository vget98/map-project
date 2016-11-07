angular.module('cordsList', [])
  .controller('cordsListController', ['$scope', 'data', function($scope, data) {
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

    // Deletes coordinate from list, updates local stroage and broadcast to map controller tp update
    $scope.delete = (index) => {
      $scope.cordslist.splice(index, 1);
      window.localStorage.setItem('listData', JSON.stringify($scope.cordslist));
    };

    // Event listener for any updates to local storage
    $rootScope.$on('updateList', () => {
      $scope.cordslist = JSON.parse(window.localStorage.getItem('listData'));
      $rootScope.$broadcast('updateMap');
    });

  }])