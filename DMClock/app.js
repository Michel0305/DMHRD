var schedule = require('node-schedule');
var ZkData = require('./resattendance')


const  scheduleCronstyle = ()=>{
    //每天早上8:30:20 分获取考勤数据 
      console.log(`${new Date()} 考勤数据获取排程启动`)
      schedule.scheduleJob('20 30 8 * * *',()=>{
        let tmpZKdata = ZkData.download();
        console.log(tmpZKdata)
    }); 
}
  
scheduleCronstyle();