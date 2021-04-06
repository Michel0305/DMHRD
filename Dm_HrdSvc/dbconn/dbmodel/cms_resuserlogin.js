var Sequelize = require('sequelize');
var sequelizeConn = require('../dbConnection');


ResUserLoginDB = () =>{}
/**
 * 人员登录表
 */
var resUserLogin = sequelizeConn.define('res_userlogin',{
    id : {type : Sequelize.BIGINT, autoIncrement : true, primaryKey : true, unique : true},
    userid:{type:Sequelize.BIGINT,primaryKey : true},//编号
    pwd:{type:Sequelize.STRING(255)},//密码
    lastlogindate:{type:Sequelize.DATE},//最后登录时间
    islock:{type:Sequelize.BLOB},//是否启用
    account:{type:Sequelize.STRING(100)},//账户
    username:{type:Sequelize.CHAR(10)},
    create_time:{type:Sequelize.DATE,defaultValue : Sequelize.NOW},//创建日期时间
},{
    createdAt: false,                   // 禁止添加 createdAt 字段
    updatedAt: false,                  // 禁止添加 updatedAt 字段
    timestamps: false,               // 相当禁止了上面两项
    freezeTableName: true,        // 禁止修改标明为复数
})

ResUserLoginDB.SelectAll = async (...swhere) => {
    if (swhere.length == 0) {
        return resUserLogin.findAll();
    } else {
        return resUserLogin.findAll(swhere[0]);
    }    
}

ResUserLoginDB.Update = async (fields, ...swhere) => {
    return resUserLogin.update(fields, swhere[0]);
}

ResUserLoginDB.Delete = async (...swhere) => {
    return resUserLogin.destroy(swhere[0])
}

ResUserLoginDB.Insert = async (...swhere) => {
    return resUserLogin.create(swhere[0])
}

ResUserLoginDB.Query = async (swhere) => {
    return sequelizeConn.query(swhere)
}

ResUserLoginDB.Count = async (...swhere) => {
    if (swhere.length == 0) {
        return resUserLogin.count();
    } else {
        return resUserLogin.count(swhere);
    }
}

// cmsMemberReport.sync()
module.exports = ResUserLoginDB;