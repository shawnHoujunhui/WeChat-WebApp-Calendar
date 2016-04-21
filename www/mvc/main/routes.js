define(['./app'], function (app) {
    'use strict';
    var baseUrl = './main/views'
    var commonTemplateUrl = baseUrl + '/common';
    return app.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app.home', {
                url: "/home",
                views: {
                    'menuContent': {
                        templateUrl: baseUrl + "/home.html",
                        controller: 'HomeCtrl'
                    }
                }
            })

            .state('app.dest',{
                url: "/dest",
                views: {
                    'menuContent': {
                        templateUrl: baseUrl+"/activitydest.html",
                        controller: 'DestCtrl'
                    }
                }
            })

            .state('app.map',{
                url: "/map",
                views:{
                    'menuContent': {
                        templateUrl: baseUrl+"/map.html",
                        controller: 'MapCtrl'
                    }
                }
            })

            .state('app.create',{
                url: "/create",
                views:{
                    'menuContent': {
                        templateUrl: baseUrl+"/create.html",
                        controller: 'CreateCtrl'
                    }
                }
            })

            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: commonTemplateUrl + "/menu.html",
                controller: 'AppCtrl'
            })


            .state('app.about', {
                url: "/about",
                views: {
                    'menuContent': {
                        templateUrl: commonTemplateUrl+"/about.html",
                        controller: 'AboutCtrl'
                    }
                }
            });

        $urlRouterProvider.otherwise('/app/home');
    });
});