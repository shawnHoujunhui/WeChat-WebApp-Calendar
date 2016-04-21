'use strict';
var fs = require( 'fs' ),
    stat = fs.stat;

module.exports = think.controller({
	test:function(){
		console.log('test');
		return 'test';
	},
});