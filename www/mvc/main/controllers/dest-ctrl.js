/**
 * Created by junhui on 16/3/12.
 */
define(['./common/module','Model','jquery','mbootstrap'], function (controllers,Model,$) {
    'use strict';
    controllers.controller('DestCtrl',['$scope','$http','$location', function ($scope,$http,$location) {
        var activityid = $location.search()['activityid'];
        if(activityid == undefined){
            $('.modal-title').html('系统提醒');
            $(".modal-body").html('未传送activityid');
            $('#MyModel').modal();
        }
        var url = Model.activitylistModel+"?activityid="+activityid;
        $http.get(url).success(function(response){
            $scope.data=response.data[0];
        });

        $scope.goMap=function(activityid){
            $location.path('app/map');
            console.log('test');
        }
    }]);
});