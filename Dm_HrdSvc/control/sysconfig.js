/**
 * 系统表单设定
 */


var sysHolidays = require('../dbconn/dbmodel/sys_holidays');

SysHRDSetting = () =>{}

SysHRDSetting.GetHolidys = ()=>{
    async function Holidys() {
        let hdays = await sysHolidays.SelectAll({order:['startdate']});
        let tmps = []
        hdays.forEach(el => {
            tmps.push(el.dataValues)
        });
        return tmps
    }
    return Holidys();
}

module.exports = SysHRDSetting;