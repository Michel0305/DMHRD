var Sequelize = require('sequelize');
var sequelizeConn = require('../dbConnection');


ResBusinessDB = () => { }

/**
 * 出差单数据表
 */
var resBusiness = sequelizeConn.define('res_business', {
    id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true, unique: true },
    userid: { type: Sequelize.BIGINT, primaryKey: true },//编号
    checkdate: { type: Sequelize.DATE ,primaryKey: true},//出差日期
    toaddressids:{type: Sequelize.STRING},
    toaddress: { type: Sequelize.STRING },//出差地点
    dscaddress: { type: Sequelize.STRING },//具体位置
    carplate: { type: Sequelize.STRING },//车牌
    isapply: { type: Sequelize.BOOLEAN },//是否报销
    remark: { type: Sequelize.STRING },//备注
    appstatus: { type: Sequelize.NUMBER },//审核状态
    actfiles:{type:Sequelize.STRING},
    createuser: { type: Sequelize.NUMBER },//申请人
    createdate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },//创建日期时间
}, {
    createdAt: false,                   // 禁止添加 createdAt 字段
    updatedAt: false,                  // 禁止添加 updatedAt 字段
    timestamps: false,               // 相当禁止了上面两项
    freezeTableName: true,        // 禁止修改标明为复数
})

ResBusinessDB.SelectAll = async (...swhere) => {
    if (swhere.length == 0) {
        return resBusiness.findAll();
    } else {
        return resBusiness.findAll(swhere[0]);
    }
}

ResBusinessDB.Update = async (fields, ...swhere) => {
    return resBusiness.update(fields, swhere[0]);
}

ResBusinessDB.Delete = async (...swhere) => {
    return resBusiness.destroy(swhere[0])
}

ResBusinessDB.Insert = async (...swhere) => {
    return resBusiness.create(swhere[0])
}

ResBusinessDB.Query = async (swhere) => {
    return sequelizeConn.query(swhere)
}

ResBusinessDB.Count = async (...swhere) => {
    if (swhere.length == 0) {
        return resBusiness.count();
    } else {
        return resBusiness.count(swhere);
    }
}

// cmsMemberReport.sync()
module.exports = ResBusinessDB;