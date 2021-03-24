const ZKLib = require('../node_modules/node-zklib')
ZkDevice = () => { }
/**
 * 获取考勤数据
 */
ZkDevice.GetAttendanceData = () => {
    async function ZkDevice() {
        let zkInstance = new ZKLib('10.83.34.10', 4370, 10000, 4000);//10.83.34.12
        try {
            await zkInstance.createSocket()
        } catch (error) {
            return ({ code: 404, data: error })
        }
        const logs = await zkInstance.getAttendances()
        await zkInstance.disconnect()
        return { code: 200, data: logs }
    }
    return ZkDevice();
}

module.exports = ZkDevice;