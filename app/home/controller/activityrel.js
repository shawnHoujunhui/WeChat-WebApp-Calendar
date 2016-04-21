'use strict';

module.exports = think.controller(Base, {
	//活动列表
  activityrellistAction:function(self){
    var where = ' 1=1 ';
    var userid=this.get('userid');
    if (userid!="") {
      where+=' and userid like "%'+userid+'%"';
    }
    var activityid=this.get('activityid');
    if (activityid!=""){
      where+=' and activityid like "%'+activityid+'%"';
    }
    self.model('').query('select * from think_activityrel where'+where).then(function(data){
      self.json({'status':'1','data':data});
    })
  },
  //添加用户
  activityreladdAction:function(self){
    var userid=this.get('userid');
    var activityid=this.get('activityid');
    // var time=this.getNowTime();
    var myDate = new Date();
    var myStrDate=myDate.getFullYear()+"-"+myDate.getMonth()+"-"+myDate.getDate()+" "+myDate.getHours()+":"+myDate.getMinutes()+":"+myDate.getSeconds();
    this.model('activityrel').add({userid:userid,activityid:activityid,time:myStrDate,pic:pic});
    return self.json({'status':'1','date':userid+","+activityid+","+myStrDate});
  },
  //删除用户
  activityreldeleteAction:function(self){
    var activityrelid=this.get('relid');
    this.model('activityrel').where({activityrelid:activityrelid}).delete().then(function(data){
      self.json({'status':'1','msg':'删除成功'});
    });    
  },
  //修改用户
  activityrelupdateAction:function(self){
    var activityrelid=this.get('activityrelid');
    var userid=this.get('userid');
    var activityid=this.get('activityid');
    var model=this.model('');
    var mThis=this;
    this.model('activityrel').where({activityrelid:activityrelid}).find().then(function(data){
      console.log(data['userid']);
      var update = '';
      
      if (userid!="") {
        update+='userid="'+userid+'"';
      }
      else{
        update+='userid="'+data['userid']+'"';
      }
      
      if (activityid!=""){
        update+=',activityid="'+activityid+'"';
      }
    	

      model.query('update think_activityrel set '+update+' where activityrelid='+activityrelid).then(function(data){
        mThis.json({'status':'1','msg':'修改成功'});
      });
    })
  }
});