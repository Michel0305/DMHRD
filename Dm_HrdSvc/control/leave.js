/**
 * 请假单逻辑模块
 */
var Op = require("sequelize").Op;
var ResLeaveDB = require('../dbconn/dbmodel/res_leave')
var ResApplovelogDB = require('../dbconn/dbmodel/res_applovelog')
var ResApploveStatusDB = require('../dbconn/dbmodel/res_applovestatus')
var ResLeaveTypeDB = require('../dbconn/dbmodel/res_leavetype')

var token = require('./token');
var Sequelize = require('sequelize');
var moment = require('moment');

LeaveStaticFn = () => { }

/**
 * 获取基本数据
 * @param {*} parms 
 */
LeaveStaticFn.BaseData = (parms) => {
    async function GetLeaveBaseData() {
        let leaveBaseData = {};

        let tmpUsers = token.verifys(parms);
        if (tmpUsers.code) reject({ msg: 'Token Lost' })

        let tmpLeave = await ResLeaveDB.SelectAll({ //获取申请人跟请假人是当前登录用户数据
            where: {
                [Op.or]: [
                    { userid: tmpUsers.userid },
                    { createuser: tmpUsers.userid }
                ]
            }
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

        leaveBaseData.leaveBase = leaveBase;
        leaveBaseData.leaveLog = leaveLog;
        leaveBaseData.leaveStatus = leaveStatus;
        leaveBaseData.leaveType = tmpLeaveType;
        return leaveBaseData
    }
    return GetLeaveBaseData();
}

LeaveStaticFn.ApplyFor = (parms) => {
    console.log(parms)
    console.log(moment(parms['freedate[0]']).format('YYYY-MM-DD HH:mm:ss'))
    async function SaveLeave() {
        let leaveSaveStatus = await ResLeaveDB.Query('exec LeaveForDB @id = ' + parms.id + ', @userid=' + parms.userid + ',@startDate="' + moment(parms['freedate[0]']).format('YYYY-MM-DD HH:mm:ss') + '", @endDate="' + moment(parms['freedate[1]']).format('YYYY-MM-DD HH:mm:ss') + '",@remark="' + parms.remark + '",@leavetype=' + parms.leavetype + ',@applovestatus=' + parms.applovestatus + ',@curuser="1580";')
        return leaveSaveStatus[0][0]
    }
    return SaveLeave()
}

module.exports = LeaveStaticFn;