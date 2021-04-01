var token = require("./token");
var sha = require("./sha");
var ResUsersDB = require('../dbconn/dbmodel/cms_resusers');
var moment = require('moment');

ResUser = () => { }

ResUser.GetAllUser = () => {
    async function AllUser() {
        let userList = await ResUsersDB.SelectAll({order:['isline']});
        let usersJson = [];
        userList.forEach(el => {
            usersJson.push(el.dataValues)
        });
        // console.log(userList.filter(item=>{return item} ))
        return usersJson;
    }
    return AllUser();
}

/**
 * 根据userid 获取人员资料
 * @param {*} id 
 * @returns 
 */
ResUser.GetUserByID = (id) => {
    return ResUsersDB.SelectAll({ where: { 'user_id': id } })
}

ResUser.UserDataSave = (parms) =>{
    if(parms.id == 0){ //创建 
        try {
            return ResUsersDB.Insert({user_id: parms.user_id,
                user_name:parms.user_name,
                dept: parms.dept,
                address: parms.address,
                job: parms.job,
                position: parms.position,
                education: parms.education,
                sex: parms.cardid.substring(16,17)%2==0?'女':'男',
                cardid: parms.cardid,
                birthday:`'${moment(parms.cardid.substring(6,14))}'`,
                email:parms.email,
                imgurl:parms.imgurl,
                indate: `'${parms.indate}'`,
                phone:parms.phone,
                timestype: parms.timestype,
                defpartid: parms.defpartid,
                mastpartid: parms.mastpartid,
                isline: parms.isline,
                cdnumber: parms.cdnumber,
                workloc: parms.workloc,
                school: parms.school,
                bankname: parms.bankname,
                bankson: parms.bankson,
                bankcard: parms.bankcard,
                workday: parms.workday,
                workhour: parms.workhour,
                accountability: parms.accountability,
                documents:parms.documents === undefined?null:`${parms.documents}`,
                social:parms.social=== undefined ?null:`${parms.social}`,
                goods:parms.goods=== undefined ?null:`${parms.goods}`,
                createusr:parms.createusr})
        } catch (error) {
            console.log(error)  
        }
       
    } else { //更新
        try {
            return ResUsersDB.Update({
                dept: parms.dept,
                address: parms.address,
                job: parms.job,
                position: parms.position,
                education: parms.education,
                sex: parms.cardid.substring(16,17)%2==0?'女':'男',
                cardid: parms.cardid,
                email:parms.email,
                phone:parms.phone,
                timestype: parms.timestype,
                defpartid: parms.defpartid,
                mastpartid: parms.mastpartid,
                cdnumber: parms.cdnumber,
                workloc: parms.workloc,
                school: parms.school,
                bankname: parms.bankname,
                bankson: parms.bankson,
                bankcard: parms.bankcard,
                workday: parms.workday,
                workhour: parms.workhour,
                accountability: parms.accountability,
                documents:parms.documents === undefined?null:`${parms.documents}`,
                social:parms.social=== undefined ?null:`${parms.social}`,
                goods:parms.goods=== undefined ?null:`${parms.goods}`,
                createusr:parms.createusr},{where:{id:parms.id}})
        } catch (error) {
            console.log(error)
        }
      
    }   
}

module.exports = ResUser;