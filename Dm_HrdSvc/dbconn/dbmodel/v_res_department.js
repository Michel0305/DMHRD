var Sequelize = require('sequelize');
var sequelizeConn = require('../dbConnection');

/**
 * 人员资讯表
 */
VResDepartmentDB = () =>{}
var vResDepartment = sequelizeConn.define('v_res_department',{ 
    id:{type:Sequelize.NUMBER,primaryKey: true},   
    dept_name:{type:Sequelize.STRING(30)},//部门名称
    deptid:{type:Sequelize.INTEGER},//部门编号
    upbenchid:{type:Sequelize.INTEGER},//上阶部门
    deptower:{type:Sequelize.INTEGER},//负责人
    authorized:{type:Sequelize.INTEGER},//编制人数
    isDel:{type:Sequelize.BOOLEAN},
    usercount:{type:Sequelize.INTEGER} //在编人数  
},{
    createdAt: false,                   // 禁止添加 createdAt 字段
    updatedAt: false,                  // 禁止添加 updatedAt 字段
    timestamps: false,               // 相当禁止了上面两项
    freezeTableName: true,        // 禁止修改标明为复数
})

VResDepartmentDB.SelectAll = async (...swhere) => {
    if (swhere.length == 0) {
        return vResDepartment.findAll();
    } else {
        // console.log(swhere[0])
        return vResDepartment.findAll(swhere[0]);
    }
}

VResDepartmentDB.Update = async (fields, ...swhere) => {
    return vResDepartment.update(fields, swhere[0]);
}

VResDepartmentDB.Delete = async (...swhere) => {
    return vResDepartment.destroy(swhere[0])
}

VResDepartmentDB.Insert = async (...swhere) => {
    return vResDepartment.create(swhere[0])
}

VResDepartmentDB.Query = async (swhere) => {
    return sequelizeConn.query(swhere)
}

VResDepartmentDB.Count = async (...swhere) => {
    if (swhere.length == 0) {
        return vResDepartment.count();
    } else {
        return vResDepartment.count(swhere);
    }
}

// cmsMemberReport.sync()
module.exports = VResDepartmentDB;