define(['./common/module'], function (services) {
    'use strict';
    services.factory('Galleries',['$resource', '$q', function ($resource, $q) {
        var Galleries = $resource('http://www.minuotao.com/api/v1/galleries', {
            callback: 'JSON_CALLBACK'
        }, {
            'load': {
                'method': 'JSONP'
            }
        });

        return {
            search: function(type) {
                var q = $q.defer();
                Galleries.load({
                    type: type
                }, function(resp) {
                    q.resolve(resp);
                }, function(err) {
                    q.reject(err);
                })

                return q.promise;
            }
        }
    }]);
});

