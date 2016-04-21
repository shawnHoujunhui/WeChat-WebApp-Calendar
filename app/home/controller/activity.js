'use strict';
var Base = require('./base.js');

module.exports = think.controller(Base, {
	//活动列表
  activitylistAction:function(self){
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
      where+=' and starttime<"'+time+'"';
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
        mySelf.json({'status':'1','data':data,'sum':mdata[0].sum});
      });
    });
  },
  //添加用户
  activityaddAction:function(self){
    var title=this.get('title');
    var pic=this.get('pic');
    var address=this.get('address');
    // var time=this.getNowTime();
    var myDate = new Date();
    var myStrDate=myDate.getFullYear()+"-"+myDate.getMonth()+"-"+myDate.getDate()+" "+myDate.getHours()+":"+myDate.getMinutes()+":"+myDate.getSeconds();
    this.model('activity').add({title:title,address:address,time:myStrDate,pic:pic});
    return self.json({'status':'1','date':title+","+address+","+myStrDate});
  },
  //删除用户
  activitydeleteAction:function(self){
    var activityid=this.get('activityid');
    this.model('activity').where({activityid:activityid}).delete().then(function(data){
      self.json({'status':'1','msg':'删除成功'});
    });    
  },
  //修改用户
  activityupdateAction:function(self){
    var activityid=this.get('activityid');
    var title=this.get('title');
    var address=this.get('address');
    var time=this.get('time');
    var model=this.model('');
    var pic=this.get('pic');
    var mThis=this;
    this.model('activity').where({activityid:activityid}).find().then(function(data){
      console.log(data['title']);
      var update = '';
      
      if (title!="") {
        update+='title="'+title+'"';
      }
      else{
        update+='title="'+data['title']+'"';
      }
      
      if (address!=""){
        update+=',address="'+address+'"';
      }
      
      if(time!=""){
        update+=',time="'+time+'"';
      };

      if(pic!=""){
      	update+=',pic="'+pic+'"';
      }

      model.query('update think_activity set '+update+' where activityid='+activityid).then(function(data){
        mThis.json({'status':'1','msg':'修改成功'});
      });
    })
  }
});