let ZKLib = require('./node_modules/node-zklib')

ZkDevice = () => { }
/**
 * 获取考勤数据
 */
ZkDevice.GetAttendanceData = (ip) => {
    let zkInstance = null
    async function ZkDeviceActive() {
        try {
            console.log(`开始获取${ip} 卡钟考勤数据`)
            zkInstance= new ZKLib(ip, 4370, 80000, 4000);//10.83.34.12  10.83.34.11
            try {
              await zkInstance.createSocket()
              console.log(`卡钟 : ${ip} -- 连接状态 成功`)
            } catch (error) {
                console.log(`卡钟 : ${ip} --  连接超时失败哦`)                
                return { code: 400, data: error }
            }
            let logs = await zkInstance.getAttendances()
            //zkInstance.clearAttendanceLog()            
            await zkInstance.disconnect()
            console.log(`获取${ip} 卡钟考勤数据结束`)
            return { code: 200, data: logs }
        } catch (error) {             
            return {code:400,data:error};
        }      
    }
    return ZkDeviceActive();
}

module.exports = ZkDevice;