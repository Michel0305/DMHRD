/**
 * 请假单逻辑模块
 */
var Op = require("sequelize").Op;
var ResLeaveDB = require('../dbconn/dbmodel/res_leave');
var ResOverWork = require('../dbconn/dbmodel/res_overwork');
var ResBusiness = require('../dbconn/dbmodel/res_business');
var ResSwitchDay = require('../dbconn/dbmodel/res_switchwork');
var ResApploveLog = require('../dbconn/dbmodel/res_applovelog');
var ResRegistrationCardDB = require('../dbconn/dbmodel/res_registration_card');
var token = require('./token');
var Sequelize = require('sequelize');
var moment = require('moment');
var qs = require('qs');

SignForm = () => { }

/**
 * 获取基本数据
 * @param {*} parms 
 */
SignForm.BaseData = (parms) => {
    async function GetSignBaseData() {
        try {
            let base = await ResLeaveDB.Query(`select * from dmSigningBox(${parms.userid})`)
            return { code: 200, msg: base[0] }
        } catch (error) {
            return { code: 400, msg: error }
        }
    }
    return GetSignBaseData();
}

/**
 * 表单明细
 * @param {*} parms 
 * @returns 
 */
SignForm.ApploveForm = (parms) => {
    let tmpSignData = qs.parse(parms)
    async function SignById() {
        try {
            switch (tmpSignData.model) {
                case 'leave':
                    let leaveSignData = await ResLeaveDB.SelectAll({ where: { id: tmpSignData.id } })
                    let leaveapploveLog = await ResLeaveDB.Query(`select *,(select msg from res_applovestatus where model = a.modelname and statusid = a.apploveid ) as statusMsg 
                                                                  from res_applovelog a where formid=${tmpSignData.id} and modelname='leave'  order by createtime desc `)
                    return { code: 200, msg:{SignData:leaveSignData,apploveLog:leaveapploveLog[0] }}
                    break;
                case 'work':
                    let workSignData = await ResOverWork.SelectAll({ where: { id: tmpSignData.id } })
                    let workapploveLog = await ResLeaveDB.Query(`select *,(select msg from res_applovestatus where model = a.modelname and statusid = a.apploveid ) as statusMsg 
                                                                from res_applovelog a where formid=${tmpSignData.id} and modelname='work'  order by createtime desc `)
                    return { code: 200, msg:{SignData:workSignData,apploveLog:workapploveLog[0] }}
                    break;
                case 'switchdays':
                    let daySignData = await ResSwitchDay.SelectAll({ where: { id: tmpSignData.id } })
                    let dayapploveLog = await ResLeaveDB.Query(`select *,(select msg from res_applovestatus where model = a.modelname and statusid = a.apploveid ) as statusMsg 
                                                                from res_applovelog a where formid=${tmpSignData.id} and modelname='switchdays'  order by createtime desc `)
                    return { code: 200, msg:{SignData:daySignData,apploveLog:dayapploveLog[0] }}
                    break;
                case 'business':
                    let businessSignData = await ResBusiness.SelectAll({ where: { id: tmpSignData.id } })
                    let busapploveLog = await ResLeaveDB.Query(`select *,(select msg from res_applovestatus where model = a.modelname and statusid = a.apploveid ) as statusMsg 
                                                                from res_applovelog a where formid=${tmpSignData.id} and modelname='business'  order by createtime desc `)
                    console.log(busapploveLog[0]) 
                    return { code: 200, msg:{SignData:businessSignData,apploveLog:busapploveLog[0] }}
                    break;
                case 'regcard':
                    let regcardSignData = await ResRegistrationCardDB.SelectAll({ where: { id: tmpSignData.id } })
                    let regcardapploveLog = await ResLeaveDB.Query(`select *,(select msg from res_applovestatus where model = a.modelname and statusid = a.apploveid ) as statusMsg 
                                                                from res_applovelog a where formid=${tmpSignData.id} and modelname='regcard'  order by createtime desc `)                    
                    return { code: 200, msg:{SignData:regcardSignData,apploveLog:regcardapploveLog[0] }}
                    break;
                default:
                    break;
            }
        } catch (error) {
            return { code: 400, msg: error }
        }
    }
    return SignById()
}
/**
 * 明细审核
 * @param {*} parms 
 * @returns 
 */

SignForm.OnlyApplove = (parms) =>{
    async function applove() {
        try {
            let backMsg = await ResLeaveDB.Query(`exec ApploveSign ${parms.apploveUser},${parms.apploveid},${parms.id},${parms.model},${parms.apploveType},'${parms.remark}'`)
            return {code:200,msg:backMsg}
        } catch (error) {
            return {code:400,msg:error}
        }         
    }
    return applove();
}

/**
 * 批量审批单据
 * @param {*} parms 
 * @returns 
 */
SignForm.BatchApplove =(parms) =>{
    async function checkApplove(){      
        try {
            let tmpSelectedData = [];
            for (const el of parms.dataList) {
                let backMsg = await ResLeaveDB.Query(`exec ApploveSign ${parms.apploveUser},${el.apploveid},${el.id},${el.model},${parms.types},'无' `)
                tmpSelectedData.push(backMsg)
            }        
            return {code:200,msg:parms.dataList}
        } catch (error) {
            return {code:400,msg:error}
        }
    }
    return checkApplove();
}

/**
 * 个人表单数据
 * @param {*} parms 
 * @returns 
 */
SignForm.UserBoxData = (parms) =>{
    async function userBox() {
        try {
          let usersData = await ResLeaveDB.Query(`select * from  dmUserBox(${parms.userid})`)
          let apploveIds = [0];
          usersData[0].forEach(el => {
            apploveIds.push(el.id)
          }); 
          let signBox = await ResApploveLog.SelectAll({where:{formid:{[Op.in]:apploveIds}},order:[['createtime','DESC']]})           
          return {code:200,msg:{'usersData':usersData[0],'signBox':signBox } }
        } catch (error) {
            return {code:200,msg:error}  
        }        
    }
    return userBox();
}


module.exports = SignForm;