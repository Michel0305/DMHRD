var ResWorkRecordsDB = require('../dbconn/dbmodel/res_workrecords');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
var moment = require('moment');
moment.suppressDeprecationWarnings = true;
ResWorkRecords = () => { }


ResWorkRecords.GetDataByParms = (...parms) => {
    async function GetWorkRecordsDase() {
        let workrecords;
        if (parms[0].datewhere) {
            workrecords = await ResWorkRecordsDB.SelectAll({ where: { checkdate: { [Op.between]: parms[0].datewhere } } })
        } else {
            workrecords = await ResWorkRecordsDB.SelectAll(
                { where: { checkdate: moment().subtract(2, 'days').format('YYYY/MM/DD') } }
            )
        }
        let workrecordBase = [];
        workrecords.forEach(el => {
            workrecordBase.push(el.dataValues)
        });
        return workrecordBase
    }
    return GetWorkRecordsDase()
}



module.exports = ResWorkRecords;