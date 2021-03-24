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
        // console.log(logData.code)
        // // let infoStatus = await ResAttendanceDB.Insert()
        if (logData.code === 404) return logData
        let dbData = [];

        for (let i = 0; i < logData.data.data.length; i++) {
            const el = logData.data.data[i];
            if (moment(el.recordTime).isAfter(new Date(`${tmpDate} 00:00:00`).toISOString())) {
                // let recordtime = el.recordTime
                // console.log(recordtime)
                let tmpDeviceData = {
                    id: 0,
                    deviceuserId: el.deviceUserId,
                    recordtime: el.recordTime.toISOString(),
                    ip: el.ip
                }
                dbData.push(tmpDeviceData)
                // await ResAttendanceDB.Insert([tmpDeviceData])
                // dbData.push(tmpDeviceData)
                // console.log(dbData)
                // if (i % 10 === 0 || i === logData.data.data.length) {

                //     dbData = [];
                // }
            }
        }
        await ResAttendanceDB.Insert(dbData)

    }
    return DataDownload()
}

ZkData.download();

module.exports = ZkData;