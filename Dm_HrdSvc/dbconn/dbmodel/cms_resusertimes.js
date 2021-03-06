var Sequelize = require('sequelize');
var sequelizeConn = require('../dbConnection');


ResUserTimesDB = () => { };

/**
 * 人员刷卡考勤班次
 */
var resUserTimes = sequelizeConn.define('res_usertimes', {
    id: { type: Sequelize.BIGINT, autoIncrement: true, unique: true },
    timesname: { type: Sequelize.CHAR(10), primaryKey: true },//名称 
    timestype: { type: Sequelize.INTEGER, primaryKey: true },//白夜班
    timesfirst: {
        type: Sequelize.STRING
    },//第一次刷卡
    timessecond: {
        type: Sequelize.STRING
    },//第二次刷卡
    timesthird: {
        type: Sequelize.STRING
    },//第三次刷卡
    timesfourth: {
        type: Sequelize.STRING
    },//第四次刷卡
    timesfifth: {
        type: Sequelize.STRING
    },//第五次刷卡
    thimessixth: {
        type: Sequelize.STRING
    },//第六次刷卡
    workstart:{ type: Sequelize.STRING},//加班开始
    ischeck: { type: Sequelize.BOOLEAN },//是否启用
    create_time: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },//创建日期时间
}, {
    createdAt: false,                   // 禁止添加 createdAt 字段
    updatedAt: false,                  // 禁止添加 updatedAt 字段
    timestamps: false,               // 相当禁止了上面两项
    freezeTableName: true,        // 禁止修改标明为复数
})

ResUserTimesDB.SelectAll = async (...swhere) => {
    if (swhere.length == 0) {
        return resUserTimes.findAll();
    } else {
        return resUserTimes.findAll(swhere[0]);
    }
}

ResUserTimesDB.Update = async (fields, ...swhere) => {
    return resUserTimes.update(fields, swhere[0]);
}

ResUserTimesDB.Delete = async (...swhere) => {
    return resUserTimes.destroy(swhere[0])
}

ResUserTimesDB.Insert = async (...swhere) => {
    return resUserTimes.create(swhere[0])
}

ResUserTimesDB.Query = async (swhere) => {
    return sequelizeConn.query(swhere)
}

ResUserTimesDB.Count = async (...swhere) => {
    if (swhere.length == 0) {
        return resUserTimes.count();
    } else {
        return resUserTimes.count(swhere);
    }
}
// cmsMemberReport.sync()
module.exports = ResUserTimesDB;