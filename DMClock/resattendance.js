// 

var ZkDevice = require('./zk');
var moment = require('moment');
var ResAttendanceDB = require('./res_attendance');
var fs = require('fs');
var path = require('path');
var confPath = path.join(__dirname,'/config-template.js')
var config = fs.existsSync(confPath)?require('./config-template.js'):require('./config');

class ZkData{
    download(){
        
    }


} 



ZkData = () => { }
/**
 * 数据下载 取前一天数据
 */
ZkData.download = () => {
    let tmpDate = moment(new Date()).subtract(1, 'days').format('YYYY-MM-DD'); 
    async function DataDownload() {
        try {
            let dbData = [];
            for (const ip of config.zkIPs) {                
                let logData = await ZkDevice.GetAttendanceData(ip);
                if (logData.code === 400) continue; 
                logData.data.data.forEach(el => {                   
                    if (moment(el.recordTime).utc().isAfter(`${tmpDate} 00:00:00`)){
                        let tmpDeviceData = {
                            deviceuserId: el.deviceUserId,                            
                            recordtime: moment(el.recordTime).format('YYYY-MM-DD HH:mm:ss.SSS'),
                            ip: el.ip
                        }
                        dbData.push(tmpDeviceData)
                    }
                });
                console.log(`${ip}  考勤数据读取完毕`)
            }
            if(dbData.length === 0) return {code:'200',msg:'未有刷卡记录进行获取'};           
            await ResAttendanceDB.BulkCreate(dbData)
            console.log(`${tmpDate} --总共: ${dbData.length} 数据获取完毕`)
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