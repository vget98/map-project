angular.module('cordsList', [])
  .controller('cordsListController', ['$scope', 'data', function($scope, data) {
    $scope.cordslist;

    // Loads data from pct-data.json into local storage and set variable to it for data binding
    $scope.setlist = () => {
      data.loadData()
        .then((response) => {
          console.log(response);
        })
    };
  }])