var path = require('path');
var fs = require('fs');

Uploads = ()=>{}

Uploads.UsersImg = (files) =>{
    async function filesToSave() {
        try {
            let formName = files.fileds.formname[0]
            let userName = files.fileds.name[0]
            if(!fs.existsSync(`${path.dirname(__dirname)}/public/images/${formName}/`))
                fs.mkdirSync(`${path.dirname(__dirname)}/public/images/${formName}/`)         
            fs.writeFileSync(`${path.dirname(__dirname)}/public/images/${formName}/${userName}${files.extname}`,files.datas)            
            return {code:200,msg:`/public/images/${formName}/${userName}${files.extname}`};
        } catch (error) {
            return {code:400,msg:error}
        }        
    }
    return filesToSave()
}

module.exports = Uploads;

