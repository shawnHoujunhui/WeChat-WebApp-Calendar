define(['./common/module'], function (services) {
    'use strict';
    services.factory('Gallery',['$resource', '$q', function ($resource, $q) {
        var Gallery = $resource('http://www.minuotao.com/api/v1/galleries/:gallerySlug', {
            callback: 'JSON_CALLBACK'
        }, {
            'load': {
                'method': 'JSONP'
            }
        });

        return {
            search: function(slug) {
                var q = $q.defer();
                Gallery.load({
                    gallerySlug: slug
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

