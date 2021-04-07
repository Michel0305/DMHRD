/**
 * 系统表单设定
 */
var sysHolidays = require('../dbconn/dbmodel/sys_holidays');

SysHRDSetting = () =>{}

/**
 * 获取假期列表数据
 * @returns 
 */
SysHRDSetting.GetHolidys = ()=>{
    async function Holidys() {
        try {
            let hdays = await sysHolidays.SelectAll({order:['startdate']});
            let tmps = []
            hdays.forEach(el => {
                tmps.push(el.dataValues)
            });
            return {code:200,msg:tmps} 
        } catch (error) {
            return {code:400,msg:error}
        }
        
    }
    return Holidys();
}

/**
 * 新增创建假期数据
 */
SysHRDSetting.InfoHolidays = (params)=>{
    async function infoData() {
        try {
          let fbBack = await sysHolidays.Insert({dayname:params.rename,startdate:params.checkdate[0],enddate:params.checkdate[1],remark:params.remark,createuser:'1580'})            
          return {code:200,msg:fbBack.dataValues} ;
        } catch (error) {   
            return {code:400,msg:error} ;
        }       
    }
    return infoData();
}

SysHRDSetting.RemoveHolidays = (params)=>{
    async function removeData() {
        try {
            await sysHolidays.Delete({where:{id:params.id}})
            return {code:200,msg:''}
        } catch (error) {
            return {code:400,msg:error}
        }
    }
    return removeData()
}

module.exports = SysHRDSetting;