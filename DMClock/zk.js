const ZKLib = require('./node_modules/node-zklib')

ZkDevice = () => { }
/**
 * 获取考勤数据
 */
ZkDevice.GetAttendanceData = (ip) => {
    async function ZkDeviceActive() {
        try {
            let zkInstance = new ZKLib(ip, 4370, 10000, 4000);//10.83.34.12  10.83.34.11
            try {
                await zkInstance.createSocket()
            } catch (error) {
                return ({ code: 400, data: error })
            }
            const logs = await zkInstance.getAttendances()
            //zkInstance.clearAttendanceLog()
            await zkInstance.disconnect()
            return { code: 200, data: logs }
        } catch (error) {             
            return {code:400,data:error};
        }      
    }
    return ZkDeviceActive();
}

module.exports = ZkDevice;