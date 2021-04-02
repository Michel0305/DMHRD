var VResDepartmentDB = require('../dbconn/dbmodel/v_res_department');
var resUserjobDB = require('../dbconn/dbmodel/res_userjob');
var resDepartmentDB = require('../dbconn/dbmodel/res_department');
ResDepartment = () => { }

/**
 * 获取部门信息
 * @returns 
 */
ResDepartment.GetAll = () => {
    async function AllDepartment() {
        let deptList = await VResDepartmentDB.SelectAll({
            attributes: ['id','dept_name', 'deptid', 'upbenchid', 'deptower', 'authorized', 'usercount','isDel']
        },{where:{isDel:false}});
        let departmentJson = [];
        deptList.forEach(el => {
            departmentJson.push(el.dataValues)
        });
        return departmentJson;
    }
    return AllDepartment();
}

/**
 * 获取岗位信息
 * @returns 
 */
ResDepartment.GetJob = () => {
    async function AllJob() {
        let jobList = await resUserjobDB.SelectAll();
        let jobJson = [];
        jobList.forEach(el => {
            jobJson.push(el.dataValues)
        });
        return jobJson;
    }
    return AllJob();
}

/**
 * 获取部门及岗位
 */
ResDepartment.GetDeptAndJob = () => {
    async function AllDepartment() {
        let departIds = await VResDepartmentDB.SelectAll({
            attributes: ['id', 'dept_name', 'deptid', 'upbenchid', 'deptower', 'authorized', 'usercount','isDel']
        },{where:{isDel:false}})
        let jobIds = await resUserjobDB.SelectAll();
        let departandjobs = {}
        let departJson = []
        let jobJson = []
        departIds.forEach(el => {
            departJson.push(el)
        })
        jobIds.forEach(el => {
            jobJson.push(el)
        })
        departandjobs.departments = departJson;
        departandjobs.jobs = jobJson;
        return departandjobs
    }
    return AllDepartment();
}


/**
 * 保存更新部门资料
 * @param {*} parms 
 */
ResDepartment.InfoDepartmentData = (parms) => {
    console.log(parms)
    async function infoParement() {
        if (parms.id == 0) { //Create
            try {
                let tmpInsert = await resDepartmentDB.Insert({
                    dept_name: parms.dept_name,
                    deptid: parms.deptid,
                    upbenchid: parms.upbenchid,
                    deptower: parms.deptower,
                    authorized: parms.authorized,
                    createuser:'1580'
                })
                return {code:200,backdata:tmpInsert}
            } catch (error) {
                console.log(error)
                return {code:400,backdata:'数据新增错误'}
            } 
        } else { //Update
            try {
                await VResDepartmentDB.Update({
                    dept_name: parms.dept_name,
                    deptid: parms.deptid,
                    upbenchid: parms.upbenchid,
                    deptower: parms.deptower,
                    authorized: parms.authorized
                }, { where: { id: parms.id } })
                return {code:200,backdata:'success'}
            } catch (error) {
                return {code:400,backdata:'数据更新错误'}
            }             
        }
    }
    return infoParement();
}
/**
 * 删除部门
 * @param {*} ids 
 * @returns 
 */
ResDepartment.DepartRemove = (ids) =>{
    async function removeDept () {
        try {
            await resDepartmentDB.Delete({where:{id:ids.id}})
            return {code:200,msg:'删除完毕'}
        } catch (error) {
            return {code:400,msg:'删除失败'}
        }
    }
    return removeDept()
}

/**
 * 添加职位
 * @param {*} parms 
 * @returns 
 */
ResDepartment.InfoJob = (parms) =>{
    async function createJobs() {
        try {
            await resUserjobDB.Insert({defpartid:parms.defpartid,job:parms.job,usercount:0});
            return {code:200,data:'Success'}
        } catch (error) {
            return {code:400,data:'Error'}
        }
    }
    return createJobs()
}



module.exports = ResDepartment;