var Sequelize = require('sequelize');
var sequelizeConn = require('../dbConnection');


ResSwitChworkDB = () => { }

/**
 * 调休数据
 */
var resSwitChwork = sequelizeConn.define('res_switchwork', {
    id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true, unique: true },
    userid: { type: Sequelize.BIGINT, primaryKey: true },//编号
    freedate: { type: Sequelize.DATE },//请假日期
    workdate: { type: Sequelize.DATE },//开始时间    
    remark: { type: Sequelize.STRING },//备注信息
    appstatus: { type: Sequelize.NUMBER },//签核状态
    createuser:{type: Sequelize.NUMBER},//操作人
    createdate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },//创建日期时间
}, {
    createdAt: false,                   // 禁止添加 createdAt 字段
    updatedAt: false,                  // 禁止添加 updatedAt 字段
    timestamps: false,               // 相当禁止了上面两项
    freezeTableName: true,        // 禁止修改标明为复数
})

ResSwitChworkDB.SelectAll = async (...swhere) => {
    if (swhere.length == 0) {
        return resSwitChwork.findAll();
    } else {
        return resSwitChwork.findAll(swhere[0]);
    }
}

ResSwitChworkDB.Update = async (fields, ...swhere) => {
    return resSwitChwork.update(fields, swhere[0]);
}

ResSwitChworkDB.Delete = async (...swhere) => {
    return resSwitChwork.destroy(swhere[0])
}

ResSwitChworkDB.Insert = async (...swhere) => {
    return resSwitChwork.create(swhere[0])
}

ResSwitChworkDB.Query = async (swhere) => {
    return sequelizeConn.query(swhere)
}

ResSwitChworkDB.Count = async (...swhere) => {
    if (swhere.length == 0) {
        return resSwitChwork.count();
    } else {
        return resSwitChwork.count(swhere);
    }
}

// cmsMemberReport.sync()
module.exports = ResSwitChworkDB;