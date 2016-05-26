'use strict';
var Base = require('./base.js');
var fs = require('fs'),
    Util = require('util');
var time = require('../module/DateTime');
var state = require('../module/State');
var http = require("http");

module.exports=think.controller(Base,{
	//创建活动
	createAction:function(self){
		if(this.file()['image']['path'] == undefined){
			return self.json({'status':state.Failed});
		}
		var filename = time.Now()+".png";
		var newPath = self.config("RESOURCE_PATH")+filename;
		var myModel = this.model("activity");
		console.log(self.config("RESOURCE_PATH")+filename);
		fs.readFile(this.file()['image']['path'], function (err, data) {
			fs.writeFile(newPath, data, function (err) {
				// 增加数据
				var address = self.post('location');
				var comment = self.post('comment');
				var starttime = self.post('starttime');
				var title = self.post('title');
				var endtime = self.post('endtime');
				console.log(self.post());
				var insertId = myModel.add({title:title,pic:filename,address:address,desc:comment,starttime:starttime,endtime:endtime}).then(function(insertId){
					// self.json({'status':'1','msg':state.Success,'msg':'创建成功'});
					self.redirect('/ok/index?activityid='+insertId);
				});

			});
		});
	},
	testAction:function(self){
		self.json({'status':self.test()});
	},
	indexAction:function(self){
		var address = self.get('address');
		var repeat = self.get('repeat');
		self.assign('starttime',self.get('starttime'));
		self.assign('endtime',self.get('endtime'));
		self.assign('address',address);
		self.assign('repeat',repeat);
		self.display();
	}

	userAction:function(self){
		var myModel = this.model("user");
		var myThis = this;
		this.session("userid").then(function(userid){
			if(userid == undefined){
				console.log('信息不存在');
				// 获取token
				var req = https.get("https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx22867bec839877f3&secret=315d6b5c77f4ee330d3e31d3d8d83188&code="+self.get("code")+"&grant_type=authorization_code",
					function(res){
						res.on('data',function(body){
							var data = JSON.parse(body.toString());
							https.get("https://api.weixin.qq.com/sns/userinfo?access_token="+data.access_token+"&openid="+data.openid+"&lang=zh_CN",function(res){
								res.on('data',function(body){
									var data = JSON.parse(body.toString());
									var date = new Date( new Date() * 1000 );//.转换成毫秒
									var time = date.getFullYear() + "-" + (date.getMonth() < 10 ? '0' + (date.getMonth()+1) : (date.getMonth()+1)) + "-" + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) ;
									// 先查有木有,有就直接生成session
									myModel.where({name:data.nickname,nickname:data.nickname}).find().then(function(getdata){
										if(getdata==undefined){
											myModel.add({name:data.nickname,nickname:data.nickname,sex:data.sex,city:data.city,headimgurl:data.headimgurl,createtime:time}).then(function(insertId){
												myThis.session("userid",insertId);
												myThis.session("nickname",data.nickname).then(function(){
													self.redirect('/index/index');
												});
											})
										}
										else{
											console.log(getdata);
											myThis.session("userid",getdata.userid);
											myThis.session("nickname",getdata.nickname).then(function(){
												self.redirect('/index/index');
											});
										}
									});
								})
							})
						});
					}
				);
			}
			else{
				self.redirect('/index/index');
			}
		});
	},
	authorAction:function(self){
		var code = self.get('code');
		self.json({'code':code});
	},
	testAction:function(self){
		var myModel = this.model("user");
		myModel.where({name:'ShawnHou',nickname:'Shawn'}).find().then(function(getdata){
			self.json({'status':'1','data':getdata});
		})
	}

})