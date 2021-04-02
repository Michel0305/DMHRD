var ResUserTimesDB = require('../dbconn/dbmodel/cms_resusertimes'); //班次

WorkTimes = () => { }

/**
 * 新增更新
 * @param {*} parms 
 */
WorkTimes.InfoTimes = (parms) => {
    async function workDataInfo() {
        if (parms.id == 0) { //创建
            try {
                let tmpBackData = await ResUserTimesDB.Insert({
                    timesname: parms.timesname,
                    timestype: parms.timestype,
                    timesfirst: parms.timesfirst,
                    timessecond: parms.timessecond,
                    timesthird: parms.timesthird,
                    timesfourth: parms.timesfourth,
                    timesfifth: parms.timesfifth,
                    thimessixth: parms.thimessixth,
                    ischeck: parms.ischeck
                })
                return { code: 200, backdata: tmpBackData }
            } catch (err) {
                return { code: 400, backdata: '创建班次失败' }
            }
        } else {
            try {
                let tmpBackData = await ResUserTimesDB.Update({
                    timesname: parms.timesname,
                    timestype: parms.timestype,
                    timesfirst: parms.timesfirst,
                    timessecond: parms.timessecond,
                    timesthird: parms.timesthird,
                    timesfourth: parms.timesfourth,
                    timesfifth: parms.timesfifth,
                    thimessixth: parms.thimessixth,
                    ischeck: parms.ischeck
                },{where:{id:parms.id}})
                return { code: 200, backdata: tmpBackData }
            } catch (err) {
                return { code: 400, backdata: '更新班次失败' }
            }
        }
    }
    return workDataInfo()

}


module.exports = WorkTimes;