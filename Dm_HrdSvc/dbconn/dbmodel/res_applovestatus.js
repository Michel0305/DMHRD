var Sequelize = require('sequelize');
var sequelizeConn = require('../dbConnection');


ResApploveStatusDB = () => { }

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

ResApploveStatusDB.SelectAll = async (...swhere) => {
    if (swhere.length == 0) {
        return resApploveStatus.findAll();
    } else {
        return resApploveStatus.findAll(swhere[0]);
    }
}

ResApploveStatusDB.Update = async (fields, ...swhere) => {
    return resApploveStatus.update(fields, swhere[0]);
}

ResApploveStatusDB.Delete = async (...swhere) => {
    return resApploveStatus.destroy(swhere[0])
}

ResApploveStatusDB.Insert = async (...swhere) => {
    return resApploveStatus.create(swhere[0])
}

ResApploveStatusDB.Query = async (swhere) => {
    return sequelizeConn.query(swhere)
}

ResApploveStatusDB.Count = async (...swhere) => {
    if (swhere.length == 0) {
        return resApploveStatus.count();
    } else {
        return resApploveStatus.count(swhere);
    }
}

// cmsMemberReport.sync()
module.exports = ResApploveStatusDB;