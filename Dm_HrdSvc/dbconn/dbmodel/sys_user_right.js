var Sequelize = require('sequelize');
var sequelizeConn = require('../dbConnection');


SysUserRightDB = () => { }

/**
 * 用户对角色
 */
var sysUserRight = sequelizeConn.define('sys_user_right', {
    id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true, unique: true },
    userid: { type: Sequelize.NUMBER, primaryKey: true },//用户
    roleid: { type: Sequelize.NUMBER, primaryKey: true },//角色 
    createdate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },//创建日期时间
}, {
    createdAt: false,                   // 禁止添加 createdAt 字段
    updatedAt: false,                  // 禁止添加 updatedAt 字段
    timestamps: false,               // 相当禁止了上面两项
    freezeTableName: true,        // 禁止修改标明为复数
})

SysUserRightDB.SelectAll = async (...swhere) => {
    if (swhere.length == 0) {
        return sysUserRight.findAll();
    } else {
        return sysUserRight.findAll(swhere[0]);
    }
}

SysUserRightDB.Update = async (fields, ...swhere) => {
    return sysUserRight.update(fields, swhere[0]);
}

SysUserRightDB.Delete = async (...swhere) => {
    return sysUserRight.destroy(swhere[0])
}

SysUserRightDB.Insert = async (...swhere) => {
    return sysUserRight.create(swhere[0])
}

SysUserRightDB.Query = async (swhere) => {
    return sequelizeConn.query(swhere)
}

SysUserRightDB.Count = async (...swhere) => {
    if (swhere.length == 0) {
        return sysUserRight.count();
    } else {
        return sysUserRight.count(swhere);
    }
}

SysUserRightDB.BulkCreate = async (swhere) => {//批量生产
    return sysUserRight.bulkCreate(swhere)
}

module.exports = SysUserRightDB;