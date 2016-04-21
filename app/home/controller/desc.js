'use strict';
var Base = require('./base.js');

module.exports = think.controller(Base, {
	indexAction:function(self){
		var where = ' 1=1 ';
	    var title=this.get('title');
	    if (title!="") {
	      where+=' and title like "%'+title+'%"';
	    }
	    var address=this.get('address');
	    if (address!=""){
	      where+=' and address like "%'+address+'%"';
	    }
	    var time=this.get('time');
	    if(time!=""){
	      where+=' and time<"'+time+'"';
	    }
	    var pic=this.get('pic');
	    if(pic!=""){
	      where+=' and pic<"'+pic+'"';
	    }
	    var activityid=this.get('activityid');
	    if (activityid!=""){
	      where+=' and activityid='+activityid;
	    }
	    var limit = " limit ";
	    var pageindex = this.get('pageindex') == '' ? 0 : this.get('pageindex');
	    var pagesize = this.get('pagesize') == '' ? 3 : this.get('pagesize');
	    limit += pageindex+","+pagesize

	    var model = self.model('');
	    var mySelf = self;
	    model.query('select * from think_activity where'+where+' '+limit).then(function(data){
	      model.query('select count(activityid) as  `sum` from think_activity').then(function(mdata){
	        data = {'status':'1','data':data,'sum':mdata[0].sum};
	        mySelf.assign('data',data);
	        mySelf.assign('test','aaaa')
	        console.log(data);
	        mySelf.display();
	      });
	    });
	},
});