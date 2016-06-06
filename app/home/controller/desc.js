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
		var myThis = this;
		model.query('select * from think_activity where'+where+' '+limit).then(function(data){
			model.query('select count(activityid) as  `sum` from think_activity').then(function(mdata){
				model.query('select * from think_activity_rel_people inner join think_user on think_user.userid=think_activity_rel_people.userid where think_activity_rel_people.activityid='+activityid).then(function(rel_data){
					myThis.session("userid").then(function(userid){
						data = {'status':'1','data':data,'sum':mdata[0].sum};
						mySelf.assign('has',"no");
						for (var i = rel_data.length - 1; i >= 0; i--) {
							if(rel_data[i].userid == userid){
								mySelf.assign('has',"yes");
							}
						}
						mySelf.assign('rel_data',rel_data);
						mySelf.assign('data',data);
						mySelf.assign('test','aaaa')
						console.log(data);
						mySelf.display();
					});
				});
			});
		});
	},
});