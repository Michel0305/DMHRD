var VResDepartmentDB = require('../dbconn/dbmodel/v_res_department');
var resUserjobDB = require('../dbconn/dbmodel/res_userjob');

ResDepartment = () => { }

/**
 * 获取部门信息
 * @returns 
 */
ResDepartment.GetAll = () => {
    async function AllDepartment() {
        let deptList = await VResDepartmentDB.SelectAll({
            attributes: ['dept_name', 'deptid', 'upbenchid', 'deptower', 'authorized', 'usercount']
        });
        let departmentJson = [];
        deptList.forEach(el => {
            departmentJson.push(el.dataValues)
        });
        // console.log(userList.filter(item=>{return item} ))
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
        // console.log(userList.filter(item=>{return item} ))
        return jobJson;
    }
    return AllJob();
}

ResDepartment.GetDeptAndJob = () => {
    async function AllDepartment() {
        let departIds = await VResDepartmentDB.SelectAll({
            attributes: ['dept_name', 'deptid', 'upbenchid', 'deptower', 'authorized', 'usercount']
        })
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


module.exports = ResDepartment;