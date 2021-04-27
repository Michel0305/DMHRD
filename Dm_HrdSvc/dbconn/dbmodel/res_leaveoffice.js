var Sequelize = require('sequelize');
var sequelizeConn = require('../dbConnection');


ResLeaveofficeDB = () => { }

/**
 * 请假数据表
 */
var resLeaveoffice = sequelizeConn.define('res_leaveoffice', {
    id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true, unique: true },
    userid: { type: Sequelize.BIGINT, primaryKey: true },//编号    
    expectdate: { type: Sequelize.DATE },//期望日期
    coordinatedate: { type: Sequelize.DATE },//协商时间
    lotype:{type: Sequelize.STRING},
    remark: { type: Sequelize.STRING },//备注信息
    apploveid: { type: Sequelize.NUMBER },//审核人ID
    applovestatus: { type: Sequelize.NUMBER },//审核状态
    createuser: { type: Sequelize.NUMBER },//申请人     
    createdate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },//创建日期时间
}, {
    createdAt: false,                   // 禁止添加 createdAt 字段
    updatedAt: false,                  // 禁止添加 updatedAt 字段
    timestamps: false,               // 相当禁止了上面两项
    freezeTableName: true,        // 禁止修改标明为复数
})

ResLeaveofficeDB.SelectAll = async (...swhere) => {
    if (swhere.length == 0) {
        return resLeaveoffice.findAll();
    } else {
        return resLeaveoffice.findAll(swhere[0]);
    }
}

ResLeaveofficeDB.Update = async (fields, ...swhere) => {
    return resLeaveoffice.update(fields, swhere[0]);
}

ResLeaveofficeDB.Delete = async (...swhere) => {
    return resLeaveoffice.destroy(swhere[0])
}

ResLeaveofficeDB.Insert = async (...swhere) => {
    return resLeaveoffice.create(swhere[0])
}

ResLeaveofficeDB.Query = async (swhere) => {
    return sequelizeConn.query(swhere)
}

ResLeaveofficeDB.Count = async (...swhere) => {
    if (swhere.length == 0) {
        return resLeaveoffice.count();
    } else {
        return resLeaveoffice.count(swhere);
    }
}

// cmsMemberReport.sync()
module.exports = ResLeaveofficeDB;