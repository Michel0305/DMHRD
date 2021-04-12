/**
 * 请假单逻辑模块
 */
var Op = require("sequelize").Op;
var ResSwitChworkDB = require('../dbconn/dbmodel/res_switchwork')
var moment = require('moment');

var qs = require('qs');

SwitchWork = () => { }

/**
 * 获取基本数据
 * @param {*} parms 
 */
 SwitchWork.BaseData = () => {
    async function getSwitchWork() {
        try {
           let tmpBaseData = await ResSwitChworkDB.SelectAll({ where: { createdate: { [Op.gt]:moment().subtract(360, 'days').format('YYYY/MM/DD')} }})
           return { code: 200, msg: tmpBaseData}
        } catch (error) {
            return { code: 400, msg: error }
        }

    }
    return getSwitchWork();
}

/**
 * 更新 新增数据
 * @param {*} params 
 * @returns 
 */
SwitchWork.infoSwitchData = (params) =>{
    async function infoData() {
        try {
            let appList = await ResSwitChworkDB.Query(`select * from userSignId(${params.userid})`)
            let setApplove = appList[0][0]   
            if(params.id >0){ //Update              
                await ResSwitChworkDB.Update({userid:params.userid,freedate:params.freedate,
                        apploveid:setApplove.apploveid ,appstatus:setApplove.applovestatus,
                        workdate:params.workdate,remark:params.remark,createuser:params.createUser},{where:{id:params.id}})
                await ResSwitChworkDB.Query(`insert into res_applovelog(modelname,formid,appuser,appremart,statusid,apploveid)
                                           select 'switchdays',${params.id},${params.createUser},'更新送出','',0`)
                return {code:200,msg:params}
            }else{//Insert
                let tmpWorkDate = await ResSwitChworkDB.Insert({userid:params.userid,freedate:params.freedate,
                                apploveid:setApplove.apploveid ,appstatus:setApplove.applovestatus,
                                workdate:params.workdate,remark:params.remark,createuser:params.createUser})
                await ResSwitChworkDB.Query(`insert into res_applovelog(modelname,formid,appuser,appremart,statusid,apploveid)
                                             select 'switchdays',${tmpWorkDate.dataValues.id},${params.createUser},'申请送出','',0`)
                return {code:200,msg:tmpWorkDate}
            }
        } catch (error) {
            return {code:400,msg:error}
        }
    }
    return infoData()
}


module.exports = SwitchWork;