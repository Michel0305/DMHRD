var Sequelize = require('sequelize');
var sequelizeConn = require('../dbConnection');


SysRoleModelDB = () => { }

/**
 * 角色对权限
 */
var sysRoleModel = sequelizeConn.define('sys_role_model', {
    id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true, unique: true },
    roleid: { type: Sequelize.NUMBER, primaryKey: true },//模块ID
    modelid: { type: Sequelize.NUMBER, primaryKey: true },//模块ID
    activeid:{type: Sequelize.STRING}, //动作
    departid: { type: Sequelize.STRING },//部门 
    createdate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },//创建日期时间
}, {
    createdAt: false,                   // 禁止添加 createdAt 字段
    updatedAt: false,                  // 禁止添加 updatedAt 字段
    timestamps: false,               // 相当禁止了上面两项
    freezeTableName: true,        // 禁止修改标明为复数
})

SysRoleModelDB.SelectAll = async (...swhere) => {
    if (swhere.length == 0) {
        return sysRoleModel.findAll();
    } else {
        return sysRoleModel.findAll(swhere[0]);
    }
}

SysRoleModelDB.Update = async (fields, ...swhere) => {
    return sysRoleModel.update(fields, swhere[0]);
}

SysRoleModelDB.Delete = async (...swhere) => {
    return sysRoleModel.destroy(swhere[0])
}

SysRoleModelDB.Insert = async (...swhere) => {
    return sysRoleModel.create(swhere[0])
}

SysRoleModelDB.Query = async (swhere) => {
    return sequelizeConn.query(swhere)
}

SysRoleModelDB.Count = async (...swhere) => {
    if (swhere.length == 0) {
        return sysRoleModel.count();
    } else {
        return sysRoleModel.count(swhere);
    }
}

SysRoleModelDB.BulkCreate = async (swhere) => {//批量生产
    return sysRoleModel.bulkCreate(swhere)
}

module.exports = SysRoleModelDB;