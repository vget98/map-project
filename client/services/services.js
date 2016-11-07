// Create factory to handle API requests to server
angular.module('app.services', [])
  .factory('data', ['$http', ($http) => {

    // Loads data from pct-data.json file
    const.loadData = () => {
      return $http.get('pct-data.json')
        .then((response) => {
          console.log(response);
          return response.data;
        })
    };
    return {
      loadData: loadData
    };
  }])