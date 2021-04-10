var Sequelize = require('sequelize');
var sequelizeConn = require('../dbConnection');


ResUsersDB = () => { }

/**
 * 人员资讯表
 */
var resUsers = sequelizeConn.define('res_users', {
    id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true, unique: true },
    user_id: { type: Sequelize.NUMBER, primaryKey: true },//编号
    user_name: { type: Sequelize.CHAR(10) },//姓名    
    dept: { type: Sequelize.CHAR(10) },//部门
    address: { type: Sequelize.STRING(100) },//地址
    job: { type: Sequelize.STRING(30) },//工位
    position: { type: Sequelize.STRING(20) },//职位 
    education: { type: Sequelize.STRING(30) },//教育程度
    sex: { type: Sequelize.CHAR(5) },//相别
    cardid: { type: Sequelize.STRING(20) },//身份证
    birthday: { type: Sequelize.DATE },//出生日期
    email: { type: Sequelize.STRING(50) },//邮件
    imgurl: { type: Sequelize.STRING(50) },//图片路劲
    indate: { type: Sequelize.DATE },//进厂日期
    phone: { type: Sequelize.CHAR(15) },//联系方式
    timestype: { type: Sequelize.NUMBER },//考勤班次
    defpartid: { type: Sequelize.NUMBER },//部门编号
    mastpartid: { type: Sequelize.NUMBER },//率属部门编号
    isline: { type: Sequelize.BLOB },//是否在职
    cdnumber: { type: Sequelize.STRING(50) },//考勤门禁卡
    workloc: { type: Sequelize.STRING(50) },//工作地点
    school: { type: Sequelize.STRING(50) },
    bankname: { type: Sequelize.STRING(50) },
    bankson: { type: Sequelize.STRING(50) },
    bankcard: { type: Sequelize.STRING(50) },
    documents: { type: Sequelize.STRING(50) },
    social: { type: Sequelize.STRING(50) },
    goods: { type: Sequelize.STRING(50) },
    workday:{type:Sequelize.FLOAT}, //工作天数
    workhour:{type:Sequelize.FLOAT}, //工作时数
    accountability:{type:Sequelize.BOOLEAN}, //责任制
    createusr:{type:Sequelize.NUMBER},
    create_time: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },//创建日期时间
}, {
    createdAt: false,                   // 禁止添加 createdAt 字段
    updatedAt: false,                  // 禁止添加 updatedAt 字段
    timestamps: false,               // 相当禁止了上面两项
    freezeTableName: true,        // 禁止修改标明为复数
})

ResUsersDB.SelectAll = async (...swhere) => {
    if (swhere.length == 0) {
        return resUsers.findAll();
    } else {
        return resUsers.findAll(swhere[0]);
    }
}

ResUsersDB.Update = async (fields, ...swhere) => {
    return resUsers.update(fields, swhere[0]);
}

ResUsersDB.Delete = async (...swhere) => {
    return resUsers.destroy(swhere[0])
}

ResUsersDB.Insert = async (...swhere) => {
    return resUsers.create(swhere[0])
}

ResUsersDB.Query = async (swhere) => {
    return sequelizeConn.query(swhere)
}

ResUsersDB.Count = async (...swhere) => {
    if (swhere.length == 0) {
        return resUsers.count();
    } else {
        return resUsers.count(swhere);
    }
}

// cmsMemberReport.sync()
module.exports = ResUsersDB;