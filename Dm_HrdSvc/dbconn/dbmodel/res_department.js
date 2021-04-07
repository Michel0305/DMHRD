var Sequelize = require('sequelize');
var sequelizeConn = require('../dbConnection');

ResDepartmentDB = () =>{};
/**
 * 部门资讯表
 */
var resDepartment = sequelizeConn.define('res_department',{
    id : {type : Sequelize.BIGINT, autoIncrement : true, primaryKey : true, unique : true},
    dept_name:{type:Sequelize.STRING(30)},//部门名称
    deptid:{type:Sequelize.INTEGER},//部门编号
    upbenchid:{type:Sequelize.INTEGER},//上阶部门
    deptower:{type:Sequelize.INTEGER},//负责人
    authorized:{type:Sequelize.INTEGER},//编制人数
    isDel:{type:Sequelize.BOOLEAN},
    createuser:{type:Sequelize.NUMBER},
    create_time:{type:Sequelize.DATE,defaultValue : Sequelize.NOW},//创建日期时间
},{
    createdAt: false,                   // 禁止添加 createdAt 字段
    updatedAt: false,                  // 禁止添加 updatedAt 字段
    timestamps: false,               // 相当禁止了上面两项
    freezeTableName: true,        // 禁止修改标明为复数
})

ResDepartmentDB.SelectAll = async (...swhere) => {
    if (swhere.length == 0) {
        return resDepartment.findAll();
    } else {
        return resDepartment.findAll(swhere[0]);
    }
}

ResDepartmentDB.Update = async (fields, ...swhere) => {
    return resDepartment.update(fields, swhere[0]);
}

ResDepartmentDB.Delete = async (...swhere) => {
    return resDepartment.destroy(swhere[0])
}

ResDepartmentDB.Insert = async (...swhere) => {
    return resDepartment.create(swhere[0])
}

ResDepartmentDB.Query = async (swhere) => {
    return sequelizeConn.query(swhere)
}

ResDepartmentDB.Count = async (...swhere) => {
    if (swhere.length == 0) {
        return resDepartment.count();
    } else {
        return resDepartment.count(swhere);
    }
}
// cmsMemberReport.sync()
module.exports = ResDepartmentDB;