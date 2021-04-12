var Sequelize = require('sequelize');
var sequelizeConn = require('../dbConnection');


ResApplovelogDB = () => { }

/**
 * 签核记录表
 */
var resApplovelog = sequelizeConn.define('res_applovelog', {
    id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true, unique: true },
    modelname: { type: Sequelize.CHAR }, //模块名称
    formid: { type: Sequelize.NUMBER },//表单ID
    appuser: { type: Sequelize.CHAR },//签核人
    appremart: { type: Sequelize.STRING },//签核人意见
    statusid: { type: Sequelize.NUMBER },//流程ID
    apploveid:{type:Sequelize.NUMBER },
    createtime: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },//创建日期时间
}, {
    createdAt: false,                   // 禁止添加 createdAt 字段
    updatedAt: false,                  // 禁止添加 updatedAt 字段
    timestamps: false,               // 相当禁止了上面两项
    freezeTableName: true,        // 禁止修改标明为复数
})

ResApplovelogDB.SelectAll = async (...swhere) => {
    if (swhere.length == 0) {
        return resApplovelog.findAll();
    } else {
        return resApplovelog.findAll(swhere[0]);
    }
}

ResApplovelogDB.Update = async (fields, ...swhere) => {
    return resApplovelog.update(fields, swhere[0]);
}

ResApplovelogDB.Delete = async (...swhere) => {
    return resApplovelog.destroy(swhere[0])
}

ResApplovelogDB.Insert = async (...swhere) => {
    return resApplovelog.create(swhere[0])
}

ResApplovelogDB.Query = async (swhere) => {
    return sequelizeConn.query(swhere)
}

ResApplovelogDB.Count = async (...swhere) => {
    if (swhere.length == 0) {
        return resApplovelog.count();
    } else {
        return resApplovelog.count(swhere);
    }
}

// cmsMemberReport.sync()
module.exports = ResApplovelogDB;