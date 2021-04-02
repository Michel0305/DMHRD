var Sequelize = require('sequelize');
var sequelizeConn = require('../dbConnection');


resUserjobDB = () =>{}
/**
 * 岗位资讯表
 */
var resUserjob = sequelizeConn.define('res_userjob',{
    id : {type : Sequelize.BIGINT, autoIncrement : true, primaryKey : true, unique : true},
    job:{type:Sequelize.STRING(30)},//岗位
    defpartid:{type:Sequelize.INTEGER},//部门编号
    usercount:{type:Sequelize.INTEGER},//需求人数    
    create_time:{type:Sequelize.DATE,defaultValue : Sequelize.NOW},//创建日期时间
},{
    createdAt: false,                   // 禁止添加 createdAt 字段
    updatedAt: false,                  // 禁止添加 updatedAt 字段
    timestamps: false,               // 相当禁止了上面两项
    freezeTableName: true,        // 禁止修改标明为复数
})

resUserjobDB.SelectAll = async (...swhere) => {
    if (swhere.length == 0) {
        return resUserjob.findAll();
    } else {
        // console.log(swhere[0])
        return resUserjob.findAll(swhere[0]);
    }
}

resUserjobDB.Update = async (fields, ...swhere) => {
    return resUserjob.update(fields, swhere[0]);
}

resUserjobDB.Delete = async (...swhere) => {
    return resUserjob.destroy(swhere[0])
}

resUserjobDB.Insert = async (...swhere) => {
    return resUserjob.create(swhere[0])
}

resUserjobDB.Query = async (swhere) => {
    return resUserjob.query(swhere)
}

resUserjobDB.Count = async (...swhere) => {
    if (swhere.length == 0) {
        return resUserjob.count();
    } else {
        return resUserjob.count(swhere);
    }
}

// cmsMemberReport.sync()
module.exports = resUserjobDB;