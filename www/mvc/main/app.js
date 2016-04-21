define([
    'angular',
    'uiRouter',
    'ngResource',
    'uiBootstrap',
    './controllers/common/index',
    './directives/common/index',
    './services/common/index'
], function (ng) {
    'use strict';

    return ng.module('app', [
        'app.services',
        'app.controllers',
        'app.directives',
        'ui.router',
        'ui.bootstrap',
        'ngResource'
    ]);
});