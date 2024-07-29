const fs = require('fs');
const path = require('path')

const dirCodes = path.join(__dirname,'codes');

if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes,{recursive:true});
}

const generateFile = async (format, content, questionId, userId) =>{
    var datetime = new Date().toISOString().slice(0,19);
    const fileName = `${datetime}_${questionId}_${userId}.${format}`;
    const filePath = path.join(dirCodes,fileName);
    await fs.writeFileSync(filePath,content);
    return filePath;
};

module.exports = {generateFile};