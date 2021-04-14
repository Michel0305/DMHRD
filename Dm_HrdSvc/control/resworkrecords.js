var ResWorkRecordsDB = require('../dbconn/dbmodel/res_workrecords');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
var moment = require('moment');
moment.suppressDeprecationWarnings = true;

var ResRegistrationCardDB = require('../dbconn/dbmodel/res_registration_card')

ResWorkRecords = () => { }


ResWorkRecords.GetDataByParms = (...parms) => {
    async function GetWorkRecordsDase() {
        try {
            let workrecords;
            if (parms[0].datewhere) {
                workrecords = await ResWorkRecordsDB.SelectAll({ where: { checkdate: { [Op.between]: parms[0].datewhere } } })
            } else {
                workrecords = await ResWorkRecordsDB.SelectAll(
                    { where: { checkdate: moment().subtract(1, 'days').format('YYYY/MM/DD'),'status':0 } }
                )
            }
            let workrecordBase = [];
            workrecords.forEach(el => {
                workrecordBase.push(el.dataValues)
            });
            return {code:200,msg:workrecordBase} 
        } catch (error) {
            return {code:400,msg:error}
        }
        
    }
    return GetWorkRecordsDase()
}

/**
 * 生成签卡单
 * @param {*} parms 
 * @returns 
 */
ResWorkRecords.InfoRegistrationCard = (parms)=>{
    async function infoData() {
        try {             
            let tmps =[]  //需要 优化表结构 
            if(parms.styo == 1 || parms.styo ==7) tmps.push(parms.styo)             
            if(parms.styt == 2)  tmps.push(parms.styt)
            if(parms.styth == 3)  tmps.push(parms.styth)
            if(parms.styf == 4)  tmps.push(parms.styf)
            if(parms.styfi == 5)  tmps.push(parms.styfi)
            if(parms.stys == 6)  tmps.push(parms.stys)
            let appList = await ResWorkRecordsDB.Query(`select * from userSignId(${parms.userid})`)
            let setApplove = appList[0][0]  
            await ResRegistrationCardDB.Insert({
                userid:parms.userid,
                checkdate:`'${moment(parms.checkdate).utc().format('YYYY-MM-DD')}'` ,
                attendid:parms.id,
                ids:`${tmps}`,
                createuser:parms.createUser,
                apploveid:0,
                appstatus:0})
            await ResWorkRecordsDB.Update({status:1},{where:{id:parms.id}})
            await ResWorkRecordsDB.Query(`insert into res_applovelog(modelname,formid,appuser,appremart,statusid,apploveid)
                                           select 'regcard',${parms.id},${parms.createUser},'申请送出','',0`)
            return{code:200,msg:'Success'}
        } catch (error) {
            console.log(error)
            return{code:400,msg:error}
        }        
    }
    return infoData()
}

/**
 * 更新签卡单数据[驳回后处理]
 * @param {*} parms 
 * @returns 
 */
ResWorkRecords.UpdateRegistrationCard = (parms)=>{
    async function upgradeData() {
        try {
            let appList = await ResWorkRecordsDB.Query(`select * from userSignId(${parms.userid})`)
            let setApplove = appList[0][0]
            await ResRegistrationCardDB.Update({ids:`${parms.warringData}`,createuser:parms.createUser,
                                            apploveid:setApplove.apploveid,appstatus:setApplove.applovestatus,
                                            remark:parms.remark },{where:{id:parms.id}})
            await ResWorkRecordsDB.Update({status:1},{where:{id:parms.id}})
            await ResWorkRecordsDB.Query(`insert into res_applovelog(modelname,formid,appuser,appremart,statusid,apploveid)
                                            select 'regcard',${parms.id},${parms.createUser},'更新送出','',0`)
            return {code:200,msg:'success'} 
        } catch (error) {
            return {code:400,msg:error}
        }              
    }
    return upgradeData()
}


/**
 * 个人获取异常数据
 * @returns 
 */
ResWorkRecords.getRegistrationCard = () =>{
    async function  getdata() {
        try {           
            let rebackData = await ResRegistrationCardDB.SelectAll({where:{ createdate: { [Op.gt]:moment().subtract(30, 'days').format('YYYY/MM/DD')},                            
            },include: [{
                model: ResWorkRecordsDB.DBModel,
                as:'attendids'
            }],});
            return {code:200,msg:rebackData}
        } catch (error) {
            return {code:400,msg:error}
        }        
    }
    return getdata();

}



module.exports = ResWorkRecords;