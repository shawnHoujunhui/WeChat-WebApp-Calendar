'use strict';

var Base = require('./base.js');
var thrift = require('thrift');

//noinspection ES6Validation
module.exports = think.controller(Base, {
	indexAction:function(self){
		self.assign('starttime',self.get('starttime'));
		self.assign('endtime',self.get('endtime'));
		self.assign('repeat',self.get('repeat'));
		self.assign('comment',self.get('comment'))
		self.assign('activityid',self.get('activityid'));
		self.assign('type',self.get('type'));
		self.display();
	}
});