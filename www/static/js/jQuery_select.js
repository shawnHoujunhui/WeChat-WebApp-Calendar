/**
 * Created by junhui on 16/3/12.
 */

(function($){


    var HiSelect = function(ele,options)
    {
        this.element = ele;
        this.options  = $.extend({},options);
        this.options.containerId = "hiSelect_container_"+Math.floor(Math.random() * 10000000);
        this.data = [];
        this.scrolls = {};
    };

    HiSelect.prototype = {
        "generateHtml":function(){
            if($("#"+this.options.containerId).length==0)
            {
                var container = $('<div class="hiSelect_container"></div>');
                var header = $('<div class="header"></div>');
                var cancel = $('<div class="cancel">取消</div>');
                var done = $('<div class="done">确定</div>');
                header.append(cancel);
                header.append(done);
                var content = $('<div class="content"></div>');
                var contentLayout = $('<div class="layout"></div>');
                var boxs = [];
                var lists = [];
                for(i=0;i<this.options.level;i++)
                {
                    var level = (i+1);
                    var box = $('<div class="box" data-level="'+level+'"></div>')
                    var list = $('<ul class="list" data-level="'+level+'"></ul>');
                    var scrollId = "hiSelect_scroll_"+Math.floor(Math.random() * 10000000);
                    box.attr("id",scrollId);
                    box.append(list);
                    contentLayout.append(box);
                    boxs.push(box);
                    lists.push(list);
                }
                var mark = $('<div class="mark"></div');
                contentLayout.append(mark);
                content.append(contentLayout);
                container.append(header);
                container.append(content);
                container.attr("id",this.options.containerId);
                $(document.body).append(container);
                this.dom = {
                    "container":container,
                    "header":header,
                    "cancel":cancel,
                    "done":done,
                    "content":content,
                    "contentLayout":contentLayout,
                    "boxs":boxs,
                    "lists":lists,
                    "mark":mark
                }
            }
        },
        "initOption":function(){
            this.dataChanged(0);
        },
        "bindEvent":function(){
            var hiSelect = this;
            this.dom.cancel.click(function(){
                hiSelect.hide();
            })
            this.dom.done.click(function(){
                hiSelect.hide();
                if(typeof hiSelect.options.done == "function")
                {
                    hiSelect.options.done(hiSelect.getData());
                }
            })
        },
        "initScroll":function(id,list)
        {
            var hiSelect = this;
            if(hiSelect.scrolls[id])
            {
                hiSelect.scrolls[id].destroy();
            }
            var scroll = new IScroll("#"+id);
            hiSelect.scrolls[id] = scroll;
            scroll.on("scrollStart", function() {
                list.find(".act").removeClass("act")
            });
            scroll.on("scrollEnd", function() {
                var index = Math.floor(this.y / 38);
                this.scrollTo(0, 38 * index);
                index = Math.abs(index);
                var op = list.find("li").eq(index);
                op.addClass("act");
                var value = op.data("value");
                var level = op.parent().data("level");
                hiSelect.dataChanged(level,value);
            })
        },
        "setOption":function(level,data){
            if(!data || !data[0])
            {
                return;
            }
            var hiSelect = this;
            var list = hiSelect.dom.lists[level-1];
            list.empty();
            $(data).each(function(index,item){
                var className = "";
                if(index==0)
                    className = "act";
                var op = $('<li class="'+className+'">'+item[hiSelect.options.showField]+' </li>');
                op.data("value",item);
                list.append(op);
            });
            list.append($('<li class="placeholder"></li>'));
            hiSelect.initScroll(list.parent().attr("id"),list);
            hiSelect.dataChanged(level,data[0]);
        },
        "dataChanged":function(level,value)
        {

            var hiSelect = this;
            var oldValue = hiSelect.data[level];
            if(oldValue && oldValue[hiSelect.options.valueField]==value[hiSelect.options.valueField])
            {
                return;
            }
            if(level>0 && level <= hiSelect.options.level){
                hiSelect.data[level] = value;
            }
            if(level == hiSelect.options.level){
                return;
            }
            if(typeof hiSelect.options.option == "function")
            {
                level++;
                var data =  hiSelect.options.option(level,value);
                hiSelect.setOption(level,data);
            }
        },
        "getData":function(){
            return this.data;
        },
        "show":function(){
            this.dom.container.css("transform","translate3d(0px, -224px, 0px)");
        },
        "hide":function(){
            this.dom.container.css("transform","translate3d(0px, 0px, 0px)");
        }
    }


    $.fn.hiSelect = function(options)
    {
        var hiSelect = new HiSelect(this,options);
        hiSelect.generateHtml();
        hiSelect.initOption();
        hiSelect.bindEvent();
        $(this).click(function(){
            hiSelect.show();
        });
        this.hide = function(){
            hiSelect.hide();
        }
        this.setOption = function(level,data)
        {
            hiSelect.setOption(level,data);
        }
        return this;
    }

})(window.jQuery);