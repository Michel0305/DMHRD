var Sequelize = require('sequelize');
var sequelizeConn = require('../dbConnection');


ResAttendanceDB = () => { }

/**
 * 考勤设备数据
 */
var resAttendance = sequelizeConn.define('res_attendance', {
    id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true, unique: true },
    deviceuserId: { type: Sequelize.CHAR },//编号
    recordtime: { type: Sequelize.DATE },//刷卡
    ip: { type: Sequelize.STRING },//设备IP
    createdate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },//创建日期时间    
}, {
    createdAt: false,                   // 禁止添加 createdAt 字段
    updatedAt: false,                  // 禁止添加 updatedAt 字段
    timestamps: false,               // 相当禁止了上面两项
    freezeTableName: true,        // 禁止修改标明为复数
})

ResAttendanceDB.SelectAll = async (...swhere) => {
    if (swhere.length == 0) {
        return resAttendance.findAll();
    } else {
        return resAttendance.findAll(swhere[0]);
    }
}

ResAttendanceDB.Update = async (fields, ...swhere) => {
    return resAttendance.update(fields, swhere[0]);
}

ResAttendanceDB.Delete = async (...swhere) => {
    return resAttendance.destroy(swhere[0])
}

ResAttendanceDB.Insert = async (swhere) => {
    console.log(swhere)
    return resAttendance.create(swhere[0])
}

ResAttendanceDB.Query = async (swhere) => {
    return resAttendance.query(swhere)
}

ResAttendanceDB.Count = async (...swhere) => {
    if (swhere.length == 0) {
        return resAttendance.count();
    } else {
        return resAttendance.count(swhere);
    }
}

ResAttendanceDB.BulkCreate = async (swhere) => {//批量生产
    console.log(swhere)
    return resAttendance.bulkCreate([
        {
            id: 0,
            deviceuserId: '1058',
            recordtime: '2103-08-17T22:29:39.000Z',
            ip: '10.83.34.10'
        },
        {
            id: 0,
            deviceuserId: '1058',
            recordtime: '2103-08-17T22:29:42.000Z',
            ip: '10.83.34.10'
        },
        {
            id: 0,
            deviceuserId: '1058',
            recordtime: '2103-08-17T22:29:44.000Z',
            ip: '10.83.34.10'
        },
        {
            id: 0,
            deviceuserId: '1058',
            recordtime: '2103-08-17T22:29:48.000Z',
            ip: '10.83.34.10'
        }
    ])
}
// cmsMemberReport.sync()
module.exports = ResAttendanceDB;