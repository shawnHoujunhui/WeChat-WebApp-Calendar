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
				var insertId = myModel.add({title:title,pic:filename,desc:comment,starttime:starttime,endtime:endtime}).then(function(insertId){
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

})