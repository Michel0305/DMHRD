/**
 * 请假单逻辑模块
 */
var Op = require("sequelize").Op;
var ResLeaveDB = require('../dbconn/dbmodel/res_leave');
var ResOverWork = require('../dbconn/dbmodel/res_overwork');
var ResBusiness = require('../dbconn/dbmodel/res_business');
var ResSwitchDay = require('../dbconn/dbmodel/res_switchwork')
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

SignForm.ApploveForm = (parms) => {
    let tmpSignData = qs.parse(parms)
    async function SignById() {
        // console.log(tmpSignData)
        try {
            switch (tmpSignData.model) {
                case 'leave':
                    let leaveSign = await ResLeaveDB.SelectAll({ where: { id: tmpSignData.id } })
                    return { code: 200, msg: leaveSign }
                    break;
                case 'work':
                    let overWorkSign = await ResOverWork.SelectAll({ where: { id: tmpSignData.id } })
                    return { code: 200, msg: overWorkSign }
                    break;
                case 'switchdays':
                    let switchDaySign = await ResSwitchDay.SelectAll({ where: { id: tmpSignData.id } })
                    return { code: 200, msg: switchDaySign }
                    break;
                case 'business':
                    let businessSign = await ResBusiness.SelectAll({ where: { id: tmpSignData.id } })
                    return { code: 200, msg: businessSign }
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

SignForm.OnlyApplove = (parms) =>{
    async function applove() {
        try {
            let backMsg = await ResLeaveDB.Query(`exec ApploveSign ${parms.apploveUser},${parms.apploveid},${parms.id},${parms.model}`)
            return {code:200,msg:backMsg}
        } catch (error) {
            return {code:400,msg:error}
        }         
    }
    return applove();
}

SignForm.BatchApplove =(parms) =>{
    async function checkApplove(){      
        try {
            let tmpSelectedData = [];
            for (const el of parms.dataList) {
                let backMsg = await ResLeaveDB.Query(`exec ApploveSign ${parms.apploveUser},${el.apploveid},${el.id},${el.model}`)
                tmpSelectedData.push(backMsg)
            }          
            return {code:200,msg:tmpSelectedData}
        } catch (error) {
            return {code:400,msg:error}
        }
    }
    return checkApplove();
}


module.exports = SignForm;