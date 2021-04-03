var SysModelDB = require('../dbconn/dbmodel/sys_model');
var SysRoleModelDB = require('../dbconn/dbmodel/sys_role_model');
var SysRoleDB = require('../dbconn/dbmodel/sys_role');
var SysUserRightDB = require('../dbconn/dbmodel/sys_user_right')


SysRight = () => { }

/**
 * 获取权限模块基本资料
 */
SysRight.RightBaseData = () => {
    async function GetBaseData() {
        try {
            let rightbase = {}
            let models = await SysModelDB.SelectAll(); //模块
            let tmpModel = []
            models.forEach(el => {
                tmpModel.push(el.dataValues)
            });
            let roles = await SysRoleDB.SelectAll();//角色
            let tmpRole = []
            roles.forEach(el => {
                tmpRole.push(el.dataValues)
            });
            let userRight = await SysUserRightDB.SelectAll();//用户对角色
            let tmpUserRight = []
            userRight.forEach(el => {
                tmpUserRight.push(el.dataValues)
            });
            let roleModel = await SysRoleModelDB.SelectAll();//角色对模块
            let tmpRoleModel = []
            roleModel.forEach(el => {
                tmpRoleModel.push(el.dataValues)
            });
            rightbase.Roles = tmpRole;
            rightbase.Models = tmpModel;
            rightbase.UserToRoles = tmpUserRight;
            rightbase.RolesToModels = tmpRoleModel;
            return { code: 200, basedata: rightbase };
        } catch (error) {
            return { code: 400, basedata: error };
        }
    }
    return GetBaseData();
}


/**
 * 用户对角色处理
 * @param {*} infoData 
 */
SysRight.UserRoles = (infoData) => {
    async function ReCheckUserRole() {
        try { 
            await SysUserRightDB.Delete({ where: { userid: infoData.userid } })
            if (!infoData.role || infoData.role.length == 0) return { code: 200, msg: 'success' }
            let tmpUser = []
            infoData.role.forEach(el => {
                tmpUser.push({ userid: infoData.userid, roleid: el })
            });
            await SysUserRightDB.BulkCreate(tmpUser)
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
SysRight.RoleToModels = (infoData) =>{
    async function ReCheckRoleModel() {
        try {
            await SysRoleModelDB.Delete({ where: { roleid: infoData.roleid } })
            if (!infoData.model || infoData.model.length == 0) return { code: 200, msg: 'success' }
            if (!infoData.rights || infoData.rights.length == 0) return { code: 200, msg: 'success' }
            let tmpRight = []
            infoData.rights.forEach((el)=>{
                tmpRight.push(el.id)
            }) 
            let tmpPartids = []            
            if(infoData.departids){
                tmpPartids = [] = infoData.departids.substr(1,infoData.departids.length).split(',')
            }            
            let tmpDataBase = []
            infoData.model.forEach(el => {
                let vl = {
                    roleid:infoData.roleid,
                    modelid:el,
                    activeid:`${tmpRight}`,
                    departid:`${tmpPartids}`
                }
                tmpDataBase.push(vl)                
            });
            await SysRoleModelDB.BulkCreate(tmpDataBase);
            return {code:200,msg:'sucess'}   
        } catch (error) {
            return {code:200,msg:error} 
        }        
    }
    return ReCheckRoleModel()    
}

module.exports = SysRight;