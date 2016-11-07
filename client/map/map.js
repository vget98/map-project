angular.module('map', [])
  .controller('mapController', ['$scope', 'NgMap', function($scope, NgMap) {
    const mc = this;
    mc.postitions = [];
    mc.map;


  }])