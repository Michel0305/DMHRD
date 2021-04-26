// 

var ZkDevice = require('./zk');
var moment = require('moment');
var ResAttendanceDB = require('./res_attendance');
var fs = require('fs');
var path = require('path');
let confPath = path.join(__dirname,'/conf/config-template.js')
var config = fs.existsSync(confPath)?require('./config-template.js'):require('./config');

ZkData = () => { }
/**
 * 数据下载 取前一天数据
 */
ZkData.download = () => {
    let tmpDate = moment(new Date()).subtract(2, 'days').format('YYYY-MM-DD'); 
    async function DataDownload() {
        try {
            let dbData = [];
            for (const ip of config.zkIPs) {                
                let logData = await ZkDevice.GetAttendanceData(ip);
                if (logData.code === 400) continue;
                logData.data.data.forEach(el => {                    
                    if (moment(el.recordTime).isAfter(new Date(`${tmpDate} 00:00:00`).toISOString())){
                        let tmpDeviceData = {
                            deviceuserId: el.deviceUserId,
                            recordtime: moment(el.recordTime).format('YYYY-MM-DD HH:mm:ss.SSS'),
                            ip: el.ip
                        }
                        dbData.push(tmpDeviceData)
                    }
                });
            }
            if(dbData.length == 0) return {code:'200',msg:'未有刷卡记录进行获取'};           
            await ResAttendanceDB.BulkCreate(dbData)
            console.log(`${tmpDate} --总共: ${tmpDate.length} 数据获取完毕`)
            return {code:'200',msg:'考勤数据获取完毕'}
        } catch (error) {
           console.log(error)
           return {code:400,msg:'考勤记录获取失败'} 
        }        
    }
    return DataDownload()
}

//ZkData.download(); //测试函数
module.exports = ZkData;