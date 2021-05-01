var Sequelize = require('sequelize');
var sequelizeConn = require('../dbConnection');


ResUserannualDB = () => { }

/**
 * 调休
 */
var resUserannual = sequelizeConn.define('res_userannual', {
    id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true, unique: true },
    userid: { type: Sequelize.BIGINT, primaryKey: true },//编号
    defdate:{type: Sequelize.DATE, primaryKey: true},
    startdate:{type: Sequelize.DATE, primaryKey: true},
    enddate:{type: Sequelize.DATE, primaryKey: true},
    defdays:{type: Sequelize.FLOAT},
    usedays:{type: Sequelize.FLOAT},   
    createuser: { type: Sequelize.INTEGER },//更新人
    createdate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },//创建日期时间
}, {
    createdAt: false,                   // 禁止添加 createdAt 字段
    updatedAt: false,                  // 禁止添加 updatedAt 字段
    timestamps: false,               // 相当禁止了上面两项
    freezeTableName: true,        // 禁止修改标明为复数
})

ResUserannualDB.SelectAll = async (...swhere) => {
    if (swhere.length == 0) {
        return resUserannual.findAll();
    } else {
        return resUserannual.findAll(swhere[0]);
    }
}

ResUserannualDB.Update = async (fields, ...swhere) => {
    return resUserannual.update(fields, swhere[0]);
}

ResUserannualDB.Delete = async (...swhere) => {
    return resUserannual.destroy(swhere[0])
}

ResUserannualDB.Insert = async (...swhere) => {
    return resUserannual.create(swhere[0])
}

ResUserannualDB.Query = async (swhere) => {
    return sequelizeConn.query(swhere)
}

ResUserannualDB.Count = async (...swhere) => {
    if (swhere.length == 0) {
        return resUserannual.count();
    } else {
        return resUserannual.count(swhere);
    }
}

// cmsMemberReport.sync()
module.exports = ResUserannualDB;