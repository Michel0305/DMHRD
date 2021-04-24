var SysSalaryDB = require('../dbconn/dbmodel/sys_salary');

SysSalaryFun = () =>{}


SysSalaryFun.BaseData = (params) =>{
    async function SalartBaseData() {
        try {
            let salaryBase = SysSalaryDB.SelectAll({where:{months:`'${params.month}'`}})
            return {code:200,msg:salaryBase}     
        } catch (error) {
            return {code:400,msg:error}
        }        
    }
    return  SalartBaseData() 
}


module.exports = SysSalaryFun;