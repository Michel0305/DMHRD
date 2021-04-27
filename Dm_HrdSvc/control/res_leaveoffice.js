var resLeaveofficeDB = require('../dbconn/dbmodel/res_leaveoffice')


ResLeaveOffice = () =>{}


ResLeaveOffice.infoBaseData = (params)=>{
    async function infoBase() {
        try {
            let appList = await resLeaveofficeDB.Query(`select * from userSignId(${params.userid})`)
            let setApplove = appList[0][0]
            let exUser = await resLeaveofficeDB.SelectAll({where:{userid : params.userid} })             
            let tmpid =exUser.length == 0?0:exUser[0].dataValues.id            
            if(exUser.length == 0){
                let infooff = await resLeaveofficeDB.Insert({userid:params.userid ,expectdate:params.expectdate,
                      coordinatedate:params.coordinatedate,infodate:params.infodate,
                      lotype:params.lotype,remark:params.remark,createuser:params.createUser,
                      apploveid:setApplove.apploveid,applovestatus:setApplove.applovestatus })
                tmpid = infooff.dataValues.id
            } else{
                 await resLeaveofficeDB.Update({expectdate:params.expectdate,
                                    coordinatedate:params.coordinatedate,infodate:params.infodate,lotype:params.lotype,
                                    remark:params.remark,createuser:params.createUser,
                                    apploveid:setApplove.apploveid,applovestatus:setApplove.applovestatus}
                                    ,{where:{userid:params.userid}}) 
                
            }
            await resLeaveofficeDB.Query(`insert into res_applovelog(modelname,formid,appuser,appremart,statusid,apploveid)
                                           select 'leaveof',${tmpid},${params.createUser},'更新送出','',0`)


            return {code:200,msg:'申请成功'}
        } catch (error) {
            console.log(error)
            return {code:400,msg:'申请失败'}
        }
    }
    return infoBase();
}
module.exports = ResLeaveOffice;