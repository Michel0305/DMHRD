var Sequelize = require('sequelize');
var sequelizeConn = require('../dbConnection');


ResOverWorkDB = () => { }

/**
 * 加班数据表
 */
var resOverWork = sequelizeConn.define('res_overwork', {
    id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true, unique: true },
    userid: { type: Sequelize.BIGINT, primaryKey: true },//编号
    worktype: { type: Sequelize.NUMBER },//加班类型
    workdate: { type: Sequelize.DATE },//加班日期
    starttime: { type: Sequelize.CHAR },//开始时间
    endtime: { type: Sequelize.CHAR },//结束时间
    timecount: { type: Sequelize.FLOAT },//累计时长
    apploveid: { type: Sequelize.NUMBER },//审核人ID
    applovestatus: { type: Sequelize.NUMBER },//审核状态
    createuser: { type: Sequelize.NUMBER },//申请人 
    workremark: { type: Sequelize.STRING },//备注信息
    createtime: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },//创建日期时间
}, {
    createdAt: false,                   // 禁止添加 createdAt 字段
    updatedAt: false,                  // 禁止添加 updatedAt 字段
    timestamps: false,               // 相当禁止了上面两项
    freezeTableName: true,        // 禁止修改标明为复数
})

ResOverWorkDB.SelectAll = async (...swhere) => {
    if (swhere.length == 0) {
        return resOverWork.findAll();
    } else {
        return resOverWork.findAll(swhere[0]);
    }
}

ResOverWorkDB.Update = async (fields, ...swhere) => {
    return resOverWork.update(fields, swhere[0]);
}

ResOverWorkDB.Delete = async (...swhere) => {
    return resOverWork.destroy(swhere[0])
}

ResOverWorkDB.Insert = async (...swhere) => {
    return resOverWork.create(swhere[0])
}

ResOverWorkDB.Query = async (swhere) => {
    return resOverWork.query(swhere)
}

ResOverWorkDB.Count = async (...swhere) => {
    if (swhere.length == 0) {
        return resOverWork.count();
    } else {
        return resOverWork.count(swhere);
    }
}

// cmsMemberReport.sync()
module.exports = ResOverWorkDB;