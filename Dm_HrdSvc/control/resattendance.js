// 

var ZkDevice = require('./zk');
var moment = require('moment');
var fs = require('fs');
var ResAttendanceDB = require('../dbconn/dbmodel/res_attendance')//别问那么多,照做就行，不信你提到最上一层你试试！！！
ZkData = () => { }
/**
 * 数据下载
 */
ZkData.download = () => {
    let tmpDate = moment(new Date()).subtract(7, 'days').calendar();
    async function DataDownload() {
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
    }
    return DataDownload()
}

module.exports = ZkData;