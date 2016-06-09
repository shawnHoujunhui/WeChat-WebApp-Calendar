##AngularJS-RequireJS

在这个我所写应用模版中，基本实现了一下功能

 - requirejs: 模块化按需加载angularjs，可以极大的减少浏览器带宽请求数
 - angular-bootstrap：angular-ui中的bootstrap库
 - angular-ui-router：强大的router，比起ngRoute可以更好的调用view和独有的state状态
 - 自定义services：用JSONP来跨域调用远程的API
 - 自定义directives：可以创建自定义的指令，比如```<img load-src="/img/example.jpg" />```, 其中自定义loadSrc指令可以显示图片加载状态并淡入显示
 - 自定义controller：如何让导航根据url 路径显示acive状态？如何调用Services？

##目录结构

```
.
|-- README.md
|-- assets
|   |-- css
|   |   `-- style.css
|   |-- fonts
|   |-- img
|   |-- js
|   |   |-- app.js
|   |   |-- bootstrap.js
|   |   |-- controllers
|   |   |   |-- about-ctrl.js
|   |   |   |-- app-ctrl.js
|   |   |   |-- home-ctrl.js
|   |   |   |-- index.js
|   |   |   `-- module.js
|   |   |-- directives
|   |   |   |-- index.js
|   |   |   |-- load-src.js
|   |   |   `-- module.js
|   |   |-- filters
|   |   |   |-- index.js
|   |   |   `-- module.js
|   |   |-- main.js
|   |   |-- routes.js
|   |   `-- services
|   |       |-- galleries.js
|   |       |-- gallery.js
|   |       |-- index.js
|   |       `-- module.js
|   `-- partials
|       |-- about.html
|       |-- home.html
|       `-- menu.html
|-- bower.json
`-- index.html
```

##使用Bower

**(1)** 创建/修改```bower.json``` 设置你想要的第三方组件

```
{
    "name": "AngularJS + RequireJS Example",
    "version": "0.1",
    "main": "index.html",
    "ignore": [
        "**/.*",
        "libs"
    ],
    "dependencies": {
        "angular": "latest",
        "angular-bootstrap": "latest",
        "angular-ui-router": "latest",
        "angular-animate": "latest",
        "angular-resource": "latest",
        "angular-sanitize": "latest",
        "angular-i18n": "latest",
        "bootstrap": "latest",
        "requirejs": "latest",
        "requirejs-domready": "latest"
    }
}
```


**(2)** 创建/修改```.bowerrc``` 设置第三方组件的存放路径

```
{
    "directory": "assets/libs"
}
```
**(3)** 安装, 获取你想要的第三方组件

在终端输入:

```bower install```

你也可以直接安装第三方组件， 比如:

```bower install -g font-awesome```

##加载资源

```
require.config({
    // 添加库路径别名
    paths: {
        'domReady': '../libs/requirejs-domready/domReady',
        'angular': '../libs/angular/angular.min',
        'uiRouter': '../libs/angular-ui-router/release/angular-ui-router.min',
        'uiBootstrap': '../libs/angular-bootstrap/ui-bootstrap-tpls.min',
        'ngResource': '../libs/angular-resource/angular-resource.min'
    },
    // 将非AMD规范的库放入shim中
    shim: {
        'angular': {
            exports: 'angular'
        },
        'uiRouter': {
            //依赖于Angular，以下同
            deps: ['angular']
        },
        'ngResource': {
            deps: ['angular']
        },
        'uiBootstrap': {
            deps: ['angular']
        }
    },

    // kick start application
    deps: ['./bootstrap']
});
```

待续。。。