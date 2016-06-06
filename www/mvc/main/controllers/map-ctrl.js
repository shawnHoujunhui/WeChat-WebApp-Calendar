define(['./common/module','Map','jquery','Model'], function (controllers,BMap,$,Model) {
    'use strict';
    var controller = ['$scope', '$location','$http', function ($scope, $location,$http) {
        $scope.nowaddress="1";
        $scope.address="2";
    	$('#map').height($(window).height()/6*5);
        var mp = new BMap.Map('map'); 
        var myStyleJson=[  
		{  
			"featureType": "road",  
			"elementType": "geometry.stroke",  
			"stylers": {  
				"color": "#ff0000"  
			}  
		}];
		// mp.setMapStyle({styleJson: myStyleJson }); 

        var activityid = $location.search()['activityid'];
        if(activityid == undefined){
            $('.modal-title').html('系统提醒');
            $(".modal-body").html('未传送activityid');
            $('#MyModel').modal();
        }
        var url = Model.activitylistModel+"?activityid="+activityid;
        $http.get(url).success(function(response){
            console.log(response.data[0].address);
            if(response.data[0].address != undefined && response.data[0].address != ''){
            	mp.centerAndZoom(response.data[0].address, 12);
            	$scope.address = response.data[0].address;
            }
            else{
            	mp.centerAndZoom("Melbourne", 12);
            }
        });

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
               $("#address").html(addComp.province + "-" 
                + addComp.city + "-" + addComp.district 
                + "-" + addComp.street);
            });
        }

        $scope.returnAddress=function(){
            var val=$("#address").html();
            if(val == '' || val == undefined){
                $('.modal-title').html('系统提醒');
                $(".modal-body").html('现在的地址为空');
                $('#MyModel').modal();
            }
            else{
                $('.modal-title').html('系统提醒');
                $(".modal-body").html('您现在的地址为:'+val);
                $('#MyModel').modal();   
            }
            // $location.path('/app/create').search({'address': val});
        };

        getLocation();
    }];
    controllers.controller('MapCtrl',controller);
});