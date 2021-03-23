var Sequelize = require('sequelize');
var sequelizeConn = require('../dbConnection');


ResAppleaveStatusDB = () => { }

/**
 * 表单审核状态
 */
var resApploveStatus = sequelizeConn.define('res_applovestatus', {
    id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true, unique: true },
    model: { type: Sequelize.CHAR }, //模块名称
    statusid: { type: Sequelize.NUMBER },//流程ID
    msg: { type: Sequelize.STRING },//名称
    createtime: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },//创建日期时间
}, {
    createdAt: false,                   // 禁止添加 createdAt 字段
    updatedAt: false,                  // 禁止添加 updatedAt 字段
    timestamps: false,               // 相当禁止了上面两项
    freezeTableName: true,        // 禁止修改标明为复数
})

ResAppleaveStatusDB.SelectAll = async (...swhere) => {
    if (swhere.length == 0) {
        return resApploveStatus.findAll();
    } else {
        return resApploveStatus.findAll(swhere[0]);
    }
}

ResAppleaveStatusDB.Update = async (fields, ...swhere) => {
    return resApploveStatus.update(fields, swhere[0]);
}

ResAppleaveStatusDB.Delete = async (...swhere) => {
    return resApploveStatus.destroy(swhere[0])
}

ResAppleaveStatusDB.Insert = async (...swhere) => {
    return resApploveStatus.create(swhere[0])
}

ResAppleaveStatusDB.Query = async (swhere) => {
    return resApploveStatus.query(swhere)
}

ResAppleaveStatusDB.Count = async (...swhere) => {
    if (swhere.length == 0) {
        return resApploveStatus.count();
    } else {
        return resApploveStatus.count(swhere);
    }
}

// cmsMemberReport.sync()
module.exports = ResAppleaveStatusDB;