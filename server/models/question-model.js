const { Schema, model, default:mongoose } = require("mongoose");

const questionSchema = new Schema({
    questionId: {type: String, required: true},
    title: {type: String, required: true},
    statement: {type: String, required: true},
    inputformat: {type: String, required: true},
    outputformat: {type: String, required: true},
    constraints: {type: String ,required: true},
    testcase: {type: String , required: true}
});

const Question = new model('Question',questionSchema);
module.exports = Question;