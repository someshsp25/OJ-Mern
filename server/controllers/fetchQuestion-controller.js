const Question = require("../models/question-model");

const fetchQuestion = async (req, res) => {
    try {
        const { questionId } = req.params;
        // console.log(questionId);
        const question = await Question.findOne({ questionId });
        if (question) {
            res.status(200).json(question);
        } else {
            res.status(404).json({ msg: "Question not found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Unable to fetch question" });
    }
};

module.exports = {fetchQuestion};
