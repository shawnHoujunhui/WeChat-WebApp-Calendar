!
function(a) {
    function g(a) {
        a.touches || (a.touches = a.originalEvent.touches)
    }
    function h(a, b) {
        b._startY = a.touches[0].pageY,
        b.touchScrollTop = b.$scrollArea.scrollTop()
    }
    function i(b, c) {
        c._curY = b.touches[0].pageY,
        c._moveY = c._curY - c._startY,
        c._moveY > 0 ? c.direction = "down": c._moveY < 0 && (c.direction = "up");
        var d = Math.abs(c._moveY);
        "" != c.opts.loadUpFn && c.touchScrollTop <= 0 && "down" == c.direction && !c.isLockUp && (b.preventDefault(), c.$domUp = a("." + c.opts.domUp.domClass), c.upInsertDOM || (c.$element.prepend('<div class="' + c.opts.domUp.domClass + '"></div>'), c.upInsertDOM = !0), n(c.$domUp, 0), d <= c.opts.distance ? (c._offsetY = d, c.$domUp.html(c.opts.domUp.domRefresh)) : d > c.opts.distance && d <= 2 * c.opts.distance ? (c._offsetY = c.opts.distance + .5 * (d - c.opts.distance), c.$domUp.html(c.opts.domUp.domUpdate)) : c._offsetY = c.opts.distance + .5 * c.opts.distance + .2 * (d - 2 * c.opts.distance), c.$domUp.css({
            height: c._offsetY
        }))
    }
    function j(b) {
        var c = Math.abs(b._moveY);
        "" != b.opts.loadUpFn && b.touchScrollTop <= 0 && "down" == b.direction && !b.isLockUp && (n(b.$domUp, 300), c > b.opts.distance ? (b.$domUp.css({
            height: b.$domUp.children().height()
        }), b.$domUp.html(b.opts.domUp.domLoad), b.loading = !0, b.opts.loadUpFn(b)) : b.$domUp.css({
            height: "0"
        }).on("webkitTransitionEnd mozTransitionEnd transitionend",
        function() {
            b.upInsertDOM = !1,
            a(this).remove()
        }), b._moveY = 0)
    }
    function k(a) {
        a.opts.autoLoad && a._scrollContentHeight - a._threshold <= a._scrollWindowHeight && m(a)
    }
    function l(a) {
        a._scrollContentHeight = a.opts.scrollArea == b ? e.height() : a.$element[0].scrollHeight
    }
    function m(a) {
        a.direction = "up",
        a.$domDown.html(a.opts.domDown.domLoad),
        a.loading = !0,
        a.opts.loadDownFn(a)
    }
    function n(a, b) {
        a.css({
            "-webkit-transition": "all " + b + "ms",
            transition: "all " + b + "ms"
        })
    }
    var f, b = window,
    c = document,
    d = a(b),
    e = a(c);
    a.fn.dropload = function(a) {
        return new f(this, a)
    },
    f = function(a, b) {
        var c = this;
        c.$element = a,
        c.upInsertDOM = !1,
        c.loading = !1,
        c.isLockUp = !1,
        c.isLockDown = !1,
        c.isData = !0,
        c._scrollTop = 0,
        c._threshold = 0,
        c.init(b)
    },
    f.prototype.init = function(f) {
        var l = this;
        l.opts = a.extend(!0, {},
        {
            scrollArea: l.$element,
            domUp: {
                domClass: "dropload-up",
                domRefresh: '<div class="dropload-refresh">↓下拉刷新</div>',
                domUpdate: '<div class="dropload-update">↑释放更新</div>',
                domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
            },
            domDown: {
                domClass: "dropload-down",
                domRefresh: '<div class="dropload-refresh">↑上拉加载更多</div>',
                domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
                domNoData: '<div class="dropload-noData">暂无数据</div>'
            },
            autoLoad: !0,
            distance: 50,
            threshold: "",
            loadUpFn: "",
            loadDownFn: ""
        },
        f),
        "" != l.opts.loadDownFn && (l.$element.append('<div class="' + l.opts.domDown.domClass + '">' + l.opts.domDown.domRefresh + "</div>"), l.$domDown = a("." + l.opts.domDown.domClass)),
        l._threshold = l.$domDown && "" === l.opts.threshold ? Math.floor(1 * l.$domDown.height() / 3) : l.opts.threshold,
        l.opts.scrollArea == b ? (l.$scrollArea = d, l._scrollContentHeight = e.height(), l._scrollWindowHeight = c.documentElement.clientHeight) : (l.$scrollArea = l.opts.scrollArea, l._scrollContentHeight = l.$element[0].scrollHeight, l._scrollWindowHeight = l.$element.height()),
        k(l),
        d.on("resize",
        function() {
            l._scrollWindowHeight = l.opts.scrollArea == b ? b.innerHeight: l.$element.height()
        }),
        l.$element.on("touchstart",
        function(a) {
            l.loading || (g(a), h(a, l))
        }),
        l.$element.on("touchmove",
        function(a) {
            l.loading || (g(a, l), i(a, l))
        }),
        l.$element.on("touchend",
        function() {
            l.loading || j(l)
        }),
        l.$scrollArea.on("scroll",
        function() {
            l._scrollTop = l.$scrollArea.scrollTop(),
            "" != l.opts.loadDownFn && !l.loading && !l.isLockDown && l._scrollContentHeight - l._threshold <= l._scrollWindowHeight + l._scrollTop && m(l)
        })
    },
    f.prototype.lock = function(a) {
        var b = this;
        void 0 === a ? "up" == b.direction ? b.isLockDown = !0 : "down" == b.direction ? b.isLockUp = !0 : (b.isLockUp = !0, b.isLockDown = !0) : "up" == a ? b.isLockUp = !0 : "down" == a && (b.isLockDown = !0, b.direction = "up")
    },
    f.prototype.unlock = function() {
        var a = this;
        a.isLockUp = !1,
        a.isLockDown = !1,
        a.direction = "up"
    },
    f.prototype.noData = function(a) {
        var b = this;
        void 0 === a || 1 == a ? b.isData = !1 : 0 == a && (b.isData = !0)
    },
    f.prototype.resetload = function() {
        var b = this;
        "down" == b.direction && b.upInsertDOM ? b.$domUp.css({
            height: "0"
        }).on("webkitTransitionEnd mozTransitionEnd transitionend",
        function() {
            b.loading = !1,
            b.upInsertDOM = !1,
            a(this).remove(),
            l(b)
        }) : "up" == b.direction && (b.loading = !1, b.isData ? (b.$domDown.html(b.opts.domDown.domRefresh), l(b), k(b)) : b.$domDown.html(b.opts.domDown.domNoData))
    }
} (window.Zepto || window.jQuery);