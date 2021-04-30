var Sequelize = require('sequelize');
var sequelizeConn = require('../dbConnection');
var users = require('./cms_resusers');


ResWorkRecordsDB = () => { }

/**
 * 刷卡记录
 */
var resWorkRecords = sequelizeConn.define('res_workrecords', {
    id: { type: Sequelize.BIGINT, autoIncrement: true },
    userid: { type: Sequelize.NUMBER, primaryKey: true },//编号
    username:{type:Sequelize.STRING},
    bc: { type: Sequelize.NUMBER },
    partid: { type: Sequelize.NUMBER },
    checktimes: { type: Sequelize.NUMBER },
    checkdate: { type: Sequelize.DATE },
    timesone: { type: Sequelize.DATE },
    timestwo: { type: Sequelize.DATE },
    timesthree: { type: Sequelize.DATE },
    timefour: { type: Sequelize.DATE },
    timefive: { type: Sequelize.DATE },
    timesix: { type: Sequelize.DATE },
    timeseven: { type: Sequelize.DATE },
    timeseight: { type: Sequelize.DATE },
    styo: { type: Sequelize.STRING },
    styt: { type: Sequelize.STRING },
    styth: { type: Sequelize.STRING },
    styf: { type: Sequelize.STRING },
    styfi: { type: Sequelize.STRING },
    stys: { type: Sequelize.STRING },
    status: { type: Sequelize.STRING },
    station:{type: Sequelize.NUMBER},
    // bmid: { type: Sequelize.NUMBER, references: 'res_users', referencesKey: 'user_id' },
    createdate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },//创建日期时间    
}, {
    createdAt: false,                   // 禁止添加 createdAt 字段
    updatedAt: false,                  // 禁止添加 updatedAt 字段
    timestamps: false,               // 相当禁止了上面两项
    freezeTableName: true,        // 禁止修改标明为复数
})


ResWorkRecordsDB.DBModel = resWorkRecords;

ResWorkRecordsDB.SelectAll = async (...swhere) => {
    // console.log(swhere)
    if (swhere.length == 0) {
        return resWorkRecords.findAll();
    } else {
        return resWorkRecords.findAll(swhere[0]);
    }
}

ResWorkRecordsDB.Update = async (fields, ...swhere) => {
    return resWorkRecords.update(fields, swhere[0]);
}

ResWorkRecordsDB.Delete = async (...swhere) => {
    return resWorkRecords.destroy(swhere[0])
}

ResWorkRecordsDB.Insert = async (...swhere) => {
    return resWorkRecords.create(swhere[0])
}

ResWorkRecordsDB.Query = async (swhere) => {
    return sequelizeConn.query(swhere)
}

ResWorkRecordsDB.Count = async (...swhere) => {
    if (swhere.length == 0) {
        return resWorkRecords.count();
    } else {
        return resWorkRecords.count(swhere);
    }
}

// cmsMemberReport.sync()
module.exports = ResWorkRecordsDB;