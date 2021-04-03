var Sequelize = require('sequelize');
var sequelizeConn = require('../dbConnection');


SysModelDB = () => { }

/**
 * 系统模块
 */
var sysModel = sequelizeConn.define('sys_model', {
    id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true, unique: true },
    modelname: { type: Sequelize.STRING, primaryKey: true },//模块名称
    router: { type: Sequelize.STRING, primaryKey: true },//路由   
    createdate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },//创建日期时间
}, {
    createdAt: false,                   // 禁止添加 createdAt 字段
    updatedAt: false,                  // 禁止添加 updatedAt 字段
    timestamps: false,               // 相当禁止了上面两项
    freezeTableName: true,        // 禁止修改标明为复数
})

SysModelDB.SelectAll = async (...swhere) => {
    if (swhere.length == 0) {
        return sysModel.findAll();
    } else {
        return sysModel.findAll(swhere[0]);
    }
}

SysModelDB.Update = async (fields, ...swhere) => {
    return sysModel.update(fields, swhere[0]);
}

SysModelDB.Delete = async (...swhere) => {
    return sysModel.destroy(swhere[0])
}

SysModelDB.Insert = async (...swhere) => {
    return sysModel.create(swhere[0])
}

SysModelDB.Query = async (swhere) => {
    return sequelizeConn.sequelize.query(swhere)
}

SysModelDB.Count = async (...swhere) => {
    if (swhere.length == 0) {
        return sysModel.count();
    } else {
        return sysModel.count(swhere);
    }
}

module.exports = SysModelDB;