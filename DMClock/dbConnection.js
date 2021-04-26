
var Sequelize = require('sequelize');
var fs = require('fs');
var path = require('path');
let confPath = path.join(__dirname,'/config-template.js')
var config = fs.existsSync(confPath)?require('./config-template.js'):require('./config');
/**
 * 创建连接池
 */
var poolSequelize = new Sequelize(config.sql.database, config.sql.user, config.sql.password, {   
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
    options:{
        "encrypt": true,
        "enableArithAbort": true
    },
    logging: false   //输出日志
});
(async () => {
    try {
        await poolSequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = poolSequelize