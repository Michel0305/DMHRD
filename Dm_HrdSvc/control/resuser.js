var token = require("./token");
var sha = require("./sha");
var ResUsersDB = require('../dbconn/dbmodel/cms_resusers');
const { array } = require("jszip/lib/support");

ResUser = ()=>{}

ResUser.GetAllUser = ()=>{
    async function AllUser(){
        let userList = await  ResUsersDB.SelectAll();
        let usersJson = [];
        userList.forEach(el => {
            usersJson.push(el.dataValues)
        });
        // console.log(userList.filter(item=>{return item} ))
        return usersJson;
    }  
    return AllUser();
}


module.exports = ResUser;