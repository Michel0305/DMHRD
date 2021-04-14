var Sequelize = require('sequelize');
var sequelizeConn = require('../dbConnection');

var ResWorkRecordsDB = require('./res_workrecords')


ResRegistrationCardDB = () => { }

/**
 * 请假数据表
 */
var resRegistrationCard = sequelizeConn.define('res_registration_card', {
    id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true, unique: true },
    userid: { type: Sequelize.BIGINT },//编号
    checkdate: { type: Sequelize.DATE },//补卡日期    
    attendid: { type: Sequelize.NUMBER},//关联iD
    apploveid: { type: Sequelize.NUMBER },//审核人ID
    appstatus: { type: Sequelize.NUMBER },//审核状态
    createuser: { type: Sequelize.NUMBER },//申请人 
    ids:{type: Sequelize.STRING},
    remark: { type: Sequelize.STRING },//备注信息
    createdate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },//创建日期时间
}, {
    createdAt: false,                   // 禁止添加 createdAt 字段
    updatedAt: false,                  // 禁止添加 updatedAt 字段
    timestamps: false,               // 相当禁止了上面两项
    freezeTableName: true,        // 禁止修改标明为复数
})

resRegistrationCard.belongsTo(ResWorkRecordsDB.DBModel, { foreignKey: 'attendid', targetKey: 'id', as: 'attendids' });

ResRegistrationCardDB.SelectAll = async (...swhere) => {
    if (swhere.length == 0) {
        return resRegistrationCard.findAll();
    } else {
        return resRegistrationCard.findAll(swhere[0]);
    }
}

ResRegistrationCardDB.Update = async (fields, ...swhere) => {
    return resRegistrationCard.update(fields, swhere[0]);
}

ResRegistrationCardDB.Delete = async (...swhere) => {
    return resRegistrationCard.destroy(swhere[0])
}

ResRegistrationCardDB.Insert = async (...swhere) => {
    return resRegistrationCard.create(swhere[0])
}

ResRegistrationCardDB.Query = async (swhere) => {
    return sequelizeConn.query(swhere)
}

ResRegistrationCardDB.Count = async (...swhere) => {
    if (swhere.length == 0) {
        return resRegistrationCard.count();
    } else {
        return resRegistrationCard.count(swhere);
    }
}

// cmsMemberReport.sync()
module.exports = ResRegistrationCardDB;