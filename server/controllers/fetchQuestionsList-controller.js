const Question = require("../models/question-model");

const fetchQuestionsList = async (req,res) => {
    try{
        const questions = await Question.find({},'questionId title');
        // console.log(questions);
        res.status(200).json(questions);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {fetchQuestionsList};