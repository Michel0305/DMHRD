var Sequelize = require('sequelize');
var sequelizeConn = require('../dbConnection');


SysRightDepartDB = () => { }

/**
 * 用户对部门权限
 */
var sysRightDepart = sequelizeConn.define('sys_right_depart', {
    id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true, unique: true },
    userid: { type: Sequelize.BIGINT, primaryKey: true },//编号
    dept: { type: Sequelize.STRING },//部门    
    createuser: { type: Sequelize.NUMBER },//申请人   
    createdate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },//创建日期时间
}, {
    createdAt: false,                   // 禁止添加 createdAt 字段
    updatedAt: false,                  // 禁止添加 updatedAt 字段
    timestamps: false,               // 相当禁止了上面两项
    freezeTableName: true,        // 禁止修改标明为复数
})

SysRightDepartDB.SelectAll = async (...swhere) => {
    if (swhere.length == 0) {
        return sysRightDepart.findAll();
    } else {
        return sysRightDepart.findAll(swhere[0]);
    }
}

SysRightDepartDB.Update = async (fields, ...swhere) => {
    return sysRightDepart.update(fields, swhere[0]);
}

SysRightDepartDB.Delete = async (...swhere) => {
    return sysRightDepart.destroy(swhere[0])
}

SysRightDepartDB.Insert = async (...swhere) => {
    return sysRightDepart.create(swhere[0])
}

SysRightDepartDB.Query = async (swhere) => {
    return sequelizeConn.query(swhere)
}

SysRightDepartDB.Count = async (...swhere) => {
    if (swhere.length == 0) {
        return sysRightDepart.count();
    } else {
        return sysRightDepart.count(swhere);
    }
}

// cmsMemberReport.sync()
module.exports = SysRightDepartDB;