const Question = require("../models/question-model");
const { firebaseDB } = require("../utils/firebase/connection");

const saveQuestion = async (req,res) => {
    try{
        const { questionId, title, statement, inputformat, outputformat, constraints, testcase, hiddenInput, hiddenOutput } = req.body;
        console.log(req.body);
        const questionExist = await Question.findOne({questionId});

        if(questionExist){
            return res.status(400).json({msg:"Question with same question Id already exists"});
        }
        await Question.create({
            questionId: questionId,
            title: title,
            statement: statement,
            inputformat: inputformat,
            outputformat: outputformat,
            constraints: constraints,
            testcase: testcase
        }).then(async () => {
            try{
                const testcaseRef = firebaseDB.collection('hidden-cases').doc(`${questionId}`);
                const res = await testcaseRef.set({
                    "hiddenInput": hiddenInput,
                    "hiddenOutput": hiddenOutput
                });
                console.log("stored in firebase");
            }
            catch(err){
                res.status(500).json({msg:"Error while storing hidden cases in firebase"});
                console.log(err);
            }
        });
        res.status(200).json({msg:`Question with id: ${questionId} created successfully`});
    }
    catch(error){
        res.status(500).json({msg: "Error encontered during question saving"});
        console.log(error);
    }
};

module.exports = saveQuestion;