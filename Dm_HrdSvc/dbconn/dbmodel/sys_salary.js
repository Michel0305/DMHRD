var Sequelize = require('sequelize');
var sequelizeConn = require('../dbConnection');

/**
 * 薪资数据表  需要处理特殊字段加密
 */
SysSalaryDB = () =>{}
var SysSalary = sequelizeConn.define('sys_salary',{ 
    id:{type:Sequelize.NUMBER},   
    userid:{type:Sequelize.NUMBER,primaryKey: true},
    username:{type:Sequelize.STRING(30)},//姓名
    department:{type:Sequelize.STRING(30)},//部门
    basesalay:{type:Sequelize.FLOAT},//基本薪资
    joballowance:{type:Sequelize.FLOAT},//岗位/职务津贴
    workday:{type:Sequelize.FLOAT},//应出勤   
    reworkday:{type:Sequelize.FLOAT},//实际出勤   
    leaveday:{type:Sequelize.FLOAT},//请假
    pacificoverwork:{type:Sequelize.FLOAT},//平时加班   
    weekoverwork:{type:Sequelize.FLOAT},//周末加班 
    holidayoverwork:{type:Sequelize.FLOAT},//节假日加班  
    othercharges:{type:Sequelize.FLOAT},//其他补贴  
    senioritypay:{type:Sequelize.FLOAT},//工龄   
    attendancebonus:{type:Sequelize.FLOAT},//全勤  
    mealsubsidy:{type:Sequelize.FLOAT},//餐补  
    bonus:{type:Sequelize.FLOAT},//奖金  
    kpi:{type:Sequelize.FLOAT},//KPI
    pacificovertimepay:{type:Sequelize.FLOAT},//平时加班费   
    weekovertimepay:{type:Sequelize.FLOAT},//周末加班费
    holidayovertimepay:{type:Sequelize.FLOAT},//节假日加班  
    issalary:{type:Sequelize.FLOAT},//应发   
    social:{type:Sequelize.FLOAT},//社保 
    accumulation:{type:Sequelize.FLOAT},//公积金
    frock:{type:Sequelize.FLOAT},//工衣   
    utilitybills:{type:Sequelize.FLOAT},//水电 
    individual:{type:Sequelize.FLOAT},//个税
    other:{type:Sequelize.FLOAT},//其他
    months:{type:Sequelize.STRING(20)},//月份
    createuser:{type:Sequelize.INTEGER},//创建人
    createdate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },//创建日期时间
},{
    createdAt: false,                   // 禁止添加 createdAt 字段
    updatedAt: false,                  // 禁止添加 updatedAt 字段
    timestamps: false,               // 相当禁止了上面两项
    freezeTableName: true,        // 禁止修改标明为复数
})

SysSalaryDB.SelectAll = async (...swhere) => {
    if (swhere.length == 0) {
        return SysSalary.findAll();
    } else {
        return SysSalary.findAll(swhere[0]);
    }
}

SysSalaryDB.Update = async (fields, ...swhere) => {
    return SysSalary.update(fields, swhere[0]);
}

SysSalaryDB.Delete = async (...swhere) => {
    return SysSalary.destroy(swhere[0])
}

SysSalaryDB.Insert = async (...swhere) => {
    return SysSalary.create(swhere[0])
}

SysSalaryDB.Query = async (swhere) => {
    return sequelizeConn.query(swhere)
}

SysSalaryDB.Count = async (...swhere) => {
    if (swhere.length == 0) {
        return SysSalary.count();
    } else {
        return SysSalary.count(swhere);
    }
}

// cmsMemberReport.sync()
module.exports = SysSalaryDB;