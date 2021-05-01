var Sequelize = require('sequelize');
var sequelizeConn = require('../dbConnection');


ResTakeworkDB = () => { }

/**
 * 年休
 */
var resTakework = sequelizeConn.define('res_takework', {
    id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true, unique: true },
    userid: { type: Sequelize.INTEGER, primaryKey: true },//编号
    timescount: { type: Sequelize.FLOAT },//天数
    createuser: { type: Sequelize.INTEGER },//更新人
    createdate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },//创建日期时间
}, {
    createdAt: false,                   // 禁止添加 createdAt 字段
    updatedAt: false,                  // 禁止添加 updatedAt 字段
    timestamps: false,               // 相当禁止了上面两项
    freezeTableName: true,        // 禁止修改标明为复数
})

ResTakeworkDB.SelectAll = async (...swhere) => {
    if (swhere.length == 0) {
        return resTakework.findAll();
    } else {
        return resTakework.findAll(swhere[0]);
    }
}

ResTakeworkDB.Update = async (fields, ...swhere) => {
    return resTakework.update(fields, swhere[0]);
}

ResTakeworkDB.Delete = async (...swhere) => {
    return resTakework.destroy(swhere[0])
}

ResTakeworkDB.Insert = async (...swhere) => {
    return resTakework.create(swhere[0])
}

ResTakeworkDB.Query = async (swhere) => {
    return sequelizeConn.query(swhere)
}

ResTakeworkDB.Count = async (...swhere) => {
    if (swhere.length == 0) {
        return resTakework.count();
    } else {
        return resTakework.count(swhere);
    }
}

// cmsMemberReport.sync()
module.exports = ResTakeworkDB;