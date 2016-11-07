'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngMap',
  'app.services',
  'cordsList',
  'ui.router',
  'map',
  'xeditable'
])
.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
  // For invalid urls redirect to main page
  $urlRouterProvider.otherwise('/');

  // Renders main index.html with two nested views the map and the list along with their controllers
  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'index.html',
      views: {
        'map': {
          templateUrl: 'map/map.html',
          controller: 'mapController'
        },
        'list': {
          templateUrl: 'list/list.html',
          controller: 'cordsListController'
        }
      }
    });

}])
.run(['editableOptions', (editableOptions) => {
  editableOptions.theme = 'bs3';
}])
