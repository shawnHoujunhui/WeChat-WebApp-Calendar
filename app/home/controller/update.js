/**
 * Created by junhui Hou on 1/05/2016.
 */
'use strict';

var Base = require('./base.js');
var state = require('../module/State');
var fs = require('fs'),
    Util = require('util');

module.exports = think.controller(Base, {
    indexAction:function(self){
        self = this;
        self.model('activity').where({activityid:self.get('activityid')}).find().then(function(data){
            data.starttime = self.get('starttime') ? self.get('starttime') : data.starttime;
            data.endtime = self.get('endtime') ? self.get('endtime') : data.endtime;
            data.address = self.get('address') ? self.get('address') : data.address;
            data.repeat = self.get('repeat') ? self.get('repeat') : data.repeat;
            data.cooment = self.get('cooment') ? self.get('cooment') : data.cooment;
            self.assign('data',data);
            self.display();
        })
    },
    updateAction:function(self){
        self = this;
        var myModel = this.model("activity");

        if(this.file()['image']['size'] == 0){
            // 增加数据
            var address = self.post('location');
            var comment = self.post('comment');
            var starttime = self.post('starttime');
            var title = self.post('title');
            var endtime = self.post('endtime');
            var learid = self.post('activityid');
            var insertId = myModel.where({activityid:learid}).update({title:title,pic:filename,desc:comment,starttime:starttime,endtime:endtime}).then(function(insertId){
                self.redirect('/ok/index?activityid='+learid);
            });
            console.log('ok');
            return;
        }


        var filename = time.Now()+".png";
        var newPath = self.config("RESOURCE_PATH")+filename;
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
    }
});