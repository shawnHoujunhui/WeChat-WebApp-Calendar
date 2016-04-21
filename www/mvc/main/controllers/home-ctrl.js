define(['./common/module','Model','jquery','DropLoad'],function (controllers,Model,$) {
    'use strict';
    var main={
    	init:function(){
    		//初始化滑动
    		this.scroll();
    	},
    	scroll:function(){
            // 当前页码
            var pageindex = 0;
            // 每页展示3个
            var num = 3;
            // 总数
            var sum = 0;
            


            // dropload
            $('.content').dropload({
                scrollArea : window,
                domUp : {
                    domClass   : 'dropload-up',
                    domRefresh : '<div class="dropload-refresh">↓下拉刷新</div>',
                    domUpdate  : '<div class="dropload-update">↑释放更新</div>',
                    domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
                },
                domDown : {
                    domClass   : 'dropload-down',
                    domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
                    domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
                    domNoData  : '<div class="dropload-noData">暂无数据</div>'
                },
                loadUpFn : function(me){
                    $.ajax({
                        type: 'GET',
                        url: Model.activitylistModel,
                        dataType: 'json',
                        success: function(response){
                            var result = '';
                            var data=response.data;
                            for(var i = 0; i < data.length; i++){
                                result +=   '<div class="row item" >'+
                                                '<a href="#/app/dest?activityid='+data[i].activityid+'">'+
                                                    '<img width="100%" src="'+data[i].pic+'">'+
                                                    '<h3 class="text-warning">'+data[i].title+'</h3>'+
                                                    '<p>'+data[i].time+'</p>'+
                                                '</a>'+
                                            '</div>';
                            }
                            pageindex = 0;
                            // 为了测试，延迟1秒加载
                            setTimeout(function(){
                                $('.lists').html(result);
                                // 每次数据加载完，必须重置
                                me.resetload();
                                // 解锁
                                me.unlock();
                                me.noData(false);
                            },1000);
                        },
                        error: function(xhr, type){
                            alert('Ajax error!');
                            // 即使加载出错，也得重置
                            me.resetload();
                        }
                    });
                },
                loadDownFn : function(me){
                    $.ajax({
                        type: 'GET',
                        url: Model.activitylistModel + '?pageindex=' + (pageindex += num),
                        dataType: 'json',
                        success: function(response){
                            var result = '';

                            //总数
                            sum = response.sum;
                            var data = response.data;
                            for(var i = 0; i < data.length; i++){
                                result +=   '<div class="row item" >'+
                                                '<a href="#/app/dest?activityid='+data[i].activityid+'">'+
                                                    '<img width="100%" src="'+data[i].pic+'">'+
                                                    '<h3 class="text-warning">'+data[i].title+'</h3>'+
                                                    '<p>'+data[i].time+'</p>'+
                                                '</a>'+
                                            '</div>';
                            }

                            if(pageindex >= sum){
                                // 锁定
                                me.lock();
                                // 无数据
                                me.noData();
                            }


                            // 为了测试，延迟1秒加载
                            setTimeout(function(){
                                $('.lists').append(result);
                                // 每次数据加载完，必须重置
                                me.resetload();
                            },1000);
                        },
                        error: function(xhr, type){
                            alert('Ajax error!');
                            // 即使加载出错，也得重置
                            me.resetload();
                        }
                    });
                },
                threshold : 50
            });
    	},
    }


    controllers.controller('HomeCtrl',['$scope','$http', function ($scope,$http) {
        //加载数据
        $http.get(Model.activitylistModel).success(function(response){
            $scope.data = response.data;

            //启动
            main.init();
        });
    }]);

});