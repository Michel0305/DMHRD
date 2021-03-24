/**
 * 加班逻辑处理
 */
var Op = require("sequelize").Op;
var ResOverWorkDB = require('../dbconn/dbmodel/res_overwork')
var ResApplovelogDB = require('../dbconn/dbmodel/res_applovelog')
var ResApploveStatusDB = require('../dbconn/dbmodel/res_applovestatus')
var token = require('./token')

OverWorkFn = () => { }

OverWorkFn.BaseData = (parms) => {
    async function GetOverWorkBaseData() {
        let leaveBaseData = {};
        let tmpUsers = token.verifys(parms);
        if (tmpUsers.code) reject({ msg: 'Token Lost' })

        /**
         * 加班数据
         */
        let tmpworkBase = await ResOverWorkDB.SelectAll({
            where: {
                [Op.or]: [
                    { userid: tmpUsers.userid },
                    { createuser: tmpUsers.userid }
                ]
            }
        })

        /**
         * 签核记录
         */
        let workBase = [] //加班签核记录
        let tmpFormId = [] //获取所有加班单编号
        tmpworkBase.forEach(el => {
            workBase.push(el.dataValues)
            tmpFormId.push(el.id)
        });
        let apploveLog = await ResApplovelogDB.SelectAll({//根据请假单 查询签核记录
            where: {
                [Op.and]: [{ modelname: 'work' }, { formid: tmpFormId }
                ]
            }
        })
        let workLog = []
        apploveLog.forEach(el => {
            workLog.push(el.dataValues)
        })

        /**
         * 签核状态
         */
        let apploveStatus = await ResApploveStatusDB.SelectAll({ where: { model: 'work' } }) //获取设定签核状态
        let workStatus = []
        apploveStatus.forEach(el => {
            workStatus.push(el.dataValues)
        })

        leaveBaseData.workBase = workBase;
        leaveBaseData.workLog = workLog;
        leaveBaseData.workStatus = workStatus;

        return leaveBaseData
    }
    return GetOverWorkBaseData()
}




module.exports = OverWorkFn;