'use strict';
/**
 * config
 * @type {Object}
 */
module.exports = {
    resource_on: true, //是否开启静态资源解析功能
    resource_reg: /^(mvc|static|upload)/, //判断为静态资源请求的正则
};