define(['./common/module'], function (controllers) {
    'use strict';
    controllers.controller('AboutCtrl', ['$scope', 'Galleries', function ($scope, Galleries) {
        $scope.res = {
            message: "About Us!"
        };

        $scope.galleries = {};

        var loadData = function() {
            Galleries.search('sky').then(function (resp) {
                $scope.galleries = resp;
            });
        }

        loadData();
    }]);
});