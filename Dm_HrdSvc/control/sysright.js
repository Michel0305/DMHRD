var SysModelDB = require('../dbconn/dbmodel/sys_model');
var SysRoleModelDB = require('../dbconn/dbmodel/sys_role_model');
var SysRoleDB = require('../dbconn/dbmodel/sys_role');
var SysUserRightDB = require('../dbconn/dbmodel/sys_user_right')
var SysRightDepartDB = require('../dbconn/dbmodel/sys_right_depart');


SysRight = () => { }

/**
 * 获取权限模块基本资料
 */
SysRight.RightBaseData = () => {
    async function GetBaseData() {
        try {
            let rightbase = {}
            let models = await SysModelDB.SelectAll(); //模块            
            let roles = await SysRoleDB.SelectAll();//角色           
            let userRight = await SysUserRightDB.SelectAll();//用户对角色
            let roleModel = await SysRoleModelDB.SelectAll();//角色对模块
            let userDepart = await SysRightDepartDB.SelectAll();          
            rightbase.Roles = roles;
            rightbase.Models = models;
            rightbase.UserToRoles = userRight;
            rightbase.RolesToModels = roleModel;
            rightbase.UserToDepart = userDepart
            return { code: 200, basedata: rightbase };
        } catch (error) {
            return { code: 400, basedata: error };
        }
    }
    return GetBaseData();
}


/**
 * 用户对角色处理[用户配置角色对应需要设置控制的部门]
 * @param {*} infoData 
 */
SysRight.UserRoles = (infoData) => {
    async function ReCheckUserRole() {
        try {            
            await SysUserRightDB.Delete({ where: { userid: infoData.userid } })
            await SysRightDepartDB.Delete({ where: { userid: infoData.userid } }) 
            if (infoData.role){//角色需要更新
                let tmpUser = []
                for (const key in infoData.role) {
                    if (Object.hasOwnProperty.call(infoData.role, key)) {
                        tmpUser.push({ userid: infoData.userid, roleid: infoData.role[key],createuser:infoData.createUser })
                    }
                }              
                await SysUserRightDB.BulkCreate(tmpUser)
            } 
            if (infoData.dept && infoData.dept.length>0){//添加部门                
                await SysRightDepartDB.Insert({userid:infoData.userid,dept:`${infoData.dept}`,createuser:infoData.createUser})
            }
            return { code: 200, msg: 'success' }
        } catch (error) {
            console.log(error)
            return { code: 400, msg: error }
        }
    }
    return ReCheckUserRole();
}

/**
 * 角色对模块权限
 * @param {*} infoData 
 * @returns 
 */
SysRight.RoleToModels = (infoData) => {
    async function ReCheckRoleModel() {
        try {
            await SysRoleModelDB.Delete({ where: { roleid: infoData.roleid } })
            if (!infoData.model || infoData.model.length == 0) return { code: 200, msg: 'success' }
            if (!infoData.rights || infoData.rights.length == 0) return { code: 200, msg: 'success' }
            let tmpRight = []
            infoData.rights.forEach((el) => { tmpRight.push(el.id)})          
            let tmpDataBase = []
            infoData.model.forEach(el => {
                let vl = {
                    roleid: infoData.roleid,
                    modelid: el,
                    activeid: `${tmpRight}`,
                }
                tmpDataBase.push(vl)
            });
            await SysRoleModelDB.BulkCreate(tmpDataBase);
            return { code: 200, msg: 'sucess' }
        } catch (error) {
            return { code: 200, msg: error }
        }
    }
    return ReCheckRoleModel()
}

module.exports = SysRight;