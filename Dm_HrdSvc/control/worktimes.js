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
                    timesname: parms.timesname,timestype: parms.timestype,
                    timesfirst: `${parms.timesfirst}`,timessecond: `${parms.timessecond}`,
                    timesthird: `${parms.timesthird}`,timesfourth: `${parms.timesfourth}`,
                    timesfifth: `${parms.timesfifth}`,thimessixth: `${parms.thimessixth}`,
                    workstart:`${parms.workstart}`,
                    ischeck: parms.ischeck
                })
                return { code: 200, backdata: tmpBackData }
            } catch (err) {
                return { code: 400, backdata: '创建班次失败' }
            }
        } else {
            try {
                await ResUserTimesDB.Update({
                    timesname: parms.timesname,timestype: parms.timestype,
                    timesfirst: `${parms.timesfirst}`,timessecond: `${parms.timessecond}`,
                    timesthird: `${parms.timesthird}`,timesfourth: `${parms.timesfourth}`,
                    timesfifth: `${parms.timesfifth}`,thimessixth: `${parms.thimessixth}`,
                    workstart:`${parms.workstart}`,
                    ischeck: parms.ischeck},{where:{id:parms.id}})
                return { code: 200, backdata: {isupdate:true} }
            } catch (err) {
                console.log(err)
                return { code: 400, backdata: '更新班次失败' }
            }
        }
    }
    return workDataInfo()

}


WorkTimes.RemoveTimes = (parms) =>{
    async function delTimes() {
        try {
            await ResUserTimesDB.Delete({where:{id:parms.id}})
            return { code: 200, backdata: 'Success' }
        } catch (error) {
            return { code: 200, backdata: 'Error' }
        }
        
    }
    return delTimes();
}

module.exports = WorkTimes;