'use strict';

var Base = require('./base.js');
var thrift = require('thrift');

//noinspection ES6Validation
module.exports = think.controller(Base, {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction: function(self){
      // var thrift = require('thrift'),
      //     Calculator = require('../gen-nodejs/Calculator'),
      //     ttypes = require('../gen-nodejs/hello_types');

      // var connection = thrift.createConnection("localhost", 9090),
      //     multiplexer = new  thrift.Multiplexer(),
      //     service = multiplexer.createClient("Service",Calculator, connection);

      // connection.on('error', function(err) {
      //     console.error(err);
      // });

      // var work = new ttypes.Work({num1: 1, num2: 30, op: ttypes.Operation.ADD, comment: this.get('name')});

      // service.add(work, function(err, data) {
      //     if (err) {
      //         console.log(err);
      //     } else {
      //         self.json(data);
      //     }
      //     connection.end();
      // });

      self.display('index');
      
  },
  //用户列表
  userlistAction:function(self){
    var where = ' 1=1 ';
    var name=this.get('name');
    if (name!="") {
      where+=' and name like "%'+name+'%"';
    }
    var nickname=this.get('nickname');
    if (nickname!=""){
      where+=' and nickname like "%'+nickname+'%"';
    }
    var createtime=this.get('createtime');
    if(createtime!=""){
      where+=' and createtime<"'+createtime+'"';
    }
    self.model('').query('select * from think_user where'+where).then(function(data){
      self.json({'status':'1','data':data});
    })
  },
  //添加用户
  useraddAction:function(self){
    var name=this.get('name');
    var nickname=this.get('nickname');
    // var createtime=this.getNowTime();
    var myDate = new Date();
    var myStrDate=myDate.getFullYear()+"-"+myDate.getMonth()+"-"+myDate.getDate()+" "+myDate.getHours()+":"+myDate.getMinutes()+":"+myDate.getSeconds();
    this.model('user').add({name:name,nickname:nickname,createtime:myStrDate});
    return self.json({'status':'1','date':name+","+nickname+","+myStrDate});
  },
  //删除用户
  userdeleteAction:function(self){
    var userid=this.get('userid');
    this.model('user').where({userid:userid}).delete().then(function(data){
      self.json({'status':'1','msg':'删除成功'});
    });    
  },
  //修改用户
  userupdateAction:function(self){
    var userid=this.get('userid');
    var name=this.get('name');
    var nickname=this.get('nickname');
    var createtime=this.get('createtime');
    var model=this.model('');
    var mThis=this;
    this.model('user').where({userid:userid}).find().then(function(data){
      console.log(data['name']);
      var update = '';
      
      if (name!="") {
        update+='name="'+name+'"';
      }
      else{
        update+='name="'+data['name']+'"';
      }
      
      if (nickname!=""){
        update+=',nickname="'+nickname+'"';
      }
      
      if(createtime!=""){
        update+=',createtime="'+createtime+'"';
      };

      model.query('update think_user set '+update+' where userid='+userid).then(function(data){
        mThis.json({'status':'1','msg':'修改成功'});
      });
    })
  }
});
