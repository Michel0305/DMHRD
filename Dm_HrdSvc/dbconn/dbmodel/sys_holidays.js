var Sequelize = require('sequelize');
var sequelizeConn = require('../dbConnection');


SysHolidaysDB = () => { }

/**
 * 假日设定
 */
var sysHolidays = sequelizeConn.define('sys_holidays', {
    id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true, unique: true },
    dayname: { type: Sequelize.STRING },//名称
    startdate: { type: Sequelize.DATE,primaryKey: true },//开始日期
    enddate: { type: Sequelize.DATE,primaryKey: true },//结束日期
    remark: { type: Sequelize.STRING },//备注
    createuser: { type: Sequelize.NUMBER },//创建人
    createdate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },//创建日期时间
}, {
    createdAt: false,                   // 禁止添加 createdAt 字段
    updatedAt: false,                  // 禁止添加 updatedAt 字段
    timestamps: false,               // 相当禁止了上面两项
    freezeTableName: true,        // 禁止修改标明为复数
})

SysHolidaysDB.SelectAll = async (...swhere) => {
    if (swhere.length == 0) {
        return sysHolidays.findAll();
    } else {
        return sysHolidays.findAll(swhere[0]);
    }
}

SysHolidaysDB.Update = async (fields, ...swhere) => {
    return sysHolidays.update(fields, swhere[0]);
}

SysHolidaysDB.Delete = async (...swhere) => {
    return sysHolidays.destroy(swhere[0])
}

SysHolidaysDB.Insert = async (...swhere) => {
    return sysHolidays.create(swhere[0])
}

SysHolidaysDB.Query = async (swhere) => {
    return sequelizeConn.query(swhere)
}

SysHolidaysDB.Count = async (...swhere) => {
    if (swhere.length == 0) {
        return sysHolidays.count();
    } else {
        return sysHolidays.count(swhere);
    }
}

// cmsMemberReport.sync()
module.exports = SysHolidaysDB;