var schedule = require('node-schedule');

var ZkData = require('./resattendance')

const  scheduleCronstyle = ()=>{
    //每天早上8:30:20 分获取考勤数据 
      schedule.scheduleJob('20 30 8 * * *',()=>{
         ZkData.download();
    }); 
}
  
scheduleCronstyle();