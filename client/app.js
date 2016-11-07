'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngMap',
  'ui.router'
])
.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
  // For invalid urls redirect to main page
  $urlRouterProvider.otherwise('/');

  // Renders main index.html with two nested views the map and the list along with their controllers
  $stateProvider('main', {
    url: '/',
    templateUrl: 'index.html'
  })
}])