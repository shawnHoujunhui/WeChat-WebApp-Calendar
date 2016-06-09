'use strict';
/**
 * db config
 * @type {Object}
 */
module.exports = {
  type: 'mysql',
  log_sql: true,
  log_connect: true,
  adapter: {
    mysql: {
      host: '121.41.42.11',
      port: '3306',
      database: 'think_cal',
      user: 'root',
      password: 'xuanxuan',
      prefix: 'think_',
      encoding: 'utf8'
    },
    mongo: {

    }
  }
};
