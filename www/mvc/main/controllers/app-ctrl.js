define(['./common/module'], function (controllers) {
    'use strict';
    controllers.controller('AppCtrl',['$scope', '$location', function ($scope, $location) {
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    }]);
});