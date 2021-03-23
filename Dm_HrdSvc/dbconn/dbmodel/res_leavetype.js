var Sequelize = require('sequelize');
var sequelizeConn = require('../dbConnection');


ResLeaveTypeDB = () => { }

/**
 * 假别管理表
 */
var resLeaveType = sequelizeConn.define('res_leavetype', {
    id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true, unique: true },
    leavename: { type: Sequelize.CHAR, primaryKey: true },//假别名称
    defdays: { type: Sequelize.NUMBER },//默许天数   
    createdate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },//创建日期时间
}, {
    createdAt: false,                   // 禁止添加 createdAt 字段
    updatedAt: false,                  // 禁止添加 updatedAt 字段
    timestamps: false,               // 相当禁止了上面两项
    freezeTableName: true,        // 禁止修改标明为复数
})

ResLeaveTypeDB.SelectAll = async (...swhere) => {
    if (swhere.length == 0) {
        return resLeaveType.findAll();
    } else {
        return resLeaveType.findAll(swhere[0]);
    }
}

ResLeaveTypeDB.Update = async (fields, ...swhere) => {
    return resLeaveType.update(fields, swhere[0]);
}

ResLeaveTypeDB.Delete = async (...swhere) => {
    return resLeaveType.destroy(swhere[0])
}

ResLeaveTypeDB.Insert = async (...swhere) => {
    return resLeaveType.create(swhere[0])
}

ResLeaveTypeDB.Query = async (swhere) => {
    return resLeaveType.query(swhere)
}

ResLeaveTypeDB.Count = async (...swhere) => {
    if (swhere.length == 0) {
        return resLeaveType.count();
    } else {
        return resLeaveType.count(swhere);
    }
}

// cmsMemberReport.sync()
module.exports = ResLeaveTypeDB;