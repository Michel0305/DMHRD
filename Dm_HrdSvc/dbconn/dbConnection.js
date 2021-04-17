
var Sequelize = require('sequelize');

var config = require('../conf/config');
/**
 * 创建连接池
 */
var sequelize = new Sequelize(config.sql.database, config.sql.user, config.sql.password, {
    host: config.sql.host,
    dialect: config.sql.dialect,
    pool: {
        max: 10,                             // 最大值
        min: 0,                          // 最小值
        acquire: 30000,           //
        idle: 10000                  // 闲时超时
    },
    port: config.sql.port,
    timezone: '+08:00',
    logging: true   //输出日志
});
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = sequelize