var Sequelize = require('sequelize');
var sequelizeConn = require('../dbConnection');


ResLeaveDB = () => { }

/**
 * 请假数据表
 */
var resLeave = sequelizeConn.define('res_leave', {
    id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true, unique: true },
    userid: { type: Sequelize.BIGINT, primaryKey: true },//编号
    leavedate: { type: Sequelize.DATE },//请假日期
    starttime: { type: Sequelize.DATE },//开始时间
    endtime: { type: Sequelize.DATE },//结束时间
    timetotal: { type: Sequelize.FLOAT },//累计时长
    apploveid: { type: Sequelize.NUMBER },//审核人ID
    applovestatus: { type: Sequelize.NUMBER },//审核状态
    createuser: { type: Sequelize.NUMBER },//申请人
    leavetype: { type: Sequelize.NUMBER },//请假类别
    remark: { type: Sequelize.STRING },//备注信息
    createdate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },//创建日期时间
}, {
    createdAt: false,                   // 禁止添加 createdAt 字段
    updatedAt: false,                  // 禁止添加 updatedAt 字段
    timestamps: false,               // 相当禁止了上面两项
    freezeTableName: true,        // 禁止修改标明为复数
})

ResLeaveDB.SelectAll = async (...swhere) => {
    if (swhere.length == 0) {
        return resLeave.findAll();
    } else {
        return resLeave.findAll(swhere[0]);
    }
}

ResLeaveDB.Update = async (fields, ...swhere) => {
    return resLeave.update(fields, swhere[0]);
}

ResLeaveDB.Delete = async (...swhere) => {
    return resLeave.destroy(swhere[0])
}

ResLeaveDB.Insert = async (...swhere) => {
    return resLeave.create(swhere[0])
}

ResLeaveDB.Query = async (swhere) => {
    console.log(swhere)
    return sequelizeConn.query(swhere)
}

ResLeaveDB.Count = async (...swhere) => {
    if (swhere.length == 0) {
        return resLeave.count();
    } else {
        return resLeave.count(swhere);
    }
}

// cmsMemberReport.sync()
module.exports = ResLeaveDB;