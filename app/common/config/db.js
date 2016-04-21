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
      host: '127.0.0.1',
      port: '3306',
      database: 'think_cal',
      user: 'root',
      password: '556600',
      prefix: 'think_',
      encoding: 'utf8'
    },
    mongo: {

    }
  }
};
