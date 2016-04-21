time = {
	Format:function(Date,fmt){
		var o = {
		    "M+": Date.getMonth() + 1, //月份 
		    "d+": Date.getDate(), //日 
		    "h+": Date.getHours(), //小时 
		    "m+": Date.getMinutes(), //分 
		    "s+": Date.getSeconds(), //秒 
		    "q+": Math.floor((Date.getMonth() + 3) / 3), //季度 
		    "S": Date.getMilliseconds() //毫秒 
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (Date.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	},
	Instance:function(){
		return new Date();
	},
	Now:function(){
		return this.Format(this.Instance(),"yyyy-MM-dd-hh-mm-ss");
	},
};


module.exports=time;