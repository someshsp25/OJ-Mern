const express = require("express");
const router = express.Router();
const fetchQuestionsListController = require("../controllers/fetchQuestionsList-controller");
const authenticateJWT = require("../middlewares/auth-middleware");

router.route("/questions").get(authenticateJWT, fetchQuestionsListController.fetchQuestionsList);

module.exports = router;