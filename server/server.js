require("dotenv").config();
const express = require("express");
const app = express();
const authRouter = require("./router/auth-router");
const executeRouter = require("./router/execute-router");
const saveQuestionRouter = require("./router/saveQuestion-router");
const fetchQuestionsListRouter = require("./router/fetchQuestionsList-router");
const fetchQuestionRouter = require("./router/fetchQuestion-router");
const connectDb = require("./utils/db");
const cors = require("cors");
const { fetchQuestion } = require("./controllers/fetchQuestion-controller");

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials:true,
};

app.use(cors(corsOptions));

app.use(express.urlencoded({extended:true}));   
app.use(express.json());

app.use("/api/auth",authRouter);
app.use("/api/exec",executeRouter);
app.use("/api/question",saveQuestionRouter);
app.use("/api/question",fetchQuestionsListRouter);
app.use("/api/question",fetchQuestionRouter);

const PORT = 5000;

connectDb().then(() => {
    app.listen(PORT , () => {
        console.log(`Server is Running in port : ${PORT}`);
    });
});
