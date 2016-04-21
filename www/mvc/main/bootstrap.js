define([
    'require',
    'angular',
    'app',
    'routes',
    'DropLoad',
    'Date',
    'iScroll',
], function (require, ng) {
    'use strict';
    require(['domReady!'], function (document) {
        ng.bootstrap(document, ['app']);
    });
});