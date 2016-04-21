define(['./common/module','Map','jquery','Model'], function (controllers,BMap,$,Model) {
    'use strict';
	var controller = ['$scope', '$location','$http', function ($scope, $location,$http) {
		$('#date').date({theme:"datetime"});
		// 获取当前的地点
        function getLocation(){
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(showPosition);
              }else{
                alert("您的浏览器不支持地理定位");
              }
           }
         
        function showPosition(position){
            var lat=position.coords.latitude;
            var lon=position.coords.longitude;
            var point = new BMap.Point(lon, lat);
            var gc = new BMap.Geocoder();    
            gc.getLocation(point, function(rs){
               var addComp = rs.addressComponents;
               $("#address").val(addComp.province + "-" 
                + addComp.city + "-" + addComp.district 
                + "-" + addComp.street);
               $('#MyModel').modal('hide');
            });
        }
 		
 		$('.modal-title').html('系统提醒');
        $(".modal-body").html('正在获取你的地址!');
        $('#MyModel').modal();
        getLocation();
		
	}];
    controllers.controller('CreateCtrl',controller);
});