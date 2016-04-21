'use strict';

var Base = require('./base.js');
var thrift = require('thrift');

module.exports = think.controller(Base, {
	indexAction:function(self){
		self.assign('starttime',self.get('starttime'));
		self.assign('endtime',self.get('endtime'));
		self.assign('address',self.get('address'));
		self.display();
	}
});