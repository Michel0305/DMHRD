/**
 * 请假单逻辑模块
 */
var Op = require("sequelize").Op;
var ResBusinessDB = require('../dbconn/dbmodel/res_business')
var moment = require('moment');

var qs = require('qs');

ReqBusiness = () => { }

/**
 * 获取基本数据
 * @param {*} parms 
 */
 ReqBusiness.BaseData = () => {
    async function getBusinessData() {
        try {
           let tmpBaseData = await ResBusinessDB.SelectAll({ where: { createdate: { [Op.gt]:moment().subtract(360, 'days').format('YYYY/MM/DD')} }})
           return { code: 200, msg: tmpBaseData}
        } catch (error) {
            return { code: 400, msg: error }            
        }
    }
    return getBusinessData();
}

/**
 * 更新 新增数据
 * @param {*} params 
 * @returns 
 */
 ReqBusiness.infoBusinessData = (params) =>{
    async function infoData() {        
        try {
            let appList = await ResSwitChworkDB.Query(`select * from userSignId(${params.userid})`)
            let setApplove = appList[0][0]                          
            if(params.id >0){ //Update
                await ResBusinessDB.Update({userid:params.userid,
                    checkdate:params.checkdate,
                    toaddressids:`${params.toaddressids}`,
                    toaddress:`${params.toaddress}`,
                    dscaddress:params.dscaddress,
                    carplate:params.carplate,
                    isapply:params.isapply,
                    remark:params.remark,
                    actfiles:params.actfiles,
                    appstatus:setApplove.applovestatus,
                    apploveid:setApplove.apploveid,
                    createuser:params.createUser                
                },{where:{id:params.id}})
                await ResBusinessDB.Query(`insert into res_applovelog(modelname,formid,appuser,appremart,statusid,apploveid)
                                           select 'business',${params.id},${params.createUser},'更新送出','',0`)
                return {code:200,msg:params}
            }else{//Insert
                let tmpWorkDate = await ResBusinessDB.Insert({userid:params.userid,
                    checkdate:params.checkdate,
                    toaddressids:`${params.toaddressids}`,
                    toaddress:`${params.toaddress}`,
                    dscaddress:params.dscaddress,
                    carplate:params.carplate,
                    isapply:params.isapply,
                    remark:params.remark,
                    appstatus:setApplove.applovestatus,
                    apploveid:setApplove.apploveid,
                    actfiles:params.actfiles,
                    createuser:params.createUser})
                await ResBusinessDB.Query(`insert into res_applovelog(modelname,formid,appuser,appremart,statusid,apploveid)
                                           select 'business',${tmpWorkDate.dataValues.id},${params.createUser},'送出申请','',0`)    
                return {code:200,msg:tmpWorkDate}
            }
        } catch (error) {
            return {code:400,msg:error}
        }
    }
    return infoData()
}


module.exports = ReqBusiness;