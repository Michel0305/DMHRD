var Sequelize = require('sequelize');
var sequelizeConn = require('../dbConnection');


SysRoleDB = () => { }

/**
 * 角色
 */
var sysRole = sequelizeConn.define('sys_role', {
    id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true, unique: true },
    rolename: { type: Sequelize.STRING, primaryKey: true },//角色 
    createdate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },//创建日期时间
}, {
    createdAt: false,                   // 禁止添加 createdAt 字段
    updatedAt: false,                  // 禁止添加 updatedAt 字段
    timestamps: false,               // 相当禁止了上面两项
    freezeTableName: true,        // 禁止修改标明为复数
})

SysRoleDB.SelectAll = async (...swhere) => {
    if (swhere.length == 0) {
        return sysRole.findAll();
    } else {
        return sysRole.findAll(swhere[0]);
    }
}

SysRoleDB.Update = async (fields, ...swhere) => {
    return sysRole.update(fields, swhere[0]);
}

SysRoleDB.Delete = async (...swhere) => {
    return sysRole.destroy(swhere[0])
}

SysRoleDB.Insert = async (...swhere) => {
    return sysRole.create(swhere[0])
}

SysRoleDB.Query = async (swhere) => {
    return sequelizeConn.sequelize.query(swhere)
}

SysRoleDB.Count = async (...swhere) => {
    if (swhere.length == 0) {
        return sysRole.count();
    } else {
        return sysRole.count(swhere);
    }
}

module.exports = SysRoleDB;