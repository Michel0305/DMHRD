/**
 * 请假单逻辑模块
 */
var Op = require("sequelize").Op;
var ResLeaveDB = require('../dbconn/dbmodel/res_leave')
var ResApplovelogDB = require('../dbconn/dbmodel/res_applovelog')
var ResApploveStatusDB = require('../dbconn/dbmodel/res_applovestatus')
var ResLeaveTypeDB = require('../dbconn/dbmodel/res_leavetype')

var ResTakeworkDB = require('../dbconn/dbmodel/res_takework') //调休
var ResUserannualDB = require('../dbconn/dbmodel/res_userannual') //年休

var token = require('./token');
var moment = require('moment');

LeaveStaticFn = () => { }

/**
 * 获取基本数据
 * @param {*} parms 
 */
LeaveStaticFn.BaseData = (parms) => {
    async function GetLeaveBaseData() {
        try {
            let leaveBaseData = {};
            let tmpUsers = token.verifys(parms);
            if (tmpUsers.code) reject({ msg: 'Token Lost' })
            let tmpLeave = await ResLeaveDB.SelectAll({ //获取申请人跟请假人是当前登录用户数据 
                where: { createdate: { [Op.gt]: moment().subtract(360, 'days').format('YYYY/MM/DD') } },
            });
            let leaveBase = [] //获取用户请假记录
            let tmpFormId = [] //获取所有请假单编号
            tmpLeave.forEach(el => {
                leaveBase.push(el.dataValues)
                tmpFormId.push(el.id)
            });
            let apploveLog = await ResApplovelogDB.SelectAll({//根据请假单 查询签核记录
                where: {
                    [Op.and]: [{ modelname: 'leave' }, { formid: tmpFormId }
                    ]
                }
            })
            let leaveLog = []
            apploveLog.forEach(el => {
                leaveLog.push(el.dataValues)
            })

            let apploveStatus = await ResApploveStatusDB.SelectAll({ where: { model: 'leave' } }) //获取设定签核状态
            let leaveStatus = []
            apploveStatus.forEach(el => {
                leaveStatus.push(el.dataValues)
            })

            let leaveType = await ResLeaveTypeDB.SelectAll()
            let tmpLeaveType = []
            leaveType.forEach(el => {
                tmpLeaveType.push(el.dataValues)
            })
            leaveBaseData.leaveBase = [] = leaveBase;
            leaveBaseData.leaveLog = [] = leaveLog;
            leaveBaseData.leaveStatus = [] = leaveStatus;
            leaveBaseData.leaveType = [] = tmpLeaveType;
            return { code: 200, msg: leaveBaseData }
        } catch (error) {
            return { code: 400, msg: error }
        }

    }
    return GetLeaveBaseData();
}

/**
 * 提交保存请假单
 * @param {*} parms 
 * @returns 
 */
LeaveStaticFn.ApplyFor = (parms) => {  
    async function SaveLeave() {
        try {            
            let leaveSaveStatus = await ResLeaveDB.Query(`exec LeaveForDB @id = ${parms.id},
                                                            @userid=${parms.userid},
                                                            @startDate="${moment(parms.freedate[0]).format('YYYY-MM-DD HH:mm:ss')}", 
                                                            @endDate="${moment(parms.freedate[1]).format('YYYY-MM-DD HH:mm:ss')}",
                                                            @remark="${parms.remark}",
                                                            @leavetype=${parms.leavetype},
                                                            @applovestatus=${parms.applovestatus},
                                                            @curuser=${parms.createUser},
                                                            @SaveType=${parms.types} ;`)
            return { code: 200, msg: leaveSaveStatus[0][0] }
        } catch (error) {
            return { code: 400, msg: error }
        }
    }

    return SaveLeave()
}

/**
 * 年休余休
 * @returns 
 */
LeaveStaticFn.AnnualLeaveBaseData = ()=>{
    async function getAnnual(){
        try {
            let annualList = await ResLeaveDB.Query(`select * from v_user_annual`)
            return { code: 200, msg: annualList}
        } catch (error) {
            return { code: 400, msg: error } 
        }
    }
    return getAnnual()
}

/**
 * 保存年休/余休
 * @param {*} parms 
 * @returns 
 */
LeaveStaticFn.InfoAnnualLeave = (parms)=>{
    async function infoAnnual() {
        console.log(parms)
        try {
            if(parseInt(parms.txid) == 0 && parseInt(parms.txCnt)>0){
                await ResTakeworkDB.Insert({userid:`${parms.userid}`,timescount:`${parms.txCnt}`,createuser:`${parms.createUser}`})
            }else{
                await ResTakeworkDB.Update({timescount:`${parms.txCnt}`,createuser:`${parms.createUser}`},{where:{id:`${parms.txid}`}})
            }
            if(parms.nxid >0){
               await ResUserannualDB.Update({defdays:`${parms.nxDays}`,usedays:`${parms.yxDays}`,createuser:`${parms.createUser}`} ,{where:{id:parms.nxid }})
            } 
            return {code:200,msg:'success'}
        } catch (error) {
            console.log(error)
            return {code:400,msg:error}
        }
    }
    return infoAnnual()
}


module.exports = LeaveStaticFn;