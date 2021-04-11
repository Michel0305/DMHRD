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
}
// GetTempToken();

/**
 * 验证用户登录账户
 * @param {*} parms 用户参数{userid password token}
 */
loginUser.Verify = (parms) => {
    //1. 验证token 有效性   
    async function CheckPwsBySql() {
        try {
            let rowData = await ResUserLoginDB.SelectAll({
                where: {
                    'account': parms.username
                }
            })           
            if (parms.token === undefined) { //第一次登录无Token
                let pwd = rowData[0].dataValues.pwd;
                let checkStatus = sha.decode(parms.password, pwd)
                if (checkStatus) {//
                    return {'code':200,'token':token.create({ username: parms.username, password: parms.password, userid: rowData[0].dataValues.userid, name: rowData[0].dataValues.username })}
                } else {
                    return {'code':400, 'token': null }
                }
            } else {
                return  {'code':200, 'token': token.verifys(parms.token) } 
            }            
        } catch (error) {
            return {'code':400,'token':error} 
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



function unique(arr) {
    return Array.from(new Set(arr))
}
/**
 * 当前登录用户信息
 * @param {*} xToken 
 * @returns 
 */
loginUser.GetUserInfo = (xToken) => {//处理登录用户权限
    async function UserInfo() {
        try {
            tmpUser = {} = token.verifys(xToken);
            let usrRight = await ResUsersDB.Query(`select * from dbo.getUserRight(${tmpUser.userid})`)
            let tmplistarry = []
            let tmpPartIds = []
            let imgurl = null
            usrRight.forEach(el => {
                if (el.length > 0) {
                    let elRoleIds = el[0].roleids
                    let defUserList = elRoleIds.substr(1, elRoleIds.length - 1).split(',')
                    tmplistarry = [] = unique(defUserList)
                    let elDepart = el[0].departids
                    tmpPartIds = [] = unique(elDepart.substr(1, elDepart.length - 1).split(','))
                    imgurl = el[0].imgurl
                }
            });
            tmpUser.roles = tmplistarry
            tmpUser.avatar = imgurl;
            tmpUser.introduction = '当前用户超级用户'
            let filterArr = await ResUsersDB.Query(`select (select router from sys_model where id=a.modelid ) as router,a.modelid,a.activeid,a.departid from sys_role_model a  where a.roleid in (
                select roleid from sys_user_right where userid='${tmpUser.userid}')`)
            let tmpModelActive = {}
            filterArr[0].forEach(el => {
                if (tmpModelActive[el.router]) {
                    tmpModelActive[el.router] = [] = unique(tmpModelActive[el.router].concat(el.activeid.split(',')))
                } else {
                    tmpModelActive[el.router] = [] = unique(el.activeid.split(','))
                }
            });
            tmpUser.rights = tmpModelActive;  //权限
            tmpUser.partids = tmpPartIds;  //部门权限
            return { code: 200, msg: tmpUser }
        } catch (error) {
            return { code: 400, msg: error }
        }
    }
    return UserInfo()
}

loginUser.GetBeasBata = () => {
    async function GetUserBaseData() {
        try {
            let dataBase = {};
            let resUser = await ResUsersDB.SelectAll();
            let resUserTimes = await ResUserTimesDB.SelectAll();
            let resUserJob = await resUserjobDB.SelectAll();
            let resDepartment = await ResDepartmentDB.SelectAll({ where: { isDel: false } });
            dataBase.resUsers = resUser.filter(users => { return users.dataValues });
            dataBase.resTimes = resUserTimes.filter(times => { return times.dataValues });
            dataBase.resJobs = resUserJob.filter(jobs => { return jobs.dataValues });
            dataBase.resDepartments = resDepartment.filter(deps => { return deps.dataValues });
            return { code: 200, msg: dataBase }
        } catch (error) {
            return { code: 400, msg: error }
        }

    }
    return GetUserBaseData();
}

module.exports = loginUser;