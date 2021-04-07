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
// SwitchWork.infoSwitchData = (params) =>{
//     async function infoData() {
//         try {
//             if(params.id >0){ //Update
//                 await ResSwitChworkDB.Update({userid:params.userid,freedate:params.freedate,workdate:params.workdate,remark:params.remark,createuser:'1580'},{where:{id:params.id}})
//                 return {code:200,msg:params}
//             }else{//Insert
//                 let tmpWorkDate = await ResSwitChworkDB.Insert({userid:params.userid,freedate:params.freedate,workdate:params.workdate,remark:params.remark,createuser:'1580'})
//                 return {code:200,msg:tmpWorkDate}
//             }
//         } catch (error) {
//             return {code:400,msg:error}
//         }
//     }
//     return infoData()
// }


module.exports = ReqBusiness;