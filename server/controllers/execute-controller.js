const { executeC } = require("../execute_file/execute-c");
const { executeCpp } = require("../execute_file/execute-cpp");
const { executeJava } = require("../execute_file/execute-java");
const { executePy } = require("../execute_file/execute-py");
const { generateFile } = require("../generate_file/generate-file");

const executeCode = async (req,res) => {

    console.log("Welcome inside execute controller");

    const { language, code, questionId, userId } = req.body;

    console.log(req.body);

    if(language == undefined){
        return res.status(404).json({success:false , error:"Empty language body"});
    }

    if(code == undefined){
        return res.status(404).json({success:false , error:"Empty code body"});
    }

    if(questionId == undefined){
        return res.status(404).json({success:false , error:"Empty questionId body"});
    }

    if(userId == undefined){
        return res.status(404).json({success:false , error:"Empty userId body"});
    }

    try{
        var output;
        const filePath = await generateFile(language,code,questionId,userId);
        if(language == 'cpp'){
            output = await executeCpp(filePath,questionId);
        }
        else if(language == 'c'){
            output = await executeC(filePath,questionId);
        }
        else if(language == 'java'){
            output = await executeJava(filePath,questionId);
        }
        else if(language == 'py'){
            output = await executePy(filePath,questionId);
        }
        else{
            console.log("Not a specified programming");
        }
        
        res.status(200).json({output});
    }
    catch(error){
        console.log(`error in executeCode hii : ${error}`);
    }
};

module.exports = {executeCode};