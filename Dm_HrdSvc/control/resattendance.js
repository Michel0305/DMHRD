// 

var ZkDevice = require('./zk');
var moment = require('moment');
var fs = require('fs');
var ResAttendanceDB = require('../dbconn/dbmodel/res_attendance')
ZkData = () => { }
/**
 * 数据下载
 */
ZkData.download = () => {
    let tmpDate = moment(new Date()).subtract(10, 'days').calendar();
    async function DataDownload() {
        try {
            let logData = await ZkDevice.GetAttendanceData();
            if (logData.code === 404) return logData
            let dbData = [];
            for (let i = 0; i < logData.data.data.length; i++) {
                const el = logData.data.data[i];
                if (moment(el.recordTime).isAfter(new Date(`${tmpDate} 00:00:00`).toISOString())) {
                    let tmpDeviceData = {
                        deviceuserId: el.deviceUserId,
                        recordtime: moment(el.recordTime).format('YYYY-MM-DD HH:mm:ss.SSS'),
                        ip: el.ip
                    }
                    dbData.push(tmpDeviceData)
                }
            }
            return await ResAttendanceDB.BulkCreate(dbData)
        } catch (error) {
           console.log(error) 
           return error 
        }
        
    }
    return DataDownload()
}

//ZkData.download(); //测试函数
module.exports = ZkData;