require.config({
    paths: {
        'domReady': '../libs/requirejs-domready/domReady',
        'angular': '../libs/angular/angular.min',
        'uiRouter': '../libs/angular-ui-router/release/angular-ui-router.min',
        'uiBootstrap': '../libs/angular-bootstrap/ui-bootstrap-tpls.min',
        'ngResource': '../libs/angular-resource/angular-resource.min',
        'Model':'./models/Models',
        'jquery':'../libs/jquery/dist/jquery.min',
        'mbootstrap':'../libs/bootstrap/dist/js/bootstrap.min',
        'iScroll': '../../static/js/iScroll',
        'iScroll2': '../../static/js/iScroll2',
        'FullPage': '../../static/js/FullPage',
        'zepto':'../../static/js/zepto.min',
        'DropLoad':'../../static/js/dropload',
        'Map':'../../static/js/Map',
        'Date':'../../static/js/Date',
        'Mui':'../../static/js/mui',
    },
    shim: {
        'DropLoad': {
            deps: ['jquery'],
        },
        'jquery':{
            exports: '$'
        },
        'angular': {
            exports: 'angular'
        },
        'Date':{
            deps: ['jquery','iScroll2']
        },
        'mbootstrap': {
            deps: ['jquery']
        },
        'uiRouter': {
            deps: ['angular']
        },
        'ngResource': {
            deps: ['angular']
        },
        'uiBootstrap': {
            deps: ['angular']
        },
        'Map': {
            exports: 'BMap'
        },
        'iScroll2':{
            exports: 'iScroll'
        },
        'Mui':{
            exports: 'Mui'
        }
    },
    deps: ['./bootstrap']
});
