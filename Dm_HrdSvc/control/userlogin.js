var token = require("./token");
var sha = require("./sha");
var ResUserLoginDB = require('../dbconn/dbmodel/cms_resuserlogin');

var fs = require("fs");

var ResUsersDB = require('../dbconn/dbmodel/cms_resusers'); //用户列表
var ResUserTimesDB = require('../dbconn/dbmodel/cms_resusertimes'); //班次
var resUserjobDB = require('../dbconn/dbmodel/res_userjob'); //岗位列表
var ResDepartmentDB = require('../dbconn/dbmodel/res_department'); //部门列表

loginUser = () => { }

/**
 * 临时创建验证token
 */
function GetTempToken() {
    let tmpPwd = "123456"
    let shaPwd = sha.crypt(tmpPwd)
    let tempUsrData = {
        'username': 'admin',
        'password': tmpPwd,
        'sha': shaPwd
    }
    // console.log(token.create(tempUsrData))
}
// GetTempToken();

/**
 * 验证用户登录账户
 * @param {*} parms 用户参数{userid password token}
 */
loginUser.Verify = (parms) => {
    //1. 验证token 有效性   
    async function CheckPwsBySql() {
        let rowData = await ResUserLoginDB.SelectAll({
            where: {
                'account': parms.username
            }
        })
        if (parms.token === undefined) { //第一次登录无Token
            let pwd = rowData[0].dataValues.pwd
            let checkStatus = sha.decode(parms.password, pwd)
            if (checkStatus) {//
                return token.create({ username: parms.username, password: parms.password, userid: rowData[0].dataValues.userid, name: rowData[0].dataValues.username })
            } else {
                return { token: null }
            }
        } else {
            return token.verifys(parms.token)
        }
    }
    return CheckPwsBySql();
}

/**
 * 用户加密
 * 用户修改密码功能
 * @param {*} parms 用户参数{userid password token}
 */
loginUser.Crypt = (parms) => {
}

/**
 * 当前登录用户信息
 * @param {*} xToken 
 * @returns 
 */
loginUser.GetUserInfo = (xToken) => {
  return tmpUser = {} = token.verifys(xToken);
}

loginUser.GetBeasBata = ()=>{
    async function GetUserBaseData() {
        let dataBase = {};
        let resUser = await ResUsersDB.SelectAll();
        let resUserTimes = await ResUserTimesDB.SelectAll();
        let resUserJob = await resUserjobDB.SelectAll();
        let resDepartment = await ResDepartmentDB.SelectAll({where:{isDel:false}});
        dataBase.resUsers  = resUser.filter(users => { return users.dataValues });
        dataBase.resTimes  = resUserTimes.filter(times => { return times.dataValues });
        dataBase.resJobs  = resUserJob.filter(jobs => { return jobs.dataValues });
        dataBase.resDepartments = resDepartment.filter(deps => { return deps.dataValues });        
        return dataBase
    }
    return GetUserBaseData();
}

module.exports = loginUser;