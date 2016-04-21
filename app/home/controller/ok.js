'use strict';
var Base = require('./base.js');
var fs = require('fs'),
    Util = require('util');
var time = require('../module/DateTime');
var state = require('../module/State');

module.exports=think.controller(Base,{
	indexAction:function(self){
		self.model('activity').where({activityid:self.get('activityid')}).find().then(function(data){
			self.assign('data',data);
			console.log(data);
			self.display();
		})
	}
});