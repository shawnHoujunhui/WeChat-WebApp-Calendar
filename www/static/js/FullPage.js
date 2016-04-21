define(['iScroll'], function(){

	function FullPage(options){
		var $pullWarp = $(options.pullWarp);
		this.$pullWarp = $pullWarp;
		this.$pullDown = $pullWarp.find(options.pullDown);
		this.$pullUp = $pullWarp.find(options.pullUp);
		this.pullDownCallback = options.downCallback;
		this.pullUpCallback = options.upCallback;
		this.init(options);
	}

	FullPage.prototype = {
		constructor: FullPage,
		iScrollClick: function(){
			if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)) {
				return false;
			}
			if (/Chrome/i.test(navigator.userAgent)) {
				 return (/Android/i.test(navigator.userAgent));
			}
			if (/Silk/i.test(navigator.userAgent)) {
				return false;
			}
			if (/Android/i.test(navigator.userAgent)) {
			   var s=navigator.userAgent.substr(navigator.userAgent.indexOf('Android')+8,3);
			   return parseFloat(s[0]+s[3]) < 44 ? false : true
			}
		},
		init: function(options){
			var param = {};
			this.myScroll = new IScroll(options.pullWarp, param);
			this.pullFormTop = false;
			this.pullStart = 0;
			this.topOffset = -this.$pullDown.height();
			this.myScroll.scrollTo(0, this.topOffset, 800);
			this.bindEvent();
		},
		bindEvent: function(){
			var self = this;
			this.myScroll.on('scrollStart',$.proxy(self.scrollStart, self));
			this.myScroll.on('scrollEnd', $.proxy(self.scrollEnd, self));
		},
		scrollStart: function(){
			var myScroll = this.myScroll;

			if (myScroll.y >= this.topOffset) {
				this.$pullDown.css({'opacity': 1});
				this.pullFormTop = true;
			}
			this.pullStart = myScroll.y;
		},
		scrollEnd: function(){
			var myScroll = this.myScroll,
				topOffset = this.topOffset;

			if (this.pullFormTop && myScroll.directionY === -1) {
				this.pullDownCallback(function(){
					myScroll.scrollTo(0, topOffset, 800);
					setTimeout(function(){
						myScroll.refresh();
					}, 100);
				});
			}

			if (this.pullStart === myScroll.y && (myScroll.directionY === 1)) {
				this.pullUpCallback(function(){
					setTimeout(function(){
						myScroll.refresh();
					}, 100);
				});
			}

			this.pullFormTop = false;
		}
	}

	return FullPage;
});